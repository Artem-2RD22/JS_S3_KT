import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Banner.module.css';

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Amazing Discounts on Garden Products!</h1>
        <Link to="/sales"><button className={styles.button}>Check out</button></Link>
      </div>
    </section>
  );
};

export default Banner;
