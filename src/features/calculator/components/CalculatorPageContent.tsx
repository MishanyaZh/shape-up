'use client';

import Link from 'next/link';
import { Box, Container, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@/shared/ui/Button';
import CalculatorForm from '@/features/calculator/components/CalculatorForm';
import CalculatorResults from '@/features/calculator/components/CalculatorResults';
import { useCalculator } from '@/features/calculator/hooks/useCalculator';
import { useUiPreferences } from '@/providers/UiPreferencesProvider';

export default function CalculatorPageContent() {
  const { messages } = useUiPreferences();

  const {
    formData,
    errors,
    results,
    handleSubmit,
    handleSelectChange,
    handleNumberChange,
  } = useCalculator();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
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
        <Typography
          variant="h4"
          component="h1"
          align="center"
          sx={{ flexGrow: 1 }}
        >
          {messages.calculator.title}
        </Typography>
      </Box>

      <Typography variant="body1" align="center" paragraph>
        {messages.calculator.description}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CalculatorForm
            formData={formData}
            errors={errors}
            onSubmit={handleSubmit}
            onSelectChange={handleSelectChange}
            onNumberChange={handleNumberChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CalculatorResults results={results} goal={formData.goal} />
        </Grid>
      </Grid>
    </Container>
  );
}
