import { NutritionTargets } from '@/shared/domain/models';

export type LetterVUnit = 'base' | 'fruit' | 'banana' | 'grain';

const letterVToBaseFactor: Record<LetterVUnit, number> = {
  base: 1,
  fruit: 0.1,
  banana: 0.2,
  grain: 0.5,
};

const FLOAT_TOLERANCE = 0.0001;

function isFinitePositiveNumber(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

function normalizeShares(rawShares: number[]): number[] {
  if (rawShares.length === 0) {
    throw new Error('At least one share must be provided.');
  }

  const hasInvalidShare = rawShares.some(
    (share) => !Number.isFinite(share) || share <= 0,
  );
  if (hasInvalidShare) {
    throw new Error('Shares must contain only finite positive values.');
  }

  const shouldNormalizePercentages = rawShares.some((share) => share > 1);
  const normalizedShares = shouldNormalizePercentages
    ? rawShares.map((share) => share / 100)
    : rawShares;

  const total = normalizedShares.reduce((sum, share) => sum + share, 0);
  if (Math.abs(total - 1) > FLOAT_TOLERANCE) {
    throw new Error('Shares must sum up to 1 (or 100%).');
  }

  return normalizedShares;
}

export function convertLetterVAmount(
  grams: number,
  from: LetterVUnit,
  to: LetterVUnit,
): number {
  if (!isFinitePositiveNumber(grams)) {
    throw new Error('Amount must be a finite positive number.');
  }

  const baseAmount = grams * letterVToBaseFactor[from];
  const convertedAmount = baseAmount / letterVToBaseFactor[to];

  return Math.round(convertedAmount * 100) / 100;
}

export function splitSlotAmount(
  totalGrams: number,
  rawShares: number[],
): number[] {
  if (!isFinitePositiveNumber(totalGrams)) {
    throw new Error('Total grams must be a finite positive number.');
  }

  const shares = normalizeShares(rawShares);

  return shares.map((share) => Math.round(totalGrams * share * 100) / 100);
}

export function isAllowedSplitOptionCount(optionCount: number): boolean {
  return Number.isInteger(optionCount) && optionCount >= 1 && optionCount <= 2;
}

export function moveSlotBetweenMeals<T>(
  meals: T[][],
  fromMealIndex: number,
  toMealIndex: number,
  slotIndex: number,
): T[][] {
  if (
    fromMealIndex < 0 ||
    fromMealIndex >= meals.length ||
    toMealIndex < 0 ||
    toMealIndex >= meals.length
  ) {
    throw new Error('Meal index is out of range.');
  }

  if (slotIndex < 0 || slotIndex >= meals[fromMealIndex].length) {
    throw new Error('Slot index is out of range.');
  }

  const nextMeals = meals.map((meal) => [...meal]);
  const [movedSlot] = nextMeals[fromMealIndex].splice(slotIndex, 1);
  nextMeals[toMealIndex].push(movedSlot);

  return nextMeals;
}

export function mergeMeals<T>(
  meals: T[][],
  sourceMealIndex: number,
  targetMealIndex: number,
): T[][] {
  if (
    sourceMealIndex < 0 ||
    sourceMealIndex >= meals.length ||
    targetMealIndex < 0 ||
    targetMealIndex >= meals.length
  ) {
    throw new Error('Meal index is out of range.');
  }

  if (sourceMealIndex === targetMealIndex) {
    return meals.map((meal) => [...meal]);
  }

  const nextMeals = meals.map((meal) => [...meal]);
  const sourceSlots = nextMeals[sourceMealIndex];
  nextMeals[targetMealIndex] = [...nextMeals[targetMealIndex], ...sourceSlots];
  nextMeals.splice(sourceMealIndex, 1);

  return nextMeals;
}

export function calculateExceededTargets(
  consumed: NutritionTargets,
  limits: NutritionTargets,
): NutritionTargets {
  return {
    calories: Math.max(consumed.calories - limits.calories, 0),
    proteinGrams: Math.max(consumed.proteinGrams - limits.proteinGrams, 0),
    fatGrams: Math.max(consumed.fatGrams - limits.fatGrams, 0),
    carbsGrams: Math.max(consumed.carbsGrams - limits.carbsGrams, 0),
  };
}

export function isWithinDailyTargets(
  consumed: NutritionTargets,
  limits: NutritionTargets,
): boolean {
  const exceeded = calculateExceededTargets(consumed, limits);
  return (
    exceeded.calories === 0 &&
    exceeded.proteinGrams === 0 &&
    exceeded.fatGrams === 0 &&
    exceeded.carbsGrams === 0
  );
}

export interface FlexibleNutritionFoundation {
  maxProductsPerSlot: 2;
  allowsHalfHalfSplit: true;
  canRotateMeals: true;
  canMergeMeals: true;
  canMoveSlotBetweenMeals: true;
  hungerBasedMealTiming: true;
  doNotExceedDailyTargets: true;
  allowsSpicesAndSoySauce: true;
  allowsCoffeeAndTea: true;
  allowsZeroCalorieDrinks: true;
  weighFoodRaw: true;
  strictWeighingWeeks: 2;
  weeklyFreeMeal: {
    enabled: true;
    frequencyPerWeek: 1;
    maxDurationMinutes: 60;
    replacesSingleMeal: true;
  };
}

export const flexibleNutritionFoundation: FlexibleNutritionFoundation = {
  maxProductsPerSlot: 2,
  allowsHalfHalfSplit: true,
  canRotateMeals: true,
  canMergeMeals: true,
  canMoveSlotBetweenMeals: true,
  hungerBasedMealTiming: true,
  doNotExceedDailyTargets: true,
  allowsSpicesAndSoySauce: true,
  allowsCoffeeAndTea: true,
  allowsZeroCalorieDrinks: true,
  weighFoodRaw: true,
  strictWeighingWeeks: 2,
  weeklyFreeMeal: {
    enabled: true,
    frequencyPerWeek: 1,
    maxDurationMinutes: 60,
    replacesSingleMeal: true,
  },
};
