'use client';

import Link from 'next/link';
import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@/shared/ui/Button';
import Card from '@/shared/ui/Card';
import Input from '@/shared/ui/Input';
import Select, { SelectOption } from '@/shared/ui/Select';
import { Goal, GOAL } from '@/features/calculator/domain/calculations';
import { useNutritionPlanGenerator } from '@/features/nutrition/hooks/useNutritionPlanGenerator';
import { MealType } from '@/features/nutrition/domain/types';
import { flexibleNutritionFoundation } from '@/features/nutrition/domain/flexNutritionRules';
import { useUiPreferences } from '@/providers/UiPreferencesProvider';

function OptionList({
  title,
  items,
  moreOptionsLabel,
}: {
  title: string;
  items: string[];
  moreOptionsLabel: string;
}) {
  if (items.length === 0) {
    return null;
  }

  const previewItems = items.slice(0, 6);
  const remainingCount = items.length - previewItems.length;

  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="body2">{previewItems.join(' / ')}</Typography>
      {remainingCount > 0 && (
        <Typography variant="caption" color="text.secondary">
          +{remainingCount} {moreOptionsLabel}
        </Typography>
      )}
    </Box>
  );
}

export default function NutritionPlanPageContent() {
  const { messages } = useUiPreferences();

  const {
    formState,
    errors,
    plan,
    handleSelectChange,
    handleCaloriesChange,
    handleSubmit,
  } = useNutritionPlanGenerator();

  const goalOptions: SelectOption<Goal>[] = [
    { value: GOAL.LOSE, label: messages.nutrition.goalOptions.lose },
    { value: GOAL.MAINTAIN, label: messages.nutrition.goalOptions.maintain },
    { value: GOAL.GAIN, label: messages.nutrition.goalOptions.gain },
  ];

  const mealsPerDayOptions: SelectOption<'3' | '4'>[] = [
    { value: '3', label: messages.nutrition.mealsPerDayOptions.three },
    { value: '4', label: messages.nutrition.mealsPerDayOptions.four },
  ];

  const mealTypeLabels: Record<MealType, string> = {
    breakfast: messages.nutrition.mealTypeLabels.breakfast,
    lunch: messages.nutrition.mealTypeLabels.lunch,
    dinner: messages.nutrition.mealTypeLabels.dinner,
    snack: messages.nutrition.mealTypeLabels.snack,
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Link href="/" passHref style={{ textDecoration: 'none' }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ mr: 1 }}
          >
            {messages.common.back}
          </Button>
        </Link>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          {messages.nutrition.title}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card title={messages.nutrition.planInputs}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Input
                  label={messages.nutrition.targetCalories}
                  value={formState.targetCalories}
                  onChange={handleCaloriesChange}
                  error={errors.targetCalories}
                  helperText={
                    errors.targetCalories
                      ? messages.nutrition.requiredField
                      : ''
                  }
                  InputProps={{ inputProps: { min: 1200, max: 5000 } }}
                />
                <Select
                  label={messages.nutrition.goal}
                  value={formState.goal}
                  options={goalOptions}
                  onChange={handleSelectChange('goal')}
                />
                <Select
                  label={messages.nutrition.mealsPerDay}
                  value={formState.mealsPerDay}
                  options={mealsPerDayOptions}
                  onChange={handleSelectChange('mealsPerDay')}
                />
                <Button type="submit" variant="contained">
                  {messages.nutrition.generatePlan}
                </Button>
                <Button
                  component={Link}
                  href="/progress"
                  variant="outlined"
                  endIcon={<ArrowForwardIcon />}
                >
                  {messages.nutrition.openDailyProgress}
                </Button>
              </Box>
            </form>
          </Card>

          <Card title={messages.nutrition.flexibleRulesTitle} sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {messages.nutrition.flexibleRules.split.replace(
                '2',
                String(flexibleNutritionFoundation.maxProductsPerSlot),
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {messages.nutrition.flexibleRules.rotation}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {messages.nutrition.flexibleRules.limit}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {messages.nutrition.flexibleRules.beverages}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {messages.nutrition.flexibleRules.freeMeal.replace(
                '60',
                String(
                  flexibleNutritionFoundation.weeklyFreeMeal.maxDurationMinutes,
                ),
              )}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card title={messages.nutrition.dailyStructure}>
            {!plan && (
              <Typography color="text.secondary">
                {messages.nutrition.emptyState}
              </Typography>
            )}

            {plan && (
              <Box>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle1">
                    {messages.nutrition.dailyTarget}:{' '}
                    <strong>{plan.targets.calories} kcal</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {messages.common.protein} {plan.targets.proteinGrams}g |{' '}
                    {messages.common.fats} {plan.targets.fatGrams}g |{' '}
                    {messages.common.carbs} {plan.targets.carbsGrams}g
                  </Typography>
                </Paper>

                <List sx={{ p: 0 }}>
                  {plan.meals.map((meal, index) => (
                    <Box key={meal.mealType}>
                      <ListItem sx={{ display: 'block', px: 0, py: 1.5 }}>
                        <Typography variant="h6">
                          {index + 1}. {mealTypeLabels[meal.mealType]}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {`Target: ${meal.target.calories} kcal | P ${meal.target.proteinGrams}g | F ${meal.target.fatGrams}g | C ${meal.target.carbsGrams}g`}
                        </Typography>
                        <Grid container spacing={1.5}>
                          <Grid item xs={12} sm={6}>
                            <OptionList
                              title={messages.nutrition.optionTitles.protein}
                              items={meal.proteinOptions.map(
                                (item) => item.name,
                              )}
                              moreOptionsLabel={messages.nutrition.moreOptions}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <OptionList
                              title={messages.nutrition.optionTitles.carbs}
                              items={meal.carbOptions.map((item) => item.name)}
                              moreOptionsLabel={messages.nutrition.moreOptions}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <OptionList
                              title={messages.nutrition.optionTitles.fats}
                              items={meal.fatOptions.map((item) => item.name)}
                              moreOptionsLabel={messages.nutrition.moreOptions}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <OptionList
                              title={messages.nutrition.optionTitles.extras}
                              items={meal.extraOptions.map((item) => item.name)}
                              moreOptionsLabel={messages.nutrition.moreOptions}
                            />
                          </Grid>
                        </Grid>
                      </ListItem>
                      {index < plan.meals.length - 1 && <Divider />}
                    </Box>
                  ))}
                </List>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
