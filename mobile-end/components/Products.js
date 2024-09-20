import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProductCard from './ProductCard';
import { useCart } from './CartContext';
import { categories } from './Category';
import Colors from '../constants/Colors';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [categoryFilter, setCategoryFilter] = useState('Tous les produits');
  const navigation = useNavigation();
  const route = useRoute();
  const { cart, addToCart, updateCartItemQuantity } = useCart();
  const ALL_CATEGORIES = 'Tous les produits';

  useEffect(() => {
    console.log("Selected category from route:", route.params?.selectedCategory);
    const allProducts = categories.flatMap(category => category.products);
    setProducts(allProducts);

    const selectedCategory = route.params?.selectedCategory;
    if (selectedCategory && selectedCategory !== ALL_CATEGORIES) {
        filterByCategory(selectedCategory);
        setCategoryFilter(selectedCategory);
    } else {
        setFilteredProducts(allProducts);
        setCategoryFilter(ALL_CATEGORIES);
    }
// assurer la reinitialisation de l'etat de products quand on quitte l'ecran
    return () => {
        setFilteredProducts([]);
        setCategoryFilter(ALL_CATEGORIES);
    };
}, [route.params?.selectedCategory]);



  const sortProducts = (order) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(sorted);
    setSortOrder(order);
  };

 const filterByCategory = (category) => {
  console.log("Filtering by category:", category);
    if (category === ALL_CATEGORIES) {
        setFilteredProducts(products);
    } else {
        const categoryProducts = categories.find(cat => cat.title === category)?.products || [];
        setFilteredProducts(categoryProducts);
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