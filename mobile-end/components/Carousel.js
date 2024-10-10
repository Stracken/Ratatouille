import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors';
import { useNavigation } from "@react-navigation/native";

const Carousel = () => {
    const navigation = useNavigation();

    // Catégories basées sur l'enum de la table produit
    const categoriesData = {
        'fruits': {title: 'Fruits', image: require('../assets/images/banane.jpg')},
        'poissons': {title: 'Poissons', image: require('../assets/images/saumon.jpg')},
        'legumes': {title: 'L\u00E9gumes', image: require('../assets/images/carotte2.jpg')},
        'produits_sucres': {title: 'produits Sucr\u00E9s', image: require('../assets/images/sugarProducts.jpg')},
        'produits_laitiers': {title: 'produits Laitiers', image: require('../assets/images/lait.jpg')},
        'cereales': {title: 'C\u00E9r\u00E9ales', image: require('../assets/images/ble.jpg')},
        'viandes': {title: 'Viandes', image: require('../assets/images/steack.jpg')}
    };

    // Transformer les données pour qu'elles soient utilisables par FlatList
    const categories = Object.entries(categoriesData).map(([key, value]) => ({
        id: key,
        title: value.title,
        image: value.image
    }));
console.log(categories);

    const navigateToProducts = (categories) => {
        
        navigation.navigate('Produits', {
            screen: 'Products',
            params: { selectedCategory: categories.id }
          });
    };

    return (
        <FlatList
            style={styles.carousel}
            data={categories}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    style={styles.carouselItem} 
                    onPress={() => navigateToProducts(item)}
                >
                    <Image style={styles.pictureCarousel} source={item.image} />
                    <Text style={styles.carouselText}>{item.title}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default Carousel;

const styles = StyleSheet.create({
    carousel: {
        height: 'auto',
    },
    carouselItem: {
        width: 120,
        marginRight: 10,
        height: '100%'
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
});

// import React, { useState, useEffect } from 'react'
// import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
// import Colors from '../constants/Colors';
// import _ from 'lodash';
// import { useNavigation } from "@react-navigation/native";
// import axios from 'axios';
// import { API_URL } from '../config';

// const Carousel = () => {
//     const navigation = useNavigation();
//     // const [categories, setCategories] = useState([]);

//     // useEffect(() => {
//     //     fetchCategories();
//     // }, []);

//     // const fetchCategories = async () => {
//     //     try {
//     //         const response = await axios.get(`${API_URL}/product`); // Changé de /product/${user.id} à /product

//  // Objet de mapping pour les noms de catégories labellisés
//  const categories = {
//     'fruits': [{title:'Fruits'},{image: require('../assets/images/banane.jpg')}],
//     'legumes': [{title:'Légumes'},{image:require('../assets/images/carotte2.jpg')}],
//     'poissons': [{title:'Poissons'},{image:require('../assets/images/saumon.jpg')}],
//     'produits_sucres': [{title:'Produits Sucrés'},{image:require('../assets/images/sugarProducts.jpg')}],
//     'produits_laitiers': [{title:'Produits Laitiers'},{image:require('../assets/images/lait.jpg')}],
//     'cereales': [{title:'Céréales&Féculents'},{image:require('../assets/images/ble.jpg')}],
//     'viandes':[{title:'Viandes'},{image:require('../assets/images/steack.jpg')}]
//     // Ajoutez d'autres catégories si nécessaire
// };

//     //         const uniqueCategories = _.uniqBy(response.data.products, 'categorie').map(item => ({
//     //             id: item.id,
//     //             title: categoryLabels[item.categorie] || item.categorie, // Utilise le label s'il existe, sinon utilise la catégorie telle quelle
//     //             image: item.images ? { uri: item.images } : null  // Assurez-vous que l'URL de l'image est correcte
//     //         }));
//     //         setCategories(_.shuffle(uniqueCategories));
//     //     } catch (error) {
//     //         console.error('Erreur lors de la récupération des catégories:', error);
//     //     }
//     // };

//     const navigateToProducts = (category) => {
//         navigation.navigate('Produits', {
//             screen: 'Products',
//             params: { selectedCategory: category.title }
//         });
//     };

//     return (
//         <FlatList
//             style={styles.carousel}
//             data={categories}
//             renderItem={({ item }) => (
//                 <TouchableOpacity 
//                     style={styles.carouselItem} 
//                     onPress={() => navigateToProducts(item)}
//                 >
//                     <Image style={styles.pictureCarousel} source={item.image} />
//                     <Text style={styles.carouselText}>{item.title}</Text>
//                 </TouchableOpacity>
//             )}
//             keyExtractor={(item) => item.id.toString()}
//             horizontal={true}
//             pagingEnabled={true}
//             showsHorizontalScrollIndicator={false}
//         />
//     );
// };

// export default Carousel;



// const styles = StyleSheet.create({
//     carousel: {
//         height:'auto',

//     },
//     carouselItem: {
//         width: 120,
//         marginRight: 10,
//         height:'100%'
//     },
//     pictureCarousel: {
//         height: 90,
//         width: 120,
//         borderRadius: 10,
//     },
//     carouselText: {
//         color: Colors.danger,
//         fontSize: 18,
//         textAlign: 'center',
//     },
// })