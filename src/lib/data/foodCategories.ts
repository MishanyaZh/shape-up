import { SelectOption } from '../../shared/ui/Select';

export const foodCategories: SelectOption[] = [
  { value: 'proteins', label: 'Proteins' },
  { value: 'carbs', label: 'Carbs' },
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'fats', label: 'Fats' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'nuts', label: 'Nuts and Seeds' },
  { value: 'any', label: 'Any' },
];

export const mealTypes: SelectOption[] = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snack', label: 'Snack' },
];
