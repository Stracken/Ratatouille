import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  console.log('AuthProvider rendered');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = (token, role) => {
    Cookies.set('token', token);
    setUser({ token, role });
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  console.log('useAuth called');
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}