import { defineConfig, type Plugin } from 'vite';
import { STATES, type State } from './src/content';

const escape = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * The stage is built by JavaScript, so on its own the served HTML would be an
 * empty shell — nothing for a crawler to index and nothing to read without
 * scripting. This renders the same content as static, semantic markup at build
 * time, from the one source of truth in content.ts, so the two can never drift.
 */
function renderState(state: State, index: number): string {
  const parts: string[] = [];
  let list: string[] = [];

  const flush = (): void => {
    if (list.length === 0) return;
    parts.push(`<ul>${list.join('')}</ul>`);
    list = [];
  };

  for (const line of state.lines) {
    if (line.href !== undefined) {
      list.push(`<li><a href="${escape(line.href)}">${escape(line.text)}</a></li>`);
      continue;
    }
    flush();
    const text = escape(line.text);
    if (index === 0) parts.push(`<h1>${text}</h1>`);
    else if (line.kind === 'label') parts.push(`<h2>${text}</h2>`);
    else parts.push(`<p>${text}</p>`);
  }

  flush();
  return parts.join('');
}

function staticContent(): Plugin {
  return {
    name: 'static-content',
    transformIndexHtml(html) {
      return html.replace('<!--content-->', STATES.map(renderState).join(''));
    },
  };
}

export default defineConfig({
  // Served from an apex custom domain, so assets stay at the root.
  base: '/',
  plugins: [staticContent()],
  build: { assetsInlineLimit: 0 },
});
