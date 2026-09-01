import registry from "../portfolio/products.json";

type Surface = {
  kind: string;
  hostname: string;
  state: "planned" | "live";
  canonical: boolean;
};

type Product = {
  id: string;
  name: string;
  lifecycle: string;
  order: number;
  notes: string;
  surfaces: Surface[];
};

const descriptions: Record<string, string> = {
  geo: "Search places, resolve boundaries, and build with Ghana's geographic reference layer.",
  calendar: "Business days, holidays, and working-time rules for Ghana-aware software.",
  codes: "Shared identifier namespaces and crosswalks that help systems speak the same language.",
  gov: "A dependable directory of public institutions and the services they are responsible for.",
  validate: "Reusable validation and normalization for Ghana-specific data such as phone numbers and identifiers.",
  schools: "A canonical registry of education institutions with transparent source provenance.",
  datasets: "A searchable catalogue of public datasets, their owners, licences, and access paths.",
  essential: "Verified discovery for emergency and essential services, designed around operational safety.",
  data: "A future unified developer gateway, deliberately deferred until the underlying products are stable.",
};

function status(product: Product) {
  const live = product.surfaces.filter((surface) => surface.state === "live").length;
  if (live > 0) return { label: `${live} surface${live === 1 ? "" : "s"} live`, tone: "live" };
  if (product.lifecycle === "externally_blocked") return { label: "Blocked", tone: "blocked" };
  if (product.lifecycle === "planning" || product.lifecycle === "proposed") return { label: "Proposed", tone: "planned" };
  return { label: "Deferred", tone: "deferred" };
}

export default function Home() {
  const products = (registry.products as Product[])
    .filter((product) => product.id !== "portfolio")
    .sort((a, b) => a.order - b.order);
  const liveProducts = products.filter((product) => product.surfaces.some((surface) => surface.state === "live")).length;

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Digital Ghana home">
          <span className="mark" aria-hidden="true"><i /><i /><i /></span>
          Digital Ghana
        </a>
        <nav aria-label="Main navigation">
          <a href="#portfolio">Projects</a>
          <a href="https://github.com/stanleyHayes/digitalghana">GitHub</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <p className="kicker">Open infrastructure · built in public</p>
        <h1>Useful digital foundations,<br />made for <em>Ghana.</em></h1>
        <div className="hero-foot">
          <p>
            Digital Ghana is a growing family of open-source tools for geography, public services,
            interoperability, education, and trusted data. Each project is independent. Together,
            they make the next useful thing easier to build.
          </p>
          <dl aria-label="Portfolio summary">
            <div><dt>{products.length}</dt><dd>public projects</dd></div>
            <div><dt>{liveProducts}</dt><dd>live today</dd></div>
            <div><dt>100%</dt><dd>open source</dd></div>
          </dl>
        </div>
      </section>

      <section className="portfolio" id="portfolio" aria-labelledby="portfolio-title">
        <div className="section-heading">
          <p className="kicker">The infrastructure atlas</p>
          <h2 id="portfolio-title">One clear home for every building block.</h2>
          <p>Status comes from the public portfolio registry. “Proposed” means exactly that—not quietly launched.</p>
        </div>

        <ol className="project-rail">
          {products.map((product, index) => {
            const productStatus = status(product);
            const canonical = product.surfaces.find((surface) => surface.canonical && surface.kind !== "api" && surface.kind !== "gateway");
            const isLive = canonical?.state === "live";
            return (
              <li className={isLive ? "project is-live" : "project"} key={product.id}>
                <span className="station" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div className="project-copy">
                  <div className="project-title-row">
                    <h3>{product.name}</h3>
                    <span className={`status ${productStatus.tone}`}>{productStatus.label}</span>
                  </div>
                  <p>{descriptions[product.id] ?? product.notes}</p>
                </div>
                {canonical && (
                  isLive ? (
                    <a className="project-link" href={`https://${canonical.hostname}`}>
                      Open project <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className="project-domain" aria-label={`${canonical.hostname} is not live yet`}>
                      {canonical.hostname}
                    </span>
                  )
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section className="principles" aria-labelledby="principles-title">
        <div>
          <p className="kicker">How it works</p>
          <h2 id="principles-title">Small systems.<br />Shared standards.</h2>
        </div>
        <ul>
          <li><strong>Independent by design.</strong><span>Every product owns its releases, data, and reliability boundary.</span></li>
          <li><strong>Connected through contracts.</strong><span>Products integrate through stable APIs and datasets—not hidden database access.</span></li>
          <li><strong>Honest about readiness.</strong><span>Public status is evidence-backed, so a hostname never passes for a finished service.</span></li>
          <li><strong>Open for contribution.</strong><span>Code, decisions, and operating standards live in public repositories.</span></li>
        </ul>
      </section>

      <footer>
        <div className="footer-mark"><span className="mark" aria-hidden="true"><i /><i /><i /></span><strong>Digital Ghana</strong></div>
        <p>Public-interest software for Ghana.<br />Built openly, one dependable block at a time.</p>
        <div className="footer-links">
          <a href="https://github.com/stanleyHayes/digitalghana">Source and roadmap ↗</a>
          <a href="mailto:hello@digitalghana.dev">hello@digitalghana.dev</a>
        </div>
      </footer>
    </main>
  );
}
