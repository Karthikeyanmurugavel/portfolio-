'use client';

import { useState } from 'react';

/** Looks like the reel's email field, but it is the address itself: copy or send. */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };
  return (
    <div className="mailbar">
      <button type="button" className="mailbar__field mono" onClick={copy} aria-label={`Copy ${email}`}>
        {copied ? 'copied to clipboard' : email}
      </button>
      <a className="btn btn--dark btn--sm" href={`mailto:${email}`}>
        Email me
      </a>
    </div>
  );
}
