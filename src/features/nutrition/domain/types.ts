import { Goal } from '@/features/calculator/domain/calculations';
import {
  FoodCategory,
  FoodOption,
  NutritionTargets,
} from '@/shared/domain/models';

export const MEAL_TYPE = {
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
  SNACK: 'snack',
} as const;

export type MealType = (typeof MEAL_TYPE)[keyof typeof MEAL_TYPE];

export interface NutritionFoodOption extends FoodOption {
  mealTypes: MealType[];
}

export interface PlannedMeal {
  mealType: MealType;
  target: NutritionTargets;
  proteinOptions: NutritionFoodOption[];
  carbOptions: NutritionFoodOption[];
  fatOptions: NutritionFoodOption[];
  extraOptions: NutritionFoodOption[];
}

export interface GeneratedNutritionPlan {
  goal: Goal;
  mealsPerDay: 3 | 4;
  targets: NutritionTargets;
  meals: PlannedMeal[];
}

export interface NutritionCatalog {
  categories: FoodCategory[];
  foods: NutritionFoodOption[];
}
