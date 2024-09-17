import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useCart } from './CartContext'; // Assurez-vous d'avoir créé ce contexte
import Colors from '../constants/Colors';

const ArticleItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <View style={styles.articleContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.articleInfo}>
        <Text style={styles.articleName}>{item.title}</Text>
        <Text style={styles.price}>Prix: {item.price.toFixed(2)}€</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => onQuantityChange(item.id, Math.max(1, item.selectedQuantity - 1))} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.selectedQuantity}</Text>
          <TouchableOpacity onPress={() => onQuantityChange(item.id, item.selectedQuantity + 1)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );
};

const BuyPage = () => {
  const { cart, updateCartItemQuantity, removeFromCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.selectedQuantity, 0).toFixed(2);

  const renderFooter = () => (
    <View>
      <Text style={styles.totalPrice}>Prix Total: {totalPrice}€</Text>
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Payer Maintenant</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Page de Paiement</Text>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <ArticleItem 
              item={item} 
              onQuantityChange={updateCartItemQuantity}
              onRemove={removeFromCart}
            />
          )}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={renderFooter}
        />
      ) : (
        <Text style={styles.noFood}>Votre panier est vide</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      
      
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      margin: 20,
      marginTop:30,
      textAlign: 'center',
      color:Colors.danger
    },
    articleContainer: {
      flexDirection: 'row',
      marginBottom: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 20,
    },
    image: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
      borderRadius: 10,
    },
    articleInfo: {
      flex: 1,
      marginLeft: 10,
    },
    articleName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    price: {
      fontSize: 16,
      color: '#888',
      marginBottom: 5,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityButton: {
      backgroundColor: '#ddd',
      padding: 5,
      borderRadius: 5,
    },
    quantityButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    quantity: {
      marginHorizontal: 15,
      fontSize: 18,
    },
    totalPrice: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 20,
      textAlign: 'right',
    },
    payButton: {
      backgroundColor: '#4CAF50',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginHorizontal: 20,
      marginBottom: 20,
    },
    payButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    noFood:{
      color:Colors.danger, 
      fontSize:20, 
      alignSelf:'center', 
      marginVertical:"50%"
    }
  });

export default BuyPage;