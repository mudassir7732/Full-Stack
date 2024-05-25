import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (credentials) => {
    try {
      if (credentials) {
        setEmail(credentials.email);
        setPassword(credentials.password);
      }

      // Perform authentication request to your backend API using Axios
      const res = await axios.post('http://localhost:5000/signin', credentials || { email, password });
      console.log(res.data, ' = Response');

      if (res.data.success) {
        setIsAuthenticated(true);
        setUserRole(res.data.user.role); // Set the user's role in the AuthProvider state
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      return false;
    }
  };

  const logout = () => {
    // Perform logout logic...
    setIsAuthenticated(false);
    setUserRole('');
    setEmail('');
    setPassword('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, email, password, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
