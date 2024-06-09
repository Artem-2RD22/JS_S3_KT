import React from 'react';
import Header from '../../components/UI/Header/Header';
import Contact from '../../components/UI/Contact/Contact';
import Products from '../../components/UI/Products/Products';

const ProductsPage = () => {
  return (
    <div>
      <Header />
      <Products title="All Products" />
      <Contact />
    </div>
  );
};

export default ProductsPage;
