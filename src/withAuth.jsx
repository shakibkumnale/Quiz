import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
      const authState = localStorage.getItem('authState');
      if (!isAuthenticated && !authState) {
        navigate('/login');
      }
    }, [isAuthenticated, navigate]);

    return isAuthenticated && user ? <WrappedComponent {...props} /> : null;
  };

  return AuthHOC;
};

export default withAuth;