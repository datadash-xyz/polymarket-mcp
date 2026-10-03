/**
 * The small pieces the page shares: class-name helper, icons, scroll reveal and the hero window's tilt.
 * They are copies of the home page package's (feat/landing) on purpose, so this folder can be dropped in
 * on its own, like the extension package's. Keep them in step if you change the originals.
 */
'use client';

import {useEffect, useRef, useState, type CSSProperties, type ReactNode, type SVGProps} from 'react';

/** Joins class names, skipping anything falsy. */
export const cn = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
} as const;

export const ArrowUpRight = ({size = 14, ...props}: SVGProps<SVGSVGElement> & {size?: number}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} {...props}>
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
    </svg>
);

/** The arrows that slide into the hero buttons. They take their size from `.hero-btn-arrow > svg`. */
export const ArrowOut = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
    </svg>
);
export const ArrowDown = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
        <path d="M12 5v14" />
        <path d="m6 13 6 6 6-6" />
    </svg>
);
export const ExternalLink = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
);
export const Plus = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden {...props}>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
    </svg>
);
export const XLogo = () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);
export const TelegramLogo = () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M21.94 3.4a1.5 1.5 0 0 0-1.62-.2L2.6 10.6c-1.2.5-1.14 1.3.05 1.66l4.35 1.36 1.66 5.28c.2.55.37.76.75.76.47 0 .67-.21 1.08-.61l2.6-2.53 4.75 3.5c.87.48 1.5.23 1.72-.8l3.1-14.6c.3-1.27-.5-1.85-1.72-1.22z" />
    </svg>
);

type RevealProps = {
    as?: 'div' | 'h1' | 'p' | 'article' | 'section' | 'li';
    /** Staggers a group: 1, 2 and 3 add 60ms each (see `[data-reveal-delay]` in landing.css). */
    delay?: 1 | 2 | 3;
    id?: string;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
} & Record<`data-${string}`, unknown>;

/**
 * Fades its element up the first time it scrolls into view. The motion is CSS (`[data-reveal]`); this only
 * adds `is-visible` once.
 */
export function Reveal({as = 'div', delay, className, children, ...rest}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node || !('IntersectionObserver' in window)) return;
        const io = new IntersectionObserver(
            entries => {
                if (entries.some(entry => entry.isIntersecting)) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            {rootMargin: '-40px'}
        );
        io.observe(node);
        return () => io.disconnect();
    }, []);

    const Tag = as as 'div';
    return (
        <Tag {...rest} ref={ref} className={cn(className, visible && 'is-visible')} data-reveal="" data-reveal-delay={delay}>
            {children}
        </Tag>
    );
}

/**
 * The hero window's scroll motion, measured off the old Framer site:
 *
 *   transform: perspective(1200px) translateY(-80px -> 0) scale(0.9 -> 1) rotateX(20deg -> 0)
 *
 * Progress is linear in scroll: 0 when the window's top edge meets the bottom of the viewport, 1 when its
 * bottom edge does, so it lies flat exactly when fully in view. The position is read from the parent,
 * because the tilted box reports a skewed rect. Reduced motion skips all of it.
 */
export function ProductWindow({children}: {children: ReactNode}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = ref.current;
        const host = node?.parentElement;
        if (!node || !host || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let frame = 0;
        const update = () => {
            frame = 0;
            const box = host.getBoundingClientRect();
            if (!box.height) return;
            const p = Math.min(1, Math.max(0, (window.innerHeight - box.top) / box.height));
            const q = 1 - p;
            node.style.transform = q
                ? `perspective(1200px) translateY(${(-80 * q).toFixed(2)}px) scale(${(0.9 + 0.1 * p).toFixed(4)}) rotateX(${(20 * q).toFixed(3)}deg)`
                : 'none';
        };
        const request = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        window.addEventListener('scroll', request, {passive: true});
        window.addEventListener('resize', request);
        update();
        return () => {
            window.removeEventListener('scroll', request);
            window.removeEventListener('resize', request);
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div ref={ref} id="product-window" className="product-tilt relative">
            {children}
        </div>
    );
}
