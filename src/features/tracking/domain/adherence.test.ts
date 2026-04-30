import { describe, expect, it } from 'vitest';
import {
  calculateCalorieAdherence,
  calculateCombinedAdherence,
  calculateMacroAdherence,
} from './adherence';

describe('tracking adherence calculations', () => {
  const target = {
    calories: 2200,
    proteinGrams: 160,
    fatGrams: 70,
    carbsGrams: 240,
  };

  it('returns 100 calorie adherence for exact target hit', () => {
    expect(calculateCalorieAdherence(2200, 2200)).toBe(100);
  });

  it('returns reduced calorie adherence when over target', () => {
    expect(calculateCalorieAdherence(2000, 2500)).toBe(75);
  });

  it('returns 100 macro adherence for exact macro hit', () => {
    expect(calculateMacroAdherence(target, target)).toBe(100);
  });

  it('returns combined adherence as average of calorie and macro scores', () => {
    const consumed = {
      calories: 2310,
      proteinGrams: 152,
      fatGrams: 77,
      carbsGrams: 228,
    };

    const combined = calculateCombinedAdherence(target, consumed);

    expect(combined).toBeGreaterThan(85);
    expect(combined).toBeLessThan(100);
  });

  it('clamps to 0 for extreme deviation', () => {
    expect(calculateCalorieAdherence(2000, 10000)).toBe(0);
  });
});
