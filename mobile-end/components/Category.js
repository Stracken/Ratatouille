import { StyleSheet, Text, View,Image } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';4
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';


export const categories = [
  {id: 1, title: 'Viandes', image: require('../assets/images/carotte.jpg')},
  {id: 2, title: 'Legumes', image: require('../assets/images/salade.jpg')},
  {id: 3, title: 'Fruits', image: require('../assets/images/radis.jpg')},
  {id: 4, title: 'Poissons', image: require('../assets/images/champs agricole.jpg')},
  {id: 5, title: 'Picture 5', image: require('../assets/images/pomme.jpg')}
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