const initialState = {
  categories: [],
  loading: false,
  error: null
};

// Редюсер для управления состоянием категорий
const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES_REQUEST':
      return { ...state, loading: true }; // Установка состояния загрузки в true
    case 'FETCH_CATEGORIES_SUCCESS':
      return { ...state, loading: false, categories: action.payload }; // Загрузка категорий и установка состояния загрузки в false
    case 'FETCH_CATEGORIES_FAILURE':
      return { ...state, loading: false, error: action.payload }; // Установка ошибки и состояния загрузки в false
    default:
      return state; // Возвращение текущего состояния, если действие не совпадает с указанными
  }
};

export default categoriesReducer;
