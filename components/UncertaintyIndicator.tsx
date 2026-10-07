interface Props {
  value?: number;
}

export function UncertaintyIndicator({ value }: Props) {
  if (value === undefined) return <span>Uncertainty not reported</span>;
  const normalized = Math.max(0, Math.min(1, value));
  return (
    <span aria-label={`Uncertainty ${Math.round(normalized * 100)} percent`}>
      Uncertainty: {Math.round(normalized * 100)}%
    </span>
  );
}
