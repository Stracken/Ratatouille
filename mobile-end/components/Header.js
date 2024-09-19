import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Image } from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import Products from "./Products";
import { Link } from "expo-router";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.jpg")}
        style={styles.logo}
      />
      <Text style={styles.logoTitle}>TerroTerro</Text>
      <View style={styles.logoContainer}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? Colors.greenAgri
                : Colors.greenAgriLight,
            },
          ]}
          onPress={() => navigation.navigate("Profil")}
        >
          <Image
            source={require("../assets/images/user.png")}
            style={styles.icon}
          />
        </Pressable>
          <Link href="./Products.js">
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? Colors.greenAgri
                : Colors.greenAgriLight,
            },
          ]}
        >
          <Image
            source={require("../assets/images/shopping.png")}
            style={styles.icon}
          />
        </Pressable>
        </Link>
      </View>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.greenAgriLight,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "space-between",

    width: "100%",
  },

  logoTitle: {
    color: "#fff",
    fontSize: 30,
    margin: 10,
  },
  logoContainer: {
    flexDirection: "row",
    height: 50,
  },
  logo: {
    flex: 1,
    maxHeight: 50,
    maxWidth: 50,
    margin: 10,
  },
  icon: {
    maxHeight: 20,
    maxWidth: 20,
    margin: 10,
  },
  buttonProfil: {
    borderBlockColor: "black",
  },
});
