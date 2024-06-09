// Action для добавления товара в корзину
export const addToCart = (product) => (dispatch, getState) => {
  dispatch({
    type: 'ADD_TO_CART',
    payload: product,
  });
  const { cart } = getState();
  localStorage.setItem('cart', JSON.stringify(cart.items)); // Сохранение состояния корзины в localStorage
};

// Action для удаления товара из корзины
export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: 'REMOVE_FROM_CART',
    payload: productId,
  });
  const { cart } = getState();
  localStorage.setItem('cart', JSON.stringify(cart.items)); // Сохранение состояния корзины в localStorage
};

// Action для обновления количества товара в корзине
export const updateQuantity = (productId, delta) => (dispatch, getState) => {
  dispatch({
    type: 'UPDATE_QUANTITY',
    payload: { productId, delta },
  });
  const { cart } = getState();
  localStorage.setItem('cart', JSON.stringify(cart.items)); // Сохранение состояния корзины в localStorage
};

// Action для загрузки состояния корзины из localStorage
export const loadCart = () => (dispatch) => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    dispatch({
      type: 'LOAD_CART',
      payload: JSON.parse(savedCart), // Загрузка сохраненного состояния корзины
    });
  }
};

// Action для очистки корзины
export const clearCart = () => (dispatch) => {
  dispatch({
    type: 'CLEAR_CART',
  });
  localStorage.removeItem('cart'); // Удаление состояния корзины из localStorage
};
