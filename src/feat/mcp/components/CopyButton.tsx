'use client';

import {useEffect, useState} from 'react';
import {cn} from './shared';

/**
 * Copies a fixed piece of text: the server address, or one client's setup. The clipboard API needs a
 * secure context, so a hidden textarea and `execCommand` stand in when it is missing or refuses, which
 * is also what an older browser gets. The label says what happened for two seconds, then resets.
 */
export function CopyButton({text, label}: {text: string; label: string}) {
    const [state, setState] = useState<'idle' | 'done' | 'failed'>('idle');

    useEffect(() => {
        if (state === 'idle') return;
        const timer = setTimeout(() => setState('idle'), 2000);
        return () => clearTimeout(timer);
    }, [state]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setState('done');
        } catch {
            setState(legacyCopy(text) ? 'done' : 'failed');
        }
    };

    return (
        <button type="button" className={cn('copy-btn', state === 'done' && 'is-done')} aria-label={label} onClick={copy}>
            {state === 'done' ? 'Copied' : state === 'failed' ? 'Press Ctrl C' : 'Copy'}
        </button>
    );
}

function legacyCopy(text: string) {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try {
        ok = document.execCommand('copy');
    } catch {
        ok = false;
    }
    document.body.removeChild(area);
    return ok;
}
