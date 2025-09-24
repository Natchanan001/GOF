import type { GameState } from "./types";
import type { ScoreRule } from "./rules/ScoreRule";

export interface ScoreDetail {
  label: string;
  points: number;
}

export interface ScoreResult {
  total: number;
  details: ScoreDetail[];
}

export class ScoreCalculator {
  constructor(private readonly rules: ScoreRule[]) {}

  calculate(state: GameState): ScoreResult {
    const details = this.rules.map((r) => ({
      label: r.label,
      points: r.compute(state),
    }));
    const total = details.reduce((sum, d) => sum + d.points, 0);
    return { total, details };
  }
}
