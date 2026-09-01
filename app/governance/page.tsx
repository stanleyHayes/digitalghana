import type { Metadata } from "next";
import { InfoPage } from "../info-page";

export const metadata: Metadata = { title: "Governance — Digital Ghana", description: "How Digital Ghana products make decisions and publish trusted public data." };

export default function GovernancePage() {
  return (
    <InfoPage eyebrow="Public accountability" title="Trust needs a paper trail." intro="Digital Ghana is independent open-source infrastructure. It does not imply government endorsement, and it does not turn accessible information into open data by assumption.">
      <section><h2>Product boundaries</h2><p>Each project owns its repository, data, deployments, secrets, releases, and reliability. Products connect through versioned APIs, SDKs, or published dataset artifacts—never by quietly reading one another's databases.</p></section>
      <section><h2>Source and licence policy</h2><p>Canonical records require a named authority, source reference, effective and retrieval dates, licence or written permission, transformation history, reviewer, and publication decision. Unknown licence remains unknown. Restricted data may be indexed or linked when permitted, but is not copied.</p></section>
      <section><h2>Corrections and safety</h2><p>Conflicting sources are surfaced for review. Historical changes preserve effective dates and identifier lineage. Personal data is minimized, and safety-critical contacts cannot remain verified after their review period expires.</p></section>
      <section><h2>Funding</h2><p>Digital Ghana is not currently accepting donations through an official payment rail. Any future sponsorship mechanism will publish its owner, terms, accounting boundary, and evidence here before a payment link appears.</p></section>
      <div className="document-links"><a href="https://github.com/stanleyHayes/digitalghana/blob/main/docs/governance/data-source-policy.md">Data source policy ↗</a><a href="https://github.com/stanleyHayes/digitalghana/blob/main/docs/governance/licensing-policy.md">Licensing policy ↗</a><a href="https://github.com/stanleyHayes/digitalghana/blob/main/docs/adr/0001-federated-portfolio-architecture.md">Architecture decision ↗</a></div>
    </InfoPage>
  );
}
