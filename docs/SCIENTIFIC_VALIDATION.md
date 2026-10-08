# Scientific validation

This repository contains a research-oriented visualization prototype. Visual plausibility is not evidence of scientific validity.

## Before presenting a quantitative result

1. Define the target variable and unit of analysis.
2. Document the source and sampling design of input data.
3. Define train, validation, and test partitions without leakage.
4. Select metrics before inspecting final results.
5. Report uncertainty and failure cases.
6. Compare against an appropriate baseline.
7. Preserve code, configuration, model version, and data provenance required for reproduction.
8. Distinguish measured values, labels, model predictions, and derived indicators in the interface.

## Spatial validation

Random sample splits can overestimate performance when nearby observations are correlated. Real experiments should consider spatial or site-level holdouts where appropriate.

## Multimodal models

A multimodal result should be compared with single-modality baselines to establish whether fusion provides measurable value.

## Interface policy

The stable prototype displays source-derived FOR-age tree metadata, deterministic point-cloud derivatives,
Kartverket regional context, and explicitly cited published metrics. Any future illustrative or predicted value
must be labeled by origin and must never be presented as a field measurement, validated benchmark, or research
finding unless the corresponding validation evidence is documented.
