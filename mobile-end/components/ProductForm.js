import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../constants/Colors';
import { useAuth } from "../context/AuthContext";

export default ProductForm = ({ onSubmit, initialValues, isEditing }) => {
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
  const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  form: {
    marginBottom: 20,
    
  },
  submitButton: {
    backgroundColor: Colors.greenAgri,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
})