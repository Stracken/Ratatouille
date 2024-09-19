import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, View } from 'react-native';
import Colors from './constants/Colors';
import React,{useRef, useMemo, useState} from 'react';
import MainApp from './MainApp';
import AuthScreen from './screens/AuthScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './AuthContext';
import { CartProvider } from "./components/CartContext";
import MyTabs from './components/MyTabs';

const Stack = createStackNavigator();

function AppContent()  {
  
    const { isLoading, userToken } = useAuth();

    if (isLoading) {
      // Vous pouvez afficher un écran de chargement ici
      return null;
    }
    return (
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {userToken == null ? (
              <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
            ) : (
              <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
        </CartProvider>
      );
    }
 
    export default function App() {
        return (
          <AuthProvider>
            <AppContent />
          </AuthProvider>
          
        );
      }
  
//   return (
//     <View style={styles.container}>
//       <MyContext.Provider value={{/* vos valeurs */}}>
//       <MainApp></MainApp>
//     </MyContext.Provider>
//     </View>
   
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Colors.greenAgri,
    
  },
  modalContainer:{
    flex:1,
    alignItems:'center',
    padding:10,

  },
  
});



