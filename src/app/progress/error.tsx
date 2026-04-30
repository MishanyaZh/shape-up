'use client';

import { Box, Container, Typography } from '@mui/material';
import Button from '@/shared/ui/Button';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ display: 'grid', placeItems: 'center', gap: 2 }}>
        <Typography variant="h5">Progress page error</Typography>
        <Typography color="text.secondary" align="center">
          {error.message ||
            'Something went wrong while loading daily progress.'}
        </Typography>
        <Button variant="contained" onClick={reset}>
          Try Again
        </Button>
      </Box>
    </Container>
  );
}
