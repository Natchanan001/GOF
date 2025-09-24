import type { GameState } from "../types";
import type { ScoreRule } from "./ScoreRule";

/**
 * TODO: Replace placeholder with real coin rounding logic (down by 3).
 */
export class CoinsRule implements ScoreRule {
  public readonly label = "coins";
  compute(state: GameState): number {
    // Example (pseudo):
    // const coins = state.coins ?? 0;
    // return Math.floor(coins / 3);
    return 0;
  }
}
