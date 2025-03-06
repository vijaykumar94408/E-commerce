// src/pages/ProductDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Box, Container, Button, Alert, Typography, Paper } from '@mui/material';
import { Product } from '../types';
import { addToCart } from '../store/slices/cartSlice';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (!product) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh', 
      py: 4 
    }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          {addedToCart && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Product added to cart successfully!
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.title}
            </Typography>
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                maxWidth: '300px',
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
              {product.description}
            </Typography>
            <Typography variant="h5" color="primary">
              ${product.price}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/cart"
                sx={{ textDecoration: 'none' }}
              >
                View Cart
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProductDetails;
