import React,{useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useCart } from './CartContext'; 
import Colors from '../constants/Colors';
import { useState } from 'react';
import { API_URL } from '../config';

const ArticleItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <View style={styles.articleContainer}>
      <Image source={{ uri: item.images }} style={styles.image} />
      <View style={styles.articleInfo}>
        <Text style={styles.articleName}>{item.title}</Text>
        <Text style={styles.price}>Prix: {parseFloat(item.price).toFixed(2)}€</Text>
        {/* parseFloat() est une fonction JavaScript qui convertit une chaîne de caractères en un nombre à virgule flottante.
Cette étape est nécessaire car parfois, lors de la transmission de données depuis une API ou une base de données, les nombres peuvent être convertis en chaînes de caractères.
Si item.prix est déjà un nombre, parseFloat() le retournera tel quel. */}

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => onQuantityChange(item.id, Math.max(1, item.selectedQuantity - 1))} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.selectedQuantity}</Text>
          <TouchableOpacity 
  onPress={() => onQuantityChange(item.id, Math.min(item.quantity, item.selectedQuantity + 1))} 
  style={styles.quantityButton}
>
  {/* empeche de selectionner plus que la quantité restante du produit en question */}
  <Text style={styles.quantityButtonText}>+</Text>
</TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );
};

const BuyPage = () => {
  const { cart, updateCartItemQuantity, removeFromCart } = useCart();
  // const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentSheetInitialized, setPaymentSheetInitialized] = useState(false);
  const [stripePromise, setStripePromise] = useState(null); // État pour stocker l'instance de Stripe
  const STRIPE_PUBLIC_KEY = 'pk_test_51PfNmyRpKgZkfjqiZU6RXcDkGN4tjVTxY5TA9twzE48MEUMQe8fQojaXd7wJWUaSbRg2jgHmprVUWBGvQ8v8b41K00NeOYreRk'; // Utilisez votre clé publique ici
  const totalPrice = cart.reduce((total, item) => total + item.price * item.selectedQuantity, 0).toFixed(2);
  const { initStripe, initPaymentSheet, presentPaymentSheet } = useStripe();
 // Charger l'instance de Stripe lors du montage
//  
useEffect(() => {
  const initializeStripe = async () => {
    const { error } = await initStripe({
      publishableKey: 'pk_test_51PfNmyRpKgZkfjqiZU6RXcDkGN4tjVTxY5TA9twzE48MEUMQe8fQojaXd7wJWUaSbRg2jgHmprVUWBGvQ8v8b41K00NeOYreRk',
    });
    if (error) {
      console.error('Erreur lors de l\'initialisation de Stripe:', error);
    } else {
      console.log('Stripe initialisé avec succès');
    }
  };

  initializeStripe();
}, []);


  const initializePaymentSheet = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map(item => ({ id: item.id, quantity: item.selectedQuantity }))
        }),
      });
  
      const { clientSecret } = await response.json();
  
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'TERROTERRO', 
      });
        console.log(error);
      if (error) {
        console.error('Erreur lors de l\'initialisation:', error);
      } else {
        setPaymentSheetInitialized(true);
      }
    } catch (error) {
      console.error('Erreur générale:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    initializePaymentSheet();
  }, [cart]); // Réinitialiser le payment sheet quand le panier change
    
  // const openPaymentSheet = async () => {
  //   if (!paymentSheetInitialized) {
  //     console.error('Payment sheet not initialized');
  //     alert('Le formulaire de paiement n\'est pas prêt. Veuillez réessayer.');
  //     return;
  //   }

  //   const { error } = await presentPaymentSheet();
  const openPaymentSheet = async () => {
    if (!paymentSheetInitialized) {
      console.error('Payment sheet not initialized');
      alert('Le formulaire de paiement n\'est pas prêt. Veuillez réessayer.');
      return;
    }
  
    const { error } = await presentPaymentSheet();
  
    if (error) {
      if (error.code === 'Canceled') {
        console.log('Le paiement a été annulé par l\'utilisateur');
        alert('Vous avez annulé le paiement. Vous pouvez réessayer quand vous voulez.');
      } else {
        console.error('Erreur lors de la présentation:', error);
        alert('Une erreur est survenue lors du traitement du paiement. Veuillez réessayer.');
      }
    } else {
      handleSuccessfulPayment();
    }
  };
  const handleSuccessfulPayment = async () => {
    try {
      const response = await fetch(`${API_URL}/update-quantities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map(item => ({ id: item.id, quantity: item.selectedQuantity }))
        }),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Erreur lors de la mise à jour des quantités');
      }
  
      alert('Paiement réussi et quantités mises à jour avec succès !');
      // Ajoutez ici la logique pour vider le panier ou naviguer vers une page de confirmation
    } catch (error) {
      console.error('Erreur lors de la mise à jour des quantités:', error);
      if (error.name === 'TypeError' && error.message === 'Network request failed') {
        alert('Problème de connexion réseau. Le paiement a été effectué mais nous n\'avons pas pu mettre à jour les quantités. Veuillez contacter le support.');
      } else {
        alert(`Erreur lors de la mise à jour des quantités : ${error.message}. Veuillez contacter le support.`);
      }
    }
  };
  
  const renderFooter = () => (
    <View>
      <Text style={styles.totalPrice}>Prix Total: {totalPrice}€</Text>
      <TouchableOpacity style={styles.payButton} onPress={openPaymentSheet} disabled={loading}>
        <Text style={styles.payButtonText}>{loading ? 'Chargement...' : 'Payer Maintenant'}</Text>
      </TouchableOpacity>
    </View>
  );
 
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Page de Paiement</Text>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <ArticleItem 
              item={item} 
              onQuantityChange={updateCartItemQuantity}
              onRemove={removeFromCart}
            />
          )}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={renderFooter}
        />
      ) : (
        <Text style={styles.noFood}>Votre panier est vide</Text>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      
      
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      margin: 20,
      marginTop:30,
      textAlign: 'center',
      color:Colors.black
    },
    articleContainer: {
      flexDirection: 'row',
      marginBottom: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 20,
    },
    image: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
      borderRadius: 10,
    },
    articleInfo: {
      flex: 1,
      marginLeft: 10,
    },
    articleName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color:Colors.danger
    },
    price: {
      fontSize: 16,
      color: '#888',
      marginBottom: 5,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityButton: {
      backgroundColor: '#ddd',
      padding: 5,
      borderRadius: 5,
    },
    quantityButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    quantity: {
      marginHorizontal: 15,
      fontSize: 18,
    },
    totalPrice: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 20,
      textAlign: 'right',
    },
    payButton: {
      backgroundColor: 'darkgreen',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginHorizontal: 15,
      marginBottom: 20,
    },
    payButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    noFood:{
      color:Colors.black, 
      fontSize:20, 
      alignSelf:'center', 
      marginVertical:"50%"
    }
  });

export default BuyPage;


// const BuyPage = () => {
//   const { cart, updateCartItemQuantity, removeFromCart } = useCart();
//   const { initPaymentSheet, presentPaymentSheet } = useStripe();
//   const [loading, setLoading] = useState(false);
//   const [paymentSheetInitialized, setPaymentSheetInitialized] = useState(false);

//   const totalPrice = cart.reduce((total, item) => total + item.price * item.selectedQuantity, 0).toFixed(2);

//   const initializePaymentSheet = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_URL}/create-payment-intent`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           items: cart.map(item => ({ id: item.id, quantity: item.selectedQuantity }))
//         }),
//       });

//       const { clientSecret } = await response.json();

//       const { error } = await initPaymentSheet({
//         paymentIntentClientSecret: clientSecret,
//       });

//       if (error) {
//         console.error('Erreur lors de l'initialisation:', error);
//       } else {
//         setPaymentSheetInitialized(true);
//       }
//     } catch (error) {
//       console.error('Erreur générale:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     initializePaymentSheet();
//   }, [cart]); // Réinitialiser le payment sheet quand le panier change

//   const openPaymentSheet = async () => {
//     if (!paymentSheetInitialized) {
//       console.error('Payment sheet not initialized');
//       return;
//     }

//     const { error } = await presentPaymentSheet();

//     if (error) {
//       console.error('Erreur lors de la présentation:', error);
//     } else {
//       alert('Paiement réussi !');
//       // Mettre à jour les quantités
//       try {
//         await fetch(`${API_URL}/update-quantities`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             items: cart.map(item => ({ id: item.id, quantity: item.selectedQuantity }))
//           }),
//         });
//         // Vider le panier ou naviguer vers une page de confirmation
//       } catch (error) {
//         console.error('Erreur lors de la mise à jour des quantités:', error);
//       }
//     }
//   };

//   const renderFooter = () => (
//     <View>
//       <Text style={styles.totalPrice}>Prix Total: {totalPrice}€</Text>
//       <TouchableOpacity 
//         style={styles.payButton} 
//         onPress={openPaymentSheet} 
//         disabled={loading || !paymentSheetInitialized}
//       >
//         <Text style={styles.payButtonText}>
//           {loading ? 'Chargement...' : paymentSheetInitialized ? 'Payer Maintenant' : 'Préparation du paiement...'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
 
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Page de Paiement</Text>
//       {cart.length > 0 ? (
//         <FlatList
//           data={cart}
//           renderItem={({ item }) => (
//             <ArticleItem 
//               item={item} 
//               onQuantityChange={updateCartItemQuantity}
//               onRemove={removeFromCart}
//             />
//           )}
//           keyExtractor={item => item.id.toString()}
//           ListFooterComponent={renderFooter}
//         />
//       ) : (
//         <Text style={styles.noFood}>Votre panier est vide</Text>
//       )}
//     </SafeAreaView>
//   );
// };