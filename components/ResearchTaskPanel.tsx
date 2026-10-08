import { FOR_AGE } from "../data/for-age";

const tasks = [
  {
    id: "age",
    label: "Tree age estimation",
    status: "Published benchmark",
    title: "Estimating age from individual-tree 3D structure.",
    description:
      "FOR-age evaluates non-destructive tree-age estimation from laser-scanning point clouds using linear baselines, PointTransformerV3, and ForestFormer3D-based fine-tuning.",
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
    title: "Separating forest point clouds into tree instances.",
    description:
      "ForestFormer3D is an end-to-end framework for panoptic segmentation of 3D forest point clouds. FOR-age reuses pretrained ForestFormer3D representations for downstream age regression.",
    metrics: [
      ["Input", "3D forest point cloud"],
      ["Output", "tree instances"],
      ["Connection", "upstream segmentation"]
    ],
    source: "https://github.com/SmartForest-no/ForestFormer3D",
    sourceLabel: "ForestFormer3D"
  }
] as const;

export function ResearchTaskPanel() {
  return (
    <section className="taskPanel" aria-labelledby="tasks-title">
      <div className="taskIntro">
        <p className="eyebrow">Published research</p>
        <h2 id="tasks-title">How 3D forest structure connects to current AI research.</h2>
        <p>
          These published results provide research context for the explorer. The metrics
          shown below come from the cited studies rather than from a model running on this site.
        </p>
      </div>

      <div className="taskGrid">
        {tasks.map((task) => (
          <article className="taskCard" key={task.id}>
            <div className="taskCardTop">
              <span>{task.label}</span>
              <span>{task.status}</span>
            </div>
            <div className="referenceBadge">Published reference</div>
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
