import React, { useEffect, useRef } from 'react';

type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; hue: number; size: number; g: number; twinkle: boolean; kind: 'rocket' | 'spark' | 'trail' | 'drop'; amb?: boolean };

export function Sky({ burstK, calm, onPop }: { burstK: number; calm: boolean; onPop?: () => void }) {
    const ref = useRef<HTMLCanvasElement>(null);
    const parts = useRef<P[]>([]);
    const calmRef = useRef(calm);
    calmRef.current = calm;
    const popRef = useRef(onPop);
    popRef.current = onPop;
    const launch = useRef<(n: number, big: boolean) => void>(() => undefined);

    useEffect(() => {
        const cv = ref.current!;
        const ctx = cv.getContext('2d')!;
        let w = 0, h = 0, raf = 0, last = performance.now(), nextAmbient = 800;
        const resize = () => { const d = Math.min(window.devicePixelRatio || 1, 2); w = window.innerWidth; h = window.innerHeight; cv.width = w * d; cv.height = h * d; cv.style.width = w + 'px'; cv.style.height = h + 'px'; ctx.setTransform(d, 0, 0, d, 0, 0); };
        resize(); window.addEventListener('resize', resize);

        const rocket = (xFrac: number, big: boolean, amb?: boolean) => {
            const hue = [20, 45, 340, 280, 190, 130][Math.floor(Math.random() * 6)];
            const x = w * xFrac, top = h * (big ? 0.2 + Math.random() * 0.25 : 0.12 + Math.random() * 0.3);
            const vy = -(h - top) / 1.05;
            parts.current.push({ x, y: h + 10, vx: (Math.random() - 0.5) * 40, vy, life: 0, max: 1.05, hue, size: 3, g: 0, twinkle: false, kind: 'rocket', amb });
        };
        launch.current = (n, big) => {
            for (let i = 0; i < n; i++) window.setTimeout(() => rocket(0.15 + Math.random() * 0.7, big), i * 220);
            // glitter droplets rising from the bottom
            const drops = calmRef.current ? 20 : 70;
            for (let i = 0; i < drops; i++) parts.current.push({ x: Math.random() * w, y: h + 6, vx: (Math.random() - 0.5) * 50, vy: -(260 + Math.random() * 520), life: 0, max: 1.2 + Math.random() * 1.2, hue: 38 + Math.random() * 20, size: 1.5 + Math.random() * 2.5, g: 300, twinkle: true, kind: 'drop' });
        };
        const explode = (p: P) => {
            const n = calmRef.current ? 36 : 90;
            const style = Math.floor(Math.random() * 3);
            for (let i = 0; i < n; i++) {
                const a = (i / n) * Math.PI * 2 + Math.random() * 0.1;
                const sp = (style === 1 ? 160 : 90 + Math.random() * 190) * (style === 2 && i % 2 ? 0.55 : 1);
                parts.current.push({ x: p.x, y: p.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0, max: 1.3 + Math.random() * 1.0, hue: p.hue + (Math.random() - 0.5) * 30, size: 2 + Math.random() * 2, g: 110, twinkle: true, kind: 'spark' });
            }
            if (p.amb && popRef.current) popRef.current();
        };
        const tick = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.05); last = now;
            if (!document.hidden) {
                nextAmbient -= dt * 1000;
                if (nextAmbient <= 0) { rocket(0.08 + Math.random() * 0.84, false, true); nextAmbient = (calmRef.current ? 6500 : 2600) + Math.random() * 2200; }
                ctx.clearRect(0, 0, w, h);
                ctx.globalCompositeOperation = 'lighter';
                const next: P[] = [];
                for (const p of parts.current) {
                    p.life += dt;
                    if (p.life >= p.max) { if (p.kind === 'rocket') explode(p); continue; }
                    p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt;
                    if (p.kind === 'rocket') {
                        p.vy *= 0.985;
                        if (Math.random() < 0.9) next.push({ x: p.x, y: p.y, vx: (Math.random() - 0.5) * 20, vy: 30, life: 0, max: 0.5, hue: 38, size: 2, g: 0, twinkle: true, kind: 'trail' });
                    }
                    const k = 1 - p.life / p.max;
                    const a = p.twinkle ? k * (0.55 + 0.45 * Math.random()) : 1;
                    ctx.fillStyle = `hsla(${p.hue},100%,${p.kind === 'drop' ? 70 : 62}%,${Math.max(0, a)})`;
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.size * (p.kind === 'rocket' ? 1 : 0.6 + k * 0.6), 0, 6.283); ctx.fill();
                    next.push(p);
                }
                parts.current = next.slice(-900);
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
    }, []);

    useEffect(() => { if (burstK) launch.current(calmRef.current ? 1 : 3, true); }, [burstK]);
    return <canvas ref={ref} className="sky" aria-hidden="true" />;
}
