import { contact, identity } from '@/lib/content';
import { Mark } from './Logo';
import CopyEmail from './CopyEmail';

export default function Footer() {
  const year = 2026;
  return (
    <footer className="foot" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="foot__cards">
          <div className="panel foot__brand" data-reveal>
            <div className="foot__logo">
              <Mark size={22} />
              <span>{identity.short}</span>
            </div>
            <svg className="foot__chev" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 5 L18 12 M5 12 L18 12 M5 19 L18 12" />
              <circle cx="5" cy="5" r="1.9" />
              <circle cx="5" cy="12" r="1.9" />
              <circle cx="5" cy="19" r="1.9" />
              <circle cx="18.3" cy="12" r="3.1" />
            </svg>
            <p className="foot__blurb">{contact.blurb}</p>
            <div className="foot__social">
              <span className="mono muted">stay in touch</span>
              <a className="tile mono" href={identity.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                gh
              </a>
              <a className="tile mono" href={identity.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                in
              </a>
              <a className="tile mono" href={identity.links.unstop} target="_blank" rel="noreferrer" aria-label="Unstop">
                un
              </a>
              <a className="tile mono" href={`mailto:${identity.email}`} aria-label="Email">
                @
              </a>
            </div>
          </div>

          <div className="foot__cta" data-reveal>
            <p className="mono foot__kicker">{contact.kicker}</p>
            <h2 id="contact-title" className="foot__title">
              {contact.lineA} <em className="serif">{contact.italic}</em> {contact.lineB}
            </h2>
            <p className="foot__body">{contact.body}</p>
            <CopyEmail email={identity.email} />
            <p className="mono foot__roles">{contact.roles.join(' / ')}</p>
          </div>
        </div>

        <ul className="ticker mono" aria-label="Status">
          {contact.ticker.map((t) => (
            <li key={t}>
              <i className="dot" aria-hidden="true" /> {t}
            </li>
          ))}
        </ul>

        <div className="foot__grid">
          <div>
            <div className="foot__logo">
              <Mark size={20} />
              <span>{identity.name}</span>
            </div>
            <p className="foot__about">{identity.role}, {identity.location}.</p>
            <p className="mono muted foot__small">{contact.footnote}</p>
          </div>
          {contact.columns.map((c) => (
            <div key={c.title} className="foot__col">
              <p className="mono muted">{c.title}</p>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="foot__base mono muted">
          <span>© {year} {identity.name}</span>
          <span>built in chennai</span>
        </div>
      </div>
    </footer>
  );
}
