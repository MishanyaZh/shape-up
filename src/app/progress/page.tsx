'use client';

import Link from 'next/link';
import { Box, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@/shared/ui/Button';
import DailyTrackingPanel from '@/features/tracking/components/DailyTrackingPanel';

export default function Progress() {
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
        <Typography variant="h4" component="h1">
          Daily Progress
        </Typography>
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Track meals, compare with targets, and monitor daily adherence.
      </Typography>

      <DailyTrackingPanel />
    </Container>
  );
}
