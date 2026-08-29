import { gsap, prefersReducedMotion, scrambleTo } from './motion';
import { MAX_LINES, STATES, type Line } from './content';
import { ProximityGlitch } from './glitch';

const finePointer = window.matchMedia('(pointer: fine)');

/**
 * One reusable row in the stage. Rows are anchors so that link states get real
 * navigation (middle-click, open-in-new-tab) rather than synthetic click
 * handlers; an anchor without an href behaves like a div and drops out of the
 * tab order on its own.
 */
class LineNode {
  readonly root: HTMLAnchorElement;
  private readonly visible: HTMLSpanElement;
  private readonly label: HTMLSpanElement;
  private line: Line | undefined;
  private hoverTween: gsap.core.Tween | undefined;

  constructor() {
    this.root = document.createElement('a');
    this.root.className = 'line';

    this.visible = document.createElement('span');
    this.visible.className = 'line__text';
    // The scrambling characters are noise to a screen reader.
    this.visible.setAttribute('aria-hidden', 'true');

    this.label = document.createElement('span');
    this.label.className = 'sr-only';

    this.root.append(this.visible, this.label);
    this.root.addEventListener('mouseenter', this.onEnter);
    this.root.addEventListener('mouseleave', this.onLeave);
    this.root.addEventListener('focus', this.onEnter);
    this.root.addEventListener('blur', this.onLeave);
  }

  /** Applies a line's semantics immediately; the text itself animates separately. */
  bind(line: Line | undefined): void {
    this.line = line;
    this.hoverTween?.kill();
    this.hoverTween = undefined;
    this.label.textContent = line?.text ?? '';

    if (line?.href) {
      this.root.href = line.href;
      const external = !line.href.startsWith('mailto:');
      if (external) {
        this.root.target = '_blank';
        this.root.rel = 'noreferrer noopener';
      } else {
        this.root.removeAttribute('target');
        this.root.removeAttribute('rel');
      }
    } else {
      this.root.removeAttribute('href');
      this.root.removeAttribute('target');
      this.root.removeAttribute('rel');
    }

    // A hover swaps in text of a different length. Left to size itself, the
    // box would shrink out from under the cursor, fire mouseleave, grow back,
    // fire mouseenter, and oscillate forever. Reserving the wider of the two
    // up front keeps the hit area still. `ch` is exact here because the face
    // is monospace; the min() stops a long title overflowing a narrow screen.
    if (line?.hover !== undefined) {
      const widest = Math.max(line.text.length, line.hover.length);
      this.root.style.minWidth = `min(${widest}ch, 100%)`;
    } else {
      this.root.style.removeProperty('min-width');
    }

    const kind = line?.kind ?? 'statement';
    this.root.classList.toggle('line--label', kind === 'label');
    this.root.classList.toggle('line--note', kind === 'note');
    this.root.classList.toggle('line--link', line?.href !== undefined);
    this.root.classList.toggle('line--empty', line === undefined);
  }

  scrambleTo(text: string): gsap.core.Tween {
    return scrambleTo(this.visible, text);
  }

  get textEl(): HTMLElement {
    return this.visible;
  }

  get hasText(): boolean {
    return this.line !== undefined;
  }

  /**
   * The colour layers render `data-glitch`, not the text node, so a hover
   * decode has to keep the two in step or the fringe would ghost the old
   * string behind the new one.
   */
  private syncGlitch = (): void => {
    if (this.visible.dataset['glitch'] === undefined) return;
    this.visible.dataset['glitch'] = this.visible.textContent ?? '';
  };

  /** Hovering a link decodes its label into where it actually goes. */
  private onEnter = (): void => {
    const { line } = this;
    if (line?.hover === undefined || prefersReducedMotion() || !finePointer.matches) return;
    this.hoverTween?.kill();
    this.hoverTween = scrambleTo(this.visible, line.hover, {
      duration: 0.4,
      speed: 1,
      onUpdate: this.syncGlitch,
    });
  };

  private onLeave = (): void => {
    const { line } = this;
    if (line?.hover === undefined || prefersReducedMotion() || !finePointer.matches) return;
    this.hoverTween?.kill();
    this.hoverTween = scrambleTo(this.visible, line.text, {
      duration: 0.4,
      speed: 1,
      onUpdate: this.syncGlitch,
    });
  };
}

export class Stage {
  private readonly nodes: LineNode[];
  private readonly glitch = new ProximityGlitch();
  private index = 0;
  private busy = false;

  constructor(private readonly root: HTMLElement) {
    this.nodes = Array.from({ length: MAX_LINES }, () => new LineNode());
    this.root.append(...this.nodes.map((n) => n.root));
  }

  get total(): number {
    return STATES.length;
  }

  get current(): number {
    return this.index;
  }

  /** First paint: everything decodes in from noise, so there is no loading state. */
  enter(): void {
    this.apply(0, 1);
  }

  go(next: number): boolean {
    const clamped = gsap.utils.clamp(0, STATES.length - 1, next);
    if (this.busy || clamped === this.index) return false;
    const direction = clamped > this.index ? 1 : -1;
    this.index = clamped;
    this.apply(clamped, direction);
    return true;
  }

  advance(direction: number): boolean {
    return this.go(this.index + direction);
  }

  private apply(stateIndex: number, direction: number): void {
    const state = STATES[stateIndex];
    if (state === undefined) return;

    this.busy = true;
    // Release the lines before tweening them, and reclaim them once they settle.
    this.glitch.detach();
    const timeline = gsap.timeline({
      onComplete: () => {
        this.busy = false;
        this.glitch.attach(this.nodes.filter((n) => n.hasText).map((n) => n.textEl));
      },
    });
    // Stagger follows travel direction, so backwards never feels like a rewind.
    const order = direction >= 0 ? this.nodes : [...this.nodes].reverse();

    order.forEach((node, i) => {
      const line = state.lines[this.nodes.indexOf(node)];
      node.bind(line);
      timeline.add(node.scrambleTo(line?.text ?? ''), i * 0.05);
    });
  }
}
