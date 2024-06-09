import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import HomePage from '././pages/HomePage/HomePage';
import CategoriesPage from '././pages/CategoriesPage/CategoriesPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ProductsPage from '././pages/ProductsPage/ProductsPage';
import ProductPage from '././pages/ProductPage/ProductPage';
import SalesPage from '././pages/SalesPage/SalesPage';
import CartPage from './pages/CartPage/CartPage';
import NotFoundPage from './pages/404Page/404Page';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage/>} /> {/* Catch-all route for 404 */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
