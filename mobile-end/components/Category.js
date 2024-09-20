import { StyleSheet, Text, View,Image } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';


export const categories = [
  {
    id: 1,
    title: 'Fruits',
    image: require('../assets/images/pomme2.jpg'),
    products: [
      { id: 1, title: 'Pommes', price: 2.5, quantity: 100, image: require('../assets/images/pomme2.jpg'), description:"a remplir",userProducteurId:[{name:'patience',producerInfo:"je suis producteur dans ...", producerTitle:'titreproducteur'}] },
      { id: 2, title: 'Bananes', price: 1.8, quantity: 150, image: require('../assets/images/banane.jpg'), description:"a remplir",userProducteurId:[{name:'jean-kevin',producerInfo:"je suis producteur dans ...", producerTitle:'titreproducteur' },]},
    ],
    
    


  },
  {
    id: 2,
    title: 'Legumes',
    image: require('../assets/images/carotte2.jpg'),
    products: [
      { id: 3, title: 'Carottes', price: 1.2, quantity: 200, image: require('../assets/images/carotte2.jpg'), description:"a remplir",userProducteurId:[{name:'patience',producerInfo:"je suis producteur dans ...", producerTitle:'titreproducteur'}] },
    ],
    
  },
  {
    id: 3,
    title: 'Viandes',
    image: require('../assets/images/steack.jpg'),
    products: [
      { id: 4, title: 'Steak', price: 15.0, quantity: 50, image: require('../assets/images/steack.jpg'), description:"a remplir",userProducteurId:[{name:'enzo',producerInfo:"je suis producteur dans ...", producerTitle:'titreproducteur'}] },
    ],
    
  },
  {
    id: 4,
    title: 'Poissons',
    image: require('../assets/images/saumon.jpg'),
    products: [
      { id: 5, title: 'Saumon', price: 12.0, quantity: 75, image: require('../assets/images/saumon.jpg'), description:"a remplir",userProducteurId:[{name:'patrick',producerInfo:"je suis producteur dans ...", producerTitle:'titreproducteur'}] },
    ],
    
  },
  {
    id: 5,
    title: 'C\u00E9rl\u00E9ales&F\u00E9culents',
    image: require('../assets/images/saumon.jpg'),
    products: [
      { id: 6, title: 'Bl\u00E9', price: 12.0, quantity: 75, image: require('../assets/images/ble.jpg'), description:"a remplir",userProducteurId:[{name:'patrick',producerInfo:"je suis producteur dans ...", producerTitle:'titreproducteur'}] },
    ],
    
  },
  {
    id: 6,
    title: 'Produits Laitiers',
    image: require('../assets/images/lait.jpg'),
    products: [
      { id: 7, title: 'Fromage', price: 12.0, quantity: 75, image: require('../assets/images/fromage.jpg'), description:"a remplir", userProducteurId:[{name:'patrick',producerInfo:"je suis producteur dans ...", producerTitle:'titreproducteur'}] },
    ],
    
  },
  {
    id: 7,
    title: 'Produits sucr\u00E9s',
    image: require('../assets/images/sugarProducts.jpg'),
    products: [
      { id: 8, title: 'Miel', price: 12.0, quantity: 75, image: require('../assets/images/miel.jpg'), description:"a remplir",userProducteurId:[{name:'patrick',producerInfo:"je suis producteur dans ...", producerTitle:'titreproducteur'}] },
    ],
    
  },
];
const Category = () => {
  const [pictures, setPictures] = useState(categories);
  return (
    <ScrollView>
      <Text>Vous cherchez une Catégorie d'aliment précise: </Text>
      <View style={styles.categoryPage}>
      {
        pictures.map((picture, index)=>{
          return(
            <View key={index} style={styles.gridItem}> 
            <Image source={picture.image} style={styles.image} />
            <Text style={styles.title}>{picture.title}</Text>
            </View>
          )
        }
      )

      }
    </View>
    </ScrollView>
    
  )
}

export default Category

const styles = StyleSheet.create({
  
  categoryPage: {
   flex:1,
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
    marginHorizontal:5
    
},
gridItem: {
  width: '33.333332', // 3 columns
  margin: 8, // add some margin between items
},
image:{
  width:100,
  height:100,
  borderRadius:10
}
})