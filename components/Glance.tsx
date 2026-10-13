import { glance } from '@/lib/content';
import { SectionHead } from './Work';

function Ring({ value }: { value: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <svg className="ring" viewBox="0 0 84 84" aria-hidden="true">
      <circle cx="42" cy="42" r={r} className="ring__bg" />
      <circle
        cx="42"
        cy="42"
        r={r}
        className="ring__fg"
        data-ring
        style={{ ['--c' as string]: c, ['--v' as string]: value / 100 } as React.CSSProperties}
      />
    </svg>
  );
}

function Waves() {
  return (
    <svg className="waves" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
      <path data-wave d="M0 30 C 25 5, 50 5, 75 30 S 125 55, 150 30 S 190 8, 200 18" />
      <path data-wave className="alt" d="M0 34 C 25 58, 50 58, 75 34 S 125 8, 150 34 S 190 52, 200 44" />
    </svg>
  );
}

// A small dot-matrix of India-ish density, purely decorative.
function DotMap() {
  const dots: { x: number; y: number; on: boolean }[] = [];
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 18; x++) {
      const dx = x - 9;
      const dy = y - 4;
      const inside = dx * dx * 0.18 + dy * dy * 0.6 < 5 + Math.sin(x * 1.7 + y) * 1.4;
      if (inside) dots.push({ x, y, on: x === 10 && y === 6 });
    }
  }
  return (
    <svg className="dotmap" viewBox="0 0 180 90" aria-hidden="true">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x * 10 + 5} cy={d.y * 10 + 5} r={d.on ? 3.4 : 1.6} className={d.on ? 'on' : ''} />
      ))}
    </svg>
  );
}

export default function Glance() {
  const g = glance;
  return (
    <section className="section wrap" id="glance" aria-labelledby="glance-title">
      <SectionHead
        id="glance-title"
        pill={g.pill}
        title={
          <>
            {g.lineA} <em className="serif">{g.italic}</em>.
          </>
        }
        aside={g.aside}
      />

      <div className="bento">
        <article className="panel bento__list" data-reveal>
          <div className="bento__head mono">
            <span>projects, by state</span>
            <span className="chip mono">
              <i className="dot" aria-hidden="true" /> {g.projects.filter((p) => p.tone === 'lime').length} live or public
            </span>
          </div>
          <ul className="plist">
            {g.projects.map((p, i) => (
              <li key={p.name} className="plist__row">
                <span className="mono plist__n">0{i + 1}</span>
                <span className="plist__name">{p.name}</span>
                <span className="mono plist__kind">{p.kind}</span>
                <span className={`mono plist__state ${p.tone === 'lime' ? 'is-lime' : ''}`}>{p.status}</span>
                <span className="plist__bar" aria-hidden="true">
                  <i data-bar style={{ ['--w' as string]: p.tone === 'lime' ? 1 : 0.55, ['--o' as string]: (i * 0.07).toFixed(2) } as React.CSSProperties} />
                </span>
              </li>
            ))}
          </ul>
          <p className="mono bento__foot">lime = live product or public repo</p>
        </article>

        <article className="panel bento__ring" data-reveal>
          <span className="mono bento__label">rag assistant</span>
          <div className="ring__wrap">
            <Ring value={g.ring.value} />
            <span className="ring__value">
              <span data-count={g.ring.value}>{g.ring.value}</span>%
            </span>
          </div>
          <p className="mono bento__sub">{g.ring.label}</p>
        </article>

        <article className="panel bento__stat" data-reveal>
          <span className="mono bento__label">{g.jarvis.title}</span>
          <p className="bento__big">
            {g.jarvis.stat} <span>{g.jarvis.label}</span>
          </p>
          <p className="mono bento__sub">{g.jarvis.sub}</p>
        </article>

        <article className="panel bento__stat" data-reveal>
          <span className="mono bento__label">{g.oren.title}</span>
          <p className="bento__big">
            {g.oren.stat} <span>{g.oren.label}</span>
          </p>
          <p className="mono bento__sub">{g.oren.sub}</p>
        </article>

        <article className="panel bento__journey" data-reveal>
          <span className="mono bento__label">{g.journey.title}</span>
          <ol className="journey">
            {g.journey.steps.map((s, i) => (
              <li key={s.code} className={i === g.journey.steps.length - 1 ? 'is-now' : ''}>
                <span className="journey__badge mono">{s.code}</span>
                <span className="journey__label">{s.label}</span>
                <span className="mono journey__meta">{s.meta}</span>
              </li>
            ))}
          </ol>
        </article>

        <article className="panel bento__waves" data-reveal>
          <span className="mono bento__label">{g.n8n.title}</span>
          <Waves />
          <p className="mono bento__sub">{g.n8n.sub}</p>
        </article>

        <article className="panel bento__map" data-reveal>
          <span className="mono bento__label">{g.where.title}</span>
          <DotMap />
          <p className="mono bento__sub">{g.where.sub}</p>
        </article>
      </div>
    </section>
  );
}
