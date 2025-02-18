import React, { createContext, useContext, useState } from 'react';
import { motion } from 'framer-motion';

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    message: '',
    type: 'success',
    visible: false
  });

  const showAlert = (message, type) => {
    setAlert({ message, type, visible: true });
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 3000);
  };

  const hideAlert = () => {
    setAlert({ ...alert, visible: false });
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert.visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 left-1/2 transform  -translate-x-1/2 px-4 py-2 rounded-md ${
            alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {alert.message}
        </motion.div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};

export default AlertProvider;