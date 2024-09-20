import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CookiesPage = () => {
  const [essentialCookies, setEssentialCookies] = useState(true);
  const [analyticsCookies, setAnalyticsCookies] = useState(false);
  const [marketingCookies, setMarketingCookies] = useState(false);

  const saveCookiePreferences = async () => {
    try {
      await AsyncStorage.setItem('cookiePreferences', JSON.stringify({
        essential: essentialCookies,
        analytics: analyticsCookies,
        marketing: marketingCookies,
      }));
      // Ici, vous pouvez ajouter une logique pour appliquer les préférences
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des préférences de cookies:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Paramètres des Cookies - TERRO TERRO</Text>
      
      <View style={styles.cookieSection}>
        <Text style={styles.sectionTitle}>Cookies Essentiels</Text>
        <Text>Ces cookies sont nécessaires au fonctionnement du site.</Text>
        <Switch
          value={essentialCookies}
          onValueChange={setEssentialCookies}
          disabled={true}
        />
      </View>

      <View style={styles.cookieSection}>
        <Text style={styles.sectionTitle}>Cookies Analytiques</Text>
        <Text>Ces cookies nous aident à améliorer notre site web.</Text>
        <Switch
          value={analyticsCookies}
          onValueChange={(value) => {
            setAnalyticsCookies(value);
            saveCookiePreferences();
          }}
        />
      </View>

      <View style={styles.cookieSection}>
        <Text style={styles.sectionTitle}>Cookies Marketing</Text>
        <Text>Ces cookies sont utilisés pour la publicité ciblée.</Text>
        <Switch
          value={marketingCookies}
          onValueChange={(value) => {
            setMarketingCookies(value);
            saveCookiePreferences();
          }}
        />
      </View>

      <Text style={styles.infoText}>
        TERRO TERRO utilise des cookies pour améliorer votre expérience sur notre site. 
        Vous pouvez gérer vos préférences ici. Les cookies essentiels ne peuvent pas être désactivés.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cookieSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    marginTop: 20,
    fontSize: 14,
    color: 'gray',
    marginBottom:40
  },
});

export default CookiesPage;