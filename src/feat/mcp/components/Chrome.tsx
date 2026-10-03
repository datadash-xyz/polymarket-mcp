'use client';

import {useSyncExternalStore} from 'react';
import {asset, footer, keyCta, links, nav} from '../content';
import {ArrowUpRight, cn, TelegramLogo, XLogo} from './shared';

const subscribe = (notify: () => void) => {
    window.addEventListener('scroll', notify, {passive: true});
    return () => window.removeEventListener('scroll', notify);
};
const isScrolled = () => window.scrollY > 20;

/**
 * The navbar and footer. They carry the same items as the home page's (feat/landing) and the extension
 * page's, which `landing/tools/verify-pages.mjs` checks on the static pages; only the violet pill differs,
 * because getting a key is this page's job.
 */
export function Navbar() {
    const scrolled = useSyncExternalStore(subscribe, isScrolled, () => false);

    return (
        <header className={cn('nav fixed top-0 left-0 right-0 z-50', scrolled && 'is-scrolled')}>
            <div className="mx-auto flex h-[88px] max-w-[1200px] items-center justify-between px-6 lg:px-10">
                <div className="flex items-center gap-10">
                    <a href={links.home} className="flex items-center" aria-label="Datadash home">
                        <Logo />
                    </a>
                    <nav className="hidden items-center gap-6 text-sm text-foreground/90 md:flex">
                        {nav.map(item => (
                            <a key={item.label} href={item.href} className="transition-colors hover:text-white">
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-6">
                    <a
                        href={links.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden text-sm text-foreground/90 transition-colors hover:text-white sm:inline"
                    >
                        Join Community
                    </a>
                    <a
                        data-analytics={keyCta.analytics}
                        data-slot="nav"
                        href={keyCta.href}
                        className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
                    >
                        {keyCta.label}
                        <ArrowUpRight />
                    </a>
                </div>
            </div>
        </header>
    );
}

/** The brand lockup at its native 145x38. `-ml-[9px]` trims the SVG's own left padding so the mark lines up. */
export function Logo() {
    // eslint-disable-next-line @next/next/no-img-element -- a 12 KB SVG; next/image adds nothing here
    return <img src={asset('logo.svg')} alt="Datadash" width={145} height={38} className="-ml-[9px] h-[38px] w-auto max-w-none" />;
}

const social = 'inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/8 text-white/70 transition-colors hover:bg-white/15 hover:text-white';

export function Footer({year}: {year: number}) {
    return (
        <footer className="mx-auto max-w-[1200px] px-6 pt-24 pb-16 lg:px-10">
            <div className="flex flex-col justify-between gap-12 md:flex-row">
                <div>
                    <a href={links.home} className="inline-flex items-center" aria-label="Datadash home">
                        <Logo />
                    </a>
                    <p className="mt-4 text-sm text-muted-foreground">{footer.tagline}</p>
                    <div className="mt-5 flex items-center gap-2">
                        <a href={links.x} target="_blank" rel="noreferrer" aria-label="Datadash on X" className={social}>
                            <XLogo />
                        </a>
                        <a href={links.telegram} target="_blank" rel="noreferrer" aria-label="Datadash on Telegram" className={social}>
                            <TelegramLogo />
                        </a>
                    </div>
                </div>
                <div className="flex gap-16">
                    <FooterColumn title="Navigation" items={footer.navigation} />
                    <FooterColumn title="Information" items={footer.information} />
                </div>
            </div>
            <p className="mt-12 text-sm text-muted-foreground">
                &copy; {year} Datadash FZCO. {footer.legal}
            </p>
        </footer>
    );
}

function FooterColumn({title, items}: {title: string; items: readonly {label: string; href: string}[]}) {
    return (
        <div>
            <h4 className="font-display text-lg font-medium text-white/80">{title}</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {items.map(item => (
                    <li key={item.label}>
                        <a href={item.href} className="transition-colors hover:text-white">
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
