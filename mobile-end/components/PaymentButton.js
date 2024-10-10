import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import Colors from '../constants/Colors';

const logoImage = require('../assets/images/logo.jpg');

const PaymentButton = ({ amount, onSuccess }) => {
  const handlePayment = () => {
    var options = {
      description: 'Achat TerroTerro',
      image: Image.resolveAssetSource(logoImage).uri,
      currency: 'EUR',
      key: 'VOTRE_CLE_API_TEST',
      amount: amount.toString(), // Utilisez le montant passé en prop
      name: 'TERROTERRO',
      prefill: {
        email: 'test@example.com',
        contact: '9191919191',
        name: 'Client Test'
      },
      theme: {color: Colors.danger}
    }

    RazorpayCheckout.open(options).then((data) => {
      // Paiement réussi
      onSuccess(data.razorpay_payment_id);
    }).catch((error) => {
      // Erreur dans le processus de paiement
      alert(`Erreur: ${error.code} | ${error.description}`);
    });
  };

  return (
    <TouchableOpacity onPress={handlePayment} style={styles.button}>
      <Text style={styles.buttonText}>Payer Maintenant</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.danger,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentButton;