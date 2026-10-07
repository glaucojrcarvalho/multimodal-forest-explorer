interface Props {
  value?: number;
}

export function UncertaintyIndicator({ value }: Props) {
  if (value === undefined) {
    return <span className="uncertaintyIndicator">Uncertainty not reported</span>;
  }

  const normalized = Math.max(0, Math.min(1, value));
  const percent = Math.round(normalized * 100);

  return (
    <span
      className="uncertaintyIndicator"
      aria-label={`Illustrative uncertainty ${percent} percent`}
    >
      Illustrative uncertainty: {percent}%
    </span>
  );
}
