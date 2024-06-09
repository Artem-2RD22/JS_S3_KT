import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../store/actions/categoriesActions';
import { Link } from 'react-router-dom';
import styles from './Categories.module.css';

const Categories = ({ limit, showButton }) => {
  const dispatch = useDispatch();
  const categoriesData = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className={styles.categories}>
      <div className={styles.header}>
        <h2 className={styles.title}>Categories</h2>
        {showButton && (
          <div className={styles.btn}>
            <div className={styles.line}></div>
            <div className={styles.navigation}>
              <Link to="/categories" className={styles.allCategories}>All categories</Link>
            </div>
          </div>
        )}
      </div>
      <div className={styles.container}>
      <div className={styles.list}>
        {categoriesData.loading ? (
          <p>Loading...</p>
        ) : categoriesData.error ? (
          <p>{categoriesData.error}</p>
        ) : (
          categoriesData.categories
            .slice(0, limit)
            .map((category) => (
              <Link to={`/category/${category.id}`} key={category.id} className={styles.category}>
                <img
                  src={`http://localhost:3333${category.image}`}
                  alt={category.title}
                  className={styles.image}
                />
                <h3 className={styles.categoryTitle}>{category.title}</h3>
              </Link>
            ))
        )}
      </div>
      </div>
    </section>
  );
};

export default Categories;
