let ctx: AudioContext | null = null;
function ac(): AudioContext | null {
    try {
        const C = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
        if (!ctx) ctx = new C();
        if (ctx.state === 'suspended') void ctx.resume();
        return ctx;
    } catch (e) { return null; }
}
function noise(c: AudioContext, t: number, dur: number, vol: number, freq: number) {
    const n = Math.floor(c.sampleRate * dur), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
    const s = c.createBufferSource(); s.buffer = b;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = 0.8;
    const g = c.createGain(); g.gain.value = vol;
    s.connect(f); f.connect(g); g.connect(c.destination); s.start(t);
}
function tone(c: AudioContext, t: number, f0: number, f1: number, dur: number, vol: number, type: OscillatorType) {
    const o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + 0.02);
}
export function playCheer() {
    const c = ac(); if (!c) return; const t = c.currentTime;
    for (let i = 0; i < 14; i++) noise(c, t + i * 0.07 + Math.random() * 0.03, 0.12, 0.35, 1800 + Math.random() * 2500); // claps
    for (let i = 0; i < 5; i++) noise(c, t + 0.15 + i * 0.16, 0.08, 0.8, 900); // crackers
    [523, 659, 784, 1047].forEach((f, i) => tone(c, t + i * 0.09, f, f * 1.01, 0.3, 0.12, 'triangle'));
}
export function playOops() {
    const c = ac(); if (!c) return; const t = c.currentTime;
    tone(c, t, 392, 370, 0.28, 0.2, 'sawtooth'); tone(c, t + 0.3, 349, 330, 0.28, 0.2, 'sawtooth'); tone(c, t + 0.6, 311, 220, 0.6, 0.22, 'sawtooth');
}
export function playBuzz() {
    const c = ac(); if (!c) return; const t = c.currentTime;
    tone(c, t, 988, 988, 0.11, 0.16, 'square'); tone(c, t + 0.16, 988, 988, 0.11, 0.16, 'square'); tone(c, t + 0.32, 659, 622, 0.3, 0.18, 'square');
}

function whoosh(c: AudioContext, t: number, dur: number, vol: number, f0: number, f1: number) {
    const n = Math.floor(c.sampleRate * dur), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 1.5);
    const s = c.createBufferSource(); s.buffer = b;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.1;
    f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = c.createGain(); g.gain.value = vol;
    s.connect(f); f.connect(g); g.connect(c.destination); s.start(t);
}
export function playPop() {
    const c = ac(); if (!c) return; const t = c.currentTime;
    whoosh(c, t, 0.3, 0.03, 320, 2400);           // rocket rise
    noise(c, t + 0.26, 0.22, 0.045, 640);         // burst crackle
    tone(c, t + 0.26, 140, 55, 0.2, 0.028, 'sine'); // soft thump
}
