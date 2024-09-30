import { API_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signUp = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erreur lors de l'inscription");
    }
    return await response.json();
    console.log(response)

  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data= await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erreur de connexion');
    }
    console.log('Données reçues de l\'API:', data);
    return data;
    
    
  } catch (error) {
    console.error("Erreur lors de la connexion (api):", error);
    throw error;
  }
};
