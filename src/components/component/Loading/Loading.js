import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const LoadingComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // برای شبیه‌سازی لودینگ، می‌توانید تایمر استفاده کنید
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <div className="loader-container" style={loaderStyle}>
      <ClipLoader color="#0d6efd" loading={loading} size={150} />
    </div>
  );
};

const loaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

export default LoadingComponent;
