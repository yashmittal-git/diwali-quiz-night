// Local replacement for the hosted platform's useLocalState: localStorage-backed state.
// Matches the hosted shape: [value, set, status] where status.ready gates updates.
import { useCallback, useEffect, useState } from 'react';

export interface LocalStatus { ready: boolean }

export function useLocalState<S>(key: string, initial: S): [S, (v: S) => void, LocalStatus] {
    const [value, setValue] = useState<S>(() => {
        try { const raw = window.localStorage.getItem(key); return raw ? (JSON.parse(raw) as S) : initial; } catch { return initial; }
    });
    const set = useCallback((v: S) => {
        setValue(v);
        try { window.localStorage.setItem(key, JSON.stringify(v)); } catch { /* storage full/blocked */ }
    }, [key]);
    useEffect(() => { try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ } }, [key, value]);
    return [value, set, { ready: true }];
}
