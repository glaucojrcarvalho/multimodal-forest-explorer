import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Ethics | Forest Intelligence Explorer",
  description:
    "Public data, ecological sensitivity, provenance, and responsible AI principles for the Forest Intelligence Explorer prototype."
};

export default function EthicsPage() {
  return (
    <main className="policyPage">
      <div className="shell policyContent">
        <p className="eyebrow">Responsible publication</p>
        <h1>Data ethics</h1>
        <p className="policyLead">
          Forest and biodiversity data can carry ecological, geographic, and
          personal risks. This prototype uses synthetic data by default and
          treats provenance as a product requirement.
        </p>

        <section>
          <h2>Public-data rule</h2>
          <p>
            Only public, synthetic, or explicitly reusable data belongs in the
            public prototype. Public visibility alone is not treated as permission
            to redistribute a dataset or media asset.
          </p>
        </section>

        <section>
          <h2>Ecological sensitivity</h2>
          <p>
            Precise locations of vulnerable species, nests, habitats, or protected
            sites can be sensitive. Real observations should be generalized or
            withheld when publication could enable disturbance or other harm.
          </p>
        </section>

        <section>
          <h2>AI outputs</h2>
          <p>
            Predictions are candidate interpretations, not ground truth. Any future
            empirical model output should expose its validation basis, uncertainty,
            and data origin instead of presenting an interface visualization as a
            scientific finding.
          </p>
        </section>

        <a className="textLink" href="/">← Back to explorer</a>
      </div>
    </main>
  );
}
