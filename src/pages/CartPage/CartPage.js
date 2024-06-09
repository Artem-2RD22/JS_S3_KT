import React from 'react';
import Header from '../../components/UI/Header/Header';
import Contact from '../../components/UI/Contact/Contact';
import Cart from '../../components/UI/Cart/Cart';

const CartPage = () => {

  return (
    <div>
    <Header />
    <Cart showButton='true' />
    <Contact />
    </div>
  );
};

export default CartPage;
