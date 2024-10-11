import { StyleSheet } from "react-native";
import Colors from "./constants/Colors";
import React from "react";
import MainApp from "./MainApp";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./components/CartContext";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import { StripeProvider } from '@stripe/stripe-react-native';
import { PUBLIC_KEY } from "./config";

const Stack = createStackNavigator();

function AppContent() {
  const { isLoading, userToken } = useAuth();
  if (isLoading) {
    return null;
  }
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {userToken == null ? (
            <>
              <Stack.Screen
                name="signin"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="signup"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <Stack.Screen
              name="MainApp"
              component={MainApp}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
       <StripeProvider
      publishableKey="pk_test_51PfNmyRpKgZkfjqiZU6RXcDkGN4tjVTxY5TA9twzE48MEUMQe8fQojaXd7wJWUaSbRg2jgHmprVUWBGvQ8v8b41K00NeOYreRk"
      // merchantIdentifier="merchant.com.terroterro.app" // Pour Apple Pay
    >
      <AppContent />
      </StripeProvider>
    </AuthProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greenAgri,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
});
