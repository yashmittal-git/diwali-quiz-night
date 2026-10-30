import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalState } from './localstate';
import { photos, rounds, type Q } from './data';
import { GridGains, Godiji, EyesReveal, EyesIcon, PATAKHA_POINTS } from './patakha';
import { HostHandbook } from './host';
import credits from './credits';
import { Sky } from './sky';
import { playCheer, playOops, playBuzz, playPop } from './audio';
import { RoundIcon } from './icons';
import './style.css';

type Saved = {
    teamCount: number;
    names: string[];
    scores: number[];
    chooser: number;
    picks: Record<string, number>;
    progress: Record<string, number>;
    log: { p: number; d: number; label: string; t?: number }[];
    aq: Record<string, string>;
    calm: boolean;
    mute: boolean;
    stealBonus: number;
};
const PARTY_CODE = '2222';
const MIN_TEAMS = 2, MAX_TEAMS = 8, DEFAULT_TEAMS = 5;
const teamNames = (n: number) => Array.from({ length: n }, (_, i) => 'Team ' + (i + 1));
const INITIAL: Saved = { teamCount: DEFAULT_TEAMS, names: teamNames(DEFAULT_TEAMS), scores: Array(DEFAULT_TEAMS).fill(0), chooser: 0, picks: {}, progress: {}, log: [], aq: {}, calm: false, mute: false, stealBonus: 10 };

const EMBERS = Array.from({ length: 26 }, (_, i) => ({ left: (i * 37) % 100, delay: (i * 1.3) % 9, dur: 8 + ((i * 7) % 8), size: 3 + (i % 4) * 2 }));
function Embers({ calm }: { calm: boolean }) {
    return <div className={'embers' + (calm ? ' calm' : '')} aria-hidden="true">
        {EMBERS.map((e, i) => <span key={i} style={{ left: e.left + '%', animationDelay: e.delay + 's', animationDuration: e.dur + 's', width: e.size, height: e.size }} />)}
    </div>;
}

function Pic({ q, revealed, onReady }: { q: Q; revealed: boolean; onReady?: (ok: boolean) => void }) {
    if (!q.img) return null;
    const imgKey = (revealed && q.imgReveal) ? q.imgReveal : q.img;
    const src = photos[imgKey];
    const mode = q.mode || 'clear';
    if (mode === 'reveal' && !revealed) return null;
    const cls = 'pic pic-' + mode + (revealed ? ' is-revealed' : '') + (q.logo ? ' pic-logo' : '') + ((q as any).fit === 'contain' ? ' pic-contain' : '');
    return <div className={cls + (mode === 'reveal' ? ' pic-pop' : '')}><PicImg key={imgKey} src={src} alt={revealed ? q.a : 'Mystery picture'} zoom={mode === 'zoom'} origin={q.origin} onReady={onReady} /></div>;
}

function PicImg({ src, alt, zoom, origin, onReady }: { src: string; alt: string; zoom: boolean; origin?: string; onReady?: (ok: boolean) => void }) {
    const [ld, setLd] = useState(false);
    const [err, setErr] = useState(false);
    if (err) return <div className="pic-error">📷<br />Photo did not load.<br /><small>Host: describe it or skip - your call!</small></div>;
    return <img src={src} alt={alt} className={ld ? 'ld' : ''} onLoad={() => { setLd(true); onReady && onReady(true); }} onError={() => { setErr(true); onReady && onReady(false); }} style={zoom ? ({ ['--origin' as string]: origin || '50% 50%' } as React.CSSProperties) : undefined} />;
}

const cleanNames = (arr: string[] | undefined, n: number): string[] => Array.from({ length: n }, (_, i) => (((arr || [])[i] || '').trim().slice(0, 14)) || 'Team ' + (i + 1));

export function App() {
    const [saved, setSaved, status] = useLocalState<Saved>('diwali-quiz.v1', INITIAL);
    const count = Math.min(MAX_TEAMS, Math.max(MIN_TEAMS, Math.round((saved.teamCount as number) || DEFAULT_TEAMS)));
    const rawNames: string[] = Array.from({ length: count }, (_, i) => (saved.names || [])[i] ?? '');
    const s: Saved = { ...INITIAL, ...saved, teamCount: count, names: rawNames, scores: Array.from({ length: count }, (_, i) => (saved.scores || [])[i] ?? 0) };
    const nm = (i: number) => (rawNames[i] || '').trim() || 'Team ' + (i + 1);
    const chooser = ((s.chooser % count) + count) % count;
    const colsStyle = { ['--cols' as string]: count, ['--cols3' as string]: Math.min(count, 3), ['--cols2' as string]: Math.min(count, 2) } as React.CSSProperties;
    const setTeamCount = (n: number) => {
        const c = Math.min(MAX_TEAMS, Math.max(MIN_TEAMS, n));
        update({ teamCount: c, names: Array.from({ length: c }, (_, i) => rawNames[i] ?? ''), scores: Array.from({ length: c }, (_, i) => s.scores[i] ?? 0), chooser: chooser % c });
    };
    const [view, setView] = useState<'home' | 'setup' | 'board' | 'round' | 'credits' | 'end' | 'patakhamenu' | 'patakha' | 'modi' | 'eyes' | 'handbook'>(() => window.location.pathname.replace(/\/+$/, '').endsWith('/h') ? 'handbook' : 'home');
    const [gateOk, setGateOk] = useState(false);
    const [gateCode, setGateCode] = useState('');
    const [gateErr, setGateErr] = useState(false);
    const [gateShow, setGateShow] = useState(false);
    const [ri, setRi] = useState(0);
    const [qi, setQi] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [left, setLeft] = useState<number | null>(null);
    const [picState, setPicState] = useState<'none' | 'loading' | 'ready' | 'error'>('none');
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
    const muteRef = useRef(s.mute);
    muteRef.current = s.mute;

    const update = useCallback((patch: Partial<Saved>) => { if (status.ready) setSaved({ ...s, ...patch }); }, [s, setSaved, status.ready]);
    useEffect(() => {
        if (!status.ready || migratedNames.current) return; migratedNames.current = true;
        // Legacy cleanup: only exact auto-defaults "Player N" at their own slot become "Team N";
        // any name the host typed (even "Player 7" moved to another slot) is left untouched.
        const old = saved.names || [];
        const migrated = old.map((n, i) => (n || '').trim() === 'Player ' + (i + 1) ? 'Team ' + (i + 1) : n);
        const changed = migrated.some((n, i) => n !== old[i]);
        if (changed || migrated.some(n => !(n || '').trim())) setSaved({ ...s, names: cleanNames(migrated, count) });
    }, [status.ready]);
    const round = rounds[ri];
    const q = round.qs[qi];
    const needsPic = !!(q.img && (q.mode || 'clear') !== 'reveal' && photos[q.img]);
    const isBonus = qi === 5;
    const picker = s.picks[round.id] ?? 0;
    const direct = isBonus ? 20 : 10;
    const steal = isBonus ? s.stealBonus : 5;

    const stopTimer = () => { if (timer.current) { window.clearInterval(timer.current); timer.current = null; } };
    useEffect(() => stopTimer, []);
    const startTimer = () => {
        stopTimer(); if (pendingT.current) { window.clearTimeout(pendingT.current); pendingT.current = null; } setLeft(q.time ?? 5);
        timer.current = window.setInterval(() => setLeft(v => { if (v === null) return null; if (v <= 1) { stopTimer(); if (!s.mute) playBuzz(); return 0; } return v - 1; }), 1000);
    };

    // Auto-start: 2s pause after the question is ready (photo settled), then the countdown begins by itself.
    useEffect(() => {
        if (view !== 'round' || q.paced || revealed || awarded !== null || awardLock.current) return;
        if (needsPic && picState !== 'ready' && picState !== 'error') return;
        const id = window.setTimeout(() => { if (!awardLock.current) startTimer(); }, 2000);
        return () => window.clearTimeout(id);
    }, [view, ri, qi, picState, revealed]);

    const onPicSettled = (ok: boolean) => setPicState(ok ? 'ready' : 'error');
    const openQ = (r: number, i: number) => {
        stopTimer(); setRi(r); setQi(i); setRevealed(false); setLeft(null);
        const label = (s.aq || {})[`${rounds[r].id}:${i}`] || null;
        awardLock.current = label !== null;
        setAwarded(label); setView('round');
        const qq = rounds[r].qs[i];
        setPicState(qq.img && (qq.mode || 'clear') !== 'reveal' && photos[qq.img] ? 'loading' : 'none');
    };
    const award = (p: number, d: number, label: string) => {
        if (awarded !== null || awardLock.current) return;
        awardLock.current = true;
        if (pendingT.current) { window.clearTimeout(pendingT.current); pendingT.current = null; }
        const scores = s.scores.slice(); scores[p] += d;
        const labelTxt = `${nm(p)} +${d}`;
        update({ scores, log: [...s.log, { p, d, label, t: Date.now() }].slice(-60), aq: { ...(s.aq || {}), [`${round.id}:${qi}`]: labelTxt } });
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
        update({ aq: { ...(s.aq || {}), [`${round.id}:${qi}`]: 'No points', [`${round.id}:${qi}:t`]: String(Date.now()) } });
        setAwarded('No points'); stopTimer();
    };
    const undo = () => {
        // Revert the most recent action: a 'No points' marker or the last score log entry, whichever is newer.
        const aq = { ...(s.aq || {}) };
        const markerT = parseInt(aq[`${round.id}:${qi}:t`] || '0', 10);
        const last = s.log[s.log.length - 1];
        if (awarded === 'No points' && markerT >= ((last as any)?.t || 0)) {
            delete aq[`${round.id}:${qi}`]; delete aq[`${round.id}:${qi}:t`];
            update({ aq }); setAwarded(null); awardLock.current = false; return;
        }
        if (!last) {
            if (awarded === 'No points') { delete aq[`${round.id}:${qi}`]; delete aq[`${round.id}:${qi}:t`]; update({ aq }); setAwarded(null); awardLock.current = false; }
            return;
        }
        const scores = s.scores.slice(); scores[last.p] -= last.d;
        delete aq[`${round.id}:${qi}`]; delete aq[`${round.id}:${qi}:t`];
        update({ scores, log: s.log.slice(0, -1), aq }); setAwarded(null); awardLock.current = false;
    };
    const nudge = (p: number, d: number) => { const scores = s.scores.slice(); scores[p] += d; update({ scores, log: [...s.log, { p, d, label: 'manual', t: Date.now() }].slice(-60) }); };
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
        const scores = s.scores.slice(); if (p >= 0 && p < scores.length) scores[p] -= PATAKHA_POINTS;
        delete aq[`patakha:${key}`]; delete aq[`patakha:${key}:p`];
        update({ scores, aq });
    };
    const tryGate = () => { if (gateCode.trim() === PARTY_CODE) { setGateOk(true); setGateErr(false); setGateCode(''); } else { setGateErr(true); setGateCode(''); } };
    const restart = () => { stopTimer(); if (pendingT.current) { window.clearTimeout(pendingT.current); pendingT.current = null; } setSaved({ ...INITIAL, teamCount: count, names: teamNames(count), scores: Array(count).fill(0) }); setConfirmReset(false); setBurst(0); setRevealed(false); setAwarded(null); setLeft(null); setRi(0); setQi(0); setView('home'); };
    const pickRound = (r: number) => {
        const id = rounds[r].id;
        const who = s.picks[id] ?? chooser;
        update({ picks: { ...s.picks, [id]: who }, chooser: s.picks[id] === undefined ? (chooser + 1) % count : chooser });
        const q0 = s.progress[id] && s.progress[id] < 6 ? s.progress[id] : 0; stopTimer(); setRi(r); setQi(q0); setView('round'); setRevealed(false); setLeft(null); const lb = (s.aq || {})[`${id}:${q0}`] || null; awardLock.current = lb !== null; setAwarded(lb); const qz = rounds[r].qs[q0]; setPicState(qz.img && (qz.mode || 'clear') !== 'reveal' && photos[qz.img] ? 'loading' : 'none');
    };

    useEffect(() => {
        if (view !== 'round') return;
        const onKey = (e: KeyboardEvent) => {
            const t = e.target as HTMLElement;
            if (t && (t.tagName === 'INPUT' || t.tagName === 'SELECT')) return;
            if (e.key === 't' || e.key === 'T') { if (!needsPic || picState === 'ready') startTimer(); }
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
            <input aria-label={'Name of team ' + (i + 1)} value={n} placeholder={'Team ' + (i + 1)} onChange={e => { const names = rawNames.slice(); names[i] = e.target.value.slice(0, 14); update({ names }); }} onBlur={() => update({ names: cleanNames(rawNames, count) })} />
            <strong>{s.scores[i]}</strong>
            <span className="nudge"><button aria-label={'Minus 5 for ' + n} onClick={() => nudge(i, -5)}>-5</button><button aria-label={'Plus 5 for ' + n} onClick={() => nudge(i, 5)}>+5</button></span>
        </div>)}
    </div>;

    return <div className={'quiz' + (s.calm ? ' is-calm' : '')} style={{ ...colsStyle, ['--hue' as string]: view === 'round' ? round.hue : 30 } as React.CSSProperties}>
        <Embers calm={s.calm} />
        <Sky burstK={burst} calm={s.calm} onPop={() => { if (!muteRef.current) playPop(); }} />
        <header className="bar">
            <button className="ghost" onClick={() => { stopTimer(); if (pendingT.current) { window.clearTimeout(pendingT.current); pendingT.current = null; } setView(view === 'home' ? 'home' : (view === 'board' || view === 'handbook') ? 'home' : 'board'); }}>{view === 'home' ? '🪔 Diwali Quiz' : (view === 'board' || view === 'handbook') ? '← Home' : '← Rounds'}</button>
            <span className="prog">{total}/60 asked</span>
            <span className="barR">{view !== 'home' && <button className="ghost" onClick={() => setConfirmReset(true)}>↻ Restart quiz</button>}<button className="ghost" onClick={() => update({ mute: !s.mute })} aria-pressed={s.mute}>{s.mute ? '🔇 Sound off' : '🔊 Sound on'}</button><button className="ghost" onClick={() => update({ calm: !s.calm })} aria-pressed={s.calm}>{s.calm ? 'Calm mode: on' : 'Calm mode: off'}</button></span>
        </header>

        {view === 'home' && <main className="home">
            <div className="diya" aria-hidden="true"><RoundIcon id="diwali" size={130} /></div>
            <p className="kicker">Shubh Deepavali</p>
            <h1 className="wobble deva title-line">दिमाग की आतिशबाज़ी <span className="title-en">- Diwali Quiz Night</span></h1>
            <p className="sub">10 rounds. 60 questions. Your teams, your battle. 1 host with the final word.</p>
            <button className="cta" onClick={() => setView('setup')}>Let's play!</button>
            {(total > 0 || s.scores.some(x => x !== 0)) && <button className="ghost small" onClick={() => setView('board')}>Continue where we left off</button>}
            <button className="ghost small" onClick={() => setView('credits')}>Photo credits</button>
            {(total > 0 || s.scores.some(x => x !== 0)) && <button className="ghost small danger" onClick={() => setConfirmReset(true)}>↻ Start over (clear scores)</button>}
            <p className="hint">Host keys: <kbd>T</kbd> timer · <kbd>R</kbd> or <kbd>Space</kbd> reveal · <kbd>←</kbd> <kbd>→</kbd> previous / next</p>
        </main>}

        {!gateOk && (view === 'board' || view === 'round' || view === 'patakhamenu' || view === 'patakha' || view === 'modi' || view === 'eyes' || view === 'handbook' || view === 'end') && <main className="home gate">
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
            <h2 className="wobble2">How many teams?</h2>
            <div className="teamcount" role="group" aria-label="Number of teams">
                {[2, 3, 4, 5, 6, 7, 8].map(n => <button key={n} type="button" className={'tc-num' + (n === count ? ' on' : '')} aria-pressed={n === count} onClick={() => setTeamCount(n)}>{n}</button>)}
            </div>
            <h1 className="wobble">Rules of the Evening</h1>
            <div className="rulecards">
                <div className="rc"><b>1</b><span>Teams take turns <em>picking rounds</em>, without peeking inside.</span></div>
                <div className="rc"><b>2</b><span>You get <em>5 seconds</em> to answer. The clock starts by itself - a few list and performance questions get a longer one.</span></div>
                <div className="rc"><b>3</b><span>Right answer <em>+10</em>. Wrong or silent? Up for grabs. Steal <em>+5</em>.</span></div>
                <div className="rc"><b>4</b><span>Last question of every round is the <em>20 point BONUS</em>. Bonus steals earn <em>+10</em> unless the host declares otherwise.</span></div>
                <div className="rc"><b>5</b><span>The winner owes Yash <em>round-trip flights to the Philippines</em>. ✈️</span></div>
                <div className="rc"><b>6</b><span><em>Yash ka faisla antim hai.</em> Appeals may be submitted with a dabba of Mysore Pak.</span></div>
                <div className="rc"><b>7</b><span><em>No phones, please.</em> Caught finding your brain in ChatGPT? <em>-20 points</em>. 📵</span></div>
            </div>
            <h2 className="wobble2">Name your teams - pick fun nicknames</h2>
            <div className="names">
                {rawNames.map((n, i) => <input key={i} aria-label={'Nickname for team ' + (i + 1)} value={n} placeholder={'Team ' + (i + 1)} onChange={e => { const names = rawNames.slice(); names[i] = e.target.value.slice(0, 14); update({ names }); }} onBlur={() => update({ names: cleanNames(rawNames, count) })} />)}
            </div>
            <button className="cta" onClick={() => { update({ names: cleanNames(rawNames, count) }); setView('board'); }}>Start the quiz</button>
            <button className="ghost small" onClick={() => setView('home')}>← Back</button>
        </main>}

        {gateOk && view === 'board' && <main className="board">
            <h1>Pick a round</h1>
            <p className="sub">Now choosing: <b>{nm(chooser)}</b>. Contents stay secret until you open it.</p>
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
            <div className={'qbody' + ((q.img && (q.mode !== 'reveal' || revealed)) || (revealed && q.video) ? ' has-pic' : '') + (revealed ? ' is-rev' : '')}>
                <div className="qtext">
                    <p className="prompt">{q.p}</p>
                    {revealed && <div className="answer"><span>Answer</span><strong>{q.a}</strong>{q.lakes && <ul className="lakes">{q.lakes.map(l => <li key={l}>{l}</li>)}</ul>}{q.note && <em>{q.note}</em>}</div>}
                </div>
                {revealed && q.video ? <div className="qvideo-wrap"><iframe loading="lazy" className="qvideo insta" src={q.video.insta} title="Answer video clip" allow="encrypted-media; picture-in-picture" allowFullScreen /><div className="qvideo-btns"><a className="ghost small" href={q.video.link} target="_blank" rel="noreferrer">Open clip in new tab ↗</a></div></div> : <Pic q={q} revealed={revealed} onReady={onPicSettled} />}
            </div>
            <div className="controls">
                <button className="btn" onClick={prev} disabled={qi === 0}>← Previous</button>
                {q.paced ? <div className="clock paced">Take your time</div> : <div className={'clock' + (left === 0 ? ' is-up' : '')} aria-live="polite">{left === null ? String(q.time ?? 5) : left === 0 ? 'Steal!' : left}</div>}
                {!q.paced && (!needsPic || picState === 'ready') && <button className="btn" onClick={startTimer}>Start {q.time ?? 5}s</button>}
                {!q.paced && needsPic && picState === 'loading' && <button className="btn" disabled title="Waiting for the clue photo">Loading photo…</button>}
                {!q.paced && needsPic && picState === 'error' && <button className="btn" onClick={startTimer}>Start {q.time ?? 5}s anyway (photo failed)</button>}
                <button className="btn primary" onClick={() => { setRevealed(v => !v); stopTimer(); }}>{revealed ? 'Hide answer' : 'Reveal answer'}</button>
                <button className="btn" onClick={next}>{qi < 5 ? 'Next question →' : 'Finish round →'}</button>
            </div>
            <div className="award">
                <button className="btn good" disabled={awarded !== null} onClick={() => award(picker, direct, 'direct')}>✓ {nm(picker)} correct +{direct}</button>
                {rawNames.map((_, i) => i === picker ? null : <button key={i} className="btn steal" disabled={awarded !== null} onClick={() => award(i, steal, 'steal')}>Steal: {nm(i)} +{steal}</button>)}
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
            <p className="sub winner">{leaderMax > 0 ? (() => { const w = rawNames.map((_, i) => i).filter(i => s.scores[i] === leaderMax).map(nm); return `${w.join(' & ')} won, and ${w.length > 1 ? 'owe' : 'owes'} Yash round-trip flights to the Philippines!`; })() : 'No scores yet.'}</p>
            <p className="sub">The host's ruling applies to all tie-breaks. Appeals may be submitted with a dabba of Mysore Pak.</p>
            {Scoreboard}
            <button className="cta" onClick={() => setView('board')}>Back to rounds</button>
        </main>}

        

        {gateOk && view === 'patakhamenu' && <main className="board">
            <h1>Patakha Rounds 🧨</h1>
            <p className="sub">Open-floor crackers. No timer, no turns - shout first, win {PATAKHA_POINTS} points.</p>
            <div className="tiles pk-menu">
                <button className="tile" onClick={() => setView('modi')}>
                    <span className="em"><img className="godiji-avatar" src={photos.godiji_avatar} alt="Godiji" /></span>
                    <span className="nm">Godiji</span>
                    <span className="tg">Complete the 8 PM announcement</span>
                    <span className="st">{(s.aq || {})['patakha:modi'] ? '✓ ' + (s.aq || {})['patakha:modi'] : 'Open'}</span>
                </button>
                <button className="tile" onClick={() => setView('eyes')}>
                    <span className="em"><EyesIcon size={76} /></span>
                    <span className="nm">Aankhon Ki Gustakhiyan</span>
                    <span className="tg">Two world-famous personalities. Eyes only.</span>
                    <span className="st">{(s.aq || {})['patakha:eyes'] ? '✓ ' + (s.aq || {})['patakha:eyes'] : 'Open'}</span>
                </button>
                <button className="tile" onClick={() => setView('patakha')}>
                    <span className="em">💪</span>
                    <span className="nm">Grid Gains</span>
                    <span className="tg">36 cells. Two nipples. Call it.</span>
                    <span className="st">{(s.aq || {})['patakha:grid'] ? '✓ ' + (s.aq || {})['patakha:grid'] : 'Open'}</span>
                </button>
            </div>
            <button className="ghost small" onClick={() => setView('board')}>← Back to rounds</button>
        </main>}
        {gateOk && view === 'patakha' && <main className="patakha">
            <GridGains photo={photos.patakha_grid} names={rawNames.map((_, i) => nm(i))} awarded={(s.aq || {})['patakha:grid'] || null} onAward={p => awardPatakha('grid', p)} onNobody={() => nobodyPatakha('grid')} onUndo={() => undoPatakha('grid')} />
            {Scoreboard}
            <button className="ghost small" onClick={() => setView('patakhamenu')}>← Patakha Rounds</button>
        </main>}
        {gateOk && view === 'eyes' && <main className="patakha">
            <EyesReveal eyes={[photos.eyes_yash, photos.eyes_rathish]} full={[photos.yash_full, photos.rathish_full]} names={rawNames.map((_, i) => nm(i))} awarded={(s.aq || {})['patakha:eyes'] || null} onAward={p => awardPatakha('eyes', p)} onNobody={() => nobodyPatakha('eyes')} onUndo={() => undoPatakha('eyes')} />
            {Scoreboard}
            <button className="ghost small" onClick={() => setView('patakhamenu')}>← Patakha Rounds</button>
        </main>}
        {gateOk && view === 'modi' && <main className="patakha">
            <Godiji photo={photos.modi} names={rawNames.map((_, i) => nm(i))} awarded={(s.aq || {})['patakha:modi'] || null} onAward={p => awardPatakha('modi', p)} onNobody={() => nobodyPatakha('modi')} onUndo={() => undoPatakha('modi')} />
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
        {confirmReset && <div className="modal" role="dialog" aria-modal="true"><div className="box"><h2>Restart the whole quiz?</h2><p>This clears all scores, round picks and progress, and resets team names to Team 1-{count}.</p><div className="row"><button className="btn danger" onClick={restart}>Yes, start over</button><button className="btn" onClick={() => setConfirmReset(false)}>Keep playing</button></div></div></div>}
        {!status.ready && <p className="saving">Loading saved scores…</p>}
    </div>;
}
