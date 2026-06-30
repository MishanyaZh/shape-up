'use client';

import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardProps } from '@mui/material/Card';

interface CustomCardProps extends CardProps {
  title: string;
}

export default function Card({ title, children, ...props }: CustomCardProps) {
  return (
    <MuiCard sx={{ p: 2, borderRadius: 2, boxShadow: 3 }} {...props}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
        >
          {title}
        </Typography>
        {children}
      </CardContent>
    </MuiCard>
  );
}
