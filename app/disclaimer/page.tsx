import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Disclaimer",
  description:
    "Independence, provenance, and scientific-claim boundaries for Forest Intelligence Explorer."
};

export default function DisclaimerPage() {
  return (
    <main className="policyPage">
      <div className="shell policyContent">
        <p className="eyebrow">Independent prototype</p>
        <h1>Research disclaimer</h1>
        <p className="policyLead">
          Forest Intelligence Explorer is an independent software and research prototype.
          It is not an official project of NIBIO, NMBU, SmartForest, SingleTree, or any
          researcher referenced by public source material.
        </p>

        <section>
          <h2>Real data and public sources</h2>
          <p>
            The current 3D showcase uses small, source-traceable derivatives of the public
            FOR-age dataset. The original LAZ archives remain with the source provider.
            Public research pages and publications are used for attribution and research context.
          </p>
        </section>

        <section>
          <h2>No private research material</h2>
          <p>
            No private correspondence, application material, unpublished research,
            restricted datasets, credentials, or institution-internal information is included.
          </p>
        </section>

        <section>
          <h2>Scientific-claim boundary</h2>
          <p>
            Published benchmark values are identified as published results. The prototype
            does not present its own model predictions as validated scientific findings.
            Planned modalities remain labeled as roadmap items until real, reusable data is integrated.
          </p>
        </section>

        <a className="textLink" href="/">← Back to explorer</a>
      </div>
    </main>
  );
}
