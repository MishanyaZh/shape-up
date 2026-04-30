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

const goalOptions: SelectOption<Goal>[] = [
  { value: GOAL.LOSE, label: 'Fat Loss' },
  { value: GOAL.MAINTAIN, label: 'Maintenance' },
  { value: GOAL.GAIN, label: 'Muscle Gain' },
];

const mealsPerDayOptions: SelectOption<'3' | '4'>[] = [
  { value: '3', label: '3 meals per day' },
  { value: '4', label: '4 meals per day' },
];

const mealTypeLabels: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
};

function OptionList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="body2">{items.join(' / ')}</Typography>
    </Box>
  );
}

export default function NutritionPlanPageContent() {
  const {
    formState,
    errors,
    plan,
    handleSelectChange,
    handleCaloriesChange,
    handleSubmit,
  } = useNutritionPlanGenerator();

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
            Back
          </Button>
        </Link>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          Nutrition Plan Generator
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card title="Plan Inputs">
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Input
                  label="Target Calories"
                  value={formState.targetCalories}
                  onChange={handleCaloriesChange}
                  error={errors.targetCalories}
                  helperText={errors.targetCalories ? 'Required field' : ''}
                  InputProps={{ inputProps: { min: 1200, max: 5000 } }}
                />
                <Select
                  label="Goal"
                  value={formState.goal}
                  options={goalOptions}
                  onChange={handleSelectChange('goal')}
                />
                <Select
                  label="Meals Per Day"
                  value={formState.mealsPerDay}
                  options={mealsPerDayOptions}
                  onChange={handleSelectChange('mealsPerDay')}
                />
                <Button type="submit" variant="contained">
                  Generate Plan
                </Button>
                <Button
                  component={Link}
                  href="/progress"
                  variant="outlined"
                  endIcon={<ArrowForwardIcon />}
                >
                  Open Daily Progress
                </Button>
              </Box>
            </form>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card title="Daily Structure">
            {!plan && (
              <Typography color="text.secondary">
                Set your target and generate a flexible meal structure.
              </Typography>
            )}

            {plan && (
              <Box>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle1">
                    Daily Target: <strong>{plan.targets.calories} kcal</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Protein {plan.targets.proteinGrams}g | Fats{' '}
                    {plan.targets.fatGrams}g | Carbs {plan.targets.carbsGrams}g
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
                              title="Protein"
                              items={meal.proteinOptions.map(
                                (item) => item.name,
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <OptionList
                              title="Carbs"
                              items={meal.carbOptions.map((item) => item.name)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <OptionList
                              title="Fats"
                              items={meal.fatOptions.map((item) => item.name)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <OptionList
                              title="Extras"
                              items={meal.extraOptions.map((item) => item.name)}
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
