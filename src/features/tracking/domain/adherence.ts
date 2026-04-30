import { NutritionTargets } from '@/shared/domain/models';

function clampPercent(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }

  if (value < 0) {
    return 0;
  }

  if (value > 100) {
    return 100;
  }

  return value;
}

function calculateDistancePercent(target: number, consumed: number): number {
  if (target <= 0) {
    return consumed <= 0 ? 100 : 0;
  }

  const deviationRatio = Math.abs(consumed - target) / target;
  const score = 100 - deviationRatio * 100;
  return clampPercent(score);
}

export function calculateCalorieAdherence(
  targetCalories: number,
  consumedCalories: number,
): number {
  return calculateDistancePercent(targetCalories, consumedCalories);
}

export function calculateMacroAdherence(
  target: NutritionTargets,
  consumed: NutritionTargets,
): number {
  const proteinScore = calculateDistancePercent(
    target.proteinGrams,
    consumed.proteinGrams,
  );
  const fatScore = calculateDistancePercent(target.fatGrams, consumed.fatGrams);
  const carbsScore = calculateDistancePercent(
    target.carbsGrams,
    consumed.carbsGrams,
  );

  return Math.round((proteinScore + fatScore + carbsScore) / 3);
}

export function calculateCombinedAdherence(
  target: NutritionTargets,
  consumed: NutritionTargets,
): number {
  const calories = calculateCalorieAdherence(
    target.calories,
    consumed.calories,
  );
  const macros = calculateMacroAdherence(target, consumed);

  return Math.round((calories + macros) / 2);
}
