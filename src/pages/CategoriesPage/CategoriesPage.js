import React from 'react';
import Header from '../../components/UI/Header/Header';
import Contact from '../../components/UI/Contact/Contact';
import Categories from '../../components/UI/Categories/Categories';

const CategoriesPage = () => {
  return (
    <div>
      <Header />
      <Categories limit={Infinity} showButton={false} />
      <Contact />
    </div>
  );
};

export default CategoriesPage;
