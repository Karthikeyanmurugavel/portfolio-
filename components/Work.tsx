import { stack, work, ragRun, approval, ilpd } from '@/lib/content';
import { Mark } from './Logo';

export function Stack() {
  return (
    <section className="stack wrap" aria-label="Technology I build with">
      <p className="mono stack__label" data-reveal>
        {stack.label}
      </p>
      <ul className="stack__row" data-reveal-group>
        {stack.items.map((s) => (
          <li key={s.code} className="stack__item" data-reveal>
            <span className="tile mono">{s.code}</span>
            <span className="mono stack__name">{s.name}</span>
          </li>
        ))}
        <li className="stack__item stack__more mono" data-reveal>
          {stack.more}
        </li>
      </ul>
    </section>
  );
}

function SectionHead({
  pill,
  title,
  aside,
  id,
}: {
  pill: string;
  title: React.ReactNode;
  aside: string;
  id: string;
}) {
  return (
    <div className="shead">
      <div>
        <span className="pill" data-reveal>
          <i className="dot" aria-hidden="true" />
          {pill}
        </span>
        <h2 id={id} className="h2" data-reveal>
          {title}
        </h2>
      </div>
      <p className="shead__aside" data-reveal>
        {aside}
      </p>
    </div>
  );
}

export { SectionHead };

function RunPanel() {
  const ticks = ['0', '25', '50', '75', '100'];
  return (
    <div className="panel run" data-reveal>
      <div className="run__head mono">
        <span>{ragRun.title}</span>
        <span className="muted">{ragRun.done}</span>
      </div>
      <ul className="run__rows">
        {ragRun.stages.map((s, i) => (
          <li key={s.name} className="run__row">
            <span className="run__check" aria-hidden="true">
              {i < ragRun.stages.length - 1 ? '✓' : '◷'}
            </span>
            <span className="mono run__name">{s.name}</span>
            <span className="run__track">
              <i
                className={`run__bar ${i === 4 ? 'run__bar--lime' : ''}`}
                data-bar
                style={{ ['--w' as string]: s.w, ['--o' as string]: (i * 0.09).toFixed(2) } as React.CSSProperties}
              />
            </span>
          </li>
        ))}
      </ul>
      <div className="run__axis mono" aria-hidden="true">
        {ticks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <p className="mono run__foot">bar length = relative share of the run</p>
    </div>
  );
}

function ApprovalCard() {
  return (
    <div className="panel approval" data-reveal>
      <div className="approval__head mono">
        <span>{approval.channel}</span>
        <span className="muted">today</span>
      </div>
      <div className="approval__msg">
        <div className="approval__who">
          <Mark size={20} />
          <strong>{approval.app}</strong>
          <span className="mono muted">{approval.time}</span>
        </div>
        <p>{approval.message}</p>
        <dl className="approval__fields">
          {approval.fields.map((f) => (
            <div key={f.k}>
              <dt className="mono">{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
        <div className="approval__actions">
          <span className="btn btn--lime btn--sm" aria-hidden="true">
            ✓ Approve
          </span>
          <span className="btn btn--ghost btn--sm" aria-hidden="true">
            ❚❚ Hold
          </span>
          <span className="mono muted approval__wait">{approval.waiting}</span>
        </div>
      </div>
    </div>
  );
}

function IsoBlocks() {
  return (
    <div className="panel iso" data-reveal>
      <div className="run__head mono">
        <span>{ilpd.title}</span>
        <span className="muted">{ilpd.note}</span>
      </div>
      <div className="iso__row">
        {ilpd.blocks.map((b, i) => (
          <div key={b} className="iso__col">
            <div
              className={`iso__block ${i === ilpd.blocks.length - 1 ? 'is-lime' : ''}`}
              data-iso
              style={{ ['--h' as string]: `${40 + i * 18}px` } as React.CSSProperties}
            >
              <i className="iso__top" />
              <i className="iso__left" />
              <i className="iso__right" />
            </div>
            <span className={`mono iso__label ${i === ilpd.blocks.length - 1 ? 'lime' : ''}`}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Work() {
  const visuals = [<RunPanel key="r" />, <ApprovalCard key="a" />, <IsoBlocks key="i" />];
  return (
    <section className="section wrap" id="work" aria-labelledby="work-title">
      <SectionHead
        id="work-title"
        pill={work.pill}
        title={
          <>
            {work.lineA} <em className="serif">{work.italic}</em>.
          </>
        }
        aside={work.aside}
      />
      <div className="rows">
        {work.rows.map((r, i) => (
          <article key={r.num} className={`row ${i % 2 === 1 ? 'row--flip' : ''}`}>
            <div className="row__copy" data-reveal>
              <span className="mono row__num">{r.num}</span>
              <h3 className="h3">{r.title}</h3>
              <p>{r.body}</p>
              {r.repo ? (
                <a className="link mono" href={r.repo} target="_blank" rel="noreferrer">
                  view repo ↗
                </a>
              ) : null}
            </div>
            <div className="row__visual">{visuals[i]}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
