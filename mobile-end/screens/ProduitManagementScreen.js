import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Colors from '../constants/Colors';
import { API_URL } from '../config';
import { useAuth } from "../context/AuthContext";
import tinycolor from 'tinycolor2';
import * as FileSystem from 'expo-file-system';

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

  useEffect(() => {
    setProduct(initialValues);
  }, [initialValues]);


  
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
  const [productData, setProductData] = useState({
    nom: '',
    categorie: '',
    images: '',
    prix: '',
    quantite: '',
    description: '',
  });
  
  
  const handleAddProduct = async (productData) => {
    // Vérifiez que tous les champs sont bien définis
    const { nom, categorie, images, prix, quantite, description } = productData;
  
    if (!nom || !categorie || !images || !prix || !quantite || !description) {
      Alert.alert('Erreur', 'Tous les champs requis doivent être remplis');
      return;
    }
  
    try {
 // Lire le fichier image
 const response = await fetch(images);
 const blob = await response.blob();
 
 // Créer un FormData
 const formData = new FormData();
//  formData.append('user_id', user.id);
 formData.append('nom', nom);
 formData.append('categorie', categorie);
 formData.append('images', blob, 'image.jpg');
 formData.append('prix', prix);
 formData.append('quantite', quantite);
 formData.append('description', description);

 const result = await axios.post(`${API_URL}/products`, formData, {
   headers: {
     'Content-Type': 'multipart/form-data',
   },
 });

      console.log('Produit ajouté:', result.data);
      // Gérer le succès (par exemple, naviguer vers une autre page ou afficher un message)
      refetch(); // Rafraîchir la liste des produits
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error.response?.data || error.message);
      Alert.alert('Erreur', 'Impossible d\'ajouter le produit');
    }
  };
  const handleEditProduct = async (updatedProduct) => {
    try {
      const formData = new FormData();
      formData.append('categorie', updatedProduct.categorie);
      formData.append('prix', updatedProduct.prix);
      formData.append('quantite', updatedProduct.quantite);
      formData.append('description', updatedProduct.description);
  
      // Vérifiez si une nouvelle image est fournie
    if (updatedProduct.images) {
      if (typeof updatedProduct.images === 'string' && updatedProduct.images.startsWith('file://')) {
        // Si c'est une nouvelle image (chemin local)
        const response = await fetch(updatedProduct.images);
        const blob = await response.blob();
        formData.append('images', blob, 'image.jpg');
      } else if (typeof updatedProduct.images === 'string') {
        // Si c'est une URL d'image existante
        formData.append('images', updatedProduct.images);
      }
      // Si c'est un objet File ou Blob, on peut l'ajouter directement
      else if (updatedProduct.images instanceof Blob || updatedProduct.images instanceof File) {
        formData.append('images', updatedProduct.images, 'image.jpg');
      }
    }
  
      await axios.put(`${API_URL}/products/${updatedProduct.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
    
      <Image 
        source={item.images}
        style={styles.productImage} 
      />
    
      <Text style={styles.productTitle}>{item.nom}</Text>
      <Text style={styles.categorie}>{item.categorie}</Text>
      <Text>{item.prix} €</Text>
      <Text>unités restantes: {item.quantite} </Text>
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
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    marginTop:30,
    textAlign: 'center',
    color:Colors.black
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  input: {
    color: Colors.danger,
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: tinycolor(Colors.white).setAlpha(0.1).toString(),
    borderColor: Colors.white,
    textAlign: "center",
    width: 300,
    borderRadius: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius:15
  },
  productTitle:{
    fontSize: 18,
      fontWeight: 'bold',
      color:Colors.danger
  },
  categorie:{
    fontSize: 18,
      fontWeight: 'bold',
      color:Colors.greenAgri
  },
  productItem:{
    borderWidth: 1,
    borderColor: Colors.danger,
    padding: 10,
    paddingBottom:10,
    alignItems:'center'
  },
  editButton: {
    color:Colors.white,
    backgroundColor: Colors.greenAgri,
    padding: 10,
    alignItems: 'center',
    marginTop: 5,
    marginHorizontal:40,
    borderRadius:10
  },
  deleteButton: {
    color:Colors.white,
    backgroundColor: Colors.greenAgri,
    padding: 10,
    alignItems: 'center',
    marginTop: 5,
    marginHorizontal:40,
    borderRadius:10
  },
});

export default ProductManagementScreen;