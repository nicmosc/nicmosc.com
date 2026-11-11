export interface Link {
  label: string;
  href: string;
}

export interface Entry {
  title: string;
  org: string;
  location: string;
  period: string;
  summary?: string;
  points: string[];
}

export interface Article {
  title: string;
  outlet: string;
  date: string;
  href: string;
}

export interface Pair {
  term: string;
  detail: string;
}

export interface Degree {
  degree: string;
  school: string;
  period: string;
  thesis?: Link;
}

export interface Cv {
  name: string;
  headline: string;
  location: string;
  updated: string;
  contact: Link[];
  profile: string[];
  experience: Entry[];
  writing: Article[];
  skills: Pair[];
  education: Degree[];
  personal: Pair[];
  projects: Link;
}

export const CV: Cv = {
  name: 'Nicolaos Moscholios',
  headline: 'Staff Engineer · Platform & Agent Engineering',
  location: 'Wavre area, Belgium',
  updated: 'November 2026',
  contact: [
    { label: 'nmoscholios@gmail.com', href: 'mailto:nmoscholios@gmail.com' },
    { label: 'nicmosc.com', href: 'https://nicmosc.com/' },
    { label: 'github.com/nicmosc', href: 'https://github.com/nicmosc' },
    {
      label: 'linkedin.com/in/nicolaosmoscholios',
      href: 'https://www.linkedin.com/in/nicolaosmoscholios/',
    },
  ],
  profile: [
    "I'm a highly motivated engineer with an eye for detail. Over the years I've become especially proficient in frontend frameworks, working with the latest technologies to build responsive and performant interfaces, and I've picked up a good deal of UX by working closely with UI and UX designers. I've also led teams, learning to manage projects as well as people.",
    'At Sortlist my work has moved towards DevOps and AI-first engineering: I built nearly all of the GitHub automation across our repositories, from CI/CD to releases, and an in-house coding agent that reviews, fixes and ships code alongside the team. I treat agents as engineering systems, with focused workflows, real tests and human review before anything reaches production.',
    "Since a young age I've had an interest in architecture and design, which I believe are a great complement to software engineering. Outside work I play music and build Lego, which I've done for as long as I can remember.",
  ],
  experience: [
    {
      title: 'Staff Engineer',
      org: 'Sortlist',
      location: 'Brussels',
      period: 'Feb 2024 – present',
      summary:
        'Sortlist runs a B2B marketplace and Overloop, a sales-automation SaaS. I joined as Staff Frontend Engineer and moved into DevOps and agent engineering. Member of the Engineering Council.',
      points: [
        "Put the engineering department's best practices in place, hosted knowledge-sharing sessions and workshops for the team, and coached the frontend engineers to grow their skills.",
        'Contributed to every major technical and product decision at Sortlist since joining.',
        "Built the company's in-house coding agent. Anyone can call it from Slack, GitHub, Sentry or Notion to investigate a bug, fix it or review a pull request, and product, design and data colleagues now ship changes through it.",
        "Set up the agent tooling the team uses every day: shared skills, MCP integrations and a feedback loop that keeps the agents' documentation current.",
        'Built nearly all of the GitHub automation used across our repositories, from CI/CD and releases to an AI risk check on every pull request that decides what can auto-merge.',
        'Set up the frontend monorepo, moved the design system to Tailwind and migrated end-to-end testing from Cypress to Playwright.',
        'Built edge A/B testing on Cloudflare and moved product tracking off Segment.',
      ],
    },
    {
      title: 'Staff Frontend Engineer',
      org: 'Vertuoza',
      location: 'Belgium',
      period: '2023 – Jan 2024',
      points: [
        'Led the frontend team for the core product.',
        "Coordinated work between backend, product and frontend, and set up the team's review and delivery practices.",
      ],
    },
    {
      title: 'Lead Frontend Developer',
      org: 'ABOUT YOU',
      location: 'Remote, Germany',
      period: '2022 – 2023',
      points: [
        'Promoted from Senior to Lead six months after joining a newly formed web team.',
        'Built internal and customer-facing features for a fashion platform with 30 million monthly users.',
        'Supervised all technical work, mentored each team member and got the team through time-critical launches.',
      ],
    },
    {
      title: 'Frontend Engineer',
      org: 'Drawbotics',
      location: 'Brussels',
      period: '2016 – 2022',
      points: [
        'Joined at ten people and stayed while the company grew to nearly thirty.',
        'Built the design system used across every product, along with many of the internal and client tools.',
      ],
    },
    {
      title: 'Branding and Design Project Lead',
      org: 'Barts CPTU',
      location: 'London, part-time',
      period: '2013 – 2015',
      points: ["Designed logos for cancer-prevention trials, working from each trial's research."],
    },
  ],
  writing: [
    {
      title: 'The Tool That Turned Everyone Into a Contributor',
      outlet: 'Sortlist Engineering',
      date: 'Mar 2026',
      href: 'https://medium.com/sortlist-engineering/the-tool-that-turned-everyone-into-a-contributor-dbd9b075113b',
    },
    {
      title:
        'A/B Testing at Scale: How We Serve Variations to Millions with Cloudflare Workers and Next.js',
      outlet: 'Level Up Coding',
      date: 'Apr 2025',
      href: 'https://levelup.gitconnected.com/a-b-testing-at-scale-how-we-serve-variations-to-millions-with-cloudflare-workers-and-next-js-83653bae2070',
    },
    {
      title: 'Smart Monorepos: Determining Impact from Deep Dependency Changes in TypeScript',
      outlet: 'Level Up Coding',
      date: 'Apr 2025',
      href: 'https://levelup.gitconnected.com/smart-monorepos-determining-impact-from-deep-dependency-changes-in-typescript-a5516f34b471',
    },
  ],
  skills: [
    {
      term: 'Agents',
      detail:
        'Claude Code, Codex, Anthropic and OpenAI APIs, MCP, multi-agent workflows, LLM evaluation',
    },
    {
      term: 'Platform',
      detail:
        'Kubernetes (EKS), Flux, Kustomize, Helm, Flagger, Terraform, AWS, Cloudflare Workers, GitHub Actions',
    },
    { term: 'Observability', detail: 'Grafana, Loki, Prometheus, Sentry' },
    { term: 'Languages', detail: 'TypeScript, Go, Ruby on Rails, GraphQL' },
    { term: 'Frontend', detail: 'React, Next.js, Vite, Tailwind, Apollo, design systems' },
    { term: 'Testing', detail: 'Playwright, Jest, Vitest, Lighthouse' },
  ],
  education: [
    {
      degree: 'MSc Computer Science, Distinction',
      school: 'University of Oxford',
      period: '2015 – 2016',
      thesis: {
        label: 'English to British Sign Language translation with a 3D signing avatar',
        href: 'https://github.com/nicmosc/BSL/blob/master/static/res/misc/Moscholios-thesis.pdf',
      },
    },
    {
      degree: 'BSc Computer Science, First Class Honours',
      school: 'Queen Mary University of London',
      period: '2012 – 2015',
    },
  ],
  personal: [
    {
      term: 'Languages',
      detail: 'Italian and French (native), English (full professional), Greek (limited)',
    },
    { term: 'Interests', detail: 'Lego, piano, horror films, electronic and classical music' },
  ],
  projects: { label: 'github.com/nicmosc', href: 'https://github.com/nicmosc' },
};
