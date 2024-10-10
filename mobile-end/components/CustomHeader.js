import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Animated } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Image } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard } from "react-native";

const CustomHeader = ({ openModal }) => {
const [isSearchActive, setIsSearchActive] = useState(false);
const animatedHeight = useRef(new Animated.Value(60)).current;

useEffect(() => {
  const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
    setIsSearchActive(false);
  });
  return () => {
    keyboardDidHideListener.remove();
  };
}, []);

useEffect(() => {
  Animated.timing(animatedHeight, {
    toValue: isSearchActive ? 110 : 60,
    duration: 300,
    useNativeDriver: false,
  }).start();
}, [isSearchActive]);

const toggleSearch = () => {
  setIsSearchActive(!isSearchActive);
};

return (
  <SafeAreaView style={styles.safeArea}>
    <Animated.View style={[styles.container, { height: animatedHeight }]}>
      <View style={styles.topRow}>
        <Image
          source={require("../assets/images/logo.jpg")}
          style={styles.logo}
        />
        <Text style={styles.title}>TerroTerro</Text>
        <TouchableOpacity onPress={toggleSearch} style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color={Colors.white}  />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.profileIcon} 
          onPress={openModal}
          accessible={true}
          accessibilityLabel="Bouton d'accessibilité"
          accessibilityHint="Appuyez pour accéder à votre page profil"
          accessibilityRole="button"
        >
          <Ionicons name="person" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
      {isSearchActive && (
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={Colors.danger} style={styles.searchIcon} />
          <TextInput 
            style={styles.input} 
            placeholderTextColor={Colors.black} 
            placeholder="Agriculteurs, Producteurs, ..."
            autoFocus
          />
        </View>
      )}
    </Animated.View>
  </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.greenAgri,
  },
  container: {
    backgroundColor: Colors.greenAgri,
    paddingHorizontal: 15,
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-evenly',
    
    height: 40,
    marginBottom:10
  },
  title: {
    fontSize: 24,
    color: Colors.black,
    fontWeight: 'bold',
    fontStyle: 'italic',
    flex: 1,
    marginHorizontal: 10,
  },
  logo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  searchButton: {
    paddingHorizontal: 10,
  },
  profileIcon: {
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.fakeWhite,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.danger,
  },
});