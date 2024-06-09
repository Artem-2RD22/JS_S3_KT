import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../../../store/actions/productActions';
import { addToCart, updateQuantity } from '../../../store/actions/cartActions';
import styles from './Product.module.css';

const ProductPage = () => {
  const { productId } = useParams(); // Получение productId из параметров URL
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product); // Получение продукта из состояния Redux
  const loading = useSelector((state) => state.product.loading); // Получение состояния загрузки
  const error = useSelector((state) => state.product.error); // Получение ошибки
  const cartItems = useSelector((state) => state.cart.items); // Получение товаров в корзине
  
  const [quantity, setQuantity] = useState(1); // Локальное состояние для количества товара
  const [isInCart, setIsInCart] = useState(false); // Локальное состояние для проверки наличия товара в корзине

  // Эффект для получения данных о продукте при монтировании компонента
  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  // Эффект для проверки наличия товара в корзине и установки количества
  useEffect(() => {
    const cartItem = cartItems.find(item => item.id === parseInt(productId));
    if (cartItem) {
      setQuantity(cartItem.quantity);
      setIsInCart(true);
    } else {
      setQuantity(1);
      setIsInCart(false);
    }
  }, [cartItems, productId]);

  // Обработчик для добавления товара в корзину
  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  // Обработчик для увеличения количества товара
  const handleIncreaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (isInCart) {
      dispatch(updateQuantity(product.id, 1));
    }
  };

  // Обработчик для уменьшения количества товара
  const handleDecreaseQuantity = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    if (isInCart && newQuantity > 1) {
      dispatch(updateQuantity(product.id, -1));
    }
  };

  if (loading) return <p>Loading...</p>; // Отображение состояния загрузки
  if (error) return <p>{error}</p>; // Отображение ошибки, если она возникла
  if (!product) return <p>Product not found.</p>; // Отображение сообщения, если продукт не найден

  const { title, price, discont_price, description, image } = product;

  return (
    <div className={styles.productPage}>
      <div className={styles.gallery}>
        <img src={`http://localhost:3333${image}`} alt={title} className={styles.mainPhoto} /> {/* Отображение изображения продукта */}
      </div>
      <div className={styles.txt}>
        <h1 className={styles.title}>{title}</h1> {/* Отображение названия продукта */}
        <div className={styles.priceSection}>
          <div className={styles.price}>
            <span className={styles.currentPrice}>${discont_price ? discont_price : price}</span> {/* Отображение текущей цены */}
            {discont_price && <span className={styles.originalPrice}>${price}</span>} {/* Отображение оригинальной цены, если есть скидка */}
          </div>
          {discont_price && (
            <div className={styles.sale}>
              -{Math.round(((price - discont_price) / price) * 100)}% {/* Отображение процента скидки */}
            </div>
          )}
        </div>
        <div className={styles.quantitySection}>
          <div className={styles.quantity}>
            <button className={styles.quantityBtn} onClick={handleDecreaseQuantity}>-</button> {/* Кнопка уменьшения количества */}
            <span className={styles.quantityValue}>{quantity}</span> {/* Отображение текущего количества */}
            <button className={styles.quantityBtn} onClick={handleIncreaseQuantity}>+</button> {/* Кнопка увеличения количества */}
          </div>
          <button 
            className={`${styles.addToCart} ${isInCart ? styles.inCart : ''}`} 
            onClick={handleAddToCart}
            disabled={isInCart}
          >
            {isInCart ? 'Added' : 'Add to cart'} {/* Кнопка добавления в корзину */}
          </button>
        </div>
        <div className={styles.description}>
          <h2>Description</h2>
          <p>{description}</p> {/* Отображение описания продукта */}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
