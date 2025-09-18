import React from "react";
import PageHero from "../components/PageHero";

export default function Home() {
  return (
    <main>
      <PageHero
        eyebrow="Growth Co."
        title="Ship. Measure. Optimize. Repeat."
        subtitle="A fast, focused operating cadence across Traffic, Conversion, AI, and Retention — always tied to revenue."
        theme="light"
        ctas={[
          { label: "Playbooks", to: "/playbooks" },
          { label: "Book a Call", to: "/book-a-call", variant: "ghost" }
        ]}
      />
    </main>
  );
}
