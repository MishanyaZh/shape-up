import { Box, Chip, LinearProgress, Typography } from '@mui/material';
import Card from '@/shared/ui/Card';
import { NutritionTargets } from '@/shared/domain/models';
import { useUiPreferences } from '@/providers/UiPreferencesProvider';

interface ComplianceIndicatorCardProps {
  calorieAdherence: number;
  macroAdherence: number;
  combinedAdherence: number;
  consumed: NutritionTargets;
  remaining: NutritionTargets;
}

function getComplianceTone(score: number): 'success' | 'warning' | 'error' {
  if (score >= 85) {
    return 'success';
  }

  if (score >= 65) {
    return 'warning';
  }

  return 'error';
}

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 0.5,
        }}
      >
        <Typography variant="body2">{label}</Typography>
        <Typography variant="body2" color="text.secondary">
          {value}%
        </Typography>
      </Box>
      <LinearProgress variant="determinate" value={value} sx={{ height: 8 }} />
    </Box>
  );
}

export default function ComplianceIndicatorCard({
  calorieAdherence,
  macroAdherence,
  combinedAdherence,
  consumed,
  remaining,
}: ComplianceIndicatorCardProps) {
  const { messages, t } = useUiPreferences();

  const tone = getComplianceTone(combinedAdherence);
  const statusLabel =
    tone === 'success'
      ? messages.compliance.onTrack
      : tone === 'warning'
        ? messages.compliance.needsAdjustment
        : messages.compliance.offTrack;

  return (
    <Card title={messages.compliance.title}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
        <Chip
          label={`${combinedAdherence}% ${messages.compliance.totalAdherence}`}
          color={tone}
          variant="filled"
        />
        <Chip label={statusLabel} color={tone} variant="outlined" />
      </Box>

      <Box sx={{ display: 'grid', gap: 1.5, mb: 2 }}>
        <MetricBar
          label={messages.compliance.calories}
          value={calorieAdherence}
        />
        <MetricBar label={messages.compliance.macros} value={macroAdherence} />
      </Box>

      <Typography variant="body2" color="text.secondary">
        {t('compliance.consumedRemaining', {
          consumed: consumed.calories,
          remaining: remaining.calories,
        })}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t('compliance.macroDelta', {
          protein: remaining.proteinGrams,
          fats: remaining.fatGrams,
          carbs: remaining.carbsGrams,
        })}
      </Typography>
    </Card>
  );
}
