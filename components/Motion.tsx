'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

/**
 * All page motion in one place. Components only carry data attributes:
 *
 *   [data-reveal]               fade + rise + unblur on enter
 *   [data-bar] [data-grow]      CSS-driven fills, switched on by .is-in
 *   [data-draw] [data-ring]     SVG strokes, switched on by .is-in
 *   [data-iso] [data-wave]      isometric blocks / wave paths, .is-in
 *   [data-count]                integer count-up
 *   [data-statement]            the lime panel: words light up, then it closes
 *
 * With JavaScript off, or under prefers-reduced-motion, everything is visible
 * and static. Nothing is hidden unless this file is running.
 */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.registerPlugin(ScrollTrigger);

    const nav = document.querySelector<HTMLElement>('[data-nav]');
    const onScroll = () => nav?.classList.toggle('is-scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Fills and strokes are CSS transitions; they only need a class.
    const switchOn = (sel: string, start = 'top 85%') =>
      ScrollTrigger.batch(sel, {
        start,
        once: true,
        onEnter: (els) => els.forEach((el) => el.classList.add('is-in')),
      });

    if (reduce) {
      root.classList.remove('motion-pre');
      root.classList.add('reduced');
      document
        .querySelectorAll('[data-bar],[data-grow],[data-draw],[data-ring],[data-iso],[data-wave]')
        .forEach((el) => el.classList.add('is-in'));
      return () => window.removeEventListener('scroll', onScroll);
    }

    root.classList.add('motion');

    /* ---------------------------------------------------- smooth scroll */
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95 });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href')!;
      const target = id === '#top' ? 0 : document.querySelector<HTMLElement>(id);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -72, duration: 1.4 });
    };
    document.addEventListener('click', onClick);

    const ctx = gsap.context(() => {
      // Hide reveal targets first, then lift the pre-paint mask (set by the
      // inline script in <head>) in the same tick, so nothing flashes.
      gsap.set('[data-reveal]', { opacity: 0, y: 28, filter: 'blur(8px)' });
      root.classList.remove('motion-pre');

      /* ------------------------------------------------------ hero intro */
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
      intro
        .from('[data-nav]', { y: -24, opacity: 0, duration: 1 })
        .from('[data-hero-line] > span', { yPercent: 110, duration: 1.2, stagger: 0.08 }, 0.1)
        .from('[data-hero-in]', { y: 18, opacity: 0, filter: 'blur(6px)', duration: 1, stagger: 0.08 }, 0.35)
        .from(
          '[data-hero-panel]',
          { x: 60, opacity: 0, rotateY: -14, filter: 'blur(10px)', duration: 1.6, transformPerspective: 1400 },
          0.25,
        )
        .from('[data-gnode]', { scale: 0.92, opacity: 0, duration: 0.8, stagger: 0.12 }, 0.8)
        .add(() => document.querySelectorAll('.graph [data-draw]').forEach((el) => el.classList.add('is-in')), 1.1);

      // hero panel drifts up a little faster than the page
      gsap.to('[data-hero-panel]', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      /* ---------------------------------------------------------- reveals */
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 90%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.07,
            overwrite: true,
          }),
      });

      switchOn('[data-bar]');
      switchOn('[data-grow]');
      switchOn('section [data-draw], .stats [data-draw]');
      switchOn('[data-ring]');
      switchOn('[data-iso]');
      switchOn('[data-wave]');

      /* ---------------------------------------------------------- counters */
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count);
        const obj = { v: 0 };
        el.textContent = '0';
        gsap.to(obj, {
          v: end,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });

      /* ---------------------------------------------------- lime statement */
      const sec = document.querySelector<HTMLElement>('[data-statement]');
      const panel = document.querySelector<HTMLElement>('[data-statement-panel]');
      if (sec && panel) {
        const words = panel.querySelectorAll('[data-word]');
        const side = () => (window.innerWidth < 760 ? 112 : 150);
        const openClip = () => {
          const mx = window.innerWidth < 760 ? 16 : Math.max(24, (window.innerWidth - 1240) / 2);
          return `inset(9vh ${mx}px 9vh ${mx}px round 28px)`;
        };
        const closedClip = () => {
          const s = side();
          const x = (window.innerWidth - s) / 2;
          const y = (window.innerHeight - s) / 2;
          return `inset(${y}px ${x}px ${y}px ${x}px round 36px)`;
        };

        gsap.set(panel, { clipPath: openClip() });
        gsap.set(words, { opacity: 0.16 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        tl.to(words, { opacity: 1, stagger: 0.12, duration: 0.3, ease: 'none' }, 0)
          .to({}, { duration: 0.5 })
          .fromTo(panel, { clipPath: openClip }, { clipPath: closedClip, duration: 1.4, ease: 'power2.inOut' })
          .to('.statement__text, .statement__kicker', { opacity: 0, duration: 0.5 }, '<0.5')
          .to('.statement__mark', { scale: 1.08, duration: 0.6, ease: 'power1.out' }, '<0.2')
          .to({}, { duration: 0.4 });
      }
    });

    // fonts change line heights; recalc once they land
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.removeEventListener('click', onClick);
      window.removeEventListener('scroll', onScroll);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
