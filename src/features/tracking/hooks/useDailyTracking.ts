'use client';

import { useMemo, useState } from 'react';
import { nutritionFoodOptions } from '@/features/nutrition/data/catalog';
import {
  MealType,
  MEAL_TYPE,
  NutritionFoodOption,
} from '@/features/nutrition/domain/types';
import {
  calculateCalorieAdherence,
  calculateCombinedAdherence,
  calculateMacroAdherence,
} from '@/features/tracking/domain/adherence';
import {
  addNutritionTargets,
  createZeroTargets,
  subtractNutritionTargets,
} from '@/features/tracking/domain/nutritionTargets';
import { useAppState } from '@/providers/AppStateProvider';
import { MealEntry, NutritionTargets } from '@/shared/domain/models';

interface TrackingFormState {
  mealType: MealType;
  categoryId: string;
  foodId: string;
  quantity: string;
}

interface TrackingEntryView {
  entry: MealEntry;
  food: NutritionFoodOption;
  totals: NutritionTargets;
}

const initialFormState: TrackingFormState = {
  mealType: MEAL_TYPE.BREAKFAST,
  categoryId: 'protein',
  foodId: '',
  quantity: '1',
};

function toNumber(value: string): number {
  return Number(value || '0');
}

function getEntryTotals(
  food: NutritionFoodOption,
  quantity: number,
): NutritionTargets {
  return {
    calories: Math.round(food.calories * quantity),
    proteinGrams: Math.round(food.proteinGrams * quantity),
    fatGrams: Math.round(food.fatGrams * quantity),
    carbsGrams: Math.round(food.carbsGrams * quantity),
  };
}

export function useDailyTracking() {
  const { state, setTrackingEntries } = useAppState();

  const [formState, setFormState] =
    useState<TrackingFormState>(initialFormState);

  const targetState = state.trackingTargetState;
  const plan = state.generatedNutritionPlan;
  const entries = state.trackingEntries;

  const availableFoods = useMemo(
    () =>
      nutritionFoodOptions.filter(
        (food) =>
          food.categoryId === formState.categoryId &&
          food.mealTypes.includes(formState.mealType),
      ),
    [formState.categoryId, formState.mealType],
  );

  const target = useMemo<NutritionTargets>(
    () => ({
      calories: toNumber(targetState.calories),
      proteinGrams: toNumber(targetState.proteinGrams),
      fatGrams: toNumber(targetState.fatGrams),
      carbsGrams: toNumber(targetState.carbsGrams),
    }),
    [targetState],
  );

  const entryViews = useMemo<TrackingEntryView[]>(() => {
    return entries
      .map((entry) => {
        const food = nutritionFoodOptions.find(
          (item) => item.id === entry.foodOptionId,
        );
        if (!food) {
          return null;
        }

        return {
          entry,
          food,
          totals: getEntryTotals(food, entry.quantity),
        };
      })
      .filter((item): item is TrackingEntryView => Boolean(item));
  }, [entries]);

  const consumed = useMemo(() => {
    return entryViews.reduce(
      (accumulator, item) => addNutritionTargets(accumulator, item.totals),
      createZeroTargets(),
    );
  }, [entryViews]);

  const remaining = useMemo(
    () => subtractNutritionTargets(target, consumed),
    [target, consumed],
  );

  const calorieAdherence = useMemo(
    () => calculateCalorieAdherence(target.calories, consumed.calories),
    [target.calories, consumed.calories],
  );

  const macroAdherence = useMemo(
    () => calculateMacroAdherence(target, consumed),
    [target, consumed],
  );

  const adherencePercent = useMemo(
    () => calculateCombinedAdherence(target, consumed),
    [target, consumed],
  );

  const handleFormSelectChange =
    <K extends keyof TrackingFormState>(field: K) =>
    (value: TrackingFormState[K]) => {
      setFormState((current) => {
        if (field === 'mealType' || field === 'categoryId') {
          return {
            ...current,
            [field]: value,
            foodId: '',
          };
        }

        return { ...current, [field]: value };
      });
    };

  const handleAddEntry = () => {
    const quantity = Number(formState.quantity);
    const selectedFood = nutritionFoodOptions.find(
      (item) => item.id === formState.foodId,
    );

    if (!selectedFood || quantity <= 0) {
      return;
    }

    const entry: MealEntry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      mealType: formState.mealType,
      foodOptionId: formState.foodId,
      quantity,
    };

    setTrackingEntries([...entries, entry]);
    setFormState((current) => ({ ...current, foodId: '', quantity: '1' }));
  };

  const handleRemoveEntry = (entryId: string) => {
    setTrackingEntries(entries.filter((entry) => entry.id !== entryId));
  };

  return {
    formState,
    plan,
    entries: entryViews,
    target,
    consumed,
    remaining,
    calorieAdherence,
    macroAdherence,
    adherencePercent,
    availableFoods,
    handleFormSelectChange,
    handleAddEntry,
    handleRemoveEntry,
  };
}
