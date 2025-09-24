# DESIGN.md — 7 Wonders Scoring (Strategy Starter)

## Why Strategy Pattern?
Each scoring category (Military, Coins, Wonder, Civilian, Science, Commercial, Guilds, etc.) is an independent rule over the same game state. A **Strategy** encapsulates one rule with a common interface:

```ts
interface ScoreRule {
  label: string;
  compute(state: GameState): number;
}
```

A `ScoreCalculator` accepts a list of `ScoreRule`s, invokes them, and aggregates the result:
```ts
const calc = new ScoreCalculator([
  new MilitaryRule(), new CoinsRule(), /* ... */
]);
const { total, details } = calc.calculate(state);
```

### Open/Closed Principle (OCP)
- **Open for extension:** add a new rule by creating a new class that implements `ScoreRule`.
- **Closed for modification:** existing rules and the aggregator do not change when adding a new rule.

### Benefits
- Testability per rule (small, focused unit tests).
- Clear naming and ownership of logic per category.
- Easy to enable/disable rules (e.g., for expansions) or group rules (Composite).
- Pluggable creation (Factory) if different rule sets are needed.

## Migration Plan (non‑breaking)
1. **Keep the baseline function** `computeTotalScoreV0(state)` for parity.
2. Introduce a `BaselineV0Rule` that delegates to the baseline function. This guarantees the **same total** as v0 from day one.
3. Gradually split logic into dedicated rules (e.g., `MilitaryRule`, `CoinsRule`, `ScienceRule`), replacing the single baseline rule. Keep tests green at each step.

## Data Contract
This starter keeps `GameState` generic (`any`) to avoid breaking the baseline. When refactoring, extract a minimal typed shape used across rules (e.g., `militaryWins`, `militaryLosses`, `coins`, `scienceSymbols`, ...). Keep it additive so the baseline still compiles until fully migrated.

## Directory Layout (proposed)
```
src/
  types.ts
  ScoreCalculator.ts
  rules/
    ScoreRule.ts
    BaselineV0Rule.ts
    MilitaryRule.ts       // TODO: implement
    CoinsRule.ts          // TODO: implement
  adapters/
    v0Adapter.ts          // demo usage and adapter
score_strategy_demo.ts     // runnable demo with Bun
```

## Example Usage
```ts
import { ScoreCalculator } from "./src/ScoreCalculator";
import { BaselineV0Rule } from "./src/rules/BaselineV0Rule";
import { computeTotalScoreV0 } from "./score_v0";

const calc = new ScoreCalculator([ new BaselineV0Rule(computeTotalScoreV0) ]);
const result = calc.calculate(someState);
// result.total equals computeTotalScoreV0(someState).total
```
