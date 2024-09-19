import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import Navbar from '../../component/Navbar/Navbar'
import Header from '../../component/Header/Header';
import Footer from '../../component/footer/footer';
const Home = () => {
  return (
    <div className='home'>
      <Header />
      <Navbar />
      <section className='hero'>
        <div className='hero-content'>
          <h1> آخرین ترند هارو دنبال کنید</h1>
          <p>سبک های فصلی و مجموعه های منحصر به فرد را کشف کنید</p>
          <Link to='/react/Allproducts' className='hero-button'>خرید</Link>
        </div>
        <img src="https://mobinegee.github.io/react/images/1.webp" alt="Fashion Background" className='hero-image' />
      </section>
      <section className='collections'>
        <div className='collection-item'>
          <Link to='/react/Allproducts'>
            <img src="https://mobinegee.github.io/react/images/9.webp" alt="Product 2" />
          </Link>
          <h2>جدید</h2>
        </div>
        <div className='collection-item'>
          <Link to='/react/productcategory/school'>
            <img src="https://mobinegee.github.io/react/images/5.webp" alt="Product 2" />
          </Link>
          <h2>مدرسه</h2>
        </div>
        <div className='collection-item'>
          <Link to='/react/productcategory/girl'>
            <img src="https://mobinegee.github.io/react/images/4.webp" alt="Product 2" />
          </Link>
          <h2>دخترانه</h2>
        </div>
      </section>
      <section className='featured'>
        <h2>محصولات ویژه</h2>
        <div className='featured-grid'>
          <div className='featured-item'>
            <Link to='/react/productcategory/home'>
              <img src="https://mobinegee.github.io/react/images/1.webp" alt="Product 2" />
            </Link>
            <h3>لباس خانه</h3>
          </div>
          <div className='featured-item'>
            <Link to='/react/productcategory/man'>
              <img src="https://mobinegee.github.io/react/images/2.webp" alt="Product 2" />
            </Link>
            <h3>لباس مردانه</h3>
          </div>
          <div className='featured-item'>
            <Link to='/react/productcategory/men'>
              <img src="https://mobinegee.github.io/react/images/8.webp" alt="Product 2" />
            </Link>
            <h3>لباس زنانه</h3>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
