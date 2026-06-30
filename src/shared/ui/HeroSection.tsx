import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from './Button';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const HeroContainer = styled(Box)(({ theme }) => ({
  backgroundImage:
    'linear-gradient(115deg, rgba(15, 118, 110, 0.96) 0%, rgba(14, 116, 144, 0.95) 45%, rgba(234, 88, 12, 0.93) 100%)',
  color: 'white',
  padding: theme.spacing(10, 0),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background:
      'radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.2), transparent 34%), radial-gradient(circle at 90% 85%, rgba(255, 255, 255, 0.12), transparent 38%)',
    opacity: 0.95,
  },
}));

const ContentWrapper = styled(Container)({
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
});

export default function HeroSection({
  title,
  description,
  ctaText,
  ctaLink,
}: HeroSectionProps) {
  return (
    <HeroContainer>
      <ContentWrapper maxWidth="md">
        <Typography
          component="h1"
          variant="h2"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 3 }}
        >
          {title}
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
          {description}
        </Typography>
        <Link href={ctaLink} passHref legacyBehavior>
          <Button variant="contained" size="large" color="secondary">
            {ctaText}
          </Button>
        </Link>
      </ContentWrapper>
    </HeroContainer>
  );
}
