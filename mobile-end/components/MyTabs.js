import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useCart } from "./CartContext";
import { useNavigation } from "@react-navigation/native";

import Home from "./Home";
import Category from "./Category";
import Products from "./Products";
import BuyPage from "./BuyPage";
import About from "./About";
import AboutUsScreen from "../screens/AboutUsScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import MentionsLegales from "../screens/MentionsLegales";
import CookiesPage from "./CookiesPage";
import ProductDetails from "../screens/ProductDetails"; // Assurez-vous d'avoir ce composant
import { useAuth } from "../context/AuthContext";
import ProductManagementScreen from '../screens/ProduitManagementScreen'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Créez un composant de pile pour chaque onglet qui nécessite une navigation interne
const HomeStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="HomeMain" component={Home} options={{ headerShown: false }} />
    <Stack.Screen name="ProductDetails" component={ProductDetails} />
  </Stack.Navigator>
);

const ProductManagementStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="ProductManagementScreen" component={ProductManagementScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const ProductsStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen 
      name="Products" 
      component={Products}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="ProductDetails" component={ProductDetails} />
  </Stack.Navigator>
);

const BuyPageStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="BuyPageMain" component={BuyPage} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const AboutStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="AboutMain" component={About} options={{ headerShown: false }} />
    <Stack.Screen name="AboutUs" component={AboutUsScreen} />
    <Stack.Screen name="ContactUs" component={ContactUsScreen} />
    <Stack.Screen name="MentionsLegales" component={MentionsLegales} options={{ title: "Mentions Légales" }} />
    <Stack.Screen name="Cookies" component={CookiesPage} />
  </Stack.Navigator>
);

const screenOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: Colors.fakeWhite,
    
  },
  headerTitleStyle: {
    color: Colors.black,
    fontSize: 20,
  },
  headerTitleAlign: "center",
 
  headerLeft: ({ canGoBack }) => {
    const navigation = useNavigation();
    return canGoBack ? (
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20, backgroundColor:Colors.fakeWhite }}>
        <Ionicons name="arrow-back" size={24} color={Colors.black} />
      </TouchableOpacity>
    ) : null;
  },
});
function MyTabs() {
  const { cartItemsCount } = useCart();
const {user} = useAuth();
console.log('User Role:', user);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "darkgreen",
        tabBarInactiveTintColor: Colors.white,
        tabBarStyle: { backgroundColor: Colors.greenAgri },
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={HomeStack}
        options={{
          tabBarLabel: "Accueil",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={20} color={color} />
          ),
        }}
      />
      {user?.role === 'vendeur' && (
          <Tab.Screen 
          name="ProduitManagement" 
          component={ProductManagementStack}
          options={{
            tabBarLabel: "Gestion produitss",
            tabBarIcon: ({ color }) => (
              <Ionicons name="nutrition" size={20} color={color} />
            ),
           }}
          />
        )}
      <Tab.Screen
        name="Produits"
        component={ProductsStack}
        options={{
          tabBarLabel: "Produits",
          tabBarIcon: ({ color }) => (
            <Ionicons name="nutrition" size={20} color={color} />
          ),
         }}
        />
      <Tab.Screen
        name="BuyPage"
        component={BuyPageStack}
        options={{
          tabBarLabel: "Panier",
          tabBarIcon: ({ color }) => (
            <Ionicons name="card" size={20} color={color} />
          ),
          tabBarBadge: cartItemsCount > 0 ? cartItemsCount.toString() : null,
        }}
      />
      <Tab.Screen
        name="A Propos"
        component={AboutStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;