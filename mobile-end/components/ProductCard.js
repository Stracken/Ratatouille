import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image, ScrollView } from "react-native";
import { Alert } from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ item, addToCart, updateCartItemQuantity, cartQuantity }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(cartQuantity);
  const [imageError, setImageError] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    setSelectedQuantity(cartQuantity );
  }, [cartQuantity]);

  const handleQuantityChange = (newQuantity) => {
    setSelectedQuantity(newQuantity);
    if (cartQuantity > 0) {
      updateCartItemQuantity(item.id, newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (selectedQuantity > 0) {
      addToCart(item, selectedQuantity);
    } else {
      Alert.alert("Erreur", "La quantit\u00E9 doit être supérieure à z\u00E9ro pour ajouter au panier.");
    }
  };
  const navigateToProductDetails = () => {
    // navigation.navigate('ProductDetails', { product: item, Category: item });
    navigation.navigate('Produits', {screen:"ProductDetails", params:{product: item } });
  };
  return (
  
<View style={styles.card}>
      <TouchableOpacity 
      onPress={navigateToProductDetails} 
      accessible={true} 
      accessibilityLabel={`Voir les détails de ${item.title}`} 
      accessibilityHint="Appuyez pour voir les détails complets du produit">
      {!imageError ? (
        <Image 
        source={{ uri: item.images }} 
        style={styles.productImage} 
        onError={() => setImageError(true)}/>
      ) : (
        <View style={[styles.productImage, styles.imagePlaceholder]}>
          <Text>Image non disponible</Text>
        </View>
      )}
        <Text style={styles.productTitle}>{item.title}</Text>
      </TouchableOpacity>
      <Text>Prix: {item.price}€</Text>
      <Text>Quantité disponible: {item.quantity}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity 
        accessible={true}
        accessibilityLabel="Bouton de décrémentation"
        accessibilityHint="Appuyez pour réduire la quantité de produit voulu"
        accessibilityRole="button"
        onPress={() => handleQuantityChange(Math.max(0, selectedQuantity - 1))}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{selectedQuantity}</Text>
        <TouchableOpacity 
        accessible={true}
        accessibilityLabel="Bouton d'incrémentation"
        accessibilityHint="Appuyez pour augmenter la quantité de produit voulu"
        accessibilityRole="button"
        onPress={() => handleQuantityChange(selectedQuantity + 1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
      accessible={true}
      accessibilityLabel="Bouton de validation"
      accessibilityHint="Appuyez pour valider ou mettre a jour la mise au panier du produit"
      accessibilityRole="button" 
      style={styles.addButton} 
      onPress={handleAddToCart}
      >
        <Text style={styles.textAddBuy}>{cartQuantity > 0 ? 'Mettre à jour le panier' : 'Ajouter au panier'}</Text>
      </TouchableOpacity>
    </View>
    
  );
};
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    filters: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      fontSize:18
    },
    picker: {
      width: '48%',
    },
    producerInput: {
      width: '48%',
      borderWidth: 1,
      borderColor: 'gray',
      padding: 5,
    },
    card: {
      borderWidth: 1,
      borderColor: Colors.danger,
      padding: 10,
      paddingBottom:10
    },
    productImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      borderRadius:15
    },
    productTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color:Colors.danger
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    quantityButton: {
      fontSize: 24,
      paddingHorizontal: 10,
    },
    quantityText: {
      fontSize: 18,
      paddingHorizontal: 10,
    },
    addButton: {
      backgroundColor: Colors.greenAgri,
      padding: 10,
      alignItems: 'center',
      marginTop: 5,
      borderRadius:10
    },
    textAddBuy:{
      color:Colors.white,
      fontWeight:'bold'
    },
    buyButton: {
      backgroundColor: 'green',
      padding: 15,
      alignItems: 'center',
      marginTop: 10,
    },
    buyButtonText: {
      color: 'white',
      fontSize: 18,
    },
  });
export default ProductCard