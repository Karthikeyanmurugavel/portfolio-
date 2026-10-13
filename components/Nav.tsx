import { identity, nav } from '@/lib/content';
import { Mark } from './Logo';

export default function Nav() {
  return (
    <header className="nav" data-nav>
      <div className="nav__inner">
        <a href="#top" className="nav__brand" aria-label={`${identity.name}, back to top`}>
          <Mark size={22} />
          <span>{identity.short}</span>
        </a>
        <nav aria-label="Sections" className="nav__links">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="nav__right">
          <span className="status-pill">
            <i className="dot" aria-hidden="true" />
            {identity.availability}
          </span>
          <a href="#contact" className="btn btn--lime btn--sm">
            Hire me
          </a>
        </div>
      </div>
    </header>
  );
}
