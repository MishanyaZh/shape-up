import { DailyTracking, NutritionTargets } from '@/shared/domain/models';
import { calculateCombinedAdherence } from './adherence';
import {
  createZeroTargets,
  subtractNutritionTargets,
} from './nutritionTargets';

interface DailyTrackingSnapshotParams {
  date: string;
  target: NutritionTargets;
  consumed: NutritionTargets;
}

export function createDailyTrackingSnapshot({
  date,
  target,
  consumed,
}: DailyTrackingSnapshotParams): DailyTracking {
  return {
    date,
    entries: [],
    consumed,
    remaining: subtractNutritionTargets(target, consumed),
    adherencePercent: calculateCombinedAdherence(target, consumed),
  };
}

export function createEmptyDailyTracking(date: string): DailyTracking {
  return {
    date,
    entries: [],
    consumed: createZeroTargets(),
    remaining: createZeroTargets(),
    adherencePercent: 0,
  };
}
