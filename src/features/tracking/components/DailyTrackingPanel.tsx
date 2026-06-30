'use client';

import Link from 'next/link';
import {
  Box,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import Card from '@/shared/ui/Card';
import Button from '@/shared/ui/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Paper from '@mui/material/Paper';
import Select, { SelectOption } from '@/shared/ui/Select';
import { useDailyTracking } from '../hooks/useDailyTracking';
import ComplianceIndicatorCard from '@/features/tracking/components/ComplianceIndicatorCard';
import { MEAL_TYPE, MealType } from '@/features/nutrition/domain/types';
import { useUiPreferences } from '@/providers/UiPreferencesProvider';

export default function DailyTrackingPanel() {
  const { messages } = useUiPreferences();

  const {
    formState,
    plan,
    entries,
    target,
    consumed,
    remaining,
    calorieAdherence,
    macroAdherence,
    adherencePercent,
    foodCategories,
    availableFoods,
    handleFormSelectChange,
    handleAddEntry,
    handleRemoveEntry,
  } = useDailyTracking();

  const mealTypeOptions: SelectOption<MealType>[] = [
    {
      value: MEAL_TYPE.BREAKFAST,
      label: messages.tracking.mealTypeLabels.breakfast,
    },
    { value: MEAL_TYPE.LUNCH, label: messages.tracking.mealTypeLabels.lunch },
    {
      value: MEAL_TYPE.DINNER,
      label: messages.tracking.mealTypeLabels.dinner,
    },
    { value: MEAL_TYPE.SNACK, label: messages.tracking.mealTypeLabels.snack },
  ];

  const mealTypeLabelMap = mealTypeOptions.reduce<Record<string, string>>(
    (accumulator, option) => ({
      ...accumulator,
      [option.value]: option.label,
    }),
    {},
  );

  const nutritionMealLabels: Record<MealType, string> = {
    breakfast: messages.tracking.mealTypeLabels.breakfast,
    lunch: messages.tracking.mealTypeLabels.lunch,
    dinner: messages.tracking.mealTypeLabels.dinner,
    snack: messages.tracking.mealTypeLabels.snack,
  };

  const foodCategoryOptions: SelectOption<string>[] = foodCategories.map(
    (category) => ({
      value: category.id,
      label: category.name,
    }),
  );

  const foodOptions: SelectOption<string>[] = availableFoods.map((food) => ({
    value: food.id,
    label: `${food.name} (${food.calories} kcal)`,
  }));

  const quantity = Number(formState.quantity || '0');
  const canAddEntry =
    Boolean(formState.foodId) &&
    Number.isFinite(quantity) &&
    quantity > 0 &&
    availableFoods.some((food) => food.id === formState.foodId);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Card title={messages.tracking.dailyTargets}>
          <Box sx={{ display: 'grid', gap: 1 }}>
            <Typography variant="body1">
              {messages.common.calories}:{' '}
              <strong>{target.calories} kcal</strong>
            </Typography>
            <Typography variant="body1">
              {messages.common.protein}:{' '}
              <strong>{target.proteinGrams} g</strong>
            </Typography>
            <Typography variant="body1">
              {messages.common.fats}: <strong>{target.fatGrams} g</strong>
            </Typography>
            <Typography variant="body1">
              {messages.common.carbs}: <strong>{target.carbsGrams} g</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {messages.tracking.syncedFromCalculator}
            </Typography>
          </Box>
        </Card>

        <Card title={messages.tracking.addFoodEntry} sx={{ mt: 3 }}>
          <Box sx={{ display: 'grid', gap: 2 }}>
            <Select
              label={messages.tracking.mealType}
              value={formState.mealType}
              options={mealTypeOptions}
              onChange={handleFormSelectChange('mealType')}
            />
            <Select
              label={messages.tracking.category}
              value={formState.categoryId}
              options={foodCategoryOptions}
              onChange={handleFormSelectChange('categoryId')}
            />
            <Select
              label={messages.tracking.food}
              value={formState.foodId}
              options={foodOptions}
              onChange={handleFormSelectChange('foodId')}
              disabled={foodOptions.length === 0}
            />
            <Select
              label={messages.tracking.portions}
              value={formState.quantity}
              options={[
                { value: '0.5', label: '0.5' },
                { value: '1', label: '1' },
                { value: '1.5', label: '1.5' },
                { value: '2', label: '2' },
              ]}
              onChange={handleFormSelectChange('quantity')}
            />
            <Button
              onClick={handleAddEntry}
              variant="contained"
              disabled={!canAddEntry}
            >
              {messages.tracking.addEntry}
            </Button>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} md={7}>
        <Card title={messages.tracking.dailyStructure} sx={{ mb: 3 }}>
          {!plan && (
            <Box>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {messages.tracking.noPlan}
              </Typography>
              <Button
                component={Link}
                href="/nutrition"
                variant="outlined"
                startIcon={<ArrowForwardIcon />}
              >
                {messages.tracking.openNutritionGenerator}
              </Button>
            </Box>
          )}

          {plan && (
            <Box sx={{ display: 'grid', gap: 1.5 }}>
              {plan.meals.map((meal, index) => (
                <Paper key={`${meal.mealType}-${index}`} sx={{ p: 1.5 }}>
                  <Typography variant="subtitle1">
                    {index + 1}. {nutritionMealLabels[meal.mealType]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Target: ${meal.target.calories} kcal | P ${meal.target.proteinGrams}g | F ${meal.target.fatGrams}g | C ${meal.target.carbsGrams}g`}
                  </Typography>
                </Paper>
              ))}
            </Box>
          )}
        </Card>

        <ComplianceIndicatorCard
          calorieAdherence={calorieAdherence}
          macroAdherence={macroAdherence}
          combinedAdherence={adherencePercent}
          consumed={consumed}
          remaining={remaining}
        />

        <Card title={messages.tracking.dailySummary} sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            <Chip
              label={`${messages.tracking.adherence} ${adherencePercent}%`}
              color="primary"
            />
            <Chip
              label={`${messages.tracking.consumed} ${consumed.calories} kcal`}
              color="success"
            />
            <Chip
              label={`${messages.tracking.remaining} ${remaining.calories} kcal`}
              color="warning"
            />
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {messages.tracking.targetLabel}: P {target.proteinGrams}g | F{' '}
            {target.fatGrams}g | C {target.carbsGrams}g
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {messages.tracking.consumedLabel}: P {consumed.proteinGrams}g | F{' '}
            {consumed.fatGrams}g | C {consumed.carbsGrams}g
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {messages.tracking.remainingLabel}: P {remaining.proteinGrams}g | F{' '}
            {remaining.fatGrams}g | C {remaining.carbsGrams}g
          </Typography>

          {entries.length === 0 && (
            <Typography color="text.secondary">
              {messages.tracking.noEntries}
            </Typography>
          )}

          {entries.length > 0 && (
            <List sx={{ p: 0 }}>
              {entries.map((item, index) => (
                <Box key={item.entry.id}>
                  <ListItem sx={{ px: 0, display: 'block' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 1,
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1">
                          {item.food.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {mealTypeLabelMap[item.entry.mealType] ??
                            item.entry.mealType}{' '}
                          | {item.entry.quantity}{' '}
                          {messages.tracking.portionsUnit}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${item.totals.calories} kcal | P ${item.totals.proteinGrams}g | F ${item.totals.fatGrams}g | C ${item.totals.carbsGrams}g`}
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleRemoveEntry(item.entry.id)}
                      >
                        {messages.tracking.remove}
                      </Button>
                    </Box>
                  </ListItem>
                  {index < entries.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          )}
        </Card>
      </Grid>
    </Grid>
  );
}
