import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProductCard from './ProductCard';
import { useCart } from './CartContext';
import Colors from '../constants/Colors';
import axios from 'axios';
import { API_URL } from '../config';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [categoryFilter, setCategoryFilter] = useState('Tous les produits');
  const navigation = useNavigation();
  const { cart, addToCart, updateCartItemQuantity } = useCart();
  const ALL_CATEGORIES = 'Tous les produits';


  useEffect(() => {
    fetchProduct();
  }, []);



  
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/product`);
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    }
  };

  const sortProducts = (order) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      return order === 'asc' ? a.prix - b.prix : b.prix - a.prix;
    });
    setFilteredProducts(sorted);
    setSortOrder(order);
  };

  const filterByCategory = (category) => {
    if (category === ALL_CATEGORIES) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.categorie === category);
      setFilteredProducts(filtered);
    }
    setCategoryFilter(category);
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
  };

  const categories = ['fruits', 'poissons', 'legumes', 'produits_sucres', 'produits_laitiers', 'cereales', 'viandes'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filters}>
        <Picker
          selectedValue={sortOrder}
          onValueChange={(itemValue) => sortProducts(itemValue)}
          style={styles.picker}
          itemStyle={{ color: Colors.danger }}
          dropdownIconColor={Colors.danger}
        >
          <Picker.Item label="Prix croissant" value="asc"/>
          <Picker.Item label="Prix décroissant" value="desc" />
        </Picker>
        <Picker
          selectedValue={categoryFilter}
          onValueChange={(itemValue) => filterByCategory(itemValue)}
          style={styles.picker}
          itemStyle={{ color: Colors.danger }}
          dropdownIconColor={Colors.danger}
        >
          <Picker.Item color={Colors.danger} label={ALL_CATEGORIES} value={ALL_CATEGORIES} />
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} style={styles.pickerItemCategory} />
          ))}
        </Picker>
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard 
            item={{
              id: item.id,
              title: item.nom,
              price: item.prix,
              quantity: item.quantite,
              images: item.images // Assurez-vous que l'URL de l'image est correcte
            }}
            addToCart={handleAddToCart}
            updateCartItemQuantity={updateCartItemQuantity}
            cartQuantity={cart.find(cartItem => cartItem.id === item.id)?.selectedQuantity || 0}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Bouton de validation"
        accessibilityHint="Appuyez pour valider votre achat"
        accessibilityRole="button" 
        style={styles.buyButton}
        onPress={() => navigation.navigate('BuyPage')}
      >
        <Text style={styles.buyButtonText}>Voir le panier</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    color: Colors.danger
  },
  pickerItemCategory: {
    color: Colors.danger,
    fontSize: 18
  },
  buyButton: {
    backgroundColor: "darkgreen",
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Products;