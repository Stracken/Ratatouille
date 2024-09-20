import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import ProductCard from './ProductCard';
import { useCart } from './CartContext';
import { categories } from './Category';
import _ from 'lodash';

const { width } = Dimensions.get('window');

const HomeProducts = () => {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, updateCartItemQuantity } = useCart();

  useEffect(() => {
    const allProducts = categories.flatMap(category => category.products);
    const shuffledProducts = _.shuffle(allProducts);
    setProducts(shuffledProducts.slice(0, 6)); // Prend 6 produits au hasard
  }, []);

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
  };

  const renderItem = ({ item }) => (
    <View style={styles.productWrapper}>
      <ProductCard 
        item={item} 
        addToCart={handleAddToCart}
        updateCartItemQuantity={updateCartItemQuantity}
        cartQuantity={cart.find(cartItem => cartItem.id === item.id)?.selectedQuantity || 0}
      />
    </View>
  );
return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={{gap:10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center', // Centre le contenu horizontalement
  },
  productList: {
    width: '100%',
    justifyContent: 'space-between', // Distribue l'espace entre les colonnes
    gap:10
  },
  productWrapper: {
    width: (width - 40) / 2, // 40 pour tenir compte du padding du container et de l'espace entre les éléments
    marginBottom: 10,
    
  },
});

export default HomeProducts;