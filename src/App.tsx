import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Loader from './components/Loader';
import ChatBot from './components/ChatBot';
import './styles/theme.css';
import Portfolio from './pages/Portfolio';

const Home = lazy(() => import('./pages/Home'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetails'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Cart = lazy(() => import('./pages/Cart'));
const ContactMe = lazy(() => import('./pages/ContactMe'));

const App = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<ContactMe />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Suspense>
      <ChatBot />
    </Router>
  );
};

export default App;
