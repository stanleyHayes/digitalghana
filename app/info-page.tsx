import type { ReactNode } from "react";

export function InfoPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Digital Ghana home">
          <span className="mark" aria-hidden="true"><i /><i /><i /></span>
          Digital Ghana
        </a>
        <nav aria-label="Main navigation"><a href="/">Projects</a><a href="/status">Status</a><a href="https://github.com/stanleyHayes/digitalghana">GitHub</a></nav>
      </header>
      <article className="info-page">
        <header className="info-hero">
          <p className="kicker">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </header>
        <div className="info-body">{children}</div>
      </article>
      <footer className="compact-footer"><a href="/">← Return to the portfolio</a><span>Digital Ghana · built in public</span></footer>
    </main>
  );
}
