'use client';

import { useMemo, useState } from 'react';
import { generateNutritionPlan } from '@/features/nutrition/domain/planGenerator';
import {
  getLocalizedNutritionFoodCategories,
  getLocalizedNutritionFoodOptions,
  localizeFoodLabelById,
} from '@/features/nutrition/data/catalogLocalization';
import { NutritionFoodOption } from '@/features/nutrition/domain/types';
import { useAppState } from '@/providers/AppStateProvider';
import { NutritionPlanFormState } from '@/shared/state/appStateTypes';
import { useUiPreferences } from '@/providers/UiPreferencesProvider';

interface NutritionPlanFormErrors {
  targetCalories: boolean;
}

const initialErrors: NutritionPlanFormErrors = {
  targetCalories: false,
};

export function useNutritionPlanGenerator() {
  const { locale } = useUiPreferences();
  const { state, setNutritionPlanFormState, setGeneratedNutritionPlan } =
    useAppState();
  const [errors, setErrors] = useState<NutritionPlanFormErrors>(initialErrors);

  const formState = state.nutritionPlanFormState;

  const localizedCategories = useMemo(
    () => getLocalizedNutritionFoodCategories(locale),
    [locale],
  );

  const localizedFoods = useMemo(
    () => getLocalizedNutritionFoodOptions(locale),
    [locale],
  );

  const plan = useMemo(() => {
    if (!state.generatedNutritionPlan) {
      return null;
    }

    const localizeOptions = (options: NutritionFoodOption[]) =>
      options.map((option) => ({
        ...option,
        name: localizeFoodLabelById(locale, option.id, option.name),
      }));

    return {
      ...state.generatedNutritionPlan,
      meals: state.generatedNutritionPlan.meals.map((meal) => ({
        ...meal,
        proteinOptions: localizeOptions(meal.proteinOptions),
        carbOptions: localizeOptions(meal.carbOptions),
        fatOptions: localizeOptions(meal.fatOptions),
        extraOptions: localizeOptions(meal.extraOptions),
      })),
    };
  }, [locale, state.generatedNutritionPlan]);

  const handleSelectChange =
    <K extends keyof NutritionPlanFormState>(field: K) =>
    (value: NutritionPlanFormState[K]) => {
      setNutritionPlanFormState({ ...formState, [field]: value });
    };

  const handleCaloriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value !== '' && !/^\d+$/.test(value)) {
      return;
    }

    setNutritionPlanFormState({ ...formState, targetCalories: value });
    if (errors.targetCalories) {
      setErrors({ targetCalories: false });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formState.targetCalories) {
      setErrors({ targetCalories: true });
      return;
    }

    const targetCalories = Number(formState.targetCalories);
    const mealsPerDay = Number(formState.mealsPerDay) as 3 | 4;

    setGeneratedNutritionPlan(
      generateNutritionPlan({
        goal: formState.goal,
        targetCalories,
        mealsPerDay,
        catalog: {
          categories: localizedCategories,
          foods: localizedFoods,
        },
      }),
    );
  };

  return {
    formState,
    errors,
    plan,
    handleSelectChange,
    handleCaloriesChange,
    handleSubmit,
  };
}
