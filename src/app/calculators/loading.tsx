import { Box, CircularProgress, Container, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ display: 'grid', placeItems: 'center', gap: 2 }}>
        <CircularProgress />
        <Typography color="text.secondary">Loading calculator...</Typography>
      </Box>
    </Container>
  );
}
