// score_v0.test.ts
import { computeTotalScoreV0 } from './score_v0';
import type { GameStateV0 } from './score_v0';
import { describe, expect, test } from 'bun:test';

describe('computeTotalScoreV0 (baseline)', () => {
  test('science basic cases', () => {
    const base: GameStateV0 = { self: { playerId: 'P' } as any };

    expect(
      computeTotalScoreV0({
        self: { ...base.self, science: { TABLET: 0, COMPASS: 0, GEAR: 0 } }
      }).details.find(d => d.label === 'Science')!.points
    ).toBe(0);

    expect(
      computeTotalScoreV0({
        self: { ...base.self, science: { TABLET: 1, COMPASS: 1, GEAR: 1 } }
      }).details.find(d => d.label === 'Science')!.points
    ).toBe(10); // 1+1+1 + 7

    expect(
      computeTotalScoreV0({
        self: { ...base.self, science: { TABLET: 2, COMPASS: 1, GEAR: 1 } }
      }).details.find(d => d.label === 'Science')!.points
    ).toBe(13); // 4+1+1 + 7
  });

  test('coins rounds down by 3', () => {
    const s0: GameStateV0 = { self: { playerId: 'P', coins: 0 } };
    const s2: GameStateV0 = { self: { playerId: 'P', coins: 2 } };
    const s3: GameStateV0 = { self: { playerId: 'P', coins: 3 } };
    const s5: GameStateV0 = { self: { playerId: 'P', coins: 5 } };

    const p0 = computeTotalScoreV0(s0).details.find(d => d.label === 'Coins')!.points;
    const p2 = computeTotalScoreV0(s2).details.find(d => d.label === 'Coins')!.points;
    const p3 = computeTotalScoreV0(s3).details.find(d => d.label === 'Coins')!.points;
    const p5 = computeTotalScoreV0(s5).details.find(d => d.label === 'Coins')!.points;

    expect([p0, p2, p3, p5]).toEqual([0, 0, 1, 1]);
  });

  test('military wins/losses combined', () => {
    const st: GameStateV0 = {
      self: { playerId: 'P', militaryTokens: { age1: 1, age2: 1, age3: 1, losses: 2 } }
    };
    const points = computeTotalScoreV0(st).details.find(d => d.label === 'Military')!.points;
    // 1*1 + 1*3 + 1*5 - 2*1 = 7
    expect(points).toBe(7);
  });

  test('aggregate total equals sum of details', () => {
    const st: GameStateV0 = {
      self: {
        playerId: 'P1',
        coins: 7, // 2
        militaryTokens: { age1: 2, age2: 1, age3: 0, losses: 1 }, // 4
        wonderPoints: 6, // 6
        civilianCards: [3, 5], // 8
        science: { TABLET: 2, COMPASS: 1, GEAR: 1 }, // 13
        commercialFlatPoints: 2, // 2
        guildsFlatPoints: 3 // 3
      }
    };

    const res = computeTotalScoreV0(st);
    const sum = res.details.reduce((s, d) => s + d.points, 0);
    expect(res.total).toBe(sum);
    expect(res.total).toBe(38);
  });
});