import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Container, Typography, Grid, CircularProgress } from '@mui/material';
import { RootState } from '../store/store';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useSelector((state: RootState) => state.product);
  
  const product = products.find(p => p.id === Number(id));

  if (loading) {
    return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />;
  }

  if (!product) {
    return <Typography color="error">Product not found</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              width: '100%',
              maxHeight: 500,
              objectFit: 'contain',
              backgroundColor: '#f5f5f5',
              padding: 2,
              borderRadius: 1
            }}
            src={product.image}
            alt={product.title}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {product.description}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Category: {product.category}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};