const initialState = {
  items: [],
};

// Редюсер для управления состоянием корзины
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Проверяем, есть ли уже такой товар в корзине
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // Если товар уже есть, увеличиваем его количество
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + action.payload.quantity } : item
          ),
        };
      }
      // Если товара нет, добавляем его в корзину
      return {
        ...state,
        items: [...state.items, { ...action.payload }],
      };
      
    case 'REMOVE_FROM_CART':
      // Удаляем товар из корзины по его id
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
      
    case 'UPDATE_QUANTITY':
      // Обновляем количество товара в корзине
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.productId
            ? { ...item, quantity: Math.max(1, item.quantity + action.payload.delta) } // Минимальное количество товара - 1
            : item
        ),
      };
      
    case 'LOAD_CART':
      // Загружаем состояние корзины из сохраненных данных
      return {
        ...state,
        items: action.payload,
      };
      
    case 'CLEAR_CART':
      // Очищаем корзину
      return {
        ...state,
        items: [],
      };
      
    default:
      // Возвращаем текущее состояние, если действие не совпадает с указанными
      return state;
  }
};

export default cartReducer;
