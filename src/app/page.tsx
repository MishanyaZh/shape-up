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
import HeroSection from '@/shared/ui/HeroSection';
import FeatureCard from '@/shared/ui/FeatureCard';

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
  return (
    <Box sx={{ pb: 8 }}>
      {/* Hero Section */}
      <HeroSection
        title="Shape Up - Smart Meal & Workout Planner"
        description="Personalized nutrition plans and workout routines based on your body metrics and fitness goals."
        ctaText="Calculate Your Needs"
        ctaLink="/calculators"
      />

      {/* How It Works Section */}
      <Section>
        <Container>
          <SectionTitle variant="h3" as="h2">
            How It Works
          </SectionTitle>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            sx={{ mt: 4 }}
          >
            <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
              <FeatureCard
                icon={<CalculateIcon fontSize="inherit" color="primary" />}
                title="Calculate Your Needs"
                description="Answer a few questions and get your personalized caloric and macronutrient requirements."
                ctaText="Calculate Your Needs"
                ctaLink="/calculators"
              />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
              <FeatureCard
                icon={<RestaurantIcon fontSize="inherit" color="primary" />}
                title="Get Your Meal Plan"
                description="Receive a customized weekly meal plan that matches your dietary preferences and nutritional needs."
              />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
              <FeatureCard
                icon={<ShowChartIcon fontSize="inherit" color="primary" />}
                title="Track Your Progress"
                description="Log your meals and workouts, track your progress, and adjust your plan as needed."
              />
            </Box>
          </Stack>
        </Container>
      </Section>

      {/* Benefits Section */}
      <Section>
        <Container>
          <SectionTitle variant="h3" as="h2">
            Why Choose Shape Up
          </SectionTitle>

          <Stack direction="row" flexWrap="wrap" sx={{ mt: 4, mx: -2 }}>
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 2 }}>
              <FeatureCard
                icon={
                  <FitnessCenterIcon fontSize="inherit" color="secondary" />
                }
                title="Science-Based Approach"
                description="Our recommendations are based on the latest nutritional science and fitness research."
              />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 2 }}>
              <FeatureCard
                icon={<AccessTimeIcon fontSize="inherit" color="secondary" />}
                title="Save Time"
                description="No more guesswork or endless research. Get your personalized plan in minutes."
              />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 2 }}>
              <FeatureCard
                icon={<DevicesIcon fontSize="inherit" color="secondary" />}
                title="Access Anywhere"
                description="Use Shape Up on any device, anytime, anywhere. Your data is always synced."
              />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 2 }}>
              <FeatureCard
                icon={<RestaurantIcon fontSize="inherit" color="secondary" />}
                title="Diverse Recipes"
                description="Access a library of delicious, nutritionally balanced recipes for every diet."
              />
            </Box>
          </Stack>
        </Container>
      </Section>
    </Box>
  );
}
