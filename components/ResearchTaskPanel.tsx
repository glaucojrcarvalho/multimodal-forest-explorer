import { FOR_AGE } from "../data/for-age";

const tasks = [
  {
    id: "age",
    label: "Tree age estimation",
    status: "Published benchmark",
    title: "Estimate individual-tree age from dense 3D structure.",
    description:
      "FOR-age evaluates non-destructive age estimation from individual-tree laser-scanning point clouds using linear baselines, PointTransformerV3, and ForestFormer3D-based fine-tuning.",
    metrics: [
      ["Best reported RMSE", "≈21 years"],
      ["Best reported R²", "≈0.74"],
      ["Target", "tree age"]
    ],
    source: FOR_AGE.paperUrl,
    sourceLabel: "Puliti et al. 2026"
  },
  {
    id: "segmentation",
    label: "Individual-tree segmentation",
    status: "Published method",
    title: "Move from forest point clouds to tree-level objects.",
    description:
      "ForestFormer3D is an end-to-end framework for panoptic segmentation of 3D forest point clouds. In the FOR-age study, pretrained ForestFormer3D representations are reused for downstream age regression.",
    metrics: [
      ["Input", "3D forest point cloud"],
      ["Output", "tree instances"],
      ["Role here", "upstream task"]
    ],
    source: "https://github.com/SmartForest-no/ForestFormer3D",
    sourceLabel: "ForestFormer3D"
  }
] as const;

export function ResearchTaskPanel() {
  return (
    <section className="taskPanel" aria-labelledby="tasks-title">
      <div className="taskIntro">
        <p className="eyebrow">Research tasks</p>
        <h2 id="tasks-title">The interface follows published tasks, not invented AI outputs.</h2>
        <p>
          Each task below is tied to public research. Model metrics are shown only when
          they are reported by the source publication.
        </p>
      </div>

      <div className="taskGrid">
        {tasks.map((task) => (
          <article className="taskCard" key={task.id}>
            <div className="taskCardTop">
              <span>{task.label}</span>
              <span>{task.status}</span>
            </div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <dl>
              {task.metrics.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <a href={task.source} target="_blank" rel="noreferrer">
              {task.sourceLabel} ↗
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
