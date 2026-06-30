import { FoodCategory } from '@/shared/domain/models';
import { NutritionFoodOption } from '@/features/nutrition/domain/types';
import {
  nutritionFoodCategories,
  nutritionFoodOptions,
} from '@/features/nutrition/data/catalog';
import { I18nLocale, translate } from '@/i18n/config';

type SupportedLocale = I18nLocale;
type CatalogSection = 'categories' | 'foods';

function getCatalogLabel(
  locale: SupportedLocale,
  section: CatalogSection,
  id: string,
  fallbackName: string,
): string {
  const translationKey = `catalog:${section}.${id}`;
  const localizedName = translate(locale, translationKey);

  return localizedName === translationKey ? fallbackName : localizedName;
}

export function getLocalizedNutritionFoodOptions(
  locale: SupportedLocale,
): NutritionFoodOption[] {
  return nutritionFoodOptions.map((food) => ({
    ...food,
    name: getCatalogLabel(locale, 'foods', food.id, food.name),
  }));
}

export function getLocalizedNutritionFoodCategories(
  locale: SupportedLocale,
): FoodCategory[] {
  return nutritionFoodCategories.map((category) => ({
    ...category,
    name: getCatalogLabel(locale, 'categories', category.id, category.name),
  }));
}

export function localizeFoodLabelById(
  locale: SupportedLocale,
  foodId: string,
  fallbackName: string,
): string {
  return getCatalogLabel(locale, 'foods', foodId, fallbackName);
}
