import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../../../store/actions/cartActions';
import styles from './Cart.module.css';

const Cart = ({showButton}) => {
  // Получаем элементы корзины из состояния Redux
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [popupVisible, setPopupVisible] = useState(false);

  // Функция для удаления товара из корзины
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Функция для обновления количества товара в корзине
  const handleUpdateQuantity = (productId, delta) => {
    dispatch(updateQuantity(productId, delta));
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Функция для обработки заказа
  const handleOrder = () => {
    setIsSubmitted(true);
    setPopupVisible(true);
  };

  // Функция для закрытия всплывающего окна и очистки корзины
  const closePopup = () => {
    dispatch(clearCart());
    setIsSubmitted(false);
    setPopupVisible(false);
  };

  // Функция для округления цены
  const roundEpsilon = (price) => {
    return Math.round((price + Number.EPSILON) * 100) / 100;
  };

  // Подсчитываем общую стоимость товаров в корзине
  const totalPrice = cartItems.reduce((acc, item) => {
    const price = item.discont_price ? item.discont_price : item.price;
    return acc + price * item.quantity;
  }, 0);

  return (
    <div className={styles.cartPage}>
      <div className={styles.header}>
        <h2 className={styles.title}>Shopping cart</h2>
        {showButton && (
          <div className={styles.btn}>
            <div className={styles.line}></div>
            <div className={styles.navigation}>
              <Link to="/products" className={styles.allSales}>Back to the store</Link>
            </div>
          </div>
        )}
      </div>
      <div className={styles.cartContent}>
        <div className={styles.itemList}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className={styles.item} key={item.id}>
                <div className={styles.image}>
                  <img src={`http://localhost:3333${item.image}`} alt={item.title} />
                </div>
                <div className={styles.content}>
                  <div className={styles.headerItem}>
                    <Link to={`/product/${item.id}`} key={item.id} className={styles.productTitle}>{item.title}</Link>
                    <button onClick={() => handleRemoveFromCart(item.id)} className={styles.removeItem}>×</button>
                  </div>
                  <div className={styles.priceSection}>
                    <div className={styles.quantity}>
                      <button onClick={() => handleUpdateQuantity(item.id, -1)} className={styles.quantityBtn}>-</button>
                      <span className={styles.quantityValue}>{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.id, 1)} className={styles.quantityBtn}>+</button>
                    </div>
                    <div className={styles.price}>
                      <span>${roundEpsilon(item.discont_price ? item.discont_price * item.quantity : item.price * item.quantity)}</span>
                      {item.discont_price && <span className={styles.originalPrice}>${roundEpsilon(item.price * item.quantity)}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyCart}>
              <p>Looks like you have no items in your basket currently.</p>
              <Link to="/products" className={styles.continueShopping}>Continue Shopping</Link>
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className={styles.orderDetails}>
            <h2>Order details</h2>
            <p>{cartItems.length} items</p>
            <div className={styles.total}>
              <span>Total</span>
              <span className={styles.totalAmount}>${roundEpsilon(totalPrice)}</span>
            </div>
            <div className={styles.orderForm}>
              <input type="text" placeholder="Name" />
              <input type="tel" placeholder="Phone number" />
              <input type="email" placeholder="Email" />
              <button 
                type="button" 
                className={`${styles.orderButton} ${isSubmitted ? styles.submitted : ''}`}
                onClick={handleOrder}
              >
                {isSubmitted ? 'The Order is Placed' : 'Order'}
              </button>
            </div>
          </div>
        )}
      </div>
      {popupVisible && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <button onClick={closePopup} className={styles.closePopup}>×</button>
            <div className={styles.popupContent}>
              <h2>Congratulations!</h2>
              <p>Your order has been successfully placed on the website.</p>
              <p>A manager will contact you shortly to confirm your order.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
