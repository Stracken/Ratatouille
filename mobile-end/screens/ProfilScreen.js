import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import {useAuth} from '../context/AuthContext'
import ButtonComponent from '../components/ButtonComponent';



const Profil = () => {
  // Supposons que vous utilisez un contexte pour l'authentification

  const { user } = useAuth();
  const { signOut } = useAuth();
  return(
    
    <View style={styles.profilPage}>

     { user==null ? (
      <Text>Vous n'etes pas connecté</Text>
    ) : (
    <View style={styles.profilPage}>
        <Text style={styles.text}>Bonjour {user.firstName} {user.lastName}</Text>
        <Text style={styles.textProfilPage}>vous résidez {user.address} a {user.ville}</Text>
        <Text style={styles.textProfilPage}>Votre email est : {user.email} et votre telephone est: {user.telephone}</Text>

        <ButtonComponent
          title="Déconnexion"
          onPress={signOut}
          style={styles.buttonProfilPage}
        />
      
      </View>
    )
    }
    </View>
  )
  
};
 
export default Profil
const styles = StyleSheet.create({
  text:{
    fontSize: 20,
    color:'black'
  },
  profilPage: {
        flex: 1,
        justifyContent:'center',
        alignItems: "center",
        gap:40
      },
  textProfilPage: {
        color: Colors.black,
    
      },
  buttonProfilPage: {
        color: Colors.danger,
        backgroundColor: Colors.black,
      },
})

 