import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import Colors from '../constants/Colors';

const SignUpScreen = ({ onBackToSignIn }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleSignUp = () => {
    // Logique d'inscription à implémenter
    console.log('Inscription en cours...');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      
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
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholderTextColor={Colors.white}
      />
      
      <View style={styles.radioContainer}>
        <Text style={{color:Colors.white, fontWeight:'bold',fontStyle:'italic'}}>
            Type d'utilisateur :</Text>
        <TouchableOpacity
          style={[styles.radioButton, userType === 'producteur' && styles.radioButtonSelected]}
          onPress={() => setUserType('producteur')}
        >
          <Text>Producteur</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, userType === 'particulier' && styles.radioButtonSelected]}
          onPress={() => setUserType('particulier')}
        >
          <Text>Particulier</Text>
        </TouchableOpacity>
      </View>
      
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
      
      {userType === 'producteur' && (
        <TextInput
          style={styles.input}
          placeholder="Raison sociale"
          value={companyName}
          onChangeText={setCompanyName}
          placeholderTextColor={Colors.white}
        />
      )}
      
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={onBackToSignIn}>
        <Text style={styles.backButtonText}>Retour à la connexion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor:Colors.greenAgriLight
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:Colors.white
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.greenAgri,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color:Colors.danger,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: Colors.greenAgri,
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    color:Colors.white
    
  },
  radioButtonSelected: {
    backgroundColor: Colors.greenAgri,
  },
  button: {
    backgroundColor: Colors.danger,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 10,
  },
  backButtonText: {
    color: Colors.danger,
    textAlign: 'center',
  },
});

export default SignUpScreen;