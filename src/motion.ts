import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(ScrambleTextPlugin, Observer);

/** Lowercase reads soft and human; uppercase reads harsh. The set is the personality. */
export const CHARS = 'abcdefghijklmnopqrstuvwxyz';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

export function prefersReducedMotion(): boolean {
  return reducedMotion.matches;
}

interface ScrambleOptions {
  duration?: number;
  speed?: number;
  revealDelay?: number;
  onUpdate?: () => void;
}

/**
 * Morphs `el`'s text into `text`. Under reduced motion the text is swapped
 * outright, so callers never need to branch on it themselves.
 */
export function scrambleTo(
  el: Element,
  text: string,
  { duration = 0.7, speed = 0.6, revealDelay = 0, onUpdate }: ScrambleOptions = {},
): gsap.core.Tween {
  if (prefersReducedMotion()) {
    // No TextPlugin dependency: swap outright, keep a real tween so callers
    // can still position this on a timeline.
    return gsap.to(el, {
      duration: 0.12,
      ease: 'none',
      onStart: () => {
        el.textContent = text;
      },
      onUpdate,
    });
  }
  return gsap.to(el, {
    duration,
    ease: 'none',
    scrambleText: { text, chars: CHARS, speed, revealDelay },
    onUpdate,
  });
}

export { gsap, Observer };
