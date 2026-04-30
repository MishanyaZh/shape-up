import {
  ActivityLevel,
  Gender,
  Goal,
} from '@/features/calculator/domain/calculations';

export interface UserProfile {
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: Goal;
}

export interface NutritionTargets {
  calories: number;
  proteinGrams: number;
  fatGrams: number;
  carbsGrams: number;
}

export interface FoodCategory {
  id: string;
  name: string;
  defaultPortionGrams: number;
}

export interface FoodOption {
  id: string;
  categoryId: string;
  name: string;
  calories: number;
  proteinGrams: number;
  fatGrams: number;
  carbsGrams: number;
  portionGrams: number;
}

export interface MealEntry {
  id: string;
  mealType: string;
  foodOptionId: string;
  quantity: number;
}

export interface Meal {
  id: string;
  type: string;
  entries: MealEntry[];
}

export interface NutritionPlan {
  id: string;
  targets: NutritionTargets;
  meals: Meal[];
}

export interface DailyTracking {
  date: string;
  entries: MealEntry[];
  consumed: NutritionTargets;
  remaining: NutritionTargets;
  adherencePercent: number;
}
