import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';
import Colors from '../constants/Colors'; // Assurez-vous que ce chemin est correct

const ForgotPasswordScreen = ({ navigation, onBackToSignIn }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Ici, vous implémenteriez la logique pour envoyer un email de réinitialisation
    // Par exemple, en utilisant Firebase ou votre propre backend
    Alert.alert(
      "Email envoyé",
      "Si un compte existe avec cet email, vous recevrez un lien pour réinitialiser votre mot de passe.",
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mot de passe oublié</Text>
      <Text style={styles.description}>
        Entrez votre adresse email pour recevoir un lien de réinitialisation de mot de passe.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Adresse email"
        placeholderTextColor={Colors.white}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleResetPassword}
      >
        <Text style={styles.buttonText}>Réinitialiser le mot de passe</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={onBackToSignIn} // Utilisez onBackToSignIn ici
      >
        <Text style={styles.backButtonText}>Retour à la connexion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.greenAgriLight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: Colors.greenAgri,
    padding: 10,
    borderRadius: 5,
    color: Colors.white,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.danger,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    color: Colors.white,
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;