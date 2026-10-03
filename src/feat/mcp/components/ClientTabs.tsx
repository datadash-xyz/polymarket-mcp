'use client';

import {useRef, useState, type KeyboardEvent} from 'react';
import {clients} from '../content';
import {CopyButton} from './CopyButton';
import {cn} from './shared';

/**
 * Step 2's five setups, one per client: a tablist (WAI-ARIA tabs pattern) over one code block each.
 * Arrow keys, Home and End move the selection, and moving focus selects, as native tabs do. Nothing
 * moves on its own, unlike the extension page's tour: these panels are read and copied from.
 *
 * Without JavaScript, McpPage's <noscript> rule hides the strip and stacks all five, each under its own
 * heading (`.client-name`).
 */
export function ClientTabs() {
    const [active, setActive] = useState(0);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const stripRef = useRef<HTMLDivElement>(null);

    /** On a narrow screen the strip scrolls sideways. Move the strip itself, never the page. */
    const centre = (index: number) => {
        const strip = stripRef.current;
        const tab = tabRefs.current[index];
        if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;
        const left = tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2;
        if (strip.scrollTo) strip.scrollTo({left, behavior: 'smooth'});
        else strip.scrollLeft = left;
    };

    const select = (index: number, focus = false) => {
        const next = (index + clients.length) % clients.length;
        setActive(next);
        if (focus) tabRefs.current[next]?.focus();
        centre(next);
    };

    const onKeyDown = (event: KeyboardEvent, index: number) => {
        const moves: Record<string, number> = {ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: clients.length - 1};
        if (!(event.key in moves)) return;
        event.preventDefault();
        select(moves[event.key], true);
    };

    return (
        <div className="clients mt-7" data-clients="">
            <div ref={stripRef} className="client-strip" role="tablist" aria-label="Your AI client">
                {clients.map((client, i) => (
                    <button
                        key={client.id}
                        ref={node => {
                            tabRefs.current[i] = node;
                        }}
                        type="button"
                        role="tab"
                        id={`client-tab-${client.id}`}
                        aria-controls={`client-panel-${client.id}`}
                        aria-selected={i === active}
                        tabIndex={i === active ? 0 : -1}
                        className="client-tab"
                        onClick={() => select(i)}
                        onKeyDown={event => onKeyDown(event, i)}
                    >
                        {client.label}
                    </button>
                ))}
            </div>

            {clients.map((client, i) => (
                <div
                    key={client.id}
                    role="tabpanel"
                    id={`client-panel-${client.id}`}
                    aria-labelledby={`client-tab-${client.id}`}
                    tabIndex={0}
                    className={cn('client-panel', i === active && 'is-active')}
                >
                    <h4 className="client-name">{client.name}</h4>
                    <div className="code-block">
                        <span className="code-file">{client.file}</span>
                        <CopyButton text={client.code} label={client.copyLabel} />
                        <pre data-code={client.id}>
                            <code>{client.code}</code>
                        </pre>
                    </div>
                    <p className="client-note">{client.note}</p>
                </div>
            ))}
        </div>
    );
}
