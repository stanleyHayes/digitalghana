import type { Metadata } from "next";
import { InfoPage } from "../info-page";

export const metadata: Metadata = { title: "Contribute — Digital Ghana", description: "How to contribute code, data-source evidence, and domain expertise to Digital Ghana." };

export default function ContributePage() {
  return (
    <InfoPage eyebrow="Contribute" title="Bring evidence, code, or context." intro="The most valuable contribution is often not a feature. It can be an authoritative source, a correction with effective dates, a failure case, or domain knowledge that prevents a confident mistake.">
      <section><h2>Choose the right repository</h2><p>Portfolio-wide standards and catalogue changes belong in Digital Ghana. Product behavior belongs in that product's repository. Start with an issue so ownership, source rights, and acceptance evidence are clear before implementation grows.</p></section>
      <section><h2>What every change needs</h2><ul className="prose-list"><li>A plain-language problem and the people affected.</li><li>Tests or evidence that prove the intended behavior.</li><li>Source and licence records for data changes.</li><li>No secrets, copied restricted datasets, or implied official endorsement.</li><li>A rollback path for deployment or publication changes.</li></ul></section>
      <div className="document-links"><a href="https://github.com/stanleyHayes/digitalghana/issues">Open or review an issue ↗</a><a href="https://github.com/stanleyHayes/digitalghana/blob/main/CONTRIBUTING.md">Contribution guide ↗</a><a href="https://github.com/stanleyHayes/digitalghana/blob/main/CODE_OF_CONDUCT.md">Code of conduct ↗</a></div>
    </InfoPage>
  );
}
