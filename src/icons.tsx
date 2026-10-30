import React from 'react';

const stroke = { strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export function RoundIcon({ id, size = 84 }: { id: string; size?: number }) {
    const p = { width: size, height: size, viewBox: '0 0 100 100', className: 'ico ico-' + id, 'aria-hidden': true } as const;
    switch (id) {
        case 'jodi': return <svg {...p}>
            <circle cx="38" cy="52" r="22" fill="none" stroke="#ffd27a" strokeWidth="7" />
            <circle cx="62" cy="52" r="22" fill="none" stroke="#ff7aa8" strokeWidth="7" />
            <path className="heart" d="M50 30c-4-9-17-5-14 5 2 6 14 13 14 13s12-7 14-13c3-10-10-14-14-5z" fill="#ff3d6e" stroke="#fff" strokeWidth="2" {...stroke} />
        </svg>;
        case 'bharat': return <svg {...p}>
            <circle cx="50" cy="38" r="26" fill="#ffb347" opacity=".35" className="glow" />
            <path d="M12 86V50h10V34l6-8 6 8v16h8V30l6-12 6 12v20h8V34l6-8 6 8v16h10v36z" fill="#ffd27a" stroke="#7a3b00" strokeWidth="2.5" {...stroke} />
            <path d="M40 86V66c0-7 20-7 20 0v20z" fill="#7a3b00" />
            <path d="M44 18l6-12 6 12" fill="none" stroke="#fff" strokeWidth="2" {...stroke} />
        </svg>;
        case 'khel': return <svg {...p}>
            <g className="swing"><rect x="44" y="6" width="12" height="58" rx="6" transform="rotate(25 50 50)" fill="#e8b27a" stroke="#6b3a10" strokeWidth="2.5" />
            <rect x="48" y="58" width="5" height="26" rx="2.5" transform="rotate(25 50 50)" fill="#6b3a10" /></g>
            <circle className="ball" cx="26" cy="74" r="12" fill="#d62828" stroke="#fff" strokeWidth="2" />
            <path d="M18 70c6 2 10 6 12 12" stroke="#fff" strokeWidth="2" fill="none" {...stroke} />
        </svg>;
        case 'chatpata': return <svg {...p}>
            <ellipse cx="50" cy="78" rx="38" ry="10" fill="#c46a1a" />
            <circle className="puri p1" cx="32" cy="58" r="15" fill="#f2b45a" stroke="#8a4a12" strokeWidth="2.5" />
            <circle className="puri p2" cx="62" cy="52" r="17" fill="#f6c36d" stroke="#8a4a12" strokeWidth="2.5" />
            <circle cx="62" cy="48" r="5" fill="#6b3a10" /><circle cx="32" cy="55" r="4" fill="#6b3a10" />
            <path className="steam" d="M44 30c-5-6 5-10 0-18M60 30c-5-6 5-10 0-18" fill="none" stroke="#fff" strokeWidth="3" opacity=".6" {...stroke} />
        </svg>;
        case 'filmy': return <svg {...p}>
            <g className="clap"><rect x="12" y="22" width="78" height="16" rx="3" fill="#222" stroke="#fff" strokeWidth="2.5" transform="rotate(-8 12 38)" />
            <path d="M24 38l12-16M42 38l12-16M60 38l12-16M78 38l12-16" stroke="#fff" strokeWidth="5" transform="rotate(-8 12 38)" /></g>
            <rect x="12" y="40" width="78" height="46" rx="4" fill="#222" stroke="#fff" strokeWidth="2.5" />
            <path d="M50 52l3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" fill="#ffd27a" className="star" />
        </svg>;
        case 'namma': return <svg {...p}>
            <circle cx="72" cy="22" r="10" fill="#ffe28a" className="glow" />
            <path d="M10 66h80v22H10z" fill="#2a8ac0" />
            <path className="wave" d="M10 70q10-6 20 0t20 0t20 0t20 0" fill="none" stroke="#bfe9ff" strokeWidth="3" {...stroke} />
            <path className="wave w2" d="M10 80q10-6 20 0t20 0t20 0t20 0" fill="none" stroke="#bfe9ff" strokeWidth="3" opacity=".7" {...stroke} />
            <rect x="30" y="38" width="7" height="30" fill="#7a4a1a" /><circle cx="34" cy="32" r="18" fill="#2fb34f" stroke="#145c28" strokeWidth="2.5" />
            <rect x="60" y="48" width="6" height="20" fill="#7a4a1a" /><circle cx="63" cy="44" r="12" fill="#45c964" stroke="#145c28" strokeWidth="2.5" />
        </svg>;
        case 'diwali': return <svg {...p}>
            <path className="flame" d="M50 6c10 12 14 20 6 30-3 4-9 4-12 0-8-10-4-18 6-30z" fill="#ffcf4a" stroke="#ff7a1a" strokeWidth="3" {...stroke} />
            <path d="M12 54h76c0 22-16 34-38 34S12 76 12 54z" fill="#d9531e" stroke="#7a2a08" strokeWidth="3" {...stroke} />
            <path d="M24 62h52" stroke="#ffcf4a" strokeWidth="3" strokeDasharray="2 8" {...stroke} />
        </svg>;
        case 'madein': return <svg {...p}>
            <rect x="12" y="8" width="5" height="86" rx="2.5" fill="#d6c3a3" />
            <g className="flag">
                <path d="M17 12q18-8 34 0t32 0v14q-16 8-32 0t-34 0z" fill="#ff9933" />
                <path d="M17 26q18-8 34 0t32 0v14q-16 8-32 0t-34 0z" fill="#ffffff" />
                <path d="M17 40q18-8 34 0t32 0v14q-16 8-32 0t-34 0z" fill="#138808" />
                <circle cx="50" cy="33" r="5" fill="none" stroke="#1a3cae" strokeWidth="1.8" />
            </g>
        </svg>;
        case 'tv': return <svg {...p}>
            <path d="M30 26l-14-16M70 26l14-16" stroke="#ffd27a" strokeWidth="5" fill="none" {...stroke} />
            <rect x="10" y="26" width="80" height="56" rx="10" fill="#222" stroke="#ffd27a" strokeWidth="4" />
            <rect x="18" y="34" width="50" height="40" rx="5" fill="#3a2a5e" stroke="#ff7aa8" strokeWidth="3" />
            <path className="glow" d="M24 44l10 10-10 10" fill="none" stroke="#ffcf4a" strokeWidth="4" {...stroke} />
            <path d="M76 38v32" stroke="#ffd27a" strokeWidth="4" {...stroke} />
            <circle cx="81" cy="42" r="3.5" fill="#ff3d6e" /><circle cx="81" cy="54" r="3.5" fill="#ffb347" />
        </svg>;
        case 'bol': return <svg {...p}>
            <rect x="38" y="10" width="24" height="44" rx="12" fill="#ffd27a" stroke="#7a3b00" strokeWidth="3" />
            <path d="M26 42c0 16 10 26 24 26s24-10 24-26" fill="none" stroke="#ff7aa8" strokeWidth="5" {...stroke} />
            <path d="M50 68v16M36 88h28" stroke="#ff7aa8" strokeWidth="5" {...stroke} />
            <path className="steam" d="M20 20c4-4 8-4 12 0M68 12c4-4 8-4 12 0" fill="none" stroke="#ffcf4a" strokeWidth="4" opacity=".8" {...stroke} />
        </svg>;
        default: return <svg {...p}><circle cx="50" cy="50" r="30" fill="#ffb347" /></svg>;
    }
}
