import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Animated, FlatList, Modal, ActivityIndicator } from "react-native";
import { Image } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import { API_URL } from '../config';
import { useNavigation } from '@react-navigation/native';

const ListItem = React.memo(({ item, onPress }) => (
  <TouchableOpacity style={styles.resultItem} onPress={() => onPress(item)}>
    <Text>{item.nom}</Text>
  </TouchableOpacity>
));

const CustomHeader = ({ openModal}) => {
  const navigation = useNavigation();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const animatedHeight = useRef(new Animated.Value(60)).current;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsSearchActive(false);
    });
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isSearchActive ? 110 : 60,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isSearchActive]);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive) {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const searchProducts = useCallback(async (query) => {
    if (query.length > 2) {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/search-products?q=${query}`);
        const data = await response.json();
        if (data.products && Array.isArray(data.products)) {
          // Filtrer les résultats côté client si nécessaire
          const filteredResults = data.products.filter(product => 
            product.nom.toLowerCase().includes(query.toLowerCase())
          );
          navigation.navigate('Search', {
            screen: 'SearchResults',
            params: { searchResults: filteredResults, searchQuery: query }
          });
        } else {
          console.error("Format de données inattendu:", data);
        }
      } catch (error) {
        console.error("Erreur lors de la recherche:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [navigation]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchProducts(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, searchProducts]);

  const handleItemPress = useCallback((item) => {
    // Naviguer vers la page du produit ou effectuer une action
    console.log("Produit sélectionné:", item);
    setIsModalVisible(false);
    // Exemple de navigation (à adapter selon votre structure de navigation)
    // navigation.navigate('ProductDetails', { productId: item.id });
  }, []);

  const renderItem = useCallback(({ item }) => (
    <ListItem item={item} onPress={handleItemPress} />
  ), [handleItemPress]);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const getItemLayout = useCallback((data, index) => ({
    length: 50, // Hauteur estimée de chaque élément
    offset: 50 * index,
    index,
  }), []);

  const memoizedSearchResults = useMemo(() => searchResults, [searchResults]);

return (
  <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, { height: animatedHeight }]}>
        <View style={styles.topRow}>
          <Image
            source={require("../assets/images/logo.jpg")}
            style={styles.logo}
          />
          <Text style={styles.title}>TerroTerro</Text>
          <TouchableOpacity onPress={toggleSearch} style={styles.searchButton}>
            <Ionicons name="search-outline" size={24} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.profileIcon} 
            onPress={openModal}
            accessible={true}
            accessibilityLabel="Bouton d'accessibilité"
            accessibilityHint="Appuyez pour accéder à votre page profil"
            accessibilityRole="button"
          >
            <Ionicons name="person" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
        {isSearchActive && (
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color={Colors.danger} style={styles.searchIcon} />
            <TextInput 
              style={styles.input} 
              placeholderTextColor={Colors.black} 
              placeholder="Agriculteurs, Producteurs, ..."
              autoFocus
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        )}
      </Animated.View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              getItemLayout={getItemLayout}
              removeClippedSubviews={true}
              maxToRenderPerBatch={10}
              updateCellsBatchingPeriod={50}
              windowSize={21}
              initialNumToRender={10}
            />
          ) : (
            <Text style={styles.noResultsText}>Aucun résultat trouvé</Text>
          )}
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.greenAgri,
  },
  container: {
    backgroundColor: Colors.greenAgri,
    paddingHorizontal: 15,
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-evenly',
    
    height: 40,
    marginBottom:10
  },
  title: {
    fontSize: 24,
    color: Colors.black,
    fontWeight: 'bold',
    fontStyle: 'italic',
    flex: 1,
    marginHorizontal: 10,
  },
  logo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  searchButton: {
    paddingHorizontal: 10,
  },
  profileIcon: {
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.fakeWhite,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.danger,
  },
  resultsList: {
    position: 'absolute',
    top: 110, // Ajustez selon vos besoins
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 1000,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingTop: 50,
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
  },
  closeButton: {
    backgroundColor: Colors.danger,
    padding: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});