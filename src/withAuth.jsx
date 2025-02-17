import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login', {
          state: {
            from: location.pathname,
            message: 'Please login to access this page'
          },
          replace: true // Use replace instead of push to avoid building up history
        });
      }
    }, [isAuthenticated, navigate, location]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthHOC;
};

export default withAuth;
