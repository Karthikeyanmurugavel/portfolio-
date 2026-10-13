import { engineering } from '@/lib/content';
import { SectionHead } from './Work';

// Spoke positions around the hub, in % of the diagram box.
const POS = [
  { x: 30, y: 18 },
  { x: 70, y: 18 },
  { x: 10, y: 52 },
  { x: 90, y: 52 },
  { x: 30, y: 86 },
  { x: 70, y: 86 },
];

export default function Engineering() {
  const { hub, quality } = engineering;
  return (
    <section className="section wrap" id="engineering" aria-labelledby="eng-title">
      <SectionHead
        id="eng-title"
        pill={engineering.pill}
        title={
          <>
            <em className="serif">{engineering.italic}</em> {engineering.rest}
          </>
        }
        aside={engineering.aside}
      />

      <div className="duo">
        <article className="panel card" data-reveal>
          <h3 className="h4">{hub.title}</h3>
          <p className="card__body">{hub.body}</p>
          <div className="hub">
            <span className="mono hub__cap">{hub.caption}</span>
            <svg className="hub__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {POS.map((p, i) => (
                <line key={i} x1="50" y1="52" x2={p.x} y2={p.y} data-flow />
              ))}
            </svg>
            <div className="hub__core" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="34" height="34">
                <g stroke="var(--lime-ink)" strokeWidth="1.8" strokeLinecap="round" fill="none">
                  <path d="M5 5 L18 12" />
                  <path d="M5 12 L18 12" />
                  <path d="M5 19 L18 12" />
                </g>
                <g fill="var(--lime-ink)">
                  <circle cx="5" cy="5" r="2" />
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="5" cy="19" r="2" />
                  <circle cx="18.3" cy="12" r="3.1" />
                </g>
              </svg>
            </div>
            {hub.spokes.map((s, i) => (
              <span key={s.code} className="hub__node" style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%` }}>
                <span className="hub__dot mono">{s.code}</span>
                <span className="mono hub__name">{s.name}</span>
              </span>
            ))}
          </div>
        </article>

        <article className="panel card" data-reveal>
          <h3 className="h4">{quality.title}</h3>
          <p className="card__body">{quality.body}</p>
          <p className="mono card__cap">{quality.caption}</p>
          <ul className="meters">
            {quality.rows.map((r) => (
              <li key={r.name}>
                <div className="meters__top">
                  <span>{r.name}</span>
                  <span className="mono">{r.value}</span>
                </div>
                <span className="meters__track">
                  <i data-bar style={{ ['--w' as string]: r.pct } as React.CSSProperties} />
                </span>
                <span className="mono meters__sub">{r.sub}</span>
              </li>
            ))}
          </ul>
          <p className="mono card__foot">
            <span aria-hidden="true">◎</span> {quality.footnote}
          </p>
        </article>
      </div>
    </section>
  );
}
