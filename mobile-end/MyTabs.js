import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "./constants/Colors";
import { useCart } from "./components/CartContext";
import { useNavigation } from "@react-navigation/native";

import Home from "./components/Home";
import Products from "./components/Products";
import BuyPage from "./components/BuyPage";
import About from "./components/About";
import AboutUsScreen from "./screens/aboutScreens/AboutUsScreen";
import ContactUsScreen from "./screens/aboutScreens/ContactUsScreen";
import MentionsLegales from "./screens/aboutScreens/MentionsLegales";
import CookiesPage from "./screens/aboutScreens/CookiesPage";
import ProductDetails from "./screens/ProductDetails";
import { useAuth } from "./context/AuthContext";
import ProductManagementScreen from "./screens/ProduitManagementScreen";
import SearchResults from "./components/SearchResults";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Création de composant de pile pour chaque onglet nécéssitant une navigation interne
const HomeStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name="HomeMain"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="ProductDetails" component={ProductDetails} />
  </Stack.Navigator>
);

const ProductManagementStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name="ProductManagementScreen"
      component={ProductManagementScreen}
      options={{ headerShown: false }}
    />
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
    <Stack.Screen
      name="BuyPageMain"
      component={BuyPage}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ResultsStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
<Stack.Screen 
      name="SearchResults" 
      component={SearchResults}
      options={{ title: "R\u00E9sultats de recherche" }}
    />
</Stack.Navigator>)
const AboutStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name="AboutMain"
      component={About}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="AboutUs" component={AboutUsScreen} />
    <Stack.Screen name="ContactUs" component={ContactUsScreen} />
    <Stack.Screen
      name="MentionsLegales"
      component={MentionsLegales}
      options={{ title: "Mentions Légales" }}
    />
    <Stack.Screen name="Cookies" component={CookiesPage} />
  </Stack.Navigator>
);

const screenOptions = () => ({
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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginLeft: 20, backgroundColor: Colors.fakeWhite }}
      >
        <Ionicons name="arrow-back" size={24} color={Colors.black} />
      </TouchableOpacity>
    ) : null;
  },
});

// Création de chaque onglet avec une des screnOptions communs et ajout d'un onglet spécifique pour les utilisateurs avec role "user"
function MyTabs() {
  const { cartItemsCount } = useCart();
  const { user } = useAuth();
  console.log("User Role:", user);
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
      {user?.role === "vendeur" && (
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
        name="Search"
        component={ResultsStack}
        options={{
          tabBarLabel: "Recherche",
          tabBarIcon: ({ color }) => (
            <Ionicons name="nutrition" size={20} color={color} />
          ),
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
