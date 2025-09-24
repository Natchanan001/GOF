import type { GameState } from "../types";
import type { ScoreRule } from "./ScoreRule";

/**
 * TODO: Replace placeholder with real military logic.
 * Keep returning 0 until migrated, so totals stay defined by BaselineV0Rule.
 */
export class MilitaryRule implements ScoreRule {
  public readonly label = "military";
  compute(state: GameState): number {
    // Example (pseudo):
    // const wins = state.military?.wins ?? 0;
    // const losses = state.military?.losses ?? 0;
    // return wins * 1 + /* ... */ - losses * 1;
    return 0;
  }
}
