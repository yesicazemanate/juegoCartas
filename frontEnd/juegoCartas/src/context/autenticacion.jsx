import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8089/user/inicioSesion', { email, password });
      const token = response.data.token;
      setToken(token);
      Cookies.set('token', token, { expires: 1 });
      setIsAuthenticated(true); 
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response?.data || error.message);
    }
  };

  const logout = () => {
    setToken(null);
    Cookies.remove('token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const tokenFromCookies = Cookies.get('token');
    if (tokenFromCookies) {
      setToken(tokenFromCookies);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
