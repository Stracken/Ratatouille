import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Colors from '../constants/Colors';

const ProductDetails = ({ route }) => {
  const { product} = route.params;

  return (
    <ScrollView style={styles.container}>
        <View style={styles.cardProductDetail}>
            <Image source={{ uri: product.images }} style={styles.image} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>Prix: {product.price}€</Text>
            <Text style={styles.quantity}>Quantité disponible: {product.quantity}</Text>
            <Text style={styles.category}>Catégorie: {product.title}</Text>
            <View style={styles.quantityContainer}>
        
      </View>
            <Text style={styles.description}>Description du produit:{product.description}</Text>
            
        <View style={styles.producerInfo}>
            <Text style={styles.producerTitle}>Information sur le producteur</Text>
            {product.userProducteurId && product.userProducteurId.length > 0 && (
    <View>
      {/* {product.user_lastName && product.user_firstName && (
            <View>
              <Text>Nom du producteur: {product.user_lastName} {product.user_firstName}</Text>
              {/* Ajoutez d'autres informations sur le producteur si disponibles */}
              
            {/* </View>
          )} */} 
   <Text>Nom du producteur: {product.user_id[0].firstName}</Text>
      <Text>Information: {product.userProducteurId[0].producerInfo}</Text>
      <Text>Titre: {product.userProducteurId[0].producerTitle}</Text>
    </View>
   
    
  )}
        </View>
        </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardProductDetail:{
    paddingBottom:20
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.danger,
  },
  price: {
    fontSize: 18,
    marginTop: 5,
  },
  quantity: {
    fontSize: 16,
    marginTop: 5,
  },
  category: {
    fontSize: 16,
    marginTop: 5,
  },
  description: {
    marginTop: 20,
    fontSize: 16,
  },
  producerInfo: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.danger,
    paddingTop: 10,
  },
  producerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.danger,
  },
});

export default ProductDetails;