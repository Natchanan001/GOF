import type { GameState } from "../types";
import type { ScoreRule } from "./ScoreRule";

/**
 * Adapter rule that delegates to the baseline function (v0)
 * to guarantee identical totals on day one.
 */
export class BaselineV0Rule implements ScoreRule {
  public readonly label = "baseline_v0";
  private readonly baseline: (state: GameState) => { total: number; details?: any };

  constructor(baseline: (state: GameState) => { total: number; details?: any }) {
    this.baseline = baseline;
  }

  compute(state: GameState): number {
    const result = this.baseline(state);
    return result.total;
  }
}
