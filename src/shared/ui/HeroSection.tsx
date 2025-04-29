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
  backgroundImage: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
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
    background: 'url("/hero-pattern.jpg") repeat bottom',
    opacity: 0.1,
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
