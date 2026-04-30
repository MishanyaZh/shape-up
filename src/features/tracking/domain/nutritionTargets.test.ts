import { describe, expect, it } from 'vitest';
import {
  addNutritionTargets,
  createZeroTargets,
  subtractNutritionTargets,
} from './nutritionTargets';

describe('nutrition target helpers', () => {
  it('creates zero targets', () => {
    expect(createZeroTargets()).toEqual({
      calories: 0,
      proteinGrams: 0,
      fatGrams: 0,
      carbsGrams: 0,
    });
  });

  it('adds nutrition targets', () => {
    const left = {
      calories: 1000,
      proteinGrams: 60,
      fatGrams: 30,
      carbsGrams: 100,
    };
    const right = {
      calories: 800,
      proteinGrams: 40,
      fatGrams: 20,
      carbsGrams: 80,
    };

    expect(addNutritionTargets(left, right)).toEqual({
      calories: 1800,
      proteinGrams: 100,
      fatGrams: 50,
      carbsGrams: 180,
    });
  });

  it('subtracts consumed from target', () => {
    const target = {
      calories: 2200,
      proteinGrams: 160,
      fatGrams: 70,
      carbsGrams: 240,
    };
    const consumed = {
      calories: 1800,
      proteinGrams: 130,
      fatGrams: 55,
      carbsGrams: 210,
    };

    expect(subtractNutritionTargets(target, consumed)).toEqual({
      calories: 400,
      proteinGrams: 30,
      fatGrams: 15,
      carbsGrams: 30,
    });
  });
});
