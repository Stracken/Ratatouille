import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { Alert } from "react-native";
import Colors from "../constants/Colors";

const ProductCard = ({ item, addToCart, updateCartItemQuantity, cartQuantity }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(cartQuantity);

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
      Alert.alert("Erreur", "La quantité doit être supérieure à zéro pour ajouter au panier.");
    }
  };

  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text>Prix: {item.price}€</Text>
      <Text>Quantité disponible: {item.quantity}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleQuantityChange(Math.max(0, selectedQuantity - 1))}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{selectedQuantity}</Text>
        <TouchableOpacity onPress={() => handleQuantityChange(selectedQuantity + 1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={handleAddToCart}
      >
        <Text>{cartQuantity > 0 ? 'Mettre à jour le panier' : 'Ajouter au panier'}</Text>
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
      marginBottom: 10,
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