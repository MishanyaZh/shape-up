export type GenderType = 'male' | 'female';
export type GoalType = 'lose' | 'maintain' | 'gain';

interface CalculationParams {
  gender: GenderType;
  weight: number; // kg
  height: number; // sm
  age: number;
  activityMultiplier: number;
}

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
    (gender === 'male' ? BASE_MALE : BASE_FEMALE);

  return bmr;
}

export function calculateTotalDailyEnergyExpenditure(
  bmr: number,
  activityMultiplier: number,
): number {
  return bmr * activityMultiplier;
}

export function calculateTargetCalories(tdee: number, goal: GoalType): number {
  switch (goal) {
    case 'lose':
      return tdee - 500;
    case 'gain':
      return tdee + 500;
    default:
      return tdee;
  }
}
