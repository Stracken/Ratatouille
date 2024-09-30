import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import {useAuth} from '../context/AuthContext'
import ButtonComponent from '../components/ButtonComponent';



const Profil = () => {
  // Supposons que vous utilisez un contexte pour l'authentification

  const { user } = useAuth();
  console.log(user);
  
  const { signOut } = useAuth();
  return(
    
    <View style={styles.profilPage}>

     { user==null ? (
      <Text>Vous n'etes pas connecté</Text>
    ) : (
    <View style={styles.profilPage}>
      <View style={styles.firstContainer}> 
      <Text style={styles.text}>Bonjour </Text>
      <Text style={styles.textBold}>{user.firstName} {user.lastName}</Text>
      </View>
      <View style={styles.firstContainer}> 
      <Text style={styles.text}>Notre cher </Text>
      <Text style={styles.textBold}>{user.role}</Text>
      </View>
      <View style={styles.secondContainer}> 
      <Text style={styles.text}>vous résidez </Text>
      <Text style={styles.textBold}>{user.address} a {user.ville}</Text>
      </View>
      <View style={styles.secondContainer}> 
      <Text style={styles.text}>Votre email est :</Text>
      <Text style={styles.textBold}>{user.email}</Text>
      </View>
        
     

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
    fontSize: 25,
    color:'black'
  },
  profilPage: {
        flex: 1,
        justifyContent:'center',
        alignItems: "center",
        gap:40,
        margin:20
      },
  textProfilPage: {
        color: Colors.black,
    
      },
  buttonProfilPage: {
        color: Colors.danger,
        backgroundColor: Colors.black,
      },
      textBold:{
        fontSize: 25,
        color:'black',
        fontWeight:'bold'
      },
      firstContainer:{
        flexDirection:'row',
        alignItems:'center',
       
      },
      secondContainer:{
        flexDirection:'column',
        alignItems:'center',
      }
})

 