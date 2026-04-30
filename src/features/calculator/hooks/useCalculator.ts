'use client';

import { useState } from 'react';
import {
  CalculatorFormData,
  CalculatorValidationErrors,
  calculateBasalMetabolicRate,
  calculateMacronutrients,
  calculateTargetCalories,
  calculateTotalDailyEnergyExpenditure,
} from '@/features/calculator/domain/calculations';
import { useAppState } from '@/providers/AppStateProvider';
import {
  NutritionPlanFormState,
  TrackingTargetState,
} from '@/shared/state/appStateTypes';

const initialErrors: CalculatorValidationErrors = {
  weight: false,
  height: false,
  age: false,
};

export function useCalculator() {
  const {
    state,
    setCalculatorFormData,
    setCalculatorResults,
    setNutritionPlanFormState,
    setTrackingTargetState,
  } = useAppState();
  const [errors, setErrors] =
    useState<CalculatorValidationErrors>(initialErrors);

  const formData = state.calculatorFormData;
  const results = state.calculatorResults;

  const handleSelectChange =
    <K extends keyof CalculatorFormData>(field: K) =>
    (value: CalculatorFormData[K]) => {
      setCalculatorFormData({
        ...formData,
        [field]: value,
      });
    };

  const handleNumberChange =
    (field: keyof CalculatorValidationErrors) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value !== '' && !/^\d+$/.test(value)) {
        return;
      }

      setCalculatorFormData({
        ...formData,
        [field]: value,
      });

      if (!errors[field]) {
        return;
      }

      setErrors((current: CalculatorValidationErrors) => ({
        ...current,
        [field]: false,
      }));
    };

  const validateForm = (): boolean => {
    const nextErrors: CalculatorValidationErrors = {
      weight: formData.weight === '',
      height: formData.height === '',
      age: formData.age === '',
    };

    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const weight = Number(formData.weight);
    const height = Number(formData.height);
    const age = Number(formData.age);
    const activityMultiplier = Number(formData.activity);

    const bmr = calculateBasalMetabolicRate({
      gender: formData.gender,
      weight,
      height,
      age,
    });

    const tdee = calculateTotalDailyEnergyExpenditure(bmr, activityMultiplier);
    const goalCalories = calculateTargetCalories(tdee, formData.goal);
    const macros = calculateMacronutrients(goalCalories, weight, formData.goal);

    const nextResults = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories),
      macros,
    };

    setCalculatorResults(nextResults);

    if (nextResults.goalCalories !== null && nextResults.macros) {
      const nextTrackingTargets: TrackingTargetState = {
        calories: String(nextResults.goalCalories),
        proteinGrams: String(nextResults.macros.protein.grams),
        fatGrams: String(nextResults.macros.fats.grams),
        carbsGrams: String(nextResults.macros.carbs.grams),
      };

      const nextNutritionForm: NutritionPlanFormState = {
        targetCalories: String(nextResults.goalCalories),
        goal: formData.goal,
        mealsPerDay: state.nutritionPlanFormState.mealsPerDay,
      };

      setTrackingTargetState(nextTrackingTargets);
      setNutritionPlanFormState(nextNutritionForm);
    }
  };

  return {
    formData,
    results,
    errors,
    handleSelectChange,
    handleNumberChange,
    handleSubmit,
  };
}
