import { SelectOption } from '@/shared/ui/Select';
import { nutritionFoodCategories } from '@/features/nutrition/data/catalog';
import { MEAL_TYPE, MealType } from '@/features/nutrition/domain/types';

export const mealTypeOptions: SelectOption<MealType>[] = [
  { value: MEAL_TYPE.BREAKFAST, label: 'Breakfast' },
  { value: MEAL_TYPE.LUNCH, label: 'Lunch' },
  { value: MEAL_TYPE.DINNER, label: 'Dinner' },
  { value: MEAL_TYPE.SNACK, label: 'Snack' },
];

export const foodCategoryOptions: SelectOption<string>[] =
  nutritionFoodCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));
