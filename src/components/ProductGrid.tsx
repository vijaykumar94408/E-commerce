import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ProductCard } from './ProductCard';  // Changed to named import
import { Product } from '../types';

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>('all');

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
  const filteredProducts =
    category === 'all' ? products : products.filter((p) => p.category === category);

  return (
    <Container>
      <div style={{ margin: '20px 0' }}>
        <Button variant="secondary" onClick={() => setCategory('all')}>
          All
        </Button>
        {uniqueCategories.map((cat) => (
          <Button
            key={cat}
            variant="secondary"
            onClick={() => setCategory(cat)}
            style={{ marginLeft: '10px' }}
          >
            {cat}
          </Button>
        ))}
      </div>
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} style={{ marginBottom: '20px' }}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductGrid;
