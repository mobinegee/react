import React, { useEffect, useState } from 'react';
import Header from '../../component/Header/Header';
import Navbar from '../../component/Navbar/Navbar';
import Footer from '../../component/footer/footer';
import LoginForm from '../../component/Loginform/Loginform';
import SignUpForm from '../../component/RegisterForm/RegisterForm';
import Userinformation from '../../component/userinformation/userinformation';
import './user.css';

const User = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authorization');
    setIsAuthenticated(!!token); // Sets true if token exists, otherwise false
  }, []);

  const handleSignUpClick = () => setIsSignUp(true);
  const handleLoginClick = () => setIsSignUp(false);

  return (
    <div className='home'>
      <Header />
      <Navbar />
      {!isAuthenticated ? (
        <>
          {isSignUp ? (
            <>
              <SignUpForm />
              <button className='buttonchangestatuslogin' onClick={handleLoginClick}>ورود</button>
            </>
          ) : (
            <>
              <LoginForm />
              <button className='buttonchangestatus' onClick={handleSignUpClick}>ثبت نام</button>
            </>
          )}
        </>
      ) : (
        <Userinformation />
      )}
      {/* Uncomment if you need the footer */}
      {/* <div className='footer'>
        <Footer />
      </div> */}
    </div>
  );
};

export default User;
