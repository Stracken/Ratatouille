import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';
import { useState } from 'react';
import _ from 'lodash';

const Carousel= () => {
    const [pictures, setPictures]= useState(
        [
          {id:1, title:'Viandes', image:require('../assets/images/carotte.jpg')},
          {id:2, title:'Legumes', image:require('../assets/images/salade.jpg')},
          {id:3, title:'Fruits', image:require('../assets/images/radis.jpg')},
          {id:4, title:'Poissons', image:require('../assets/images/champs agricole.jpg')},
          {id:5, title:'Picture 5', image:require('../assets/images/pomme.jpg')}
        ]
    
      )
      const shuffledPictures= _.shuffle(pictures)
      return (
        <FlatList
          style={styles.carousel}
          data={shuffledPictures}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Image style={styles.pictureCarousel} source={item.image} />
              <Text style={styles.carouselText}>{item.title}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true} // Make the list horizontal
          pagingEnabled={true} // Enable pagination
          showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
        />
      );
    };
    
export default Carousel

const styles = StyleSheet.create({
    carousel: {
      height: 120, // Adjust the height to fit your carousel
    },
    carouselItem: {
      width: 120, // Adjust the width to fit your carousel item
      marginRight: 10, // Add some margin between items
    },
    pictureCarousel: {
      height: 90, // Adjust the height to fit your image
      width: 120, // Adjust the width to fit your image
      borderRadius: 10, // Add some border radius to the image
    },
    carouselText: {
      color: Colors.danger,
      fontSize: 18, // Adjust the font size to fit your text
      textAlign: 'center', // Center the text
    },
})