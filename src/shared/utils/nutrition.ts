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

export const CALORIC_VALUES = {
  DEFICIT: 500, // - ~0.5 kg\week
  SURPLUS: 500, // + ~0.5 kg\week
};

interface CalculationParams {
  gender: Gender;
  weight: number; // kg
  height: number; // sm
  age: number;
  activityMultiplier: number; // activity level multiplier
}

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
