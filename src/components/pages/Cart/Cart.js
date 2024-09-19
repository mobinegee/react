import { useState, useEffect } from 'react';
import './cart.css';
import Header from '../../component/Header/Header';
import Navbar from '../../component/Navbar/Navbar';
import Footer from '../../component/footer/footer';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  return (
    <div id="root">
      <Header />
      <Navbar />
      <div className="main-content">
        <div className="cart-container">
          <h1>سبد خرید</h1>
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>سبد خرید شما خالی است!</p>
            </div>
          ) : (
            <>
              {cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                  <img
                    src={`${item.image_url}`}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <h2>{item.name}</h2>
                    <p>قیمت: {Number(item.price).toLocaleString('fa-IR')} تومان</p>
                    <p>تعداد: {item.quantity}</p>
                    <button onClick={() => removeFromCart(item.id)} className="remove-button">حذف</button>
                  </div>
                </div>
              ))}
              <div className="cart-summary">
                <h2>جمع کل: {Number(totalPrice).toLocaleString('fa-IR')} تومان</h2>
                <button className="checkout-button">پرداخت</button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
