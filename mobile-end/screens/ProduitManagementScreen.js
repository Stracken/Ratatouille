import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Colors from '../constants/Colors';
import { API_URL } from '../config';
import { useAuth } from "../context/AuthContext";
import tinycolor from 'tinycolor2';

const useProducts = (userId) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //Lorsqu'un nouvel userId est fourni, la fonction fetchProducts est appelée.
  useEffect(() => {
    fetchProducts();
  }, [userId]);
  //récupérer les produits de l'API.
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
//Si userId est valide, une requête GET est effectuée pour récupérer les produits associés à cet utilisateur.
  
//hook retourne les produits récupérés, l'état de chargement et d'erreur ainsi qu'une fonction pour rafraîchir les données.
  return { products, loading, error, refetch: fetchProducts };
};

const ProductForm = ({ onSubmit, initialValues, isEditing }) => {
  //Initialise l'état avec les valeurs initiales fournies (soit pour un nouveau produit soit pour un produit existant)
  const [product, setProduct] = useState(initialValues);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  //Met à jour l'état du produit si initialValues change (utile lors de l'édition)
  useEffect(() => {
    setProduct(initialValues);
  }, [initialValues]);

  const handleChange = (name, value) => {
    setProduct(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  //setProduct est une fonction de mise à jour de l'état:utilise une fonction de rappel qui reçoit l'état précédent (prevData).
// ...prevData: utilise l'opérateur de propagation pour copier toutes les propriétés existantes de l'objet prevData.
// [name]: value: utilise la notation de crochet pour définir dynamiquement une propriété de l'objet.
// name devient le nom de la propriété, et value sa nouvelle valeur.
 
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleChange('images',  result.assets[0].uri);
    }
  };
// Ouvre la bibliothèque d'images pour permettre à l'utilisateur de sélectionner une image. Si l'utilisateur ne cancelle pas l'opération, l'URI de l'image sélectionnée est mise à jour dans l'état du produit
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Nom du produit"
        value={product.nom}
        placeholderTextColor="black"
        onChangeText={(text) => handleChange('nom', text)}
      />

      <Picker
        selectedValue={product.categorie}
        style={styles.picker}
        
        onValueChange={(value) => handleChange('categorie', value)}
      >
        <Picker.Item style={styles.input} label="Choisir une catégorie" value="" />
        <Picker.Item style={styles.input} label="Fruits" value="fruits" />
        <Picker.Item style={styles.input} label="Poissons" value="poissons" />
        <Picker.Item style={styles.input} label="Légumes" value="legumes" />
        <Picker.Item style={styles.input} label="Produits sucrés" value="produits_sucres" />
        <Picker.Item style={styles.input} label="Produits laitiers" value="produits_laitiers" />
        <Picker.Item style={styles.input} label="Céréales" value="cereales" />
        <Picker.Item style={styles.input} label="Viandes" value="viandes" />
      </Picker>
      
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.submitButtonText}>Choisir une image</Text>
      </TouchableOpacity>
      
      <TextInput
        style={styles.input}
        placeholder="Prix"
        value={product.prix}
        placeholderTextColor="black"
        onChangeText={(text) => handleChange('prix', text)}
        keyboardType="numeric"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Quantité"
        value={product.quantite}
        placeholderTextColor="black"
        onChangeText={(text) => handleChange('quantite', text)}
        keyboardType="numeric"
      />
      
      <TextInput
         style={[
          styles.input, 
          isDescriptionFocused && styles.expandedInput
        ]}
        placeholder="Description"
        value={product.description}
        placeholderTextColor="black"
        onChangeText={(text) => handleChange('description', text)}
        multiline
        numberOfLines={isDescriptionFocused ? 4 : 1}
        onFocus={() => setIsDescriptionFocused(true)}
        onBlur={() => setIsDescriptionFocused(false)}
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
//hook personnalisé pour détecter l'état du clavier  
const useKeyboardStatus = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};
//  hook détecte si le clavier est visible ou non , puis met à jour un état en conséquence et nettoie les listeners lors du démontage
const ProductManagementScreen = () => {
  const {user} = useAuth()
// Récupère les informations utilisateur via le contexte d'authentification
  const { products, loading, error, refetch } = useProducts(user?.id);
  // Utilise le hook personnalisé pour récupérer les produits associés à cet utilisateur
  const [editingProduct, setEditingProduct] = useState(null);
  const [productData, setProductData] = useState({
    nom: '',
    categorie: '',
    images: '',
    prix: '',
    quantite: '',
    description: '',
  });
  const isKeyboardVisible = useKeyboardStatus();

  
  
  const handleAddProduct = async (productData) => {
    const { nom, categorie, images, prix, quantite, description } = productData;
  
    if (!nom || !categorie || !images || !prix || !quantite || !description) {
      Alert.alert('Erreur', 'Tous les champs requis doivent être remplis');
      return;
    }
   // Vérifie que tous les champs sont remplis avant d'ajouter un produit.
   // Crée un FormData avec toutes les informations nécessaires.

   
    try {
      const formData = new FormData();
      formData.append('user_id', user.id); // Assurez-vous que user.id est disponible
      formData.append('nom', nom);
      formData.append('categorie', categorie);
      formData.append('prix', prix.toString());
      formData.append('quantite', quantite.toString());
      formData.append('description', description);
  
      //  vérifie si la variable images commence par file:// ou content:image soit chemin local sur le système de fichiers (fichier) ou un contenu provenant d'une autre source (comme une galerie d'images)
      if (images.startsWith('file://') || images.startsWith('content://')) {
        // divise la chaîne images en un tableau en utilisant / comme séparateur et pop:récupère le dernier élément du tableau, qui est généralement le nom du fichier
        const filename = images.split('/').pop();
        // utilise une expression régulière pour extraire l'extension du fichier
        const match = /\.(\w+)$/.exec(filename);
        //exec(filname):applique cette expression régulière à filename. Si une correspondance est trouvée, elle renvoie un tableau ; sinon, elle renvoie null
        // détermine le type MIME de l'image
        const type = match ? `image/${match[1]}` : 'image';
        // Si match n'est pas nul (extension trouvée), elle construit une chaîne comme image/jpeg,
        // sinon type par defaut sur image
        formData.append('images', {
          uri: images,
          name: filename,
          type
        });
        // informations nécessaires pour l'image :
// uri: Le chemin ou l'URI de l'image.
// name: Le nom du fichier.
// type: Le type MIME de l'image.
      } else {
        Alert.alert('Erreur', 'Format d\'image non valide');
        return;
      }
     // Envoie une requête POST à l'API avec ces données.
      const result = await axios.post(`${API_URL}/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Produit ajouté:', result.data);
      refetch();
     // Rafraîchit la liste des produits après ajout réussi.
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
   {item.images && typeof item.images === 'string' ? (
      <Image 
        source={{ uri: item.images.startsWith('data:image') ? item.images : `data:image/jpeg;base64,${item.images}` }}
        style={styles.productImage}
        resizeMode="cover"
      />
    ) : (
      <View style={[styles.productImage, styles.imagePlaceholder]}>
        <Text>Image non disponible</Text>
      </View>
    )}
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
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
  >
    
      <Text style={styles.title}>Gestion des Produits</Text>
      <View style={styles.formContainer}>
      <ProductForm 
      onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
      initialValues={editingProduct || productData}
      isEditing={!!editingProduct}
        style={styles.productForm}
      />
       
      </View>
      {!isKeyboardVisible && (
      <View style={styles.listContainer}>
      <Text style={styles.title}>Vos articles en ligne</Text>
      
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.productsManager}
      />
      </View>
       )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    marginTop:15,
    textAlign: 'center',
    color:Colors.black
  },
  formContainer: {
    height:'40%'},

  listContainer: {
    height:'52%'
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productForm:{
    gap:40,
    paddingHorizontal:40,
  },
  input: {
    color: Colors.danger,
    height: 30,
    borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 10,
    backgroundColor: tinycolor(Colors.white).setAlpha(0.1).toString(),
    borderColor: Colors.white,
    textAlign: "center",
    width: 300,
    borderRadius: 10,
    fontWeight: 'bold',
    fontSize:14
  },
  expandedInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  
  picker:{
    color: Colors.danger,
    fontWeight: 'bold'
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
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
  imageButton:{
    color:Colors.white,
    backgroundColor: Colors.greenAgri,
    padding: 5,
    alignItems: 'center',
    marginTop: 5,
    marginHorizontal:40,
    borderRadius:10
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
  submitButton:{
    backgroundColor:Colors.greenAgri,
    padding: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    marginHorizontal:40,
    borderRadius:10
  },
  submitButtonText:{
    fontSize:18,
    color:Colors.white

  }
});

export default ProductManagementScreen;