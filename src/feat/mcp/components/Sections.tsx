/**
 * The page's server-rendered sections: hero, the three setup steps, FAQ and the JSON-LD. Only the client
 * tabs, the copy buttons, the scroll reveals, the navbar and the hero tilt need the browser.
 */
import {faq, faqSection, hero, keyCta, links, MCP_URL, prompts, seo, setupSection, software, steps} from '../content';
import {ClientTabs} from './ClientTabs';
import {CopyButton} from './CopyButton';
import {Scene} from './Scene';
import {ArrowDown, ArrowOut, ExternalLink, Plus, ProductWindow, Reveal} from './shared';

export function Hero() {
    return (
        <section id="hero" className="hero-glow relative overflow-hidden pt-[172px]">
            <div className="mx-auto max-w-[1120px] px-6 text-center">
                <Reveal
                    as="h1"
                    className="mx-auto max-w-[24ch] font-display text-[clamp(2.4rem,5vw,3.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-white"
                >
                    {hero.headline} <span className="hero-accent">{hero.headlineAccent}</span>
                </Reveal>
                <Reveal
                    as="p"
                    delay={1}
                    className="mx-auto mt-6 max-w-[62ch] text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.6] text-muted-foreground"
                >
                    {hero.subheadline.before}
                    <span className="whitespace-nowrap">{hero.subheadline.unbroken}</span>
                    {hero.subheadline.after}
                    <br className="hidden sm:inline" /> {hero.subheadline.second}
                </Reveal>
                <Reveal delay={2} className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <a data-analytics={keyCta.analytics} data-slot="hero" href={keyCta.href} className="hero-btn hero-btn-primary">
                        <span>{keyCta.label}</span>
                        <span className="hero-btn-arrow" aria-hidden="true">
                            <ArrowOut />
                        </span>
                    </a>
                    <a href="#setup" className="hero-btn hero-btn-glass">
                        <span>{hero.stepsCta}</span>
                        <span className="hero-btn-arrow" aria-hidden="true">
                            <ArrowDown />
                        </span>
                    </a>
                </Reveal>
            </div>

            {/* The product window: the same frame, light line, halo, tilt and bottom fade as the home page.
                The picture is a drawn scene: one real exchange with an assistant that has the server
                connected, its answer drawn as the app's own Signals table. */}
            <Reveal className="mx-auto mt-16 max-w-[1120px] px-6">
                <ProductWindow>
                    <div className="light-halo" aria-hidden="true" />
                    <div className="relative overflow-hidden rounded-t-2xl border border-white/10 bg-[#0b0b10] shadow-[0_-20px_80px_-20px_rgba(110,92,231,0.35)]">
                        <div className="light-line" aria-hidden="true" />
                        <Scene name={hero.scene} className="window-scene" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-background sm:h-40" />
                    </div>
                </ProductWindow>
            </Reveal>
        </section>
    );
}

/** Three numbered cards: create a key, add the server (the client tabs), ask something. */
export function Setup() {
    return (
        <section id="setup" className="mx-auto max-w-[1120px] scroll-mt-24 px-6 pt-32 md:pt-44">
            <Reveal className="mx-auto max-w-[680px] text-center">
                <h2 className="text-gradient font-display text-[clamp(1.9rem,3.2vw,2.5rem)] font-medium leading-[1.2] tracking-[-0.02em]">
                    {setupSection.heading}
                </h2>
                <p className="mt-4 font-display text-[clamp(1.15rem,1.9vw,1.5rem)] leading-[1.35] tracking-[-0.01em] text-muted-foreground">
                    {setupSection.subheading}
                </p>
            </Reveal>

            <ol className="mt-14 space-y-5">
                <Reveal as="li" className="card step rounded-2xl">
                    <p className="step-num" aria-hidden="true">
                        1
                    </p>
                    <div className="step-body">
                        <StepTitle>{steps.key.title}</StepTitle>
                        <p className="mt-2 text-[15px] leading-[1.7] text-muted-foreground">{steps.key.body}</p>
                        <a data-analytics={keyCta.analytics} data-slot="step" href={keyCta.href} className="step-link">
                            {steps.key.link}
                            <ExternalLink />
                        </a>
                    </div>
                </Reveal>

                <Reveal as="li" delay={1} className="card step rounded-2xl">
                    <p className="step-num" aria-hidden="true">
                        2
                    </p>
                    <div className="step-body">
                        <StepTitle>{steps.server.title}</StepTitle>
                        <p className="mt-2 text-[15px] leading-[1.7] text-muted-foreground">
                            {steps.server.body.before}
                            <code>{steps.server.body.code}</code>
                            {steps.server.body.after}
                        </p>
                        <div className="url-row">
                            <code className="url-code">{MCP_URL}</code>
                            <CopyButton text={MCP_URL} label={steps.server.copyLabel} />
                        </div>
                        <ClientTabs />
                    </div>
                </Reveal>

                <Reveal as="li" delay={2} className="card step rounded-2xl">
                    <p className="step-num" aria-hidden="true">
                        3
                    </p>
                    <div className="step-body">
                        <StepTitle>{steps.ask.title}</StepTitle>
                        <p className="mt-2 text-[15px] leading-[1.7] text-muted-foreground">{steps.ask.body}</p>
                        <ul className="prompts">
                            {prompts.map(prompt => (
                                <li key={prompt}>{prompt}</li>
                            ))}
                        </ul>
                    </div>
                </Reveal>
            </ol>
        </section>
    );
}

function StepTitle({children}: {children: string}) {
    return <h3 className="step-title font-display text-lg font-medium tracking-[-0.02em] text-white">{children}</h3>;
}

/**
 * Native <details>, so it works without JavaScript and is keyboard and screen-reader friendly for free.
 * The shared `name` keeps one item open at a time. The plus turns into a cross in landing.css.
 */
export function Faq() {
    return (
        <section id="faq" className="mx-auto max-w-[920px] scroll-mt-24 px-6 pt-32 md:pt-44">
            <Reveal className="mx-auto max-w-[640px] text-center">
                <h2 className="text-gradient font-display text-[clamp(1.9rem,3.2vw,2.5rem)] font-medium leading-[1.2] tracking-[-0.02em]">
                    {faqSection.heading}
                </h2>
                <p className="mt-5 text-base leading-[1.6] text-muted-foreground">{faqSection.subheading}</p>
            </Reveal>
            <Reveal id="faq-list" delay={1} className="mt-12 space-y-4">
                {faq.map(item => (
                    <details key={item.question} name="mcp-faq" className="card rounded-2xl px-8">
                        <summary className="flex items-center justify-between gap-6 py-6 font-display text-lg font-medium tracking-[-0.01em] text-white">
                            {item.question}
                            <Plus className="plus h-6 w-6 shrink-0 text-white" />
                        </summary>
                        <p className="pb-6 text-[15px] leading-[1.7] text-muted-foreground">{item.answer}</p>
                    </details>
                ))}
            </Reveal>
        </section>
    );
}

/**
 * Organization, SoftwareApplication, FAQPage and a breadcrumb, in one graph. The FAQ entries come from the
 * same array the page renders. No price and no rating: the server needs a Datadash plan.
 */
export function JsonLd() {
    const graph = [
        {
            '@type': 'Organization',
            '@id': 'https://datadash.xyz/#organization',
            name: 'Datadash',
            legalName: 'Datadash FZCO',
            url: 'https://datadash.xyz/',
            logo: 'https://datadash.xyz/brand/icon-512.png',
            sameAs: [links.x, links.telegram],
        },
        {
            '@type': 'SoftwareApplication',
            '@id': `${seo.canonical}#software`,
            name: software.name,
            alternateName: software.alternateName,
            description: seo.description,
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            softwareRequirements: software.softwareRequirements,
            url: seo.canonical,
            featureList: software.featureList,
            publisher: {'@id': 'https://datadash.xyz/#organization'},
        },
        {
            '@type': 'FAQPage',
            mainEntity: faq.map(item => ({'@type': 'Question', name: item.question, acceptedAnswer: {'@type': 'Answer', text: item.answer}})),
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {'@type': 'ListItem', position: 1, name: 'Datadash', item: 'https://datadash.xyz/'},
                {'@type': 'ListItem', position: 2, name: software.breadcrumb, item: seo.canonical},
            ],
        },
    ];
    const json = JSON.stringify({'@context': 'https://schema.org', '@graph': graph}).replace(/</g, '\\u003c');
    return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: json}} />;
}
