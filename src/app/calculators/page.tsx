'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Select, { SelectOption } from '@/shared/ui/Select';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import Card from '@/shared/ui/Card';
import {
  calculateBasalMetabolicRate,
  calculateTotalDailyEnergyExpenditure,
  calculateTargetCalories,
  calculateMacronutrients,
  MacronutrientDistribution,
  Gender,
  Goal,
  ActivityLevel,
  Macronutrient,
} from '@/shared/utils/nutrition';

const genderOptions: SelectOption[] = [
  { value: Gender.MALE, label: 'Мужской' },
  { value: Gender.FEMALE, label: 'Женский' },
];

const activityOptions: SelectOption[] = [
  {
    value: ActivityLevel.SEDENTARY,
    label: 'Сидячий (мало или совсем нет упражнений)',
  },
  {
    value: ActivityLevel.LIGHT,
    label: 'Легкая активность (легкие упражнения/спорт 1-3 дня в неделю)',
  },
  {
    value: ActivityLevel.MODERATE,
    label:
      'Умеренная активность (умеренные упражнения/спорт 3-5 дней в неделю)',
  },
  {
    value: ActivityLevel.ACTIVE,
    label:
      'Высокая активность (интенсивные упражнения/спорт 6-7 дней в неделю)',
  },
  {
    value: ActivityLevel.VERY_ACTIVE,
    label:
      'Очень высокая активность (очень интенсивные упражнения и физическая работа)',
  },
];

const goalOptions: SelectOption[] = [
  { value: Goal.LOSE, label: 'Похудеть' },
  { value: Goal.MAINTAIN, label: 'Поддерживать вес' },
  { value: Goal.GAIN, label: 'Набрать вес' },
];

interface CalculatorFormData {
  gender: Gender;
  weight: string;
  height: string;
  age: string;
  activity: ActivityLevel | string;
  goal: Goal;
}

interface CalculationResults {
  bmr: number | null;
  tdee: number | null;
  goal: number | null;
  macros: MacronutrientDistribution | null;
}

export default function CalculatorsPage() {
  const [formData, setFormData] = useState<CalculatorFormData>({
    gender: Gender.MALE,
    weight: '',
    height: '',
    age: '',
    activity: ActivityLevel.SEDENTARY,
    goal: Goal.LOSE,
  });

  const [results, setResults] = useState<CalculationResults>({
    bmr: null,
    tdee: null,
    goal: null,
    macros: null,
  });

  const [errors, setErrors] = useState({
    weight: false,
    height: false,
    age: false,
  });

  const handleChange = (field: string) => (value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleNumberChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (value === '' || /^\d+$/.test(value)) {
        setFormData({
          ...formData,
          [field]: value,
        });

        if (errors[field as keyof typeof errors]) {
          setErrors({
            ...errors,
            [field]: false,
          });
        }
      }
    };

  const calculateBMR = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const age = parseFloat(formData.age);

    return calculateBasalMetabolicRate({
      gender: formData.gender,
      weight,
      height,
      age,
      activityMultiplier: parseFloat(formData.activity),
    });
  };

  const calculateTDEE = (bmr: number) => {
    const activityFactor = parseFloat(formData.activity);
    return calculateTotalDailyEnergyExpenditure(bmr, activityFactor);
  };

  const calculateGoalCalories = (tdee: number) => {
    return calculateTargetCalories(tdee, formData.goal);
  };

  const validateForm = () => {
    const newErrors = {
      weight: formData.weight === '',
      height: formData.height === '',
      age: formData.age === '',
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const weight = parseFloat(formData.weight);
      const bmr = calculateBMR();
      const tdee = calculateTDEE(bmr);
      const goalCalories = calculateGoalCalories(tdee);
      const macros = calculateMacronutrients(
        goalCalories,
        weight,
        formData.goal as Goal,
      );

      setResults({
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        goal: Math.round(goalCalories),
        macros: macros,
      });
    }
  };

  const renderMacronutrientBox = (
    title: string,
    macro: Macronutrient,
    bgColor: string,
  ) => {
    return (
      <Box
        sx={{
          textAlign: 'center',
          p: 1,
          bgcolor: bgColor,
          borderRadius: 1,
        }}
      >
        <Typography variant="subtitle2" color="white">
          {title}
        </Typography>
        <Typography variant="h6" color="white">
          {macro.grams} г
        </Typography>
        <Typography variant="body2" color="white">
          {macro.calories} ккал
        </Typography>
        <Typography variant="body2" color="white">
          {macro.percentage}%
        </Typography>
      </Box>
    );
  };

  const renderMacroCard = () => {
    if (!results.macros) return null;

    return (
      <Card title="Рекомендуемое распределение макронутриентов">
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Суточная норма: <strong>{results.goal} ккал</strong>
              </Typography>
              <Divider sx={{ my: 1 }} />
            </Grid>

            <Grid item xs={12} sm={4}>
              {renderMacronutrientBox(
                'Белки',
                results.macros.protein,
                'success.light',
              )}
            </Grid>

            <Grid item xs={12} sm={4}>
              {renderMacronutrientBox(
                'Жиры',
                results.macros.fats,
                'warning.light',
              )}
            </Grid>

            <Grid item xs={12} sm={4}>
              {renderMacronutrientBox(
                'Углеводы',
                results.macros.carbs,
                'info.light',
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                {formData.goal === Goal.LOSE &&
                  'При снижении веса важно поддерживать высокое потребление белка для сохранения мышечной массы.'}
                {formData.goal === Goal.MAINTAIN &&
                  'Сбалансированное питание поможет поддерживать текущий вес и хорошее самочувствие.'}
                {formData.goal === Goal.GAIN &&
                  'Для набора мышечной массы требуется положительный баланс калорий и достаточное количество белка.'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Card>
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Link href="/" passHref style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ mr: 2 }}
          >
            На главную
          </Button>
        </Link>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          sx={{ flexGrow: 1 }}
        >
          Калькулятор BMR и TDEE
        </Typography>
      </Box>

      <Typography variant="body1" align="center" paragraph>
        Рассчитайте свою базовую скорость метаболизма (BMR) и общий расход
        энергии в день (TDEE), чтобы узнать свою дневную потребность в калориях.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card title="Введите ваши данные">
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <Select
                  label="Пол"
                  options={genderOptions}
                  value={formData.gender}
                  onChange={handleChange('gender')}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Input
                  label="Вес (кг)"
                  value={formData.weight}
                  onChange={handleNumberChange('weight')}
                  fullWidth
                  error={errors.weight}
                  helperText={errors.weight ? 'Введите ваш вес' : ''}
                  InputProps={{ inputProps: { min: 30, max: 300 } }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Input
                  label="Рост (см)"
                  value={formData.height}
                  onChange={handleNumberChange('height')}
                  fullWidth
                  error={errors.height}
                  helperText={errors.height ? 'Введите ваш рост' : ''}
                  InputProps={{ inputProps: { min: 120, max: 250 } }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Input
                  label="Возраст"
                  value={formData.age}
                  onChange={handleNumberChange('age')}
                  fullWidth
                  error={errors.age}
                  helperText={errors.age ? 'Введите ваш возраст' : ''}
                  InputProps={{ inputProps: { min: 15, max: 100 } }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Select
                  label="Уровень активности"
                  options={activityOptions}
                  value={formData.activity}
                  onChange={handleChange('activity')}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Select
                  label="Цель"
                  options={goalOptions}
                  value={formData.goal}
                  onChange={handleChange('goal')}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Рассчитать
              </Button>
            </form>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card title="Результаты">
            {results.bmr !== null ? (
              <Box>
                <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Базовая скорость метаболизма (BMR)
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {results.bmr} ккал/день
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    Это количество калорий, необходимое вашему организму в
                    состоянии покоя.
                  </Typography>
                </Paper>

                <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Общий расход энергии в день (TDEE)
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {results.tdee} ккал/день
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    Это количество калорий, которое вы сжигаете в день с учетом
                    активности.
                  </Typography>
                </Paper>

                <Paper
                  elevation={3}
                  sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    Рекомендуемое потребление калорий
                  </Typography>
                  <Typography variant="h5">{results.goal} ккал/день</Typography>
                  <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                    {formData.goal === Goal.LOSE &&
                      'Для постепенного снижения веса (~0.5 кг/неделю)'}
                    {formData.goal === Goal.MAINTAIN &&
                      'Для поддержания текущего веса'}
                    {formData.goal === Goal.GAIN &&
                      'Для постепенного набора веса (~0.5 кг/неделю)'}
                  </Typography>
                </Paper>
              </Box>
            ) : (
              <Typography variant="body1" color="textSecondary" align="center">
                Заполните форму и нажмите Рассчитать, чтобы увидеть результаты.
              </Typography>
            )}
          </Card>

          {results.macros && <Box sx={{ mt: 3 }}>{renderMacroCard()}</Box>}
        </Grid>
      </Grid>
    </Container>
  );
}
