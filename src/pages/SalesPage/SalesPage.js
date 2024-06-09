import React from 'react';
import Header from '../../components/UI/Header/Header';
import Contact from '../../components/UI/Contact/Contact';
import Products from '../../components/UI/Products/Products';

const SalesPage = () => {
  return (
    <div>
        <Header />
        <Products showDiscounted={true} title="Discounted Items" hideDiscountCheckbox={true} />
        <Contact />
    </div>
  );
};

export default SalesPage;
