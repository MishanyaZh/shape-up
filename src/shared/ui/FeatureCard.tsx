import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Card from './Card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: '48px',
  marginBottom: theme.spacing(2),
}));

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <StyledCard title={title}>
      <IconWrapper>{icon}</IconWrapper>
      <Typography variant="h5" component="h3" gutterBottom align="center">
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center">
        {description}
      </Typography>
    </StyledCard>
  );
}
