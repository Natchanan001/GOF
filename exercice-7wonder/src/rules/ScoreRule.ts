import type { GameState } from "../types";

export interface ScoreRule {
  /** Human-friendly rule name, e.g., "military" */
  readonly label: string;
  /** Compute points contributed by this rule */
  compute(state: GameState): number;
}
