import { numbers, skills } from '@/lib/content';
import { SectionHead } from './Work';

function Viz({ kind }: { kind: string }) {
  if (kind === 'spark') {
    return (
      <svg className="spark" viewBox="0 0 120 34" preserveAspectRatio="none" aria-hidden="true">
        <path data-draw d="M0 30 L12 26 L22 28 L34 20 L46 23 L58 15 L70 18 L82 10 L94 13 L106 6 L120 4" />
      </svg>
    );
  }
  if (kind === 'bars') {
    const hs = [0.95, 0.8, 0.72, 0.6, 0.48, 0.36];
    return (
      <div className="minibars" aria-hidden="true">
        {hs.map((h, i) => (
          <i key={i} data-grow style={{ ['--h' as string]: h, ['--o' as string]: (i * 0.06).toFixed(2) } as React.CSSProperties} />
        ))}
      </div>
    );
  }
  return (
    <span className="meters__track meters__track--thick" aria-hidden="true">
      <i data-bar style={{ ['--w' as string]: 0.74 } as React.CSSProperties} />
    </span>
  );
}

export function Numbers() {
  return (
    <section className="section wrap" id="numbers" aria-labelledby="num-title">
      <SectionHead
        id="num-title"
        pill={numbers.pill}
        title={
          <>
            {numbers.lineA} <em className="serif">{numbers.italic}</em> {numbers.lineB}
          </>
        }
        aside={numbers.aside}
      />
      <div className="stats">
        {numbers.stats.map((s) => (
          <article key={s.label} className="stat" data-reveal>
            <span className="mono stat__label">{s.label}</span>
            <p className="stat__value" data-count-text={s.value}>
              {s.value}
            </p>
            <Viz kind={s.viz} />
            <span className="chip mono">{s.tag}</span>
            <p className="stat__note">{s.note}</p>
            <p className="stat__who">{s.who}</p>
            <p className="mono stat__meta">{s.meta}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className="section wrap skills" id="skills" aria-labelledby="skills-title" data-waves>
      <SectionHead
        id="skills-title"
        pill={skills.pill}
        title={
          <>
            {skills.lineA} <em className="serif">{skills.italic}</em>.
          </>
        }
        aside={skills.aside}
      />
      <div className="skillset">
        {skills.groups.map((g) => (
          <article key={g.name} className="panel skillgroup" data-reveal>
            <div className="skillgroup__head">
              <h3 className="mono skillgroup__name">{g.name}</h3>
              <span className="mono skillgroup__count">{g.items.length}</span>
            </div>
            <p className="mono skillgroup__note">{g.note}</p>
            <ul className="skillgroup__list">
              {g.items.map((it) => (
                <li key={it} className="chip mono">
                  {it}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <a className="btn btn--lime skills__cta" href={skills.cta.href} data-reveal>
        {skills.cta.label}
      </a>
    </section>
  );
}
