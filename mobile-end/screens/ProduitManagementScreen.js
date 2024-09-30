import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Colors from '../constants/Colors';
import { API_URL } from '../config';
import { useAuth } from "../context/AuthContext";

const useProducts = (userId) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    if (!userId) {
      setError('UserId non défini');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products/${userId}`);
      setProducts(response.data.products);
    } catch (err) {
      setError('Erreur lors de la récupération des produits');
      console.error('Erreur lors de la récupération des produits:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [userId]);

  return { products, loading, error, refetch: fetchProducts };
};

const ProductForm = ({ onSubmit, initialValues, isEditing }) => {
  const [product, setProduct] = useState(initialValues);

  const handleChange = (name, value) => {
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleChange('images', result.uri);
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Nom du produit"
        value={product.nom}
        onChangeText={(text) => handleChange('nom', text)}
      />

      <Picker
        selectedValue={product.categorie}
        onValueChange={(value) => handleChange('categorie', value)}
      >
        <Picker.Item label="Choisir une catégorie" value="" />
        <Picker.Item label="Fruits" value="fruits" />
        <Picker.Item label="Poissons" value="poissons" />
        <Picker.Item label="Légumes" value="legumes" />
        <Picker.Item label="Produits sucrés" value="produits_sucres" />
        <Picker.Item label="Produits laitiers" value="produits_laitiers" />
        <Picker.Item label="Céréales" value="cereales" />
        <Picker.Item label="Viandes" value="viandes" />
      </Picker>
      
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text>Choisir une image</Text>
      </TouchableOpacity>
      
      <TextInput
        style={styles.input}
        placeholder="Prix"
        value={product.prix}
        onChangeText={(text) => handleChange('prix', text)}
        keyboardType="numeric"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Quantité"
        value={product.quantite}
        onChangeText={(text) => handleChange('quantite', text)}
        keyboardType="numeric"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={product.description}
        onChangeText={(text) => handleChange('description', text)}
        multiline
      />
      
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={() => onSubmit(product)}
      >
        <Text style={styles.submitButtonText}>
          {isEditing ? 'Modifier le produit' : 'Ajouter le produit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ProductManagementScreen = () => {
  const {user} = useAuth()
  const { products, loading, error, refetch } = useProducts(user?.id);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = async (newProduct) => {
    try {
      await axios.post(`${API_URL}/products`, { ...newProduct, user_id: user.id });
      refetch();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
      Alert.alert('Erreur', 'Impossible d\'ajouter le produit');
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      await axios.put(`${API_URL}/products/${updatedProduct.id}`, updatedProduct);
      refetch();
      setEditingProduct(null);
    } catch (error) {
      console.error('Erreur lors de la modification du produit:', error);
      Alert.alert('Erreur', 'Impossible de modifier le produit');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${API_URL}/products/${productId}`);
      refetch();
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      Alert.alert('Erreur', 'Impossible de supprimer le produit');
    }
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text>{item.nom}</Text>
      <Text>{item.categorie}</Text>
      <Text>{item.prix} €</Text>
      <Text>{item.quantite} unités</Text>
      <TouchableOpacity onPress={() => setEditingProduct(item)}>
        <Text style={styles.editButton}>Modifier</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteProduct(item.id)}>
        <Text style={styles.deleteButton}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );
  if (!user) {
    return <Text>Veuillez vous connecter pour gérer vos produits.</Text>;
  }

  if (loading) return <Text>Chargement...</Text>;
  if (error) return <Text>Erreur: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des Produits</Text>
      
      <ProductForm 
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        initialValues={editingProduct || { nom: '', categorie: '', images: '', prix: '', quantite: '', description: '' }}
        isEditing={!!editingProduct}
      />

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (styles inchangés)
});

export default ProductManagementScreen;