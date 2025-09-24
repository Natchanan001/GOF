# CHALLENGES.md — Key Challenges & How We Address Them

- **Monolithic baseline**: The baseline solution aggregates all rules in one place (“god function”), which is hard to evolve.
  - *Mitigation*: Strategy per rule + aggregator (`ScoreCalculator`) and gradual migration from the baseline.

- **Extensibility without regressions**: Adding rules should not require editing the central function and should not break existing behavior.
  - *Mitigation*: Open/Closed via Strategy; parity kept using a `BaselineV0Rule` during the transition; tests guard regression.

- **Readability & naming**: Categories and formulas should be discoverable and self-explanatory.
  - *Mitigation*: One class/file per rule with clear names and docstrings.

- **Testing & coverage**: Some rules (e.g., Science) have tricky combinations (sets, factorial-like/hyper‑combinatorial scoring). Coins rounds down by 3; military wins & losses combine; etc.
  - *Mitigation*: Unit tests per rule; property/edge tests for set maths; snapshot/fixture tests at aggregator level.

- **Data contract stability**: Different rules require different slices of state.
  - *Mitigation*: Define `GameState` type gradually; rule constructors can accept selectors/derivers to isolate state shape changes.

- **Future variants/expansions**: Different editions or expansions can toggle/add rules.
  - *Mitigation*: Factory/Composite to bundle rules per edition; DI container or simple builders to assemble calculators.
