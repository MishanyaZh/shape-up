import { Box } from '@mui/material';
import Button from '@/shared/ui/Button';
import Card from '@/shared/ui/Card';
import Input from '@/shared/ui/Input';
import Select from '@/shared/ui/Select';
import {
  CalculatorFormData,
  CalculatorValidationErrors,
} from '@/features/calculator/domain/calculations';
import {
  activityOptions,
  genderOptions,
  goalOptions,
} from '@/features/calculator/data/options';

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
  return (
    <Card title="Enter Your Data">
      <form onSubmit={onSubmit}>
        <Box sx={{ mb: 2 }}>
          <Select
            label="Gender"
            options={genderOptions}
            value={formData.gender}
            onChange={onSelectChange('gender')}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Input
            label="Weight (kg)"
            value={formData.weight}
            onChange={onNumberChange('weight')}
            fullWidth
            error={errors.weight}
            helperText={errors.weight ? 'Enter your weight' : ''}
            InputProps={{ inputProps: { min: 30, max: 300 } }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Input
            label="Height (cm)"
            value={formData.height}
            onChange={onNumberChange('height')}
            fullWidth
            error={errors.height}
            helperText={errors.height ? 'Enter your height' : ''}
            InputProps={{ inputProps: { min: 120, max: 250 } }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Input
            label="Age"
            value={formData.age}
            onChange={onNumberChange('age')}
            fullWidth
            error={errors.age}
            helperText={errors.age ? 'Enter your age' : ''}
            InputProps={{ inputProps: { min: 15, max: 100 } }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Select
            label="Activity Level"
            options={activityOptions}
            value={formData.activity}
            onChange={onSelectChange('activity')}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Select
            label="Goal"
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
          Calculate
        </Button>
      </form>
    </Card>
  );
}
