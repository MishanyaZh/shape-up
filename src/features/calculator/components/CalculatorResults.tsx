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
  if (!results.macros || results.goalCalories === null) {
    return null;
  }

  const goalHint =
    goal === GOAL.LOSE
      ? 'During fat loss, higher protein intake helps preserve lean muscle mass.'
      : goal === GOAL.GAIN
        ? 'Muscle gain requires a calorie surplus and sufficient daily protein intake.'
        : 'A balanced intake helps maintain body weight and overall well-being.';

  return (
    <Card title="Recommended Macronutrient Split">
      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Daily target: <strong>{results.goalCalories} kcal</strong>
            </Typography>
            <Divider sx={{ my: 1 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MacroBox
              title="Protein"
              macro={results.macros.protein}
              bgColor="success.light"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MacroBox
              title="Fats"
              macro={results.macros.fats}
              bgColor="warning.light"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MacroBox
              title="Carbs"
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
  if (
    results.bmr === null ||
    results.tdee === null ||
    results.goalCalories === null
  ) {
    return (
      <Card title="Results">
        <Typography variant="body1" color="text.secondary" align="center">
          Fill in the form and press Calculate to see your results.
        </Typography>
      </Card>
    );
  }

  const goalHint =
    goal === GOAL.LOSE
      ? 'For gradual fat loss (~0.5 kg/week)'
      : goal === GOAL.GAIN
        ? 'For gradual weight gain (~0.5 kg/week)'
        : 'For weight maintenance';

  return (
    <>
      <Card title="Results">
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Basal Metabolic Rate (BMR)
          </Typography>
          <Typography variant="h5" color="primary">
            {results.bmr} kcal/day
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Estimated calories your body uses at rest.
          </Typography>
        </Paper>
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Total Daily Energy Expenditure (TDEE)
          </Typography>
          <Typography variant="h5" color="primary">
            {results.tdee} kcal/day
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Estimated calories burned per day including activity.
          </Typography>
        </Paper>
        <Paper
          elevation={3}
          sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Recommended Calorie Intake
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
            Go To Nutrition Plan Generator
          </Button>
        </Link>
      </Box>
    </>
  );
}
