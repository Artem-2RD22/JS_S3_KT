import axios from 'axios';

// Action для получения данных о продукте
export const fetchProduct = (productId) => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCT_REQUEST' }); // Диспатч действия запроса данных о продукте

  try {
    const response = await axios.get(`http://localhost:3333/products/${productId}`); // Выполнение HTTP-запроса для получения данных о продукте
    dispatch({ type: 'FETCH_PRODUCT_SUCCESS', payload: response.data[0] }); // Диспатч успешного получения данных о продукте с данными
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCT_FAILURE', payload: error.message }); // Диспатч ошибки с сообщением об ошибке
  }
};
