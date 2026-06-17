import { describe, expect, it } from 'vitest';
import {
  calculateExceededTargets,
  convertLetterVAmount,
  isAllowedSplitOptionCount,
  isWithinDailyTargets,
  mergeMeals,
  moveSlotBetweenMeals,
  splitSlotAmount,
} from '@/features/nutrition/domain/flexNutritionRules';

describe('flexNutritionRules', () => {
  it('converts letter V amount between supported units', () => {
    expect(convertLetterVAmount(10, 'base', 'fruit')).toBe(100);
    expect(convertLetterVAmount(10, 'base', 'banana')).toBe(50);
    expect(convertLetterVAmount(10, 'base', 'grain')).toBe(20);
  });

  it('supports split by percentages and fractions', () => {
    expect(splitSlotAmount(100, [50, 50])).toEqual([50, 50]);
    expect(splitSlotAmount(120, [0.5, 0.5])).toEqual([60, 60]);
  });

  it('allows one or two products per slot', () => {
    expect(isAllowedSplitOptionCount(1)).toBe(true);
    expect(isAllowedSplitOptionCount(2)).toBe(true);
    expect(isAllowedSplitOptionCount(3)).toBe(false);
  });

  it('moves slot between meals', () => {
    const meals = [['a', 'b'], ['g'], ['d']];
    const moved = moveSlotBetweenMeals(meals, 0, 2, 1);

    expect(moved).toEqual([['a'], ['g'], ['d', 'b']]);
    expect(meals).toEqual([['a', 'b'], ['g'], ['d']]);
  });

  it('merges two meals into one', () => {
    const meals = [['a'], ['g', 'd'], ['z']];
    const merged = mergeMeals(meals, 2, 1);

    expect(merged).toEqual([['a'], ['g', 'd', 'z']]);
    expect(meals).toEqual([['a'], ['g', 'd'], ['z']]);
  });

  it('calculates exceeded targets and daily limit compliance', () => {
    const limits = {
      calories: 2000,
      proteinGrams: 160,
      fatGrams: 70,
      carbsGrams: 220,
    };

    const consumed = {
      calories: 2140,
      proteinGrams: 170,
      fatGrams: 66,
      carbsGrams: 250,
    };

    expect(calculateExceededTargets(consumed, limits)).toEqual({
      calories: 140,
      proteinGrams: 10,
      fatGrams: 0,
      carbsGrams: 30,
    });
    expect(isWithinDailyTargets(consumed, limits)).toBe(false);
    expect(isWithinDailyTargets(limits, limits)).toBe(true);
  });
});
