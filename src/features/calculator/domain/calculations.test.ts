import { describe, expect, it } from 'vitest';
import {
  calculateBasalMetabolicRate,
  calculateMacronutrients,
  calculateTargetCalories,
  calculateTotalDailyEnergyExpenditure,
  GENDER,
  GOAL,
} from './calculations';

describe('calculator domain calculations', () => {
  it('calculates male BMR with mifflin formula', () => {
    const result = calculateBasalMetabolicRate({
      gender: GENDER.MALE,
      weight: 70,
      height: 175,
      age: 30,
    });

    expect(result).toBe(1648.75);
  });

  it('calculates female BMR with mifflin formula', () => {
    const result = calculateBasalMetabolicRate({
      gender: GENDER.FEMALE,
      weight: 70,
      height: 175,
      age: 30,
    });

    expect(result).toBe(1482.75);
  });

  it('calculates TDEE from BMR and activity multiplier', () => {
    expect(calculateTotalDailyEnergyExpenditure(1600, 1.55)).toBe(2480);
  });

  it('calculates target calories for each goal', () => {
    expect(calculateTargetCalories(2500, GOAL.LOSE)).toBe(2000);
    expect(calculateTargetCalories(2500, GOAL.MAINTAIN)).toBe(2500);
    expect(calculateTargetCalories(2500, GOAL.GAIN)).toBe(3000);
  });

  it('calculates macro distribution for maintain goal', () => {
    const macros = calculateMacronutrients(2200, 80, GOAL.MAINTAIN);

    expect(macros.protein.grams).toBe(144);
    expect(macros.fats.grams).toBe(73);
    expect(macros.carbs.grams).toBe(241);
    expect(
      macros.protein.percentage +
        macros.fats.percentage +
        macros.carbs.percentage,
    ).toBe(100);
  });
});
