import type { Metadata } from "next";
import registry from "../../portfolio/products.json";
import { InfoPage } from "../info-page";

export const metadata: Metadata = { title: "Status — Digital Ghana", description: "Evidence-backed availability of Digital Ghana products." };

export default function StatusPage() {
  const surfaces = registry.products.flatMap((product) => product.surfaces.map((surface) => ({ ...surface, product: product.name })));
  const live = surfaces.filter((surface) => surface.state === "live");
  const planned = surfaces.filter((surface) => surface.state === "planned" && surface.canonical);
  return (
    <InfoPage eyebrow="Public status" title="What is actually available." intro="A green build is not the same as a working public service. This page reports only canonical surfaces backed by deployment evidence.">
      <section><h2>Live now</h2><div className="status-list">{live.map((surface) => <a href={`https://${surface.hostname}`} key={surface.hostname}><span><strong>{surface.product}</strong><small>{surface.kind}</small></span><b>Operational ↗</b></a>)}</div></section>
      <section><h2>Planned</h2><div className="status-list planned-list">{planned.map((surface) => <div key={surface.hostname}><span><strong>{surface.product}</strong><small>{surface.kind}</small></span><b>{surface.hostname}</b></div>)}</div></section>
      <aside className="notice"><strong>Known limitation</strong><p>The GeoGhana frontend is available, but its API and worker are not yet provisioned. Authentication, live sandbox requests, and data operations that depend on that API are not claimed as operational.</p></aside>
    </InfoPage>
  );
}
