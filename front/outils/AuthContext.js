"use client";
import { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  console.log('AuthProvider rendering');
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('AuthProvider useEffect running');
    const token = Cookies.get('token');
    if (token) {
      console.log('Token found:', token);
      setUser({ token });
    } else {
      console.log('No token found');
    }
  }, []);

  const login = (token, role) => {
    console.log('Login called with:', token, role);
    Cookies.set('token', token);
    setUser({ token, role });
  };

  const logout = () => {
    console.log('Logout called');
    Cookies.remove('token');
    setUser(null);
  };

  console.log('Current user state:', user);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  console.log('useAuth called');
  const context = useContext(AuthContext);
  console.log('useAuth context:', context);
  if (context === undefined) {
    console.error('useAuth must be used within an AuthProvider');
    return null; // Return null instead of throwing an error
  }
  return context;
}
// export function useAuth() {
//   console.log('useAuth called');
//   const context = useContext(AuthContext);
//   console.log('useAuth context:', context);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }