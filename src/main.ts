import { Observer, gsap } from './motion';
import { Stage } from './stage';

const must = <T extends HTMLElement>(selector: string): T => {
  const el = document.querySelector<T>(selector);
  if (el === null) throw new Error(`Missing required element: ${selector}`);
  return el;
};

const stage = new Stage(must('#stage'));
const hintEl = must('#hint');

// The only affordance on the page, and it retires once it has been obeyed.
let hinted = false;
const dismissHint = (): void => {
  if (hinted) return;
  hinted = true;
  gsap.to(hintEl, { autoAlpha: 0, duration: 0.4, ease: 'power2.out' });
};

const step = (direction: number): void => {
  if (stage.advance(direction)) dismissHint();
};

// Observer collapses wheel, trackpad, touch drag and pointer drag into one
// gesture, so the whole site is driven by a single "next / previous" intent.
// Direction mapping mirrors GSAP's own section-slider demo.
Observer.create({
  target: window,
  type: 'wheel,touch,pointer',
  wheelSpeed: -1,
  tolerance: 20,
  preventDefault: true,
  onUp: () => step(1),
  onDown: () => step(-1),
});

const NEXT_KEYS = new Set(['ArrowDown', 'ArrowRight', 'PageDown']);
const PREV_KEYS = new Set(['ArrowUp', 'ArrowLeft', 'PageUp']);

window.addEventListener('keydown', (event) => {
  const focusedLink = document.activeElement?.closest('.line--link') != null;

  if (NEXT_KEYS.has(event.key) || (event.key === ' ' && !focusedLink)) {
    event.preventDefault();
    step(1);
  } else if (PREV_KEYS.has(event.key)) {
    event.preventDefault();
    step(-1);
  } else if (event.key === 'Home') {
    event.preventDefault();
    if (stage.go(0)) dismissHint();
  } else if (event.key === 'End') {
    event.preventDefault();
    if (stage.go(stage.total - 1)) dismissHint();
  }
});

stage.enter();
document.documentElement.dataset['booted'] = 'true';

if (import.meta.env.DEV) {
  // Animation work is hard to inspect when rAF is throttled; expose the handles.
  Object.assign(window, { __gsap: gsap, __stage: stage });
}
