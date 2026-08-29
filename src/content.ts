/**
 * `statement` is the loud default. `label` is the small caption that titles a
 * state, `note` the quiet aside beneath one. Links get their own scale so a
 * long article title doesn't render at headline size.
 */
export type LineKind = 'statement' | 'label' | 'note';

export interface Line {
  /** The resolved text a visitor ends up reading. */
  text: string;
  kind?: LineKind;
  /** Present when the line is a real link. */
  href?: string;
  /** Shown on hover for links — the line decodes into this, then back. */
  hover?: string;
}

export interface State {
  id: string;
  lines: Line[];
}

export const STATES: State[] = [
  {
    id: 'hello',
    lines: [{ text: "hi i'm nic" }],
  },
  {
    id: 'now',
    lines: [
      { text: 'currently', kind: 'label' },
      { text: 'staff frontend engineer' },
      { text: 'sortlist \u00b7 brussels', kind: 'note' },
    ],
  },
  {
    id: 'craft',
    lines: [
      { text: 'what i know', kind: 'label' },
      { text: 'frontend' },
      { text: 'devops' },
      { text: 'ai automation' },
    ],
  },
  {
    id: 'writing',
    lines: [
      { text: 'writing', kind: 'label' },
      {
        text: 'turning everyone into a contributor',
        href: 'https://medium.com/sortlist-engineering/the-tool-that-turned-everyone-into-a-contributor-dbd9b075113b',
        hover: 'medium.com/sortlist-engineering',
      },
      {
        text: 'a/b testing at scale',
        href: 'https://levelup.gitconnected.com/a-b-testing-at-scale-how-we-serve-variations-to-millions-with-cloudflare-workers-and-next-js-83653bae2070',
        hover: 'levelup.gitconnected.com',
      },
      {
        text: 'smart monorepos',
        href: 'https://levelup.gitconnected.com/smart-monorepos-determining-impact-from-deep-dependency-changes-in-typescript-a5516f34b471',
        hover: 'levelup.gitconnected.com',
      },
    ],
  },
  {
    id: 'contact',
    lines: [
      { text: 'say hello', kind: 'label' },
      // The address is already the destination, so there is nothing to reveal.
      { text: 'nmoscholios@gmail.com', href: 'mailto:nmoscholios@gmail.com' },
      { text: 'github', href: 'https://github.com/nicmosc', hover: 'github.com/nicmosc' },
      {
        text: 'linkedin',
        href: 'https://www.linkedin.com/in/nicolaosmoscholios/',
        hover: 'in/nicolaosmoscholios',
      },
    ],
  },
];

/** Pool size for the reusable line nodes in the stage. */
export const MAX_LINES = STATES.reduce((max, s) => Math.max(max, s.lines.length), 0);
