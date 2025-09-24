//เทส
import { computeTotalScoreV0 } from "./score_v0";
import { computeTotalScoreWithStrategyAdapter } from "./src/adapters/v0Adapter";


const state: any = {
  coins: 8,
  military: { wins: 2, losses: 1 },
  science: { tablets: 1, compasses: 1, gears: 1 },
};

const baseline = computeTotalScoreV0(state);
const strategy  = computeTotalScoreWithStrategyAdapter(state);

console.log("[baseline v0]", baseline);
console.log("[strategy adapter]", strategy);
