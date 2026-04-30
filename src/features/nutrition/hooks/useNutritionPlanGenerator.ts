'use client';

import { useState } from 'react';
import { generateNutritionPlan } from '@/features/nutrition/domain/planGenerator';
import {
  nutritionFoodCategories,
  nutritionFoodOptions,
} from '@/features/nutrition/data/catalog';
import { useAppState } from '@/providers/AppStateProvider';
import { NutritionPlanFormState } from '@/shared/state/appStateTypes';

interface NutritionPlanFormErrors {
  targetCalories: boolean;
}

const initialErrors: NutritionPlanFormErrors = {
  targetCalories: false,
};

export function useNutritionPlanGenerator() {
  const { state, setNutritionPlanFormState, setGeneratedNutritionPlan } =
    useAppState();
  const [errors, setErrors] = useState<NutritionPlanFormErrors>(initialErrors);

  const formState = state.nutritionPlanFormState;
  const plan = state.generatedNutritionPlan;

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
          categories: nutritionFoodCategories,
          foods: nutritionFoodOptions,
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
