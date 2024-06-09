import React from 'react';
import styles from './Header.module.css';
import Logo from '../Logo/Logo';
import Cart from '../CartIcon/CartIcon';

const Header = () => {
  // Assuming the items count is fetched from a state or prop

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={styles.nav}>
        <a href="/">Main Page</a>
        <a href="/categories">Categories</a>
        <a href="/products">All Products</a>
        <a href="/sales">All Sales</a>
      </nav>
      <Cart />
    </header>
  );
};

export default Header;
