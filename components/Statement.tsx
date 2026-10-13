import { statement } from '@/lib/content';
import { MarkTile } from './Logo';

/**
 * The lime interstitial. Pinned while the words light up one by one, then the
 * panel's clip-path closes down onto the mark in its centre.
 */
export default function Statement() {
  return (
    <section className="statement" data-statement aria-label="What I am after">
      <div className="statement__stage">
        <div className="statement__panel" data-statement-panel>
          <p className="mono statement__kicker">{statement.kicker}</p>
          <p className="statement__text">
            {statement.words.map((w, i) => (
              <span key={`w${i}`} className="sw" data-word>
                {w}{' '}
              </span>
            ))}
            {statement.italic.map((w, i) => (
              <span key={`i${i}`} className="sw serif" data-word>
                {w}{' '}
              </span>
            ))}
            {statement.tail ? (
              <span className="sw" data-word>
                {statement.tail}
              </span>
            ) : null}
          </p>
          <MarkTile className="statement__mark" />
        </div>
      </div>
    </section>
  );
}
