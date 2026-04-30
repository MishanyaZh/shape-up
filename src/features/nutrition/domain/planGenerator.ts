import { Goal, GOAL } from '@/features/calculator/domain/calculations';
import { NutritionTargets } from '@/shared/domain/models';
import {
  GeneratedNutritionPlan,
  MealType,
  MEAL_TYPE,
  NutritionCatalog,
  NutritionFoodOption,
  PlannedMeal,
} from '@/features/nutrition/domain/types';

const mealOrderByCount: Record<3 | 4, MealType[]> = {
  3: [MEAL_TYPE.BREAKFAST, MEAL_TYPE.LUNCH, MEAL_TYPE.DINNER],
  4: [MEAL_TYPE.BREAKFAST, MEAL_TYPE.LUNCH, MEAL_TYPE.DINNER, MEAL_TYPE.SNACK],
};

const mealDistribution: Record<3 | 4, number[]> = {
  3: [0.35, 0.4, 0.25],
  4: [0.25, 0.35, 0.25, 0.15],
};

function createTargetMacros(calories: number, goal: Goal): NutritionTargets {
  const profile =
    goal === GOAL.LOSE
      ? { protein: 0.35, fat: 0.25, carbs: 0.4 }
      : goal === GOAL.GAIN
        ? { protein: 0.3, fat: 0.25, carbs: 0.45 }
        : { protein: 0.3, fat: 0.3, carbs: 0.4 };

  const proteinCalories = calories * profile.protein;
  const fatCalories = calories * profile.fat;
  const carbsCalories = calories * profile.carbs;

  return {
    calories: Math.round(calories),
    proteinGrams: Math.round(proteinCalories / 4),
    fatGrams: Math.round(fatCalories / 9),
    carbsGrams: Math.round(carbsCalories / 4),
  };
}

function splitTargetsByMeals(
  target: NutritionTargets,
  mealsPerDay: 3 | 4,
): NutritionTargets[] {
  const ratios = mealDistribution[mealsPerDay];

  return ratios.map((ratio) => ({
    calories: Math.round(target.calories * ratio),
    proteinGrams: Math.round(target.proteinGrams * ratio),
    fatGrams: Math.round(target.fatGrams * ratio),
    carbsGrams: Math.round(target.carbsGrams * ratio),
  }));
}

function getOptionsByCategory(
  foods: NutritionFoodOption[],
  mealType: MealType,
  categoryId: string,
): NutritionFoodOption[] {
  return foods
    .filter(
      (food) =>
        food.categoryId === categoryId && food.mealTypes.includes(mealType),
    )
    .slice(0, 2);
}

function createMealPlan(
  mealType: MealType,
  target: NutritionTargets,
  catalog: NutritionCatalog,
): PlannedMeal {
  return {
    mealType,
    target,
    proteinOptions: getOptionsByCategory(catalog.foods, mealType, 'protein'),
    carbOptions: getOptionsByCategory(catalog.foods, mealType, 'carbs'),
    fatOptions: getOptionsByCategory(catalog.foods, mealType, 'fats'),
    extraOptions: getOptionsByCategory(catalog.foods, mealType, 'extras'),
  };
}

interface GenerateNutritionPlanParams {
  goal: Goal;
  targetCalories: number;
  mealsPerDay: 3 | 4;
  catalog: NutritionCatalog;
}

export function generateNutritionPlan({
  goal,
  targetCalories,
  mealsPerDay,
  catalog,
}: GenerateNutritionPlanParams): GeneratedNutritionPlan {
  const targets = createTargetMacros(targetCalories, goal);
  const mealTypes = mealOrderByCount[mealsPerDay];
  const mealTargets = splitTargetsByMeals(targets, mealsPerDay);

  const meals = mealTypes.map((mealType, index) =>
    createMealPlan(mealType, mealTargets[index], catalog),
  );

  return {
    goal,
    mealsPerDay,
    targets,
    meals,
  };
}
