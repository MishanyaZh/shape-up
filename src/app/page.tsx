'use client';

import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CalculateIcon from '@mui/icons-material/Calculate';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DevicesIcon from '@mui/icons-material/Devices';
import InsightsIcon from '@mui/icons-material/Insights';
import HeroSection from '@/shared/ui/HeroSection';
import FeatureCard from '@/shared/ui/FeatureCard';
import { useUiPreferences } from '@/providers/UiPreferencesProvider';

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  textAlign: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-16px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    background: theme.palette.primary.main,
    borderRadius: '2px',
  },
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 0),
}));

export default function Home() {
  const { messages } = useUiPreferences();

  return (
    <Box sx={{ pb: 8 }}>
      {/* Hero Section */}
      <HeroSection
        title={messages.home.heroTitle}
        description={messages.home.heroDescription}
        ctaText={messages.home.heroCta}
        ctaLink="/calculators"
      />

      {/* How It Works Section */}
      <Section>
        <Container>
          <SectionTitle variant="h3" as="h2">
            {messages.home.howItWorks}
          </SectionTitle>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            sx={{ mt: 4 }}
          >
            <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
              <FeatureCard
                icon={<CalculateIcon fontSize="inherit" color="primary" />}
                title={messages.home.howCards.calculateTitle}
                description={messages.home.howCards.calculateDescription}
                ctaText={messages.home.howCards.calculateCta}
                ctaLink="/calculators"
              />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
              <FeatureCard
                icon={<RestaurantIcon fontSize="inherit" color="primary" />}
                title={messages.home.howCards.planTitle}
                description={messages.home.howCards.planDescription}
                ctaText={messages.home.howCards.planCta}
                ctaLink="/nutrition"
              />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
              <FeatureCard
                icon={<ShowChartIcon fontSize="inherit" color="primary" />}
                title={messages.home.howCards.trackTitle}
                description={messages.home.howCards.trackDescription}
                ctaText={messages.home.howCards.trackCta}
                ctaLink="/progress"
              />
            </Box>
          </Stack>
        </Container>
      </Section>

      {/* Benefits Section */}
      <Section>
        <Container>
          <SectionTitle variant="h3" as="h2">
            {messages.home.whyChoose}
          </SectionTitle>

          <Stack direction="row" flexWrap="wrap" sx={{ mt: 4, mx: -2 }}>
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 2 }}>
              <FeatureCard
                icon={
                  <FitnessCenterIcon fontSize="inherit" color="secondary" />
                }
                title={messages.home.nextStepCards.refineTitle}
                description={messages.home.nextStepCards.refineDescription}
                ctaText={messages.home.nextStepCards.refineCta}
                ctaLink="/calculators"
              />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 2 }}>
              <FeatureCard
                icon={<AccessTimeIcon fontSize="inherit" color="secondary" />}
                title={messages.home.nextStepCards.buildTitle}
                description={messages.home.nextStepCards.buildDescription}
                ctaText={messages.home.nextStepCards.buildCta}
                ctaLink="/nutrition"
              />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 2 }}>
              <FeatureCard
                icon={<DevicesIcon fontSize="inherit" color="secondary" />}
                title={messages.home.nextStepCards.intakeTitle}
                description={messages.home.nextStepCards.intakeDescription}
                ctaText={messages.home.nextStepCards.intakeCta}
                ctaLink="/progress"
              />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 2 }}>
              <FeatureCard
                icon={<InsightsIcon fontSize="inherit" color="secondary" />}
                title={messages.home.nextStepCards.complianceTitle}
                description={messages.home.nextStepCards.complianceDescription}
                ctaText={messages.home.nextStepCards.complianceCta}
                ctaLink="/progress"
              />
            </Box>
          </Stack>
        </Container>
      </Section>
    </Box>
  );
}
