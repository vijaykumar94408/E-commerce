import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Chip, Typography } from '@mui/material';
import { RootState } from '../store/store';
import { setSelectedCategory } from '../store/slices/productSlice';

export const CategoryFilter: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.product.categories);
  const selectedCategory = useSelector((state: RootState) => state.product.selectedCategory);

  const handleCategoryClick = (category: string | null) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <Box sx={{ mb: 3, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Categories</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip
          label="All"
          onClick={() => handleCategoryClick(null)}
          color={selectedCategory === null ? 'primary' : 'default'}
          variant={selectedCategory === null ? 'filled' : 'outlined'}
        />
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => handleCategoryClick(category)}
            color={selectedCategory === category ? 'primary' : 'default'}
            variant={selectedCategory === category ? 'filled' : 'outlined'}
          />
        ))}
      </Box>
    </Box>
  );
};