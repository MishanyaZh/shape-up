import { SelectOption } from '@/shared/ui/Select';
import {
  ACTIVITY_LEVEL,
  ActivityLevel,
  Gender,
  GENDER,
  Goal,
  GOAL,
} from '@/features/calculator/domain/calculations';

export const genderOptions: SelectOption<Gender>[] = [
  { value: GENDER.MALE, label: 'Male' },
  { value: GENDER.FEMALE, label: 'Female' },
];

export const activityOptions: SelectOption<ActivityLevel>[] = [
  {
    value: ACTIVITY_LEVEL.SEDENTARY,
    label: 'Sedentary (little to no exercise)',
  },
  {
    value: ACTIVITY_LEVEL.LIGHT,
    label: 'Light activity (exercise 1-3 days/week)',
  },
  {
    value: ACTIVITY_LEVEL.MODERATE,
    label: 'Moderate activity (exercise 3-5 days/week)',
  },
  {
    value: ACTIVITY_LEVEL.ACTIVE,
    label: 'High activity (intense exercise 6-7 days/week)',
  },
  {
    value: ACTIVITY_LEVEL.VERY_ACTIVE,
    label: 'Very high activity (intense exercise + physical work)',
  },
];

export const goalOptions: SelectOption<Goal>[] = [
  { value: GOAL.LOSE, label: 'Lose Fat' },
  { value: GOAL.MAINTAIN, label: 'Maintain Weight' },
  { value: GOAL.GAIN, label: 'Gain Weight' },
];
