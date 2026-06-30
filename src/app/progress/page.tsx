'use client';

import Link from 'next/link';
import { Box, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@/shared/ui/Button';
import DailyTrackingPanel from '@/features/tracking/components/DailyTrackingPanel';
import { useUiPreferences } from '@/providers/UiPreferencesProvider';

export default function Progress() {
  const { messages } = useUiPreferences();

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
        <Typography variant="h4" component="h1">
          {messages.progressPage.title}
        </Typography>
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {messages.progressPage.description}
      </Typography>

      <DailyTrackingPanel />
    </Container>
  );
}
