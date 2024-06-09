import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../../components/UI/Header/Header';
import Contact from '../../components/UI/Contact/Contact';
import Products from '../../components/UI/Products/Products';


const CategoryPage = () => {
  const { categoryId } = useParams();
  const category = useSelector((state) => state.products.category);

  return (
    <div>
      <Header />
      <Products categoryId={categoryId} title={category ? category.title : 'Category Products'} />
      <Contact />
    </div>
  );
};

export default CategoryPage;
