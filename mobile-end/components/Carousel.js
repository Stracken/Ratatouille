import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';
import _ from 'lodash';
import { categories } from './Category';
import { useNavigation } from "@react-navigation/native";

const Carousel = () => {
    const navigation = useNavigation();
    const shuffledCategories = _.shuffle(categories);

    const navigateToProducts = (category) => {
        navigation.navigate('Produits', {
            screen: 'Products',
            params: { selectedCategory: category.title }
        });
    };

    return (
        <FlatList
            style={styles.carousel}
            data={shuffledCategories}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    style={styles.carouselItem} 
                    onPress={() => navigateToProducts(item)}
                >
                    <Image style={styles.pictureCarousel} source={item.image} />
                    <Text style={styles.carouselText}>{item.title}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default Carousel

const styles = StyleSheet.create({
    carousel: {
        height:'auto',

    },
    carouselItem: {
        width: 120,
        marginRight: 10,
        height:'100%'
    },
    pictureCarousel: {
        height: 90,
        width: 120,
        borderRadius: 10,
    },
    carouselText: {
        color: Colors.danger,
        fontSize: 18,
        textAlign: 'center',
    },
})