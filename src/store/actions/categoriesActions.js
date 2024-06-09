import axios from 'axios';

// Action для получения категорий
export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: 'FETCH_CATEGORIES_REQUEST' }); // Диспатч действия запроса категорий

  try {
    const response = await axios.get('http://localhost:3333/categories/all'); // Выполнение HTTP-запроса для получения категорий
    dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: response.data }); // Диспатч успешного получения категорий с данными
  } catch (error) {
    dispatch({ type: 'FETCH_CATEGORIES_FAILURE', payload: error.message }); // Диспатч ошибки с сообщением об ошибке
  }
};
