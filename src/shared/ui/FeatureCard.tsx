import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Card from './Card';
import Link from 'next/link';
import Button from './Button';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  ctaLink?: string;
  ctaText?: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out',
  height: '100%',
  '& .MuiCardContent-root': {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    padding: theme.spacing(4),
  },
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}));

const IconWrapper = styled(Box)(() => ({
  fontSize: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function FeatureCard({
  icon,
  title,
  description,
  ctaLink,
  ctaText = 'Learn More',
}: FeatureCardProps) {
  return (
    <StyledCard title={title}>
      <IconWrapper>{icon}</IconWrapper>
      <Typography
        variant="h5"
        component="h3"
        gutterBottom
        align="center"
        textAlign="center"
      >
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center">
        {description}
      </Typography>
      {ctaLink && (
        <Link href={ctaLink} passHref legacyBehavior>
          <Button variant="contained" size="small" color="secondary">
            {ctaText}
          </Button>
        </Link>
      )}
    </StyledCard>
  );
}
