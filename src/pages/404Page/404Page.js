import React from 'react';
import Header from '../../components/UI/Header/Header';
import Contact from '../../components/UI/Contact/Contact';
import NotFound from '../../components/UI/404/404';

const NotFoundPage = () => {
  return (
    <div>
    <Header />
    <NotFound />
    <Contact />
    </div>
  );
};

export default NotFoundPage;
