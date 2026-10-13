import { hero, heroGraph } from '@/lib/content';

function Node({ label, sub, className }: { label: string; sub: string; className: string }) {
  return (
    <div className={`gnode ${className}`} data-gnode>
      <span className="gnode__label">{label}</span>
      <span className="gnode__sub mono">{sub}</span>
      <i className="gnode__port gnode__port--in" />
      <i className="gnode__port gnode__port--out" />
    </div>
  );
}

function Graph() {
  const n = heroGraph.nodes;
  return (
    <div className="panel graph" data-hero-panel>
      <div className="graph__head">
        <span className="graph__title">{heroGraph.title}</span>
        <span className="graph__meta mono">{heroGraph.meta}</span>
        <span className="graph__status mono">
          <i className="dot" aria-hidden="true" />
          {heroGraph.status}
        </span>
      </div>

      <div className="graph__body">
        <div className="graph__tools" aria-hidden="true">
          <span>
            <svg viewBox="0 0 12 12" width="10" height="10"><path d="M2 1 L10 6 L6 7 L4.5 11 Z" fill="currentColor" /></svg>
          </span>
          <span>+</span>
          <span>↻</span>
        </div>
        <span className="graph__badge mono">{heroGraph.badge}</span>

        <div className="graph__canvas">
          {/* Four wires, not three: both analysers feed the fused signal. The
              RAG version branched one way or the other, so its third wire had
              no partner. Wires are hidden under 760px — the nodes stack there. */}
          <svg className="graph__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path data-draw d="M27 50 C 34 50, 33 25, 41 25" />
            <path data-draw d="M27 50 C 34 50, 33 75, 41 75" />
            <path data-draw d="M66 25 C 72 25, 70 48, 76 48" />
            <path data-draw d="M66 75 C 72 75, 70 48, 76 48" />
          </svg>
          <span className="wire-tag mono" style={{ left: '29%', top: '33%' }}>{heroGraph.edgeYes}</span>
          <span className="wire-tag mono" style={{ left: '29.5%', top: '62%' }}>{heroGraph.edgeNo}</span>

          <Node className="g-left" label={n.input.label} sub={n.input.sub} />
          <Node className="g-top" label={n.speech.label} sub={n.speech.sub} />
          <Node className="g-bottom" label={n.text.label} sub={n.text.sub} />
          <Node className="g-right" label={n.fused.label} sub={n.fused.sub} />
        </div>

        <div className="graph__runs">
          <span className="graph__runs-title mono">{heroGraph.runsTitle}</span>
          <ul>
            {heroGraph.runs.map((r) => (
              <li key={r.q} className="mono">
                <i
                  className={`dot ${'tone' in r && r.tone === 'muted' ? 'dot--muted' : ''}`}
                  aria-hidden="true"
                />
                <span className="graph__q">{r.q}</span>
                <span className="graph__r">{r.result}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <span className="pill" data-hero-in>
            <i className="dot" aria-hidden="true" />
            {hero.pill}
          </span>
          <h1 id="hero-title" className="hero__title">
            <span className="line" data-hero-line>
              <span>{hero.lineA}</span>
            </span>
            <span className="line" data-hero-line>
              <span>
                <em className="serif">{hero.lineB}</em>.
              </span>
            </span>
          </h1>
          <p className="hero__body" data-hero-in>
            {hero.body}
          </p>
          <div className="hero__ctas" data-hero-in>
            <a className="btn btn--lime" href={hero.primary.href}>
              {hero.primary.label}
            </a>
            <a className="btn btn--ghost" href={hero.secondary.href} target="_blank" rel="noreferrer">
              {hero.secondary.label}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="hero__fine mono" data-hero-in>
            {hero.fine}
          </p>
        </div>
        <div className="hero__visual">
          <Graph />
        </div>
      </div>
    </section>
  );
}
