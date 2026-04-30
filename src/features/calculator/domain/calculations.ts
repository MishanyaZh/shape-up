export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
} as const;

export const GOAL = {
  LOSE: 'lose',
  MAINTAIN: 'maintain',
  GAIN: 'gain',
} as const;

export const ACTIVITY_LEVEL = {
  SEDENTARY: '1.2',
  LIGHT: '1.375',
  MODERATE: '1.55',
  ACTIVE: '1.725',
  VERY_ACTIVE: '1.9',
} as const;

export type Gender = (typeof GENDER)[keyof typeof GENDER];
export type Goal = (typeof GOAL)[keyof typeof GOAL];
export type ActivityLevel =
  (typeof ACTIVITY_LEVEL)[keyof typeof ACTIVITY_LEVEL];

export interface Macronutrient {
  grams: number;
  calories: number;
  percentage: number;
}

export interface MacronutrientDistribution {
  protein: Macronutrient;
  fats: Macronutrient;
  carbs: Macronutrient;
}

export interface CalculatorFormData {
  gender: Gender;
  weight: string;
  height: string;
  age: string;
  activity: ActivityLevel;
  goal: Goal;
}

export interface CalculationResults {
  bmr: number | null;
  tdee: number | null;
  goalCalories: number | null;
  macros: MacronutrientDistribution | null;
}

export interface CalculatorValidationErrors {
  weight: boolean;
  height: boolean;
  age: boolean;
}

interface BmrCalculationParams {
  gender: Gender;
  weight: number;
  height: number;
  age: number;
}

const CALORIC_VALUES = {
  DEFICIT: 500,
  SURPLUS: 500,
} as const;

const NUTRITION_CONSTANTS = {
  PROTEIN_CALORIES_PER_GRAM: 4,
  CARBS_CALORIES_PER_GRAM: 4,
  FAT_CALORIES_PER_GRAM: 9,
} as const;

export function calculateBasalMetabolicRate({
  gender,
  weight,
  height,
  age,
}: BmrCalculationParams): number {
  const genderBase = gender === GENDER.MALE ? 5 : -161;
  return 10 * weight + 6.25 * height - 5 * age + genderBase;
}

export function calculateTotalDailyEnergyExpenditure(
  bmr: number,
  activityMultiplier: number,
): number {
  return bmr * activityMultiplier;
}

export function calculateTargetCalories(tdee: number, goal: Goal): number {
  if (goal === GOAL.LOSE) {
    return tdee - CALORIC_VALUES.DEFICIT;
  }

  if (goal === GOAL.GAIN) {
    return tdee + CALORIC_VALUES.SURPLUS;
  }

  return tdee;
}

export function calculateMacronutrients(
  totalCalories: number,
  weight: number,
  goal: Goal,
): MacronutrientDistribution {
  const profile =
    goal === GOAL.LOSE
      ? { proteinPerKg: 2.2, fatPercentage: 0.25 }
      : goal === GOAL.GAIN
        ? { proteinPerKg: 2, fatPercentage: 0.3 }
        : { proteinPerKg: 1.8, fatPercentage: 0.3 };

  const proteinGrams = weight * profile.proteinPerKg;
  const proteinCalories =
    proteinGrams * NUTRITION_CONSTANTS.PROTEIN_CALORIES_PER_GRAM;

  const fatCalories = totalCalories * profile.fatPercentage;
  const fatGrams = fatCalories / NUTRITION_CONSTANTS.FAT_CALORIES_PER_GRAM;

  const carbCalories = totalCalories - proteinCalories - fatCalories;
  const carbGrams = carbCalories / NUTRITION_CONSTANTS.CARBS_CALORIES_PER_GRAM;

  return {
    protein: {
      grams: Math.round(proteinGrams),
      calories: Math.round(proteinCalories),
      percentage: Math.round((proteinCalories / totalCalories) * 100),
    },
    fats: {
      grams: Math.round(fatGrams),
      calories: Math.round(fatCalories),
      percentage: Math.round((fatCalories / totalCalories) * 100),
    },
    carbs: {
      grams: Math.round(carbGrams),
      calories: Math.round(carbCalories),
      percentage: Math.round((carbCalories / totalCalories) * 100),
    },
  };
}
