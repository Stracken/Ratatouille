import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import { signUp } from "../api/api";

const SignUpScreen = ({ onBackToSignIn ,navigation}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  // const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [ville, setVille] = useState("");
  // const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [role, setRole] = useState("client");
  const [raisonSociale, setRaisonSociale] = useState("");
  const [error, setError] = useState(null);
  const validateForm = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !telephone ||
      !ville ||
      !password ||
      !postalCode ||
      !address ||
      !role 
    ) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires");
      return false;
    } 
    if (role === "vendeur" && !raisonSociale) {
      Alert.alert("Erreur", "Raison sociale est requis pour les vendeurs");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Erreur", "Veuillez entrer une adresse email valide");
      return false;
    }
    if (!/^[0-9]{5}$/.test(postalCode)) {
      Alert.alert("Erreur", "Code postal invalide");
      return false;
    }
    if (!postalCode.length == 5) {
      Alert.alert("Erreur", "Le code postal doit contenir 5 caractères");
      return false;
    }
    if (password.length < 6) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit contenir au moins 6 caractères"
      );
      return false;
    }
    return true;
  };
  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null); // Réinitialiser l'erreur au début de chaque tentative d'inscription
    try {
      const userData = {
        firstName,
        lastName,
        email,
        telephone,
        postalCode,
        password,
        address,
        ville,
        role,
        ...(role === "vendeur" && { raisonSociale }),
      };
      const response = await signUp(userData);
      Alert.alert("Succès", "Inscription réussie !", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      if (error.message === 'Cet email est déjà utilisé') {
        Alert.alert(
          "Erreur",
          "Cet email est déjà utilisé. Veuillez utiliser une autre adresse email."
        );
      } else {
        Alert.alert(
          "Erreur",
          error.message || "Une erreur est survenue lors de l'inscription"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <View style={styles.radioContainer}>
        <Text style={styles.labelText}>Type d'utilisateur :</Text>
        <TouchableOpacity
          style={[styles.radioButton, role === "client" && styles.radioButtonSelected]}
          onPress={() => {setRole("client");
            setRaisonSociale(""); // Réinitialiser raisonSociale
          }}
        >
          <Text style={styles.radioButtonText}>Client</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, role === "vendeur" && styles.radioButtonSelected]}
          onPress={() => setRole("vendeur")}
        >
          <Text style={styles.radioButtonText}>Vendeur</Text>
        </TouchableOpacity>
      </View>
      {role === "vendeur" && (
        
          <TextInput
            style={styles.input}
            placeholder="Raison sociale"
            value={raisonSociale}
            onChangeText={setRaisonSociale}
            placeholderTextColor={Colors.white}
          />)}
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={firstName}
        onChangeText={setFirstName}
        placeholderTextColor={Colors.white}
      />

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={lastName}
        onChangeText={setLastName}
        placeholderTextColor={Colors.white}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor={Colors.white}
      />

      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        value={telephone}
        onChangeText={setTelephone}
        keyboardType="phone-pad"
        placeholderTextColor={Colors.white}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={Colors.white}
      />

      <TextInput
        style={styles.input}
        placeholder="Adresse"
        value={address}
        onChangeText={setAddress}
        multiline
        placeholderTextColor={Colors.white}
      />
      <TextInput
        style={styles.input}
        placeholder="Ville"
        value={ville}
        onChangeText={setVille}
        multiline
        placeholderTextColor={Colors.white}
      />
      <TextInput
        style={styles.input}
        placeholder="Code Postal"
        placeholderTextColor={Colors.white}
        value={postalCode}
        onChangeText={setPostalCode}
        keyboardType="numeric"
        maxLength={5}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

  
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.danger} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Retour à la connexion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.greenAgri,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: Colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: Colors.danger,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    color: Colors.white,
  },
  radioButtonText:{
    color: Colors.white,
  },
  radioButtonSelected: {
    backgroundColor: "darkgreen",
  },
  button: {
    backgroundColor: Colors.danger,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 10,
  },
  backButtonText: {
    color: Colors.white,
    textAlign: "center",
  },
});

export default SignUpScreen;
