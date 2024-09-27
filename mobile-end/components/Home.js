import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import WebviewComponent from "./WebviewComponent";
import Carousel from '../components/Carousel';
import HomeProducts from './HomeProducts';
import { useNavigation } from "@react-navigation/native";
import ButtonComponent from './ButtonComponent'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { signOut } = useAuth();
  const testUserEndpoint = async ()=>{
    try{
      const response = await fetch('https://example.com/api/testuser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token}}
        )
          }
       
         catch {
          console.log('Error in testUserEndpoint')
        
  }}

  
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.homeWebView}>
        <WebviewComponent />
      </View>
      <View  style={styles.homeTitles}>
        <Text style={styles.homeTitleText}>Catégories</Text>
      </View>
      <View style={styles.homeCarousel}>
        <Carousel/>
      </View>
      <View  style={styles.homeTitles}>
        <Text style={styles.homeTitleText}>Nouveaux produits</Text>
      </View>
      <View style={styles.productsSection}>
        <HomeProducts />
      </View>

      <Text style={styles.additionalText}>
        iatur nulla reprehenderit. Assumenda dolorem vero odit. Accusamus fugiat dolores esse voluptatum qui cupiditate illo corporis necessitatibus, liberm rem error sunt porro.
      </Text>
      
     <ButtonComponent
          title="Déconnexion"
          onPress={signOut}
          style={styles.buttonProfilPage}
        />
     <ButtonComponent
          title="testuserEndpoint"
          onPress={testUserEndpoint}
          style={styles.buttonProfilPage}
        />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  homeWebView: {
    // Styles pour WebView
  },
  homeCarousel: {
  
  },
  homeTitles:{
    paddingHorizontal:10,
    paddingVertical:10,
    alignItems:'center'
  },
  homeTitleText:{
    fontSize: 20,
    fontWeight:'bold',
    color:Colors.danger
  },
  productsSection: {
    width: '100%',
    paddingHorizontal: 10,
   
  },
  additionalText: {
    padding: 10,
  },
});

export default Home;