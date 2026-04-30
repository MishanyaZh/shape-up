'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  AppStateSnapshot,
  initialAppStateSnapshot,
  NutritionPlanFormState,
  TrackingTargetState,
} from '@/shared/state/appStateTypes';
import {
  CalculationResults,
  CalculatorFormData,
} from '@/features/calculator/domain/calculations';
import { GeneratedNutritionPlan } from '@/features/nutrition/domain/types';
import { MealEntry } from '@/shared/domain/models';

interface AppStateContextValue {
  state: AppStateSnapshot;
  setCalculatorFormData: (value: CalculatorFormData) => void;
  setCalculatorResults: (value: CalculationResults) => void;
  setNutritionPlanFormState: (value: NutritionPlanFormState) => void;
  setGeneratedNutritionPlan: (value: GeneratedNutritionPlan | null) => void;
  setTrackingTargetState: (value: TrackingTargetState) => void;
  setTrackingEntries: (value: MealEntry[]) => void;
}

const STORAGE_KEY = 'shapeup.app-state.v1';

const AppStateContext = createContext<AppStateContextValue | null>(null);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export default function AppStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<AppStateSnapshot>(initialAppStateSnapshot);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      const persisted = localStorage.getItem(STORAGE_KEY);
      if (!persisted) {
        setHasHydrated(true);
        return;
      }

      const parsed: unknown = JSON.parse(persisted);
      if (!isRecord(parsed)) {
        setHasHydrated(true);
        return;
      }

      setState((current) => ({
        ...current,
        ...(parsed as Partial<AppStateSnapshot>),
      }));
    } catch {
      // Ignore malformed localStorage payload and continue with defaults.
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hasHydrated, state]);

  const value = useMemo<AppStateContextValue>(
    () => ({
      state,
      setCalculatorFormData: (calculatorFormData) =>
        setState((current) => ({ ...current, calculatorFormData })),
      setCalculatorResults: (calculatorResults) =>
        setState((current) => ({ ...current, calculatorResults })),
      setNutritionPlanFormState: (nutritionPlanFormState) =>
        setState((current) => ({ ...current, nutritionPlanFormState })),
      setGeneratedNutritionPlan: (generatedNutritionPlan) =>
        setState((current) => ({ ...current, generatedNutritionPlan })),
      setTrackingTargetState: (trackingTargetState) =>
        setState((current) => ({ ...current, trackingTargetState })),
      setTrackingEntries: (trackingEntries) =>
        setState((current) => ({ ...current, trackingEntries })),
    }),
    [state],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }

  return context;
}
