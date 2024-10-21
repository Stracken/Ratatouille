import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import ProductCard from "./ProductCard";
import { useCart } from "./CartContext";
import axios from "axios";
import { API_URL } from "../config";

const { width } = Dimensions.get("window");

const HomeProducts = () => {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, updateCartItemQuantity } = useCart();

  useEffect(() => {
    fetchRecentProducts();
  }, []);

  const fetchRecentProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/product`);
      // Prend les 6 produits les plus récents
      setProducts(response.data.products.slice(0, 6));
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des produits récents:",
        error
      );
    }
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
  };

  const renderItem = ({ item }) => {
    const imageUri = item.images;

    // Vérifiez si l'URI est valide
    if (typeof imageUri !== "string") {
      console.error("URI d'image invalide:", imageUri);
      return null; // ou une image par défaut
    }

    return (
      <View style={styles.productWrapper}>
        <ProductCard
          item={{
            id: item.id,
            title: item.nom,
            price: item.prix,
            quantity: item.quantite,
            images: item.images, // Assurez-vous que c'est une chaîne
          }}
          addToCart={handleAddToCart}
          updateCartItemQuantity={updateCartItemQuantity}
          cartQuantity={
            cart.find((cartItem) => cartItem.id === item.id)
              ?.selectedQuantity || 0
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  productList: {
    width: "100%",
    justifyContent: "space-between",
    gap: 10,
  },
  productWrapper: {
    width: (width - 40) / 2,
    marginBottom: 10,
  },
});

export default HomeProducts;
