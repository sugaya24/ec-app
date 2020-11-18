import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from '../components/Products/index';
import { fetchProducts } from '../reducks/products/operations';
import { getProducts } from '../reducks/products/selectors';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 800px;
  margin: 0 auto;
`;

export const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <section>
      <Container>
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              images={product.images}
              price={product.price}
            />
          ))}
      </Container>
    </section>
  );
};

export default ProductList;
