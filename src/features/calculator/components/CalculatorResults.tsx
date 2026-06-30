import Link from 'next/link';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import Card from '@/shared/ui/Card';
import Button from '@/shared/ui/Button';
import {
  CalculationResults,
  GOAL,
  Goal,
  Macronutrient,
} from '@/features/calculator/domain/calculations';
import { useUiPreferences } from '@/providers/UiPreferencesProvider';

interface CalculatorResultsProps {
  results: CalculationResults;
  goal: Goal;
}

interface MacroBoxProps {
  title: string;
  macro: Macronutrient;
  bgColor: string;
}

function MacroBox({ title, macro, bgColor }: MacroBoxProps) {
  return (
    <Box sx={{ textAlign: 'center', p: 1, bgcolor: bgColor, borderRadius: 1 }}>
      <Typography variant="subtitle2" color="white">
        {title}
      </Typography>
      <Typography variant="h6" color="white">
        {macro.grams} g
      </Typography>
      <Typography variant="body2" color="white">
        {macro.calories} kcal
      </Typography>
      <Typography variant="body2" color="white">
        {macro.percentage}%
      </Typography>
    </Box>
  );
}

function MacroDistributionCard({ results, goal }: CalculatorResultsProps) {
  const { messages } = useUiPreferences();

  if (!results.macros || results.goalCalories === null) {
    return null;
  }

  const goalHint =
    goal === GOAL.LOSE
      ? messages.calculator.results.macroGoalHint.lose
      : goal === GOAL.GAIN
        ? messages.calculator.results.macroGoalHint.gain
        : messages.calculator.results.macroGoalHint.maintain;

  return (
    <Card title={messages.calculator.results.macrosTitle}>
      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              {messages.calculator.results.dailyTarget}:{' '}
              <strong>{results.goalCalories} kcal</strong>
            </Typography>
            <Divider sx={{ my: 1 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MacroBox
              title={messages.common.protein}
              macro={results.macros.protein}
              bgColor="success.light"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MacroBox
              title={messages.common.fats}
              macro={results.macros.fats}
              bgColor="warning.light"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MacroBox
              title={messages.common.carbs}
              macro={results.macros.carbs}
              bgColor="info.light"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {goalHint}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Card>
  );
}

export default function CalculatorResults({
  results,
  goal,
}: CalculatorResultsProps) {
  const { messages } = useUiPreferences();

  if (
    results.bmr === null ||
    results.tdee === null ||
    results.goalCalories === null
  ) {
    return (
      <Card title={messages.calculator.results.title}>
        <Typography variant="body1" color="text.secondary" align="center">
          {messages.calculator.results.empty}
        </Typography>
      </Card>
    );
  }

  const goalHint =
    goal === GOAL.LOSE
      ? messages.calculator.results.goalHint.lose
      : goal === GOAL.GAIN
        ? messages.calculator.results.goalHint.gain
        : messages.calculator.results.goalHint.maintain;

  return (
    <>
      <Card title={messages.calculator.results.title}>
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            {messages.calculator.results.bmr}
          </Typography>
          <Typography variant="h5" color="primary">
            {results.bmr} kcal/day
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {messages.calculator.results.bmrHint}
          </Typography>
        </Paper>
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            {messages.calculator.results.tdee}
          </Typography>
          <Typography variant="h5" color="primary">
            {results.tdee} kcal/day
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {messages.calculator.results.tdeeHint}
          </Typography>
        </Paper>
        <Paper
          elevation={3}
          sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}
        >
          <Typography variant="subtitle1" gutterBottom>
            {messages.calculator.results.recommendedIntake}
          </Typography>
          <Typography variant="h5">{results.goalCalories} kcal/day</Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
            {goalHint}
          </Typography>
        </Paper>
      </Card>
      <Box sx={{ mt: 3 }}>
        <MacroDistributionCard results={results} goal={goal} />
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Link href="/nutrition" passHref style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary">
            {messages.calculator.results.goToNutrition}
          </Button>
        </Link>
      </Box>
    </>
  );
}
