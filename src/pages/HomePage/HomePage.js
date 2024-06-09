import React from 'react';
import Header from '../../components/UI/Header/Header';
import Banner from '../../components/UI/Banner/Banner';
import Categories from '../../components/UI/Categories/Categories';
import Discount from '../../components/UI/Discount/Discount';
import Products from '../../components/UI/Products/Products';
import Contact from '../../components/UI/Contact/Contact';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.home}>
      <Header />
      <Banner />
      <Categories limit={4} showButton={true} />
      <Discount />
      <Products limit={4} showDiscounted={true} showButton={true} title="Sale" showFilter={false} />
      <Contact />
    </div>
  );
};

export default HomePage;
