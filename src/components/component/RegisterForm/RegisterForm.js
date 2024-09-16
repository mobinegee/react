import React, { useState } from 'react';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'رمزها مطابقت ندارند',
      });
      return;
    }

    try {
      // const response = await fetch('https://mobinegee.github.io/backendreact/api/users/register', {
        const response = await fetch('https://backendreact-avco.onrender.com/api/users/register', {
          method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'موفقیت',
          text: 'با موفقیت ثبت‌نام شدید',
        });
        localStorage.setItem('authorization', result.token);
        navigate('/react/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: result.message || 'ثبت‌نام ناموفق بود',
        });
      }
    } catch (err) {
      console.error('Error during registration:', err.message);
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'خطایی در طی ثبت‌نام رخ داده است. لطفاً دوباره تلاش کنید.',
      });
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>ثبت نام</h2>
        <div className="input-group">
          <label htmlFor="username">نام کاربری</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">ایمیل</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">رمز</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirm-password">تکرار رمز</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button">ثبت نام</button>
      </form>
    </div>
  );
};

export default SignUpForm;
