import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchDiscountedProducts, fetchProductsByCategory } from '../../../store/actions/productsActions';
import { addToCart } from '../../../store/actions/cartActions';
import styles from './Products.module.css';
import FilterSort from '../FilterSort/FilterSort';
import { Link } from 'react-router-dom';

// Функция для перемешивания массива
const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const Products = ({ limit, showDiscounted, showButton, categoryId, title, showFilter = true, hideDiscountCheckbox = false }) => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);
  const [filters, setFilters] = useState({
    priceFrom: null,
    priceTo: null,
    discounted: false,
    sortBy: 'default'
  });

  // Хук useEffect для загрузки продуктов
  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId));
    } else if (showDiscounted) {
      dispatch(fetchDiscountedProducts());
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, showDiscounted, categoryId]);

  // Обработчики для изменения фильтров
  const handlePriceChange = (key, value) => {
    const parsedValue = value === '' ? null : parseFloat(value);
    setFilters((prevFilters) => ({ ...prevFilters, [key]: parsedValue }));
  };

  const handleDiscountChange = (discounted) => {
    setFilters((prevFilters) => ({ ...prevFilters, discounted }));
  };

  const handleSortChange = (sortBy) => {
    setFilters((prevFilters) => ({ ...prevFilters, sortBy }));
  };

  // Функция для применения фильтров к продуктам
  const applyFilters = (products) => {
    let filteredProducts = products;
    if (filters.discounted) {
      filteredProducts = filteredProducts.filter(product => product.discont_price);
    }
    if (filters.priceFrom !== null) {
      filteredProducts = filteredProducts.filter(product => product.price >= filters.priceFrom);
    }
    if (filters.priceTo !== null) {
      filteredProducts = filteredProducts.filter(product => product.price <= filters.priceTo);
    }
    switch (filters.sortBy) {
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'high-low':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'low-high':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'default':
      default:
        filteredProducts.sort((a, b) => a.id - b.id);
        break;
    }
    return filteredProducts;
  };

  // Функция для получения случайных продуктов
  const getRandomProducts = (products, count) => {
    const shuffled = shuffleArray(products);
    return shuffled.slice(0, count);
  };

  const productsToDisplay = applyFilters(productsData.products);
  const displayedProducts = limit ? getRandomProducts(productsToDisplay, limit) : productsToDisplay;

  return (
    <section className={styles.products}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {title}
        </h2>
        {showButton && (
          <div className={styles.btn}>
            <div className={styles.line}></div>
            <div className={styles.navigation}>
              <Link to="/sales" className={styles.allSales}>All Sales</Link>
            </div>
          </div>
        )}
      </div>

      {showFilter && (
        <FilterSort
          onPriceChange={handlePriceChange}
          onDiscountChange={handleDiscountChange}
          onSortChange={handleSortChange}
          hideDiscountCheckbox={hideDiscountCheckbox}
        />
      )}
      <div className={styles.container}>
        <div className={styles.list}>
          {productsData.loading ? (
            <p>Loading...</p> // Отображение сообщения загрузки
          ) : productsData.error ? (
            <p>{productsData.error}</p> // Отображение сообщения об ошибке
          ) : (
            displayedProducts.map((product) => {
              const isInCart = cartItems.some(item => item.id === product.id);
              return (
                <Link to={`/product/${product.id}`} key={product.id} className={styles.itemLink}>
                  <div className={styles.item}>
                    <div className={styles.img}>
                      <img src={`http://localhost:3333${product.image}`} alt={product.title} />
                      {product.discont_price && (
                        <div className={styles.sale}>
                          -{Math.round(((product.price - product.discont_price) / product.price) * 100)}%
                        </div>
                      )}
                      {!isInCart && (
                        <div 
                          className={styles.btnAddToCart}
                          onClick={(e) => {
                            e.preventDefault(); // Предотвращение открытия ссылки
                            e.stopPropagation(); // Остановка распространения события клика
                            dispatch(addToCart({ ...product, quantity: 1 })); // Добавление в корзину с количеством 1
                          }}
                        >
                          Add to cart
                        </div>
                      )}
                      {isInCart && (
                        <div className={`${styles.btnAddToCart} ${styles.inCart}`}>
                          Added
                        </div>
                      )}
                    </div>
                    <div className={styles.txt}>
                      <h3 className={styles.productTitle}>{product.title}</h3>
                      <div className={styles.price}>
                        <span>${product.discont_price ? product.discont_price : product.price}</span>
                        {product.discont_price && <span className={styles.originalPrice}>${product.price}</span>}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
