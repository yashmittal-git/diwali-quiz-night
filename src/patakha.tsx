import React, { useState } from 'react';

/* ---- Patakha: Grid Gains - real photo, host-marked chest strip is covered (36 opaque square cells, A1-L3, 12 cols x 3 rows); the rest of the photo stays visible ---- */
const GCOLS = ['A','B','C','D','E','F','G','H','I','J','K','L'];
const GROWS = [1,2,3];
/* covered band on the 2203x1542 photo: x 905.7-1692.3, y 412.2-608.9, cell 65.56px - re-anchored (user feedback 30 Oct) so each real nipple sits at the CENTER of its cell: nipples measured at (1004,510) and (1594,511), exactly 9 cells apart, no rotation needed (dy=1px) */
const COVERED = new Set(GCOLS.flatMap(c => GROWS.map(r => c + r)));
export const PATAKHA_POINTS = 20;
/* nipple centers (1004,510) and (1594,511) land at the centers of B2 and K2 (user-confirmed right target moves J2 -> K2) */
const NIPPLES = ['B2', 'K2'];

export function GridGains({ photo, onAward, onNobody, onUndo, awarded, names }: { photo: string; onAward: (p: number) => void; onNobody: () => void; onUndo: () => void; awarded: string | null; names: string[] }) {
    const [picked, setPicked] = useState<string[]>([]);
    const found = NIPPLES.filter(n => picked.includes(n)).length;
    const pick = (cell: string) => { if (!picked.includes(cell)) setPicked([...picked, cell]); };
    return <div className="pk-stage">
        <h2>Grid Gains 💪</h2>
        <p className="pk-line">Open floor - shout a cell, host taps it. Only the chest strip is covered: 36 square cells, A1 to L3. Two of them are hiding nipples. First correct call wins {PATAKHA_POINTS} points. Real photo. Zero shame.</p>
        <div className="pk-photo-wrap grid70">
            <img src={photo} className="pk-photo" alt="Shirtless bodybuilder torso hidden under a labelled grid" />
            <div className="pk-grid band36">
                {GROWS.map(r => GCOLS.map((c, ci) => {
                    const cell = c + r;
                    if (!COVERED.has(cell)) return <div key={cell} className="pk-cell free" aria-hidden="true" />;
                    const isOpen = picked.includes(cell);
                    const isNip = NIPPLES.includes(cell);
                    const alt = (ci + r) % 2 === 0;
                    return <button key={cell} aria-label={isOpen ? cell + (isNip ? ' - nipple found' : ' - empty') : 'Cell ' + cell}
                        className={'pk-cell' + (alt ? ' alt' : '') + (isOpen ? ' open ' + (isNip ? 'hit-yes' : 'hit-no') : '')}
                        onClick={() => pick(cell)}>
                        {isOpen ? <span className="mark">{isNip ? '🎯' : '✖'}</span> : cell}
                    </button>;
                }))}
            </div>
        </div>
        {found > 0 && <p className="pk-line">{found === 1 ? '🎯 Nipple located! One more hiding in there…' : '🎯🎯 Both nipples located. The chest is fully mapped.'}</p>}
        {found > 0 && !awarded && <WhoGuessed onAward={onAward} onNobody={onNobody} names={names} />}
        {awarded && <p className="pk-line">{awarded === 'No points' ? '❌ Nobody got it - no points.' : '✓ ' + awarded}</p>}
        {awarded && <button className="ghost small" onClick={onUndo}>Undo Patakha result</button>}
    </div>;
}

function WhoGuessed({ onAward, onNobody, names }: { onAward: (p: number) => void; onNobody: () => void; names: string[] }) {
    return <div className="pk-who">
        <p className="pk-line"><b>Who guessed it right?</b> (+{PATAKHA_POINTS} points)</p>
        <div className="award">
            {names.map((n, p) => <button key={p} className="btn ok" onClick={() => onAward(p)}>{n}</button>)}
            <button className="btn wrongbtn" onClick={onNobody}>✗ Nobody got it</button>
        </div>
    </div>;
}

export function EyesIcon({ size = 30 }: { size?: number }) {
    return <svg width={size} height={Math.round(size * 0.6)} viewBox="0 0 48 29" fill="none" aria-hidden="true" style={{ verticalAlign: '-0.08em' }}>
        <g stroke="#ffd27a" strokeWidth="2.4">
            <path d="M2 14.5C5 8.5 9.5 5 13 5s8 3.5 11 9.5C21.5 8.5 26 5 35 5s8 3.5 11 9.5C43 21 38 24.5 35 24.5S26.5 21 24 14.5C21.5 21 16.5 24.5 13 24.5S5 21 2 14.5Z" />
        </g>
        <circle cx="13" cy="14.5" r="3.4" fill="#ffd27a" />
        <circle cx="35" cy="14.5" r="3.4" fill="#ffd27a" />
    </svg>;
}

/* ---- Patakha: Aankhon Ki Gustakhiyan - name the two personalities from their eyes only.
   Eyes-only crops as clues; full photos on reveal. Host-approved crops (Yash signed off 30 Oct). ---- */
export function EyesReveal({ names, awarded, onAward, onNobody, onUndo, eyes, full }: { names: string[]; awarded: string | null; onAward: (p: number) => void; onNobody: () => void; onUndo: () => void; eyes?: [string, string]; full?: [string, string] }) {
    const [revealed, setRevealed] = useState(false);
    const EyeFrame = ({ src, label }: { src?: string; label: string }) => <div className="pk-eye">
        {src ? <img className="pk-eye-img" src={src} alt={label} /> : <div className="pk-eye-ph" aria-label={label + ' - photo coming soon'}><span className="pk-eye-emoji">👁️</span><span>Photo coming soon</span></div>}
        <span className="pk-eye-tag">{label}</span>
    </div>;
    return <div className="pk-stage">
        <h2>Aankhon Ki Gustakhiyan <EyesIcon size={34} /></h2>
        <p className="pk-line">Open floor, no timer - two world-famous personalities, but you only get their eyes. Name BOTH. First correct pair wins {PATAKHA_POINTS} points.</p>
        <div className="pk-eyes">
            <EyeFrame src={eyes && eyes[0]} label="Personality 1" />
            <EyeFrame src={eyes && eyes[1]} label="Personality 2" />
        </div>
        {!revealed && <button className="cta" onClick={() => setRevealed(true)}>Reveal the faces</button>}
        {revealed && <>
            <p className="pk-answer">Yash & Rathish - your hosts, obviously. 😎</p>
            <div className="pk-eyes">
                <EyeFrame src={full && full[0]} label="Yash" />
                <EyeFrame src={full && full[1]} label="Rathish" />
            </div>
            {!awarded && <WhoGuessed onAward={onAward} onNobody={onNobody} names={names} />}
            {awarded && <p className="pk-line">{awarded === 'No points' ? '❌ Nobody got it - no points.' : '✓ ' + awarded}</p>}
        </>}
        {awarded && <button className="ghost small" onClick={onUndo}>Undo Patakha result</button>}
    </div>;
}

/* ---- Patakha: Godiji - complete the 8 PM announcement (actual Hindi words) ---- */
export function Godiji({ photo, onAward, onNobody, onUndo, awarded, names }: { photo: string; onAward: (p: number) => void; onNobody: () => void; onUndo: () => void; awarded: string | null; names: string[] }) {
    const [revealed, setRevealed] = useState(false);
    return <div className="pk-stage">
        <h2>Godiji 🎤</h2>
        <p className="pk-line">One evening at 8 PM, TVs across India suddenly flicked on - this personality had a surprise address for the nation. Open floor, no timer: complete the announcement. First faithful completion wins {PATAKHA_POINTS} points.</p>
        <div className="pk-photo-wrap modi"><img src={photo} className="pk-photo" alt="Godiji addressing the nation" /></div>
        <p className="pk-quote deva">"मेरे प्यारे देशवासियों, आज आप सभी से कुछ विशेष निवेदन करना चाहता हूँ। इस वार्ता में कुछ गंभीर विषय, कुछ महत्वपूर्ण निर्णय आप से साझा करूंगा…"</p>
        {!revealed && <button className="cta" onClick={() => setRevealed(true)}>Reveal the line</button>}
        {revealed && <>
            <p className="pk-answer deva">"आज मध्य रात्रि यानि 8 नवम्बर 2016 की रात्रि 12 बजे से वर्तमान में जारी 500 रुपये और 1,000 रुपये के करेंसी नोट लीगल टेंडर नहीं रहेंगे, यानि ये मुद्राएँ कानूनन अमान्य होंगी।"</p>
            <p className="pk-note">His actual words, from the full Hindi transcript of the address. For the host, the official English (PIB): "…the five hundred rupee and thousand rupee currency notes presently in use will no longer be legal tender from midnight tonight, that is 8th November 2016." Accept any faithful rendering, Hindi or English - host's call. If someone shouts the other famous line: that one is from a dubbed parody video, definitely not his real voice. 😅</p>
            {!awarded && <WhoGuessed onAward={onAward} onNobody={onNobody} names={names} />}
            {awarded && <p className="pk-line">{awarded === 'No points' ? '❌ Nobody got it - no points.' : '✓ ' + awarded}</p>}
        </>}
        {awarded && <button className="ghost small" onClick={onUndo}>Undo Patakha result</button>}
    </div>;
}
