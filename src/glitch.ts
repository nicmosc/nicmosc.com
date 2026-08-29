import { prefersReducedMotion } from './motion';

/** Distance from the edge of a line at which fringing starts to show. */
const RADIUS = 110;
/**
 * One frame per 50ms. This is a flicker effect, so the cap is an accessibility
 * limit rather than a performance one: it keeps us under the WCAG three-
 * flashes-per-second threshold.
 */
const FRAME_MS = 50;
/** Peak opacity of a colour channel. A fringe, not a second copy of the text. */
const MAX_ALPHA = 0.85;
/**
 * Peak channel separation. This matters more than alpha: the text is near
 * white and `screen` over white is a no-op, so the colour only reads in the
 * fringe where an offset copy extends past the glyph. Widen the fringe and
 * the whole effect gets more visible.
 */
const MAX_SHIFT = 6;
const SLICE_CHANCE = 0.2;
const AWAY = -1e5;

interface Target {
  el: HTMLElement;
  left: number;
  top: number;
  right: number;
  bottom: number;
  lit: boolean;
}

const rand = (n: number): number => (Math.random() * 2 - 1) * n;

/**
 * Chromatic aberration that intensifies as the pointer approaches, built the
 * way GSAP's own glitch demos do it: two pseudo-element copies of the text
 * blended over the original, displaced by custom properties. The text node is
 * never touched, so this composites on the GPU and can't fight a scramble
 * tween over the same characters.
 *
 * Only ever attached to lines that aren't links — a link owns its own hover.
 */
export class ProximityGlitch {
  private targets: Target[] = [];
  private pointerX = AWAY;
  private pointerY = AWAY;
  private frame = 0;
  private last = 0;
  private readonly enabled: boolean;

  constructor(private readonly radius = RADIUS) {
    this.enabled =
      !prefersReducedMotion() && window.matchMedia('(pointer: fine)').matches;
    if (!this.enabled) return;

    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    document.addEventListener('pointerleave', this.onPointerLeave);
    window.addEventListener('resize', this.measure, { passive: true });
  }

  attach(hosts: HTMLElement[]): void {
    if (!this.enabled) return;
    this.detach();
    this.targets = hosts.map((el) => {
      // The pseudo-elements read their content from here.
      el.dataset['glitch'] = el.textContent ?? '';
      return { el, left: 0, top: 0, right: 0, bottom: 0, lit: false };
    });
    this.measure();
    this.start();
  }

  detach(): void {
    if (!this.enabled) return;
    this.stop();
    for (const target of this.targets) this.clear(target);
    this.targets = [];
  }

  private clear(target: Target): void {
    delete target.el.dataset['glitch'];
    target.el.style.removeProperty('--gi');
    target.el.style.removeProperty('--gx');
    target.el.style.removeProperty('--gy');
    target.el.style.removeProperty('--ga');
    target.el.style.removeProperty('--gb');
    target.lit = false;
  }

  private measure = (): void => {
    for (const target of this.targets) {
      const rect = target.el.getBoundingClientRect();
      target.left = rect.left;
      target.top = rect.top;
      target.right = rect.right;
      target.bottom = rect.bottom;
    }
  };

  private onPointerMove = (event: PointerEvent): void => {
    this.pointerX = event.clientX;
    this.pointerY = event.clientY;
    this.start();
  };

  private onPointerLeave = (): void => {
    this.pointerX = AWAY;
    this.pointerY = AWAY;
  };

  private start(): void {
    if (this.frame !== 0 || this.targets.length === 0) return;
    this.frame = requestAnimationFrame(this.tick);
  }

  private stop(): void {
    if (this.frame === 0) return;
    cancelAnimationFrame(this.frame);
    this.frame = 0;
  }

  private tick = (now: number): void => {
    if (now - this.last < FRAME_MS) {
      this.frame = requestAnimationFrame(this.tick);
      return;
    }
    this.last = now;

    let settled = true;

    for (const target of this.targets) {
      // Distance to the nearest edge of the line, so sitting anywhere over a
      // long title reads as fully lit rather than only at its midpoint.
      const dx = Math.max(target.left - this.pointerX, 0, this.pointerX - target.right);
      const dy = Math.max(target.top - this.pointerY, 0, this.pointerY - target.bottom);
      const distance = Math.sqrt(dx * dx + dy * dy);
      const linear = 1 - distance / this.radius;

      if (linear <= 0) {
        if (target.lit) this.reset(target);
        continue;
      }

      settled = false;
      // Squared falloff keeps the approach quiet and the arrival sharp.
      const intensity = linear * linear;
      const style = target.el.style;

      // Position the spotlight in the line's own coordinates, so the fringing
      // is strongest under the pointer and falls away along the line.
      style.setProperty('--mx', `${(this.pointerX - target.left).toFixed(1)}px`);
      style.setProperty('--my', `${(this.pointerY - target.top).toFixed(1)}px`);
      style.setProperty('--gi', (intensity * MAX_ALPHA).toFixed(3));
      style.setProperty('--gx', `${rand(intensity * MAX_SHIFT).toFixed(2)}px`);
      style.setProperty('--gy', `${rand(intensity * MAX_SHIFT * 0.35).toFixed(2)}px`);

      // Scan slices fire in bursts rather than every frame.
      style.setProperty('--ga', Math.random() < SLICE_CHANCE * intensity ? band() : 'inset(0)');
      style.setProperty('--gb', Math.random() < SLICE_CHANCE * intensity ? band() : 'inset(0)');
      target.lit = true;
    }

    if (settled) {
      this.frame = 0;
      return;
    }
    this.frame = requestAnimationFrame(this.tick);
  };

  private reset(target: Target): void {
    const { style } = target.el;
    style.setProperty('--gi', '0');
    style.setProperty('--ga', 'inset(0)');
    style.setProperty('--gb', 'inset(0)');
    target.lit = false;
  }
}

/** A random horizontal band, as a clip-path inset. */
function band(): string {
  const top = Math.random() * 70;
  const height = 8 + Math.random() * 22;
  return `inset(${top.toFixed(0)}% 0 ${Math.max(0, 100 - top - height).toFixed(0)}% 0)`;
}
