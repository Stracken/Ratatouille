import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity,Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import ProductCard from './ProductCard';
import { useCart } from './CartContext';
import { categories } from './Category'; // Importez les catégories
import Colors from '../constants/Colors';
import { collectManifestSchemes } from 'expo-linking';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [categoryFilter, setCategoryFilter] = useState(ALL_CATEGORIES);
  const navigation = useNavigation();
  const { cart, addToCart, updateCartItemQuantity } = useCart();
  const ALL_CATEGORIES = 'Tous les produits';

  useEffect(() => {
    // Simuler le chargement des produits depuis une API
    const fetchedProducts = [
      { id: 1, title: 'Pommes', price: 2.5, quantity: 100, image: require('../assets/images/pomme2.jpg')
        , category: 'Fruits' },
      { id: 2, title: 'Bananes', price: 1.8, quantity: 150, image: require('../assets/images/banane.jpg')
        , category: 'Fruits' },
      { id: 3, title: 'Carottes', price: 1.2, quantity: 200, image: require('../assets/images/carotte2.jpg')
        , category: 'Legumes' },
      { id: 4, title: 'Steak', price: 15.0, quantity: 50, image: require('../assets/images/steack.jpg')
        , category: 'Viandes' },
      { id: 5, title: 'Saumon', price: 12.0, quantity: 75, image: require('../assets/images/saumon.jpg')
        , category: 'Poissons' },
    ];
    setProducts(fetchedProducts);
    setFilteredProducts(fetchedProducts);
  }, []);

  const sortProducts = (order) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(sorted);
    setSortOrder(order);
  };

  const filterByCategory = (category) => {
    if (category === ALL_CATEGORIES) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
    setCategoryFilter(category);
  };
  

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filters}>
        <Picker
          selectedValue={sortOrder}
          onValueChange={(itemValue) => sortProducts(itemValue)}
          style={styles.picker}
          itemStyle={{ color: Colors.danger}}
          dropdownIconColor={{ color:Colors.danger}}
        >
          <Picker.Item label="Prix croissant" value="asc"/>
          <Picker.Item label="Prix décroissant" value="desc" />
        </Picker>
        <Picker
          selectedValue={categoryFilter}
          onValueChange={(itemValue) => filterByCategory(itemValue)}
          style={styles.picker}
          itemStyle={{ color: Colors.danger}}
          dropdownIconColor={{ color: Colors.danger}}
        >
          <Picker.Item color={Colors.danger} label={ALL_CATEGORIES} value={ALL_CATEGORIES} />
          {categories.map((category) => (
            <Picker.Item key={category.id} label={category.title} value={category.title} style={styles.pickerItemCategory} />
          ))}
        </Picker>
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard 
            item={item} 
            addToCart={handleAddToCart}
            updateCartItemQuantity={updateCartItemQuantity}
            cartQuantity={cart.find(cartItem => cartItem.id === item.id)?.selectedQuantity || 0}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity 
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
    color:Colors.danger
  },
  producerInput: {
    width: '48%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  productImage: {

    width: 50,
    height: 50,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    backgroundColor: 'lightblue',
    padding: 10,
    alignItems: 'center',
    marginTop: 5,
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
  pickerItemCategory:{
    color:Colors.danger
  }
});

export default Products;