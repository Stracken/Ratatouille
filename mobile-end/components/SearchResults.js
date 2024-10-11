import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "./ProductCard";
import { useCart } from "./CartContext";
import Colors from "../constants/Colors";
import StyledText from "react-native-styled-text";

const SearchResults = ({ route }) => {
    const textStyles = StyleSheet.create({
        bold: {
          fontWeight: "bold",
        },
        italic: {
          fontStyle: "italic",
        },
        underline: {
          textDecorationLine: "underline",
        },
        normal: {
          fontSize: 16,
          textAlign: "justify",
        },
        li: {
          fontStyle: "italic",
          fontSize: 20,
          color:Colors.danger
        },
      });
    const { searchResults = [], searchQuery = '' } = route.params || {};
  const navigation = useNavigation();
  const { cart, addToCart, updateCartItemQuantity } = useCart();
  if (searchResults.length === 0) {
    return (
      <View style={styles.container}>
        <StyledText textStyles={textStyles}>{"<li>Aucun r\u00E9sultat de recherche \u00E0 afficher:</li>"}</StyledText>
        <Text style={styles.textNoResults}>veuillez utilisez l'icone <Ionicons name="search-outline" size={40} color={Colors.danger} style={styles.searchIcon} />dans la barre ci-dessus</Text>

      </View>
    );
  }

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
  };

  return (
    <SafeAreaView style={styles.resultContainer}>
     <View style={styles.flatListContainer}>
     <Text style={styles.searchQueryText}>Résultats pour : {searchQuery}</Text>
      <FlatList
        data={searchResults}
        
        renderItem={({ item }) => (
            <ProductCard
            item={{
              id: item.id,
              title: item.nom,
              price: item.prix,
              quantity: item.quantite,
              images: item.images,
            }}
            addToCart={handleAddToCart}
            updateCartItemQuantity={updateCartItemQuantity}
            cartQuantity={
              cart.find((cartItem) => cartItem.id === item.id)
                ?.selectedQuantity || 0
            }
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
     </View>
     <View style={styles.buttonContainer}>
     <TouchableOpacity
        style={styles.buyButton}
        accessible={true}
        accessibilityLabel="Bouton de validation"
        accessibilityHint="Appuyez pour valider votre achat"
        accessibilityRole="button"
        
        onPress={() => navigation.navigate("BuyPage")}
      >
        <Text style={styles.buyButtonText}>Voir le panier</Text>
      </TouchableOpacity>
     </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container:{
    flex:1,
    paddingHorizontal:30,
    justifyContent:'flex-start',
    gap:120,
    marginTop:40
  },
  textNoResults:{
    fontSize:18,
    color:Colors.black,
    
  },
  searchQueryText: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: Colors.lightGray,
  },
  buttonContainer:{
    flex:0.2,
  },
  buyButton: {
    
    backgroundColor:'darkgreen',
    padding: 15,
    marginHorizontal:15,
    marginVertical:30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius:10
  },
  flatListContainer:{
    flex:0.8,
    padding:10,

  },
  buyButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SearchResults;