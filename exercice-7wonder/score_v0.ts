// score_v0.ts
// Baseline (no design pattern): keep all scoring rules in one place.
// Intentionally written to be refactored by students into Strategy Pattern later.

type ScienceSymbol = 'TABLET' | 'COMPASS' | 'GEAR';

export interface PlayerStateV0 {
  playerId: string;

  // Military
  militaryTokens?: {
    age1?: number; // wins in Age I
    age2?: number; // wins in Age II
    age3?: number; // wins in Age III
    losses?: number; // total losses across ages
  };

  // Economy
  coins?: number;

  // Wonder stages sum
  wonderPoints?: number;

  // Civilian
  civilianCards?: number[]; // e.g., [3, 5, 6, ...]

  // Science
  science?: Partial<Record<ScienceSymbol, number>>;

  // Commercial summary (simplified)
  commercialFlatPoints?: number;

  // Guilds summary (simplified)
  guildsFlatPoints?: number;
}

export interface GameStateV0 {
  self: PlayerStateV0;
  // Baseline ignores neighbors for simplicity; included for future extensions.
  leftNeighbor?: PlayerStateV0;
  rightNeighbor?: PlayerStateV0;
}

export interface ScoreBreakdownV0 {
  total: number;
  details: Array<{ label: string; points: number }>;
}

/**
 * God Function: single place that aggregates all scoring rules.
 * This is intentionally "smelly" and is the starting point for refactoring.
 */
export function computeTotalScoreV0(state: GameStateV0): ScoreBreakdownV0 {
  if (!state || !state.self) {
    return { total: 0, details: [] };
  }

  const details: Array<{ label: string; points: number }> = [];

  // --- Military ---
  const m = state.self.militaryTokens ?? {};
  const age1Wins = Math.max(0, m.age1 ?? 0);
  const age2Wins = Math.max(0, m.age2 ?? 0);
  const age3Wins = Math.max(0, m.age3 ?? 0);
  const losses = Math.max(0, m.losses ?? 0);
  const militaryPoints = age1Wins * 1 + age2Wins * 3 + age3Wins * 5 - losses * 1;
  details.push({ label: 'Military', points: militaryPoints });

  // --- Coins ---
  const coins = Math.max(0, state.self.coins ?? 0);
  const coinsPoints = Math.floor(coins / 3);
  details.push({ label: 'Coins', points: coinsPoints });

  // --- Wonder ---
  const wonderPoints = Math.max(0, state.self.wonderPoints ?? 0);
  details.push({ label: 'Wonder', points: wonderPoints });

  // --- Civilian ---
  const civ = state.self.civilianCards ?? [];
  const civilianPoints = civ.reduce((sum, v) => sum + (Number.isFinite(v) ? v : 0), 0);
  details.push({ label: 'Civilian', points: civilianPoints });

  // --- Science ---
  const s = state.self.science ?? {};
  const a = Math.max(0, s.TABLET ?? 0);
  const b = Math.max(0, s.COMPASS ?? 0);
  const c = Math.max(0, s.GEAR ?? 0);
  const scienceSets = Math.min(a, b, c);
  const sciencePoints = a * a + b * b + c * c + scienceSets * 7;
  details.push({ label: 'Science', points: sciencePoints });

  // --- Commercial ---
  const commercialPoints = Math.max(0, state.self.commercialFlatPoints ?? 0);
  details.push({ label: 'Commercial', points: commercialPoints });

  // --- Guilds ---
  const guildsPoints = Math.max(0, state.self.guildsFlatPoints ?? 0);
  details.push({ label: 'Guilds', points: guildsPoints });

  // Aggregate
  const total = details.reduce((sum, d) => sum + d.points, 0);
  return { total, details };
}

// -------- Example run (you can delete this when integrating) --------
if (require.main === module) {
  const example: GameStateV0 = {
    self: {
      playerId: 'P1',
      coins: 7, // → 2 points
      militaryTokens: { age1: 2, age2: 1, age3: 0, losses: 1 }, // 2*1 + 1*3 - 1 = 4
      wonderPoints: 6,
      civilianCards: [3, 5], // 8
      science: { TABLET: 2, COMPASS: 1, GEAR: 1 }, // 4+1+1 + 7*1 = 13
      commercialFlatPoints: 2,
      guildsFlatPoints: 3
    }
  };

  const result = computeTotalScoreV0(example);
  // Total = 4 + 2 + 6 + 8 + 13 + 2 + 3 = 38
  console.log(result);
}