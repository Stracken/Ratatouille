import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signIn, signUp, getUserData } from "../api/api";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        setUserToken(token);
        // Ici, vous pouvez ajouter une vérification du token avec votre backend
        // et récupérer les informations de l'utilisateur si nécessaire
      }
    } catch (e) {
      console.log("Erreur lors de la vérification du token:", e);
      setError("Erreur lors de la vérification de l'authentification");
    }
    setIsLoading(false);
  };

  const signInContext = async (authToken, userData) => {
    try {
      console.log("Token reçu:", authToken);
      console.log("Données utilisateur reçues:", userData);
      await AsyncStorage.setItem("userToken", authToken);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      setUserToken(authToken);
      setUser(userData);
    } catch (e) {
      console.error(
        "Erreur lors de la sauvegarde des données de connexion:",
        e
      );
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userData");
      setUserToken(null);
      setUser(null);
    } catch (e) {
      console.log("Erreur lors de la déconnexion:", e);
      setError("Erreur lors de la déconnexion");
    }
  };

  const signUpUser = async (userData) => {
    try {
      setError(null);
      const response = await signUp(userData);
      // Après l'inscription, connectez automatiquement l'utilisateur
      await signIn(userData.email, userData.password);
    } catch (e) {
      console.log("Erreur lors de l'inscription:", e);
      setError("Erreur lors de l'inscription");
      throw e;
    }
  };

  const useProducts = (userId) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
      if (!userId) {
        setError("UserId non défini");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/products/${userId}`);
        if (response.data.products) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError(
          err.response?.data?.error ||
            "Erreur lors de la récupération des produits"
        );
        console.error("Erreur lors de la récupération des produits:", err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchProducts();
    }, [userId]);

    return { products, loading, error, refetch: fetchProducts };
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        user,
        error,
        signInContext,
        signOut,
        signUpUser,
        clearError,
        useProducts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
