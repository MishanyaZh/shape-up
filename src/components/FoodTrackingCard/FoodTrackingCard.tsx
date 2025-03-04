'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { foodCategories, mealTypes } from '@/data/foodCategories';

export default function FoodTrackingCard() {
  const [foodCategory, setFoodCategory] = useState('');
  const [mealType, setMealType] = useState('');
  return (
    <Box sx={{ p: 3 }}>
      <h1>Daily food tracking</h1>

      <Card title="Food Category Selection">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Select
            label="Food Category"
            options={foodCategories}
            value={foodCategory}
            onChange={setFoodCategory}
          />

          <Select
            label="Meal Type"
            options={mealTypes}
            value={mealType}
            onChange={setMealType}
          />

          <Input label="Dish Name" placeholder="Enter dish name" fullWidth />

          <Button variant="contained" color="primary">
            Add
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
