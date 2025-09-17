import React from "react";
import PageHero from "../components/PageHero";
import FeatureBlocks from "../components/FeatureBlocks";

export default function GenericPage({ content }) {
  const { eyebrow, title, subtitle, theme, features } = content;
  return (
    <main>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        theme={theme}
        ctas={[
          { label: "Playbooks", to: "/playbooks" },
          { label: "Book a Call", to: "/book-a-call", variant: "ghost" }
        ]}
      />
      <FeatureBlocks theme={theme} items={features} />
    </main>
  );
}
