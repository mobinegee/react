import React, { useState } from 'react';
import './loginform.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingComponent from '../Loading/Loading'; // کامپوننت لودینگ

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false); // وضعیت لودینگ

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // فعال کردن لودینگ

    // Logic for submitting login form
    console.log('Email:', email);
    console.log('Password:', password);
    fetch('https://backendreact.vercel.app/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Login failed');
        }
        return res.json();
      })
      .then(result => {
        if (result && result.token) {
          localStorage.setItem('authorization', result.token);
          console.log('successfully =>', result);
          navigate('/react/');
          Swal.fire({
            icon: "success",
            title: "با موفقیت انجام شد",
          });
        } else {
          throw new Error('Token not found in response');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire({
          icon: "error",
          title: "خطا",
          text: "رمز یا ایمیل اشتباه است",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      });
  };

  return (
    <div className="login-container">
      {loading ? (<>
      <LoadingComponent />
      </>) : (<>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>ورود</h2>
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
          <button type="submit" className="login-button">ورود</button>
        </form>
      </>)}
    </div>
  );
};

export default LoginForm;
