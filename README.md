### How to run ลงบันก่อนน้ะจ้ะ
- Install Bun
- `bun test`  → all tests should pass
- `bun run score_strategy_demo.ts` (or `bun run strategy:demo`)
  - Demonstrates Strategy-based scoring adapter that keeps parity with v0.

### Design & Challenges
- See `DESIGN.md` (Strategy Pattern + OCP, migration plan)
- See `CHALLENGES.md` (monolith → strategy, testing, data contract, etc.)


# 7 Wonders Scoring — Baseline (No Patterns)

## Learning Goals
- Implement a scoring calculator for 7 Wonders (Base Game).
- Keep all logic in one place (intentionally “smelly”) to set up a refactor exercise later.
- Write unit tests that must still pass after refactoring to Strategy Pattern.

## Scoring Scope

### Calculate points from:
- Military: wins per Age (+1 / +3 / +5), losses (−1 per loss).
- Coins: every 3 coins = +1 point.
- Wonder: sum of completed wonder stage points (taken directly from input).
- Civilian: sum of numbers on blue cards.
- Science: Score = \(a^2 + b^2 + c^2\)  
  plus **7 points for each complete set** of Tablet, Compass, and Gear.  
  (Here \(a, b, c\) are the counts of Tablet, Compass, and Gear symbols.)
  
  **Example:** If you have 2 Tablets, 1 Compass, and 1 Gear →  
  \(2^2 + 1^2 + 1^2 = 6\) from symbols,  
  plus \(7 \times 1 = 7\) from one complete set,  
  for a total of **13 points**.
- Commercial and Guilds: start as flat points (simplified) to emphasize structure first.

> Intentionally keep it as a “God function”: this is the version students will refactor.

# Assignment Brief

## Task:
You are given a baseline implementation computeTotalScoreV0(state) that calculates all scoring in one place.
Your job is to refactor this into a clean, extensible architecture using the Strategy Pattern, while preserving behavior (tests must still pass).

## Requirements:
1.  Keep the exact scoring rules unchanged.
2.	Introduce an interface (e.g., ScoringStrategy) and separate concrete strategies for:
    - Military, Coins, Wonder, Civilian, Science, Commercial, Guilds
3.	Implement an aggregator (e.g., ScoreCalculator) that invokes all strategies and returns a breakdown + total.
4.	Add unit tests for each strategy in isolation.
5.	The original tests must pass without modification.

## Stretch Goals (optional):
- Implement a simple registry/factory to enable/disable scoring categories via feature flags.
- Prepare the domain model to accept neighbors (left/right) for future scoring that depends on adjacent cities.

## What we grade:
- Correctness (tests pass, math is right).
- Design quality (Strategy applied cleanly, Open/Closed Principle respected).
- Test quality (clear, minimal setups, good coverage).
- Code clarity (naming, organization, small functions).



# 📖 Short Gameplay Summary of 7 Wonders
> This context helps students understand why there are multiple scoring rules and why the Strategy Pattern is a good fit: each card category is essentially its own scoring strategy, which can be extended when expansions (Leaders, Cities, Armada) are added.

7 Wonders is a card-drafting civilization-building board game played over three Ages.
Each player represents a city and chooses cards that represent buildings, wonders, military, science, commerce, and guilds.
- Drafting: In each Age, players pick a card from their hand and pass the rest to their neighbor, repeating until all cards are played.
- Resources: Many cards require resources (wood, stone, ore, etc.) that can be produced by your own city or traded with neighbors.
- Categories of Cards:
- Military (red): Compare strength with neighbors after each Age.
- Civilian (blue): Flat victory points.
- Science (green): Collect sets of symbols for exponential scoring.
- Commercial (yellow): Boost coins and sometimes give victory points.
- Guilds (purple): Special endgame scoring, often based on neighbors.
- Wonders: Each city has its own Wonder board; building stages gives special powers or points.
- Scoring: At the end of the third Age, all categories are scored, and the player with the highest total wins.

## Screenshots
<img width="1061" height="399" alt="Screenshot 2025-09-24 at 18 13 14" src="https://github.com/user-attachments/assets/afd81627-2e1c-4089-b0d6-8d9c6d0158f1" />
<img width="1150" height="456" alt="image" src="https://github.com/user-attachments/assets/e52652d4-d070-4ecc-8648-3094139f008c" />
<img width="1172" height="822" alt="image" src="https://github.com/user-attachments/assets/a41eb7de-b109-4c9e-a389-66559a56fc1d" />


