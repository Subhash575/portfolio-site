import React from "react";

export function PersonJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Subhash Rana",
    jobTitle: "Full Stack Developer",
    url: "https://subhashrana.dev",
    sameAs: [
      "https://github.com/[handle]", // TODO: Update GitHub handle
      "https://linkedin.com/in/[handle]", // TODO: Update LinkedIn handle
      "https://twitter.com/[handle]", // TODO: Update Twitter handle
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
