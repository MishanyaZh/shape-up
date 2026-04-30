export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum Goal {
  LOSE = 'lose',
  MAINTAIN = 'maintain',
  GAIN = 'gain',
}

export enum ActivityLevel {
  SEDENTARY = '1.2',
  LIGHT = '1.375',
  MODERATE = '1.55',
  ACTIVE = '1.725',
  VERY_ACTIVE = '1.9',
}

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

interface CalculationParams {
  gender: Gender;
  weight: number; // kg
  height: number; // sm
  age: number;
  activityMultiplier: number; // activity level multiplier
}

export const CALORIC_VALUES = {
  DEFICIT: 500, // - ~0.5 kg\week
  SURPLUS: 500, // + ~0.5 kg\week
};

export const NUTRITION_CONSTANTS = {
  PROTEIN_CALORIES_PER_GRAM: 4,
  CARBS_CALORIES_PER_GRAM: 4,
  FAT_CALORIES_PER_GRAM: 9,
};

/**
 * Calculates the Basal Metabolic Rate (BMR) using the Mifflin-St Jeor formula
 * @param params Parameters for BMR calculation
 * @returns Basal Metabolic Rate in kcal/day
 */
export function calculateBasalMetabolicRate(params: CalculationParams): number {
  const { gender, weight, height, age } = params;

  const BASE_MALE = 5;
  const BASE_FEMALE = -161;

  const WEIGHT_MULTIPLIER = 10; // 10 calories per kg of weight
  const HEIGHT_MULTIPLIER = 6.25; // 6.25 calories per cm of height
  const AGE_MULTIPLIER = 5; // subtract 5 calories per year of age

  const bmr =
    WEIGHT_MULTIPLIER * weight +
    HEIGHT_MULTIPLIER * height -
    AGE_MULTIPLIER * age +
    (gender === Gender.MALE ? BASE_MALE : BASE_FEMALE);

  return bmr;
}

/**
 * Calculates the Total Daily Energy Expenditure (TDEE)
 * @param bmr Basal Metabolic Rate in kcal/day
 * @param activityMultiplier Activity level multiplier
 * @returns Total Daily Energy Expenditure in kcal/day
 */
export function calculateTotalDailyEnergyExpenditure(
  bmr: number,
  activityMultiplier: number,
): number {
  return bmr * activityMultiplier;
}

/**
 * Calculates the target calorie intake based on the goal
 * @param tdee Total Daily Energy Expenditure
 * @param goal Goal (lose, maintain, or gain weight)
 * @returns Recommended daily calorie intake
 */
export function calculateTargetCalories(tdee: number, goal: Goal): number {
  switch (goal) {
    case Goal.LOSE:
      return tdee - CALORIC_VALUES.DEFICIT;
    case Goal.GAIN:
      return tdee + CALORIC_VALUES.SURPLUS;
    default:
      return tdee;
  }
}

/**
 * Calculates the recommended macronutrient distribution based on daily calorie target and goal
 * @param totalCalories Total daily calorie target
 * @param weight Weight in kg (for protein calculation)
 * @param goal Weight management goal
 * @returns Recommended macronutrient distribution
 */
export function calculateMacronutrients(
  totalCalories: number,
  weight: number,
  goal: Goal,
): MacronutrientDistribution {
  let proteinPerKg = 0;
  let fatPercentage = 0;

  switch (goal) {
    case Goal.LOSE:
      proteinPerKg = 2.2; // Higher protein for satiety and muscle preservation when cutting
      fatPercentage = 0.25; // 25% from fats
      break;
    case Goal.MAINTAIN:
      proteinPerKg = 1.8; // Moderate protein for maintenance
      fatPercentage = 0.3; // 30% from fats
      break;
    case Goal.GAIN:
      proteinPerKg = 2.0; // Good protein for muscle growth
      fatPercentage = 0.3; // 30% from fats
      break;
  }

  const proteinGrams = weight * proteinPerKg;
  const proteinCalories =
    proteinGrams * NUTRITION_CONSTANTS.PROTEIN_CALORIES_PER_GRAM;

  const fatCalories = totalCalories * fatPercentage;
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

export const genderOptions = [
  { value: Gender.MALE, label: 'Male' },
  { value: Gender.FEMALE, label: 'Female' },
];

export const activityOptions = [
  {
    value: ActivityLevel.SEDENTARY,
    label: 'Sedentary (little to no exercise)',
  },
  {
    value: ActivityLevel.LIGHT,
    label: 'Light activity (exercise 1-3 days/week)',
  },
  {
    value: ActivityLevel.MODERATE,
    label: 'Moderate activity (exercise 3-5 days/week)',
  },
  {
    value: ActivityLevel.ACTIVE,
    label: 'High activity (intense exercise 6-7 days/week)',
  },
  {
    value: ActivityLevel.VERY_ACTIVE,
    label: 'Very high activity (intense exercise + physical work)',
  },
];

export const goalOptions = [
  { value: Goal.LOSE, label: 'Lose Fat' },
  { value: Goal.MAINTAIN, label: 'Maintain Weight' },
  { value: Goal.GAIN, label: 'Gain Weight' },
];
