import type { Metadata } from "next";
import registry from "../../portfolio/products.json";
import { InfoPage } from "../info-page";

export const metadata: Metadata = { title: "Roadmap — Digital Ghana", description: "The delivery order and readiness gates for the Digital Ghana portfolio." };

export default function RoadmapPage() {
  const products = registry.products.filter((product) => !["portfolio", "data"].includes(product.id)).sort((a, b) => a.order - b.order);
  return (
    <InfoPage eyebrow="Delivery roadmap" title="Sequence before scale." intro="Projects launch independently. The order follows public value, source readiness, operational risk, and what earlier products teach us.">
      <ol className="roadmap-list">{products.map((product, index) => <li key={product.id}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{product.name}</h2><p>{product.notes}</p></div><b>{product.lifecycle.replace("_", " ")}</b></li>)}</ol>
      <aside className="notice"><strong>GhanaData entry gate</strong><p>The unified gateway waits until at least three domain products are stable, shared identity has two real consumers, cross-product demand is measured, and an operating budget is approved.</p></aside>
    </InfoPage>
  );
}
