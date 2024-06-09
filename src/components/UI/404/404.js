import React from 'react';
import { Link } from 'react-router-dom';
import styles from './404.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.errorSection}>
        <div className={styles.errorNumber}>
          <div className={styles.number}>4</div>
          <div className={styles.image}></div>
          <div className={styles.number}>4</div>
        </div>
        <div className={styles.textSection}>
          <div className={styles.text}>
            <h1>Page Not Found</h1>
            <p>We’re sorry, the page you requested could not be found. Please go back to the homepage.</p>
          </div>
          <Link to="/" className={styles.button}>
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
