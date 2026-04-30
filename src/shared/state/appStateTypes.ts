import {
  ACTIVITY_LEVEL,
  CalculationResults,
  CalculatorFormData,
  GENDER,
  GOAL,
  Goal,
} from '@/features/calculator/domain/calculations';
import { GeneratedNutritionPlan } from '@/features/nutrition/domain/types';
import { MealEntry } from '@/shared/domain/models';

export interface NutritionPlanFormState {
  targetCalories: string;
  goal: Goal;
  mealsPerDay: '3' | '4';
}

export interface TrackingTargetState {
  calories: string;
  proteinGrams: string;
  fatGrams: string;
  carbsGrams: string;
}

export interface AppStateSnapshot {
  calculatorFormData: CalculatorFormData;
  calculatorResults: CalculationResults;
  nutritionPlanFormState: NutritionPlanFormState;
  generatedNutritionPlan: GeneratedNutritionPlan | null;
  trackingTargetState: TrackingTargetState;
  trackingEntries: MealEntry[];
}

export const initialCalculatorFormData: CalculatorFormData = {
  gender: GENDER.MALE,
  weight: '',
  height: '',
  age: '',
  activity: ACTIVITY_LEVEL.SEDENTARY,
  goal: GOAL.LOSE,
};

export const initialCalculatorResults: CalculationResults = {
  bmr: null,
  tdee: null,
  goalCalories: null,
  macros: null,
};

export const initialNutritionPlanFormState: NutritionPlanFormState = {
  targetCalories: '2200',
  goal: GOAL.MAINTAIN,
  mealsPerDay: '4',
};

export const initialTrackingTargetState: TrackingTargetState = {
  calories: '2200',
  proteinGrams: '160',
  fatGrams: '70',
  carbsGrams: '240',
};

export const initialAppStateSnapshot: AppStateSnapshot = {
  calculatorFormData: initialCalculatorFormData,
  calculatorResults: initialCalculatorResults,
  nutritionPlanFormState: initialNutritionPlanFormState,
  generatedNutritionPlan: null,
  trackingTargetState: initialTrackingTargetState,
  trackingEntries: [],
};
