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
// export const getUserProfile = async (token) => {
//   try {
//     console.log("Appel API avec token:", token);
//     const response = await fetch(`${API_URL}/user/profile`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(`Erreur lors de la récupération du profil: ${response.status} ${response.statusText}. ${JSON.stringify(errorData)}`);
//     }

//     const data = await response.json();
//     console.log("Données du profil reçues:", data);
//     return data;
//   } catch (error) {
//     console.error("Erreur détaillée lors de la récupération du profil:", error);
//     throw error;
//   }
// };

// export const getUserData = async () => {
//   try {
//     const token = await AsyncStorage.getItem('userToken');
//     if (!token) {
//       throw new Error('Aucun token trouvé');
//     }

//     const response = await fetch(`${API_URL}/user`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.error || 'Erreur lors de la récupération des données utilisateur dans getUserData');
//     }

//     console.log('Données utilisateur reçues:', data);
//     return data;
//   } catch (error) {
//     console.error("Erreur lors de la récupération des données utilisateur dans getUserData:", error);
//     throw error;
//   }
// };