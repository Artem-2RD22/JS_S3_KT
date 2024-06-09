const initialState = {
  products: [],
  loading: false,
  error: null
};

// Редюсер для управления состоянием коллекции продуктов
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return { ...state, loading: true }; // Установка состояния загрузки в true при запросе продуктов
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, loading: false, products: action.payload }; // Установка продуктов и состояния загрузки в false при успешном получении данных
    case 'FETCH_PRODUCTS_FAILURE':
      return { ...state, loading: false, error: action.payload }; // Установка ошибки и состояния загрузки в false при ошибке запроса
    default:
      return state; // Возвращение текущего состояния, если действие не совпадает с указанными
  }
};

export default productsReducer;
