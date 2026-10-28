import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalState } from './localstate';
import { photos, rounds, type Q } from './data';
import { GridGains, Godiji, PATAKHA_POINTS } from './patakha';
import { HostHandbook } from './host';
import credits from './credits';
import { Sky } from './sky';
import { playCheer, playOops, playBuzz, playPop } from './audio';
import { RoundIcon } from './icons';
import './style.css';

type Saved = {
    names: string[];
    scores: number[];
    chooser: number;
    picks: Record<string, number>;
    progress: Record<string, number>;
    log: { p: number; d: number; label: string }[];
    aq: Record<string, string>;
    calm: boolean;
    mute: boolean;
    stealBonus: number;
};
const PARTY_CODE = '2222';
const INITIAL: Saved = { names: ['Player 1', 'Player 2', 'Player 3', 'Player 4'], scores: [0, 0, 0, 0], chooser: 0, picks: {}, progress: {}, log: [], aq: {}, calm: false, mute: false, stealBonus: 10 };

const EMBERS = Array.from({ length: 26 }, (_, i) => ({ left: (i * 37) % 100, delay: (i * 1.3) % 9, dur: 8 + ((i * 7) % 8), size: 3 + (i % 4) * 2 }));
function Embers({ calm }: { calm: boolean }) {
    return <div className={'embers' + (calm ? ' calm' : '')} aria-hidden="true">
        {EMBERS.map((e, i) => <span key={i} style={{ left: e.left + '%', animationDelay: e.delay + 's', animationDuration: e.dur + 's', width: e.size, height: e.size }} />)}
    </div>;
}

function Pic({ q, revealed, onReady }: { q: Q; revealed: boolean; onReady?: () => void }) {
    if (!q.img) return null;
    const imgKey = (revealed && q.imgReveal) ? q.imgReveal : q.img;
    const src = photos[imgKey];
    const mode = q.mode || 'clear';
    if (mode === 'reveal' && !revealed) return null;
    const cls = 'pic pic-' + mode + (revealed ? ' is-revealed' : '') + (q.logo ? ' pic-logo' : '') + ((q as any).fit === 'contain' ? ' pic-contain' : '');
    return <div className={cls + (mode === 'reveal' ? ' pic-pop' : '')}><PicImg key={imgKey} src={src} alt={revealed ? q.a : 'Mystery picture'} zoom={mode === 'zoom'} origin={q.origin} onReady={onReady} /></div>;
}

function PicImg({ src, alt, zoom, origin, onReady }: { src: string; alt: string; zoom: boolean; origin?: string; onReady?: () => void }) {
    const [ld, setLd] = useState(false);
    const [err, setErr] = useState(false);
    if (err) return <div className="pic-error">📷<br />Photo did not load.<br /><small>Host: describe it or skip - your call!</small></div>;
    return <img src={src} alt={alt} className={ld ? 'ld' : ''} onLoad={() => { setLd(true); onReady && onReady(); }} onError={() => { setErr(true); onReady && onReady(); }} style={zoom ? ({ ['--origin' as string]: origin || '50% 50%' } as React.CSSProperties) : undefined} />;
}

const cleanNames = (arr: string[] | undefined): string[] => [0, 1, 2, 3].map(i => (((arr || [])[i] || '').trim().slice(0, 14)) || 'Player ' + (i + 1));

export function App() {
    const [saved, setSaved, status] = useLocalState<Saved>('diwali-quiz.v1', INITIAL);
    const s: Saved = { ...INITIAL, ...saved };
    const rawNames: string[] = [0, 1, 2, 3].map(i => (saved.names || [])[i] ?? INITIAL.names[i]);
    const nm = (i: number) => (rawNames[i] || '').trim() || 'Player ' + (i + 1);
    const [view, setView] = useState<'home' | 'setup' | 'board' | 'round' | 'credits' | 'end' | 'patakhamenu' | 'patakha' | 'modi' | 'handbook'>(() => window.location.hash === '#host' ? 'handbook' : 'home');
    const [gateOk, setGateOk] = useState(false);
    const [gateCode, setGateCode] = useState('');
    const [gateErr, setGateErr] = useState(false);
    const [gateShow, setGateShow] = useState(false);
    const [ri, setRi] = useState(0);
    const [qi, setQi] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [left, setLeft] = useState<number | null>(null);
    const [burst, setBurst] = useState(0);
    const [awarded, setAwarded] = useState<string | null>(null);
    const [oops, setOops] = useState(0);
    const [confirmReset, setConfirmReset] = useState(false);

    useEffect(() => {
        rounds.forEach(r => r.qs.forEach(qq => { [qq.img, (qq as any).imgReveal].forEach(k => { if (k && photos[k]) { const im = new Image(); im.src = photos[k]; } }); }));
    }, []);
    const timer = useRef<number | null>(null);
    const migratedNames = useRef(false);
    const pendingT = useRef<number | null>(null);
    const awardLock = useRef(false);
    const autoWaitPic = useRef(false);
    const muteRef = useRef(s.mute);
    muteRef.current = s.mute;

    const update = useCallback((patch: Partial<Saved>) => { if (status.ready) setSaved({ ...s, ...patch }); }, [s, setSaved, status.ready]);
    useEffect(() => { if (!status.ready || migratedNames.current) return; migratedNames.current = true; if ((saved.names || []).some(n => !(n || '').trim())) setSaved({ ...s, names: cleanNames(saved.names) }); }, [status.ready]);
    const round = rounds[ri];
    const q = round.qs[qi];
    const isBonus = qi === 5;
    const picker = s.picks[round.id] ?? 0;
    const direct = isBonus ? 20 : 10;
    const steal = isBonus ? s.stealBonus : 5;

    const stopTimer = () => { if (timer.current) { window.clearInterval(timer.current); timer.current = null; } };
    useEffect(() => stopTimer, []);
    const startTimer = () => {
        stopTimer(); if (pendingT.current) { window.clearTimeout(pendingT.current); pendingT.current = null; } autoWaitPic.current = false; setLeft(5);
        timer.current = window.setInterval(() => setLeft(v => { if (v === null) return null; if (v <= 1) { stopTimer(); if (!s.mute) playBuzz(); return 0; } return v - 1; }), 1000);
    };

    const autoStart = (r: number, i: number, awardedLabel: string | null) => {
        if (pendingT.current) { window.clearTimeout(pendingT.current); pendingT.current = null; }
        autoWaitPic.current = false;
        if (rounds[r].qs[i].paced || awardedLabel) return;
        const q = rounds[r].qs[i];
        const waitsForPic = !!(q.img && (q.mode || 'clear') !== 'reveal');
        const kick = () => { pendingT.current = window.setTimeout(() => { pendingT.current = null; startTimer(); }, 1000); };
        if (waitsForPic) {
            autoWaitPic.current = true;
            pendingT.current = window.setTimeout(() => { if (autoWaitPic.current) { autoWaitPic.current = false; kick(); } }, 6000);
        } else kick();
    };
    const onPicReady = () => {
        if (!autoWaitPic.current || awarded || left !== null) return;
        autoWaitPic.current = false;
        if (pendingT.current) { window.clearTimeout(pendingT.current); pendingT.current = null; }
        pendingT.current = window.setTimeout(() => { pendingT.current = null; startTimer(); }, 1000);
    };
    const openQ = (r: number, i: number) => {
        stopTimer(); setRi(r); setQi(i); setRevealed(false); setLeft(null);
        const label = (s.aq || {})[`${rounds[r].id}:${i}`] || null;
        awardLock.current = label !== null;
        setAwarded(label); setView('round'); autoStart(r, i, label);
    };
    const award = (p: number, d: number, label: string) => {
        if (awarded !== null || awardLock.current) return;
        awardLock.current = true;
        if (pendingT.current) { window.clearTimeout(pendingT.current); pendingT.current = null; }
        const scores = s.scores.slice(); scores[p] += d;
        const labelTxt = `${nm(p)} +${d}`;
        update({ scores, log: [...s.log, { p, d, label }].slice(-60), aq: { ...(s.aq || {}), [`${round.id}:${qi}`]: labelTxt } });
        setAwarded(labelTxt); setBurst(b => b + 1); stopTimer(); if (!s.mute) playCheer();
    };
    const wrong = () => {
        if (awarded !== null || awardLock.current) return;
        if (pendingT.current) { window.clearTimeout(pendingT.current); pendingT.current = null; }
        if (!s.mute) playOops();
        setAwarded(null); stopTimer(); if (!q.paced) setLeft(0); setOops(o => o + 1);
    };
    const nobody = () => {
        if (awarded !== null || awardLock.current) return;
        awardLock.current = true;
        if (pendingT.current) { window.clearTimeout(pendingT.current); pendingT.current = null; }
        update({ aq: { ...(s.aq || {}), [`${round.id}:${qi}`]: 'No points' } });
        setAwarded('No points'); stopTimer();
    };
    const undo = () => {
        const aq = { ...(s.aq || {}) }; delete aq[`${round.id}:${qi}`];
        if (awarded === 'No points') { update({ aq }); setAwarded(null); awardLock.current = false; return; }
        const last = s.log[s.log.length - 1]; if (!last) return;
        const scores = s.scores.slice(); scores[last.p] -= last.d;
        update({ scores, log: s.log.slice(0, -1), aq }); setAwarded(null); awardLock.current = false;
    };
    const nudge = (p: number, d: number) => { const scores = s.scores.slice(); scores[p] += d; update({ scores, log: [...s.log, { p, d, label: 'manual' }].slice(-60) }); };
    const next = () => {
        const progress = { ...s.progress, [round.id]: Math.max(s.progress[round.id] || 0, qi + 1) };
        update({ progress });
        if (qi < 5) openQ(ri, qi + 1);
        else {
            const done = rounds.every(r => (r.id === round.id ? 6 : progress[r.id] || 0) >= 6);
            setView(done ? 'end' : 'board');
        }
    };
    const prev = () => { if (qi > 0) openQ(ri, qi - 1); };
    const awardPatakha = (key: string, p: number) => {
        const scores = s.scores.slice(); scores[p] += PATAKHA_POINTS;
        update({ scores, aq: { ...(s.aq || {}), [`patakha:${key}`]: `${nm(p)} +${PATAKHA_POINTS}`, [`patakha:${key}:p`]: String(p) } });
        setBurst(b => b + 1); if (!s.mute) playCheer();
    };
    const nobodyPatakha = (key: string) => {
        update({ aq: { ...(s.aq || {}), [`patakha:${key}`]: 'No points' } });
        if (!s.mute) playOops();
    };
    const undoPatakha = (key: string) => {
        const aq = { ...(s.aq || {}) };
        const p = parseInt(aq[`patakha:${key}:p`] || '-1', 10);
        const scores = s.scores.slice(); if (p >= 0 && p < 4) scores[p] -= PATAKHA_POINTS;
        delete aq[`patakha:${key}`]; delete aq[`patakha:${key}:p`];
        update({ scores, aq });
    };
    const tryGate = () => { if (gateCode.trim() === PARTY_CODE) { setGateOk(true); setGateErr(false); setGateCode(''); } else { setGateErr(true); setGateCode(''); } };
    const restart = () => { stopTimer(); if (pendingT.current) { window.clearTimeout(pendingT.current); pendingT.current = null; } setSaved({ ...INITIAL }); setConfirmReset(false); setBurst(0); setRevealed(false); setAwarded(null); setLeft(null); setRi(0); setQi(0); setView('home'); };
    const pickRound = (r: number) => {
        const id = rounds[r].id;
        const who = s.picks[id] ?? s.chooser;
        update({ picks: { ...s.picks, [id]: who }, chooser: s.picks[id] === undefined ? (s.chooser + 1) % 4 : s.chooser });
        const q0 = s.progress[id] && s.progress[id] < 6 ? s.progress[id] : 0; stopTimer(); setRi(r); setQi(q0); setView('round'); setRevealed(false); setLeft(null); const lb = (s.aq || {})[`${id}:${q0}`] || null; awardLock.current = lb !== null; setAwarded(lb); autoStart(r, q0, lb);
    };

    useEffect(() => {
        if (view !== 'home') return;
        const onH = (e: KeyboardEvent) => { if (e.key === 'h' || e.key === 'H') setView('handbook'); };
        window.addEventListener('keydown', onH);
        return () => window.removeEventListener('keydown', onH);
    }, [view]);

    useEffect(() => {
        if (view !== 'round') return;
        const onKey = (e: KeyboardEvent) => {
            const t = e.target as HTMLElement;
            if (t && (t.tagName === 'INPUT' || t.tagName === 'SELECT')) return;
            if (e.key === 't' || e.key === 'T') startTimer();
            else if (e.key === 'r' || e.key === 'R' || e.key === ' ') { e.preventDefault(); setRevealed(v => !v); stopTimer(); }
            else if (e.key === 'ArrowRight' || e.key === 'n') next();
            else if (e.key === 'ArrowLeft' || e.key === 'p') prev();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0; document.body.scrollTop = 0;
        try { window.parent.postMessage({ type: 'scroll-top' }, '*'); } catch (e) { /* ignore */ }
    }, [view, ri, qi]);

    const total = useMemo(() => Object.values(s.progress).reduce((a, b) => a + b, 0), [s.progress]);
    const leaderMax = Math.max(...s.scores);

    const Scoreboard = <div className="scoreboard">
        {rawNames.map((n, i) => <div key={i} className={'pl' + (view === 'round' && picker === i ? ' is-picker' : '') + (s.scores[i] === leaderMax && leaderMax > 0 ? ' is-lead' : '')}>
            <input aria-label={'Name of player ' + (i + 1)} value={n} placeholder={'Player ' + (i + 1)} onChange={e => { const names = rawNames.slice(); names[i] = e.target.value.slice(0, 14); update({ names }); }} onBlur={() => update({ names: cleanNames(rawNames) })} />
            <strong>{s.scores[i]}</strong>
            <span className="nudge"><button aria-label={'Minus 5 for ' + n} onClick={() => nudge(i, -5)}>-5</button><button aria-label={'Plus 5 for ' + n} onClick={() => nudge(i, 5)}>+5</button></span>
        </div>)}
    </div>;

    return <div className={'quiz' + (s.calm ? ' is-calm' : '')} style={{ ['--hue' as string]: view === 'round' ? round.hue : 30 } as React.CSSProperties}>
        <Embers calm={s.calm} />
        <Sky burstK={burst} calm={s.calm} onPop={() => { if (!muteRef.current) playPop(); }} />
        <header className="bar">
            <button className="ghost" onClick={() => { stopTimer(); if (pendingT.current) { window.clearTimeout(pendingT.current); pendingT.current = null; } setView(view === 'home' ? 'home' : (view === 'board' || view === 'handbook') ? 'home' : 'board'); }}>{view === 'home' ? '🪔 Diwali Quiz' : (view === 'board' || view === 'handbook') ? '← Home' : '← Rounds'}</button>
            <span className="prog">{total}/48 asked</span>
            <span className="barR">{view !== 'home' && <button className="ghost" onClick={() => setConfirmReset(true)}>↻ Restart quiz</button>}<button className="ghost" onClick={() => update({ mute: !s.mute })} aria-pressed={s.mute}>{s.mute ? '🔇 Sound off' : '🔊 Sound on'}</button><button className="ghost" onClick={() => update({ calm: !s.calm })} aria-pressed={s.calm}>{s.calm ? 'Calm mode: on' : 'Calm mode: off'}</button></span>
        </header>

        {view === 'home' && <main className="home">
            <div className="diya" aria-hidden="true"><RoundIcon id="diwali" size={130} /></div>
            <p className="kicker">Shubh Deepavali</p>
            <h1 className="wobble deva title-line">दिमाग की आतिशबाज़ी <span className="title-en">- Diwali Quiz Night</span></h1>
            <p className="sub">8 rounds. 48 questions. 4 players. 1 host with the final word.</p>
            <button className="cta" onClick={() => setView('setup')}>Let's play!</button>
            {(total > 0 || s.scores.some(x => x !== 0)) && <button className="ghost small" onClick={() => setView('board')}>Continue where we left off</button>}
            <button className="ghost small" onClick={() => setView('credits')}>Photo credits</button>
            <button className="ghost small" onClick={() => setView('handbook')}>🎤 Host handbook (all answers - keep private)</button>
            {(total > 0 || s.scores.some(x => x !== 0)) && <button className="ghost small danger" onClick={() => setConfirmReset(true)}>↻ Start over (clear scores)</button>}
            <p className="hint">Host keys: <kbd>T</kbd> timer · <kbd>R</kbd> or <kbd>Space</kbd> reveal · <kbd>←</kbd> <kbd>→</kbd> previous / next</p>
        </main>}

        {!gateOk && (view === 'board' || view === 'round' || view === 'patakhamenu' || view === 'patakha' || view === 'modi' || view === 'handbook' || view === 'end') && <main className="home gate">
            <div className="diya" aria-hidden="true"><RoundIcon id="diwali" size={110} /></div>
            <h1 className="wobble deva">रुकिए!</h1>
            <p className="latintitle">Secret party code, please</p>
            <p className="sub">Yash se code maango - no code, no khel. 🪔</p>
            <div className="gate-form">
                <input className="gate-input" type={gateShow ? 'text' : 'password'} value={gateCode} onChange={e => setGateCode(e.target.value.replace(/\D/g, '').slice(0, 4))} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); tryGate(); } }} inputMode="numeric" autoComplete="off" placeholder="••••" aria-label="Party code" autoFocus />
                <button className="gate-eye" type="button" onClick={() => setGateShow(v => !v)} aria-label={gateShow ? 'Hide the code' : 'Show the code'} title={gateShow ? 'Hide' : 'Show'}>{gateShow ? '🙈' : '👁️'}</button>
                <button className="cta" type="button" onClick={tryGate}>Kholo! 🎇</button>
            </div>
            {gateErr && <p className="gate-err">Galat code! Nakhre baad mein, sahi code pehle. 😜</p>}
        </main>}
        {view === 'setup' && <main className="setup">
            <h1 className="wobble">Rules of the Evening</h1>
            <div className="rulecards">
                <div className="rc"><b>1</b><span>Each player picks <em>two rounds</em>, without peeking inside.</span></div>
                <div className="rc"><b>2</b><span>You get <em>5 seconds</em> to answer. The clock starts on its own.</span></div>
                <div className="rc"><b>3</b><span>Right answer <em>+10</em>. Wrong or silent? Up for grabs. Steal <em>+5</em>.</span></div>
                <div className="rc"><b>4</b><span>Last question of every round is the <em>20 point BONUS</em>.</span></div>
                <div className="rc"><b>5</b><span>The winner owes Yash <em>round-trip flights to the Philippines</em>. ✈️</span></div>
                <div className="rc"><b>6</b><span><em>Yash ka faisla antim hai.</em> Appeals may be submitted with a dabba of Mysore Pak.</span></div>
                <div className="rc"><b>7</b><span><em>No phones, please.</em> Caught finding your brain in ChatGPT? <em>-20 points</em>. 📵</span></div>
            </div>
            <h2 className="wobble2">Who is playing? Pick a fun nickname</h2>
            <div className="names">
                {rawNames.map((n, i) => <input key={i} aria-label={'Nickname for player ' + (i + 1)} value={n} placeholder={'Player ' + (i + 1)} onChange={e => { const names = rawNames.slice(); names[i] = e.target.value.slice(0, 14); update({ names }); }} onBlur={() => update({ names: cleanNames(rawNames) })} />)}
            </div>
            <button className="cta" onClick={() => { update({ names: cleanNames(rawNames) }); setView('board'); }}>Start the quiz</button>
            <button className="ghost small" onClick={() => setView('home')}>← Back</button>
        </main>}

        {gateOk && view === 'board' && <main className="board">
            <h1>Pick a round</h1>
            <p className="sub">Now choosing: <b>{nm(s.chooser)}</b>. Contents stay secret until you open it.</p>
            <div className="tiles">
                {rounds.map((r, i) => {
                    const done = (s.progress[r.id] || 0) >= 6;
                    const by = s.picks[r.id];
                    return <button key={r.id} className={'tile' + (done ? ' is-done' : '')} style={{ ['--h' as string]: r.hue } as React.CSSProperties} onClick={() => pickRound(i)}>
                        <span className="em"><RoundIcon id={r.id} size={92} /></span>
                        <span className="nm">{r.name}</span>
                        <span className="tg">{r.tag}</span>
                        <span className="st">{done ? 'Done' : by !== undefined ? `${nm(by)} · ${s.progress[r.id] || 0}/6` : 'Open'}</span>
                    </button>;
                })}
            </div>
            {Scoreboard}
            <div className="row">
                <div className="pk-ctas">
                    <button className="cta pk-cta" onClick={() => setView('patakhamenu')}>🧨 Patakha Rounds</button>
                </div>
            </div>
            <div className="row">
                <button className="ghost small" onClick={undo} disabled={!s.log.length}>Undo last score</button>
                <button className="ghost small" onClick={() => setView('handbook')}>🎤 Handbook</button>
                <button className="ghost small" onClick={() => setView('credits')}>Photo credits</button>
                <button className="ghost small danger" onClick={() => setConfirmReset(true)}>↻ Restart whole quiz</button>
            </div>
        </main>}

        {gateOk && view === 'round' && <main className="qscreen">
            <div className="qhead">
                <span className="rname"><RoundIcon id={round.id} size={48} /> {round.name}</span>
                <span className="who">{nm(picker)}'s round</span>
                <span className={'badge' + (isBonus ? ' bonus' : '')}>{isBonus ? 'BONUS · 20 points' : `Q${qi + 1} of 6 · ${direct} points`}</span>
            </div>
            <div className={'qbody' + (q.img && (q.mode !== 'reveal' || revealed) ? ' has-pic' : '') + (revealed ? ' is-rev' : '')}>
                <div className="qtext">
                    <p className="prompt">{q.p}</p>
                    {revealed && <div className="answer"><span>Answer</span><strong>{q.a}</strong>{q.lakes && <ul className="lakes">{q.lakes.map(l => <li key={l}>{l}</li>)}</ul>}{q.note && <em>{q.note}</em>}</div>}
                </div>
                <Pic q={q} revealed={revealed} onReady={onPicReady} />
            </div>
            <div className="controls">
                <button className="btn" onClick={prev} disabled={qi === 0}>← Previous</button>
                {q.paced ? <div className="clock paced">Take your time</div> : <div className={'clock' + (left === 0 ? ' is-up' : '')} aria-live="polite">{left === null ? '5' : left === 0 ? 'Steal!' : left}</div>}
                {!q.paced && <button className="btn" onClick={startTimer}>Start 5s</button>}
                <button className="btn primary" onClick={() => { setRevealed(v => !v); stopTimer(); }}>{revealed ? 'Hide answer' : 'Reveal answer'}</button>
                <button className="btn" onClick={next}>{qi < 5 ? 'Next question →' : 'Finish round →'}</button>
            </div>
            <div className="award">
                <button className="btn good" disabled={awarded !== null} onClick={() => award(picker, direct, 'direct')}>✓ {nm(picker)} correct +{direct}</button>
                {s.names.map((n, i) => i === picker ? null : <button key={i} className="btn steal" disabled={awarded !== null} onClick={() => award(i, steal, 'steal')}>Steal: {n} +{steal}</button>)}
                <button className="btn wrongbtn" disabled={awarded !== null} onClick={wrong}>✗ Wrong, up for grabs</button>
                <button className="btn" disabled={awarded !== null} onClick={nobody}>Nobody</button>
                <button className="btn" onClick={undo} disabled={!s.log.length && awarded === null}>Undo</button>
            </div>
            {awarded && <p className="awarded">{awarded}</p>}
            {isBonus && <label className="stealset">Bonus steal value <select value={s.stealBonus} onChange={e => update({ stealBonus: Number(e.target.value) })}><option value={5}>5</option><option value={10}>10</option><option value={20}>20</option></select></label>}
            {Scoreboard}
        </main>}

        {gateOk && view === 'end' && <main className="home">
            <div className="diya trophy" aria-hidden="true">🏆</div>
            <h1>Final scores</h1>
            <p className="sub winner">{leaderMax > 0 ? (() => { const w = [0, 1, 2, 3].filter(i => s.scores[i] === leaderMax).map(nm); return `${w.join(' & ')} won, and ${w.length > 1 ? 'owe' : 'owes'} Yash round-trip flights to the Philippines!`; })() : 'No scores yet.'}</p>
            <p className="sub">The host's ruling applies to all tie-breaks. Appeals may be submitted with a dabba of Mysore Pak.</p>
            {Scoreboard}
            <button className="cta" onClick={() => setView('board')}>Back to rounds</button>
        </main>}

        

        {gateOk && view === 'patakhamenu' && <main className="board">
            <h1>Patakha Rounds 🧨</h1>
            <p className="sub">Two open-floor crackers. No timer, no turns - shout first, win {PATAKHA_POINTS} points.</p>
            <div className="tiles pk-menu">
                <button className="tile" onClick={() => setView('modi')}>
                    <span className="em"><img className="godiji-avatar" src={photos.godiji_avatar} alt="Godiji" /></span>
                    <span className="nm">Godiji</span>
                    <span className="tg">Complete the 8 PM announcement</span>
                    <span className="st">{(s.aq || {})['patakha:modi'] ? '✓ ' + (s.aq || {})['patakha:modi'] : 'Open'}</span>
                </button>
                <button className="tile" onClick={() => setView('patakha')}>
                    <span className="em">💪</span>
                    <span className="nm">Grid Gains</span>
                    <span className="tg">40 cells. Two nipples. Call it.</span>
                    <span className="st">{(s.aq || {})['patakha:grid'] ? '✓ ' + (s.aq || {})['patakha:grid'] : 'Open'}</span>
                </button>
            </div>
            <button className="ghost small" onClick={() => setView('board')}>← Back to rounds</button>
        </main>}
        {gateOk && view === 'patakha' && <main className="patakha">
            <GridGains photo={photos.patakha_grid} names={[0, 1, 2, 3].map(nm)} awarded={(s.aq || {})['patakha:grid'] || null} onAward={p => awardPatakha('grid', p)} onNobody={() => nobodyPatakha('grid')} onUndo={() => undoPatakha('grid')} />
            {Scoreboard}
            <button className="ghost small" onClick={() => setView('patakhamenu')}>← Patakha Rounds</button>
        </main>}
        {gateOk && view === 'modi' && <main className="patakha">
            <Godiji photo={photos.modi} names={[0, 1, 2, 3].map(nm)} awarded={(s.aq || {})['patakha:modi'] || null} onAward={p => awardPatakha('modi', p)} onNobody={() => nobodyPatakha('modi')} onUndo={() => undoPatakha('modi')} />
            {Scoreboard}
            <button className="ghost small" onClick={() => setView('patakhamenu')}>← Patakha Rounds</button>
        </main>}

        {gateOk && view === 'handbook' && <main><HostHandbook /></main>}
        {view === 'credits' && <main className="credits">
            <h1>Photo credits</h1>
            <p className="sub">Images from Wikimedia Commons and Pexels, used under the licences shown. Tap a title for the original page.</p>
            <ul>{Object.entries(credits as Record<string, { title: string; license: string; author: string; page: string }>).map(([k, c]) => <li key={k}>{c.page ? <a href={c.page} target="_blank" rel="noreferrer">{c.title.replace(/\.[a-z]+$/i, '')}</a> : <span>{c.title}</span>}<span>{c.author} · {c.license}</span></li>)}</ul>
            <button className="cta" onClick={() => setView('board')}>Back</button>
        </main>}
        {confirmReset && <div className="modal" role="dialog" aria-modal="true"><div className="box"><h2>Restart the whole quiz?</h2><p>This clears all scores, round picks and progress, and resets names to Player 1-4.</p><div className="row"><button className="btn danger" onClick={restart}>Yes, start over</button><button className="btn" onClick={() => setConfirmReset(false)}>Keep playing</button></div></div></div>}
        {!status.ready && <p className="saving">Loading saved scores…</p>}
    </div>;
}
