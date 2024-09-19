// AuthScreen.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity,Text } from 'react-native';
import { useAuth } from '../AuthContext';
import Colors from '../constants/Colors';
import ButtonComponent from '../components/ButtonComponent';
import tinycolor from 'tinycolor2';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

export default function AuthScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { signIn } = useAuth();

  const handleSignIn = () => {
    // Ici, vous devriez implémenter la logique réelle d'authentification
    // Pour cet exemple, nous simulons simplement une connexion réussie
    signIn('fakeToken');
  };

  const handleSignUp = () => {
    setShowSignUp(true);
  };
  const handleBackToSignIn = () => {
    setShowSignUp(false);
    setShowForgotPassword(false);
  };
  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };
  if (showSignUp) {
    return <SignUpScreen onBackToSignIn={handleBackToSignIn} />;
  }
  if (showForgotPassword) {
    return <ForgotPasswordScreen onBackToSignIn={handleBackToSignIn} />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="login"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={Colors.white}
      />
      <TextInput
        style={styles.input}
        placeholder="MotdePasse"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={Colors.white}
      />
      <ButtonComponent title="Inscription" onPress={handleSignUp} />
      <ButtonComponent title="Connexion" onPress={handleSignIn} />
      
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:Colors.greenAgri,
    alignItems:'center'
  },
  input: {
    color:Colors.danger,
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor:tinycolor(Colors.white).setAlpha(0.1).toString(),
    borderColor:Colors.white,
    textAlign:'center',
    width:300,
    borderRadius:10

  },
  forgot: {
    color: "black",
    textAlign:'center',
    margin:5,
  },
 
});