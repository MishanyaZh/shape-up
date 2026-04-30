import { NutritionTargets } from '@/shared/domain/models';

export function createZeroTargets(): NutritionTargets {
  return {
    calories: 0,
    proteinGrams: 0,
    fatGrams: 0,
    carbsGrams: 0,
  };
}

export function addNutritionTargets(
  left: NutritionTargets,
  right: NutritionTargets,
): NutritionTargets {
  return {
    calories: left.calories + right.calories,
    proteinGrams: left.proteinGrams + right.proteinGrams,
    fatGrams: left.fatGrams + right.fatGrams,
    carbsGrams: left.carbsGrams + right.carbsGrams,
  };
}

export function subtractNutritionTargets(
  target: NutritionTargets,
  consumed: NutritionTargets,
): NutritionTargets {
  return {
    calories: target.calories - consumed.calories,
    proteinGrams: target.proteinGrams - consumed.proteinGrams,
    fatGrams: target.fatGrams - consumed.fatGrams,
    carbsGrams: target.carbsGrams - consumed.carbsGrams,
  };
}
