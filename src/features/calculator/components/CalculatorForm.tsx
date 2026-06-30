import { Box } from '@mui/material';
import Button from '@/shared/ui/Button';
import Card from '@/shared/ui/Card';
import Input from '@/shared/ui/Input';
import Select from '@/shared/ui/Select';
import { SelectOption } from '@/shared/ui/Select';
import {
  ACTIVITY_LEVEL,
  CalculatorFormData,
  CalculatorValidationErrors,
  GENDER,
  GOAL,
} from '@/features/calculator/domain/calculations';
import { useUiPreferences } from '@/providers/UiPreferencesProvider';

interface CalculatorFormProps {
  formData: CalculatorFormData;
  errors: CalculatorValidationErrors;
  onSubmit: (event: React.FormEvent) => void;
  onNumberChange: (
    field: keyof CalculatorValidationErrors,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: <K extends keyof CalculatorFormData>(
    field: K,
  ) => (value: CalculatorFormData[K]) => void;
}

export default function CalculatorForm({
  formData,
  errors,
  onSubmit,
  onNumberChange,
  onSelectChange,
}: CalculatorFormProps) {
  const { messages } = useUiPreferences();

  const genderOptions: SelectOption<CalculatorFormData['gender']>[] = [
    { value: GENDER.MALE, label: messages.calculator.form.genderOptions.male },
    {
      value: GENDER.FEMALE,
      label: messages.calculator.form.genderOptions.female,
    },
  ];

  const activityOptions: SelectOption<CalculatorFormData['activity']>[] = [
    {
      value: ACTIVITY_LEVEL.SEDENTARY,
      label: messages.calculator.form.activityOptions.sedentary,
    },
    {
      value: ACTIVITY_LEVEL.LIGHT,
      label: messages.calculator.form.activityOptions.light,
    },
    {
      value: ACTIVITY_LEVEL.MODERATE,
      label: messages.calculator.form.activityOptions.moderate,
    },
    {
      value: ACTIVITY_LEVEL.ACTIVE,
      label: messages.calculator.form.activityOptions.active,
    },
    {
      value: ACTIVITY_LEVEL.VERY_ACTIVE,
      label: messages.calculator.form.activityOptions.veryActive,
    },
  ];

  const goalOptions: SelectOption<CalculatorFormData['goal']>[] = [
    { value: GOAL.LOSE, label: messages.calculator.form.goalOptions.lose },
    {
      value: GOAL.MAINTAIN,
      label: messages.calculator.form.goalOptions.maintain,
    },
    { value: GOAL.GAIN, label: messages.calculator.form.goalOptions.gain },
  ];

  return (
    <Card title={messages.calculator.form.title}>
      <form onSubmit={onSubmit}>
        <Box sx={{ mb: 2 }}>
          <Select
            label={messages.calculator.form.gender}
            options={genderOptions}
            value={formData.gender}
            onChange={onSelectChange('gender')}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Input
            label={messages.calculator.form.weight}
            value={formData.weight}
            onChange={onNumberChange('weight')}
            fullWidth
            error={errors.weight}
            helperText={
              errors.weight ? messages.calculator.form.enterWeight : ''
            }
            InputProps={{ inputProps: { min: 30, max: 300 } }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Input
            label={messages.calculator.form.height}
            value={formData.height}
            onChange={onNumberChange('height')}
            fullWidth
            error={errors.height}
            helperText={
              errors.height ? messages.calculator.form.enterHeight : ''
            }
            InputProps={{ inputProps: { min: 120, max: 250 } }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Input
            label={messages.calculator.form.age}
            value={formData.age}
            onChange={onNumberChange('age')}
            fullWidth
            error={errors.age}
            helperText={errors.age ? messages.calculator.form.enterAge : ''}
            InputProps={{ inputProps: { min: 15, max: 100 } }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Select
            label={messages.calculator.form.activity}
            options={activityOptions}
            value={formData.activity}
            onChange={onSelectChange('activity')}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Select
            label={messages.calculator.form.goal}
            options={goalOptions}
            value={formData.goal}
            onChange={onSelectChange('goal')}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {messages.calculator.form.calculate}
        </Button>
      </form>
    </Card>
  );
}
