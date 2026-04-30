import {
  ACTIVITY_LEVEL,
  CalculationResults,
  CalculatorFormData,
  GENDER,
  GOAL,
  Macronutrient,
  MacronutrientDistribution,
} from '@/features/calculator/domain/calculations';
import {
  GeneratedNutritionPlan,
  MealType,
  MEAL_TYPE,
  NutritionFoodOption,
  PlannedMeal,
} from '@/features/nutrition/domain/types';
import {
  AppStateSnapshot,
  initialAppStateSnapshot,
  NutritionPlanFormState,
  TrackingTargetState,
} from '@/shared/state/appStateTypes';
import { MealEntry, NutritionTargets } from '@/shared/domain/models';

export const APP_STATE_STORAGE_VERSION = 2;

interface AppStateStorageEnvelope {
  version: number;
  state: AppStateSnapshot;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isGender(value: unknown): value is CalculatorFormData['gender'] {
  return value === GENDER.MALE || value === GENDER.FEMALE;
}

function isGoal(value: unknown): value is CalculatorFormData['goal'] {
  return value === GOAL.LOSE || value === GOAL.MAINTAIN || value === GOAL.GAIN;
}

function isActivity(value: unknown): value is CalculatorFormData['activity'] {
  return Object.values(ACTIVITY_LEVEL).includes(
    value as CalculatorFormData['activity'],
  );
}

function isMealType(value: unknown): value is MealType {
  return Object.values(MEAL_TYPE).includes(value as MealType);
}

function isNutritionTarget(value: unknown): value is NutritionTargets {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isFiniteNumber(value.calories) &&
    isFiniteNumber(value.proteinGrams) &&
    isFiniteNumber(value.fatGrams) &&
    isFiniteNumber(value.carbsGrams)
  );
}

function isMacronutrient(value: unknown): value is Macronutrient {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isFiniteNumber(value.grams) &&
    isFiniteNumber(value.calories) &&
    isFiniteNumber(value.percentage)
  );
}

function isMacronutrientDistribution(
  value: unknown,
): value is MacronutrientDistribution {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isMacronutrient(value.protein) &&
    isMacronutrient(value.fats) &&
    isMacronutrient(value.carbs)
  );
}

function parseCalculatorFormData(value: unknown): CalculatorFormData {
  if (!isRecord(value)) {
    return initialAppStateSnapshot.calculatorFormData;
  }

  const current = initialAppStateSnapshot.calculatorFormData;

  return {
    gender: isGender(value.gender) ? value.gender : current.gender,
    weight: isString(value.weight) ? value.weight : current.weight,
    height: isString(value.height) ? value.height : current.height,
    age: isString(value.age) ? value.age : current.age,
    activity: isActivity(value.activity) ? value.activity : current.activity,
    goal: isGoal(value.goal) ? value.goal : current.goal,
  };
}

function parseCalculatorResults(value: unknown): CalculationResults {
  if (!isRecord(value)) {
    return initialAppStateSnapshot.calculatorResults;
  }

  const current = initialAppStateSnapshot.calculatorResults;

  return {
    bmr:
      value.bmr === null || isFiniteNumber(value.bmr) ? value.bmr : current.bmr,
    tdee:
      value.tdee === null || isFiniteNumber(value.tdee)
        ? value.tdee
        : current.tdee,
    goalCalories:
      value.goalCalories === null || isFiniteNumber(value.goalCalories)
        ? value.goalCalories
        : current.goalCalories,
    macros:
      value.macros === null || isMacronutrientDistribution(value.macros)
        ? value.macros
        : current.macros,
  };
}

function parseNutritionPlanFormState(value: unknown): NutritionPlanFormState {
  if (!isRecord(value)) {
    return initialAppStateSnapshot.nutritionPlanFormState;
  }

  const current = initialAppStateSnapshot.nutritionPlanFormState;

  return {
    targetCalories: isString(value.targetCalories)
      ? value.targetCalories
      : current.targetCalories,
    goal: isGoal(value.goal) ? value.goal : current.goal,
    mealsPerDay:
      value.mealsPerDay === '3' || value.mealsPerDay === '4'
        ? value.mealsPerDay
        : current.mealsPerDay,
  };
}

function parseTrackingTargetState(value: unknown): TrackingTargetState {
  if (!isRecord(value)) {
    return initialAppStateSnapshot.trackingTargetState;
  }

  const current = initialAppStateSnapshot.trackingTargetState;

  return {
    calories: isString(value.calories) ? value.calories : current.calories,
    proteinGrams: isString(value.proteinGrams)
      ? value.proteinGrams
      : current.proteinGrams,
    fatGrams: isString(value.fatGrams) ? value.fatGrams : current.fatGrams,
    carbsGrams: isString(value.carbsGrams)
      ? value.carbsGrams
      : current.carbsGrams,
  };
}

function parseMealEntry(value: unknown): MealEntry | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    !isString(value.id) ||
    !isString(value.mealType) ||
    !isString(value.foodOptionId)
  ) {
    return null;
  }

  if (!isFiniteNumber(value.quantity) || value.quantity <= 0) {
    return null;
  }

  return {
    id: value.id,
    mealType: value.mealType,
    foodOptionId: value.foodOptionId,
    quantity: value.quantity,
  };
}

function parseTrackingEntries(value: unknown): MealEntry[] {
  if (!Array.isArray(value)) {
    return initialAppStateSnapshot.trackingEntries;
  }

  return value
    .map((entry) => parseMealEntry(entry))
    .filter((entry): entry is MealEntry => Boolean(entry));
}

function parseNutritionFoodOption(value: unknown): NutritionFoodOption | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    !isString(value.id) ||
    !isString(value.categoryId) ||
    !isString(value.name) ||
    !isFiniteNumber(value.calories) ||
    !isFiniteNumber(value.proteinGrams) ||
    !isFiniteNumber(value.fatGrams) ||
    !isFiniteNumber(value.carbsGrams) ||
    !isFiniteNumber(value.portionGrams) ||
    !Array.isArray(value.mealTypes)
  ) {
    return null;
  }

  if (!value.mealTypes.every((mealType) => isMealType(mealType))) {
    return null;
  }

  return {
    id: value.id,
    categoryId: value.categoryId,
    name: value.name,
    calories: value.calories,
    proteinGrams: value.proteinGrams,
    fatGrams: value.fatGrams,
    carbsGrams: value.carbsGrams,
    portionGrams: value.portionGrams,
    mealTypes: value.mealTypes,
  };
}

function parsePlannedMeal(value: unknown): PlannedMeal | null {
  if (
    !isRecord(value) ||
    !isMealType(value.mealType) ||
    !isNutritionTarget(value.target)
  ) {
    return null;
  }

  if (
    !Array.isArray(value.proteinOptions) ||
    !Array.isArray(value.carbOptions) ||
    !Array.isArray(value.fatOptions) ||
    !Array.isArray(value.extraOptions)
  ) {
    return null;
  }

  const proteinOptions = value.proteinOptions
    .map((item) => parseNutritionFoodOption(item))
    .filter((item): item is NutritionFoodOption => Boolean(item));
  const carbOptions = value.carbOptions
    .map((item) => parseNutritionFoodOption(item))
    .filter((item): item is NutritionFoodOption => Boolean(item));
  const fatOptions = value.fatOptions
    .map((item) => parseNutritionFoodOption(item))
    .filter((item): item is NutritionFoodOption => Boolean(item));
  const extraOptions = value.extraOptions
    .map((item) => parseNutritionFoodOption(item))
    .filter((item): item is NutritionFoodOption => Boolean(item));

  return {
    mealType: value.mealType,
    target: value.target,
    proteinOptions,
    carbOptions,
    fatOptions,
    extraOptions,
  };
}

function parseGeneratedNutritionPlan(
  value: unknown,
): GeneratedNutritionPlan | null {
  if (!isRecord(value) || !isGoal(value.goal)) {
    return null;
  }

  if (value.mealsPerDay !== 3 && value.mealsPerDay !== 4) {
    return null;
  }

  if (!isNutritionTarget(value.targets) || !Array.isArray(value.meals)) {
    return null;
  }

  const meals = value.meals
    .map((meal) => parsePlannedMeal(meal))
    .filter((meal): meal is PlannedMeal => Boolean(meal));

  if (meals.length === 0) {
    return null;
  }

  return {
    goal: value.goal,
    mealsPerDay: value.mealsPerDay,
    targets: value.targets,
    meals,
  };
}

function sanitizeSnapshot(input: unknown): AppStateSnapshot {
  if (!isRecord(input)) {
    return initialAppStateSnapshot;
  }

  return {
    calculatorFormData: parseCalculatorFormData(input.calculatorFormData),
    calculatorResults: parseCalculatorResults(input.calculatorResults),
    nutritionPlanFormState: parseNutritionPlanFormState(
      input.nutritionPlanFormState,
    ),
    generatedNutritionPlan: parseGeneratedNutritionPlan(
      input.generatedNutritionPlan,
    ),
    trackingTargetState: parseTrackingTargetState(input.trackingTargetState),
    trackingEntries: parseTrackingEntries(input.trackingEntries),
  };
}

export function parseAppStateFromStorage(raw: string): AppStateSnapshot {
  const parsed: unknown = JSON.parse(raw);

  if (isRecord(parsed) && parsed.version === APP_STATE_STORAGE_VERSION) {
    return sanitizeSnapshot(parsed.state);
  }

  // Supports migration from legacy format where snapshot was stored directly.
  return sanitizeSnapshot(parsed);
}

export function serializeAppStateForStorage(state: AppStateSnapshot): string {
  const payload: AppStateStorageEnvelope = {
    version: APP_STATE_STORAGE_VERSION,
    state,
  };

  return JSON.stringify(payload);
}
