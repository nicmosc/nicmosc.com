import { escape } from '../html';
import type { Article, Cv, Degree, Entry, Link, Pair } from './data';

const anchor = (link: Link): string =>
  `<a href="${escape(link.href)}">${escape(link.label)}</a>`;

const section = (title: string, body: string): string =>
  `<section class="cv-section"><h2>${escape(title)}</h2><div class="cv-body">${body}</div></section>`;

const pairs = (items: Pair[]): string =>
  `<dl class="cv-dl">${items
    .map((item) => `<dt>${escape(item.term)}</dt><dd>${escape(item.detail)}</dd>`)
    .join('')}</dl>`;

const renderEntry = (entry: Entry): string => {
  const summary =
    entry.summary === undefined ? '' : `<p class="entry__summary">${escape(entry.summary)}</p>`;
  return `<article class="entry">
    <header class="entry__head">
      <h3>${escape(entry.title)}<span class="entry__org">${escape(entry.org)}</span></h3>
      <p class="entry__meta">${escape(entry.period)} · ${escape(entry.location)}</p>
    </header>
    ${summary}<ul>${entry.points.map((point) => `<li>${escape(point)}</li>`).join('')}</ul>
  </article>`;
};

const renderArticle = (article: Article): string =>
  `<li><a href="${escape(article.href)}">${escape(article.title)}</a><span class="cv-meta">${escape(article.outlet)} · ${escape(article.date)}</span></li>`;

const renderDegree = (degree: Degree): string => {
  const note =
    degree.thesis === undefined
      ? ''
      : `<p class="entry__summary">Thesis: ${anchor(degree.thesis)}</p>`;
  return `<article class="entry">
    <header class="entry__head">
      <h3>${escape(degree.degree)}<span class="entry__org">${escape(degree.school)}</span></h3>
      <p class="entry__meta">${escape(degree.period)}</p>
    </header>
    ${note}
  </article>`;
};

export function renderCv(cv: Cv): string {
  const contact = [
    `<li>${escape(cv.location)}</li>`,
    ...cv.contact.map((link) => `<li>${anchor(link)}</li>`),
  ].join('');

  return [
    `<header class="cv-head">
      <h1>${escape(cv.name)}</h1>
      <p class="cv-headline">${escape(cv.headline)}</p>
      <ul class="cv-contact">${contact}</ul>
    </header>`,
    section('profile', cv.profile.map((p) => `<p>${escape(p)}</p>`).join('')),
    section('experience', cv.experience.map(renderEntry).join('')),
    section('writing', `<ul class="cv-list">${cv.writing.map(renderArticle).join('')}</ul>`),
    section('skills', pairs(cv.skills)),
    section('education', cv.education.map(renderDegree).join('')),
    section(
      'personal',
      `${pairs(cv.personal)}<p class="cv-projects">Side projects on ${anchor(cv.projects)}</p>`,
    ),
    `<footer class="cv-foot">Updated ${escape(cv.updated)} · <a href="https://nicmosc.com/cv/">nicmosc.com/cv</a></footer>`,
  ].join('');
}
