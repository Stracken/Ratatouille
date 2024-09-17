import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { useAuth } from "../AuthContext";
import ButtonComponent from "../components/ButtonComponent";

const Profil = () => {
  const { signOut } = useAuth();
  const users = [
    {
      id: 1,
      setname: "kevin",
      profil: "client",
      email: "jean@jean",
    },
    {
      id: 2,
      setname: "kevin2",
      profil: "client",
      email: "jean@jean",
    },
    {
      id: 3,
      setname: "kevin3",
      profil: "producteur",
      email: "jean@jean",
    },
  ];
  const userId = 1;
  const user = users.find((user) => user.id == userId);
  return (
    <View>
      <View style={styles.profilPage}>
        <Text style={styles.textProfilPage}>Voici ton profil</Text>
        <Text style={styles.clientName}>{user.setname}!!!</Text>
        <Text>Bienvenue a toi notre super</Text>
        <Text style={styles.typeClient}>{user.profil}</Text>

        <Text style={styles.textProfilPage}>
          Voici ton e-mail de connexion: {user.email}
        </Text>
        {/* {users.map((user) => (
        <View key={user.id}>
          <Text style={styles.textProfilPage}>Voici ton profil {user.setname}</Text>
          <Text>Profil: {user.profil}</Text>
        </View>
      ))} */}
      </View>
      <View  style={styles.button}>

      <ButtonComponent
          title="Déconnexion"
          onPress={signOut}
          style={styles.buttonProfilPage}
        />
      </View>
        
      
    </View>
  );
};

export default Profil;

const styles = StyleSheet.create({
  profilPage: {
    flex: 1,
    justifyContent:'center',
    alignItems: "center",
    gap:40
  },
  button:{
    alignItems: "center",
    marginBottom:20
  },
  input: {
    justifyContent: "flex-end",
    alignItems: "center",
    borderBlockColor: "green",
    borderWidth: 10,
    width: 150,
  },
  buttonProfilPage: {
    color: Colors.danger,
    backgroundColor: Colors.greenAgriLight,
  },
  textProfilPage: {
    color: Colors.black,
  },
  typeClient: {
    color: Colors.danger,
    fontWeight: "bold",
  },
  clientName: {
    color: Colors.danger,
    fontWeight: "bold",
  },
});
