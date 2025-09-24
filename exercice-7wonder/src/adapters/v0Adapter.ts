/**
 * Demo adapter that wires the Strategy calculator to the baseline v0 function.
 * This keeps parity while you split rules incrementally.
 */
import type { GameState } from "../types";
import { ScoreCalculator } from "../ScoreCalculator";
import { BaselineV0Rule } from "../rules/BaselineV0Rule";
// IMPORTANT: the following import path assumes this file is placed next to score_v0.ts in the project root.
// When copying into your repo, adjust the relative path if needed.
import { computeTotalScoreV0 } from "../../score_v0";

export function computeTotalScoreWithStrategyAdapter(state: GameState) {
  const calc = new ScoreCalculator([ new BaselineV0Rule(computeTotalScoreV0) ]);
  return calc.calculate(state);
}
