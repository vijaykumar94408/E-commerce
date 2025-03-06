import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, CircularProgress, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { fetchProductsStart } from '../store/slices/productSlice';
import { CategoryFilter } from './CategoryFilter';
import { styled } from '@mui/material/styles';

const ProductGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '2rem',
  padding: '2rem',
  maxWidth: '1200px',
  margin: '0 auto',
});

const ProductCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '& .MuiCardMedia-root': {
    height: '200px',
    objectFit: 'contain',
    padding: '1rem',
    backgroundColor: '#f5f5f5'
  },
  '& .MuiCardContent-root': {
    flexGrow: 1
  }
});

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error, selectedCategory } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  const filteredProducts = selectedCategory === null
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="xl">
      <CategoryFilter />
      <ProductGrid>
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            sx={{ cursor: 'pointer' }}
          >
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" noWrap>
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: '3em', overflow: 'hidden' }}>
                {product.description}
              </Typography>
              <Typography variant="h6" color="primary">
                ${product.price}
              </Typography>
            </CardContent>
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  );
};

export default ProductList;