import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import Colors from "../constants/Colors";
import { signIn } from "../api/api"; // Importez la fonction signIn de votre fichier API
import tinycolor from "tinycolor2";
import { API_URL } from "../config";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInContext } = useAuth(); // Renommez pour éviter la confusion avec la fonction API
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Veuillez entrer une adresse email valide");
      return false;
    }
    setError(null);
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log("Début de la tentative de connexion");
      const response = await signIn(email, password);
      console.log("Réponse reçue du serveur:", response);
      const { token, user } = response;
      console.log("Avant mise à jour du contexte",response);
      // Utilisez la fonction signIn du contexte pour mettre à jour l'état d'authentification
      await signInContext(token, user);
      console.log("Après mise à jour du contexte");
      // La navigation sera gérée par le navigateur principal basé sur l'état d'authentification
      // Vous pouvez supprimer cette ligne si vous utilisez un navigateur conditionnel
      // navigation.navigate("NavigationTest", { user: user.name });
    } catch (error) {
      console.error("Erreur détaillée:", error);
      setError(error.message || "Identifiants invalides");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={Colors.gray}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={Colors.gray}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity
        style={styles.SignLogButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={styles.buttonText}>Se connecter</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.SignLogButton} onPress={() => navigation.navigate("signup")}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.passwordLink} onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.greenAgri,
    alignItems: "center",
  },
  input: {
    color: Colors.danger,
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: tinycolor(Colors.white).setAlpha(0.1).toString(),
    borderColor: Colors.white,
    textAlign: "center",
    width: 300,
    borderRadius: 10,
  },
  forgot: {
    color: "white",
    textAlign: "center",
    margin: 5,
  },
  buttonText:{
    color:Colors.white
  },
  SignLogButton: {
    backgroundColor: 'darkgreen',
    padding: 10,
    borderRadius: 5,
    width:180,
    alignItems: 'center',
    marginTop: 20,
  },
  passwordLink:{
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  }
});

export default LoginScreen;
