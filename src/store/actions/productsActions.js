import axios from 'axios';

// Action для получения всех продуктов
export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' }); // Диспатч действия запроса продуктов

  try {
    const response = await axios.get('http://localhost:3333/products/all'); // Выполнение HTTP-запроса для получения всех продуктов
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data }); // Диспатч успешного получения данных продуктов
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message }); // Диспатч ошибки с сообщением об ошибке
  }
};

// Action для получения продуктов со скидкой
export const fetchDiscountedProducts = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' }); // Диспатч действия запроса продуктов

  try {
    const response = await axios.get('http://localhost:3333/products/all'); // Выполнение HTTP-запроса для получения всех продуктов
    const discountedProducts = response.data.filter(product => product.discont_price !== null); // Фильтрация продуктов со скидкой
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: discountedProducts }); // Диспатч успешного получения данных продуктов со скидкой
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message }); // Диспатч ошибки с сообщением об ошибке
  }
};

// Action для получения продуктов по категории
export const fetchProductsByCategory = (categoryId) => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' }); // Диспатч действия запроса продуктов

  try {
    const response = await axios.get(`http://localhost:3333/categories/${categoryId}`); // Выполнение HTTP-запроса для получения продуктов по категории
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data.data }); // Диспатч успешного получения данных продуктов по категории
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message }); // Диспатч ошибки с сообщением об ошибке
  }
};
