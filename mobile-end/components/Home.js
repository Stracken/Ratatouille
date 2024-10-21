import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import WebviewComponent from "./WebviewComponent";
import Carousel from "../components/Carousel";
import HomeProducts from "./HomeProducts";
import ButtonComponent from "./ButtonComponent";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { signOut } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.homeWebView}>
        <WebviewComponent />
      </View>
      <View style={styles.homeTitles}>
        <Text style={styles.homeTitleText}>Catégories</Text>
      </View>
      <View style={styles.homeCarousel}>
        <Carousel />
      </View>
      <View style={styles.homeTitles}>
        <Text style={styles.homeTitleText}>Nouveaux produits</Text>
      </View>
      <View style={styles.productsSection}>
        <HomeProducts />
      </View>

      <ButtonComponent
        title="Déconnexion"
        onPress={signOut}
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
  homeCarousel: {},
  homeTitles: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  homeTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.danger,
  },
  productsSection: {
    width: "100%",
    paddingHorizontal: 10,
  },
  additionalText: {
    padding: 10,
  },
});

export default Home;
