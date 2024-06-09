const initialState = {
  product: null,
  loading: false,
  error: null
};

// Редюсер для управления состоянием продукта
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCT_REQUEST':
      return { ...state, loading: true }; // Установка состояния загрузки в true при запросе продукта
    case 'FETCH_PRODUCT_SUCCESS':
      return { ...state, loading: false, product: action.payload }; // Установка продукта и состояния загрузки в false при успешном получении данных
    case 'FETCH_PRODUCT_FAILURE':
      return { ...state, loading: false, error: action.payload }; // Установка ошибки и состояния загрузки в false при ошибке запроса
    default:
      return state; // Возвращение текущего состояния, если действие не совпадает с указанными
  }
};

export default productReducer;
