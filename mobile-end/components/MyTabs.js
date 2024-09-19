import { StyleSheet, View, Button, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Category from "./Category";
import Login from "./Login";
import Products from "./Products";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import BuyPage from "./BuyPage";
import About from "./About";
import MentionsLegales from "../screens/MentionsLegales";
import { useCart } from "./CartContext";

const Tab = createBottomTabNavigator();
const Stack2 = createNativeStackNavigator();

function MyTabs() {
  const { cartItemsCount } = useCart();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "darkgreen",
        tabBarInactiveTintColor: Colors.danger,
        // tabBarButton: (props) => <TouchableOpacity {...props} />
        tabBarStyle: { backgroundColor: Colors.greenAgri},
        // tabBarBackground:()=>{Colors.greenAgri}
        tabBarHideOnKeyboard:true,
        headerStyle: {
          backgroundColor: Colors.greenAgri,
        },
        headerTitleStyle: {
          color: Colors.danger,
          fontSize: 32,
        },
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen
        name="Bienvenue sur TerroTerro"
        component={Home}
        options={{

          tabBarLabel: "Accueil",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Category}
        options={{
          tabBarLabel: "Categories",
          tabBarIcon: ({ color }) => (
            <Ionicons name="albums" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Produits"
        component={Products}
        options={{
          tabBarLabel: "Produits",
          tabBarIcon: ({ color }) => (
            <Ionicons name="nutrition" size={20} color={color} />
          ),
          headerShown: false,
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="BuyPage"
        component={BuyPage}
        options={{
          tabBarLabel: "Panier",
          tabBarIcon: ({ color }) => (
            <Ionicons name="card" size={20} color={color} />
          ),
          tabBarBadge: cartItemsCount > 0 ? cartItemsCount.toString() : null,
          headerShown: false,
        }}
      >
        {/* {() => (
          <ProductsStack.Navigator>
            <ProductsStack.Screen
              name="Produits"
              component={Products}
              options={{
                headerShown: false,
              }}
            ></ProductsStack.Screen>
            <ProductsStack.Screen
              name="Categories"
              component={Category} //component={Category} pour atterir sur page de category de la bottomBar
            ></ProductsStack.Screen>
          </ProductsStack.Navigator>
        )} */}
      </Tab.Screen>
      
      <Tab.Screen
        name="A Propos"
        component={About}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
    
  );
}
const StackScreen = ({navigation}) => {
  return (
    <Stack2.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.greenAgri,
        },
        headerTitleStyle: {
          color: Colors.danger,
          fontSize: 32,
        },
        headerTitleAlign: 'center',
      }}
    >
      <Stack2.Screen
        name="Produits"
        component={Products}
        options={{
          headerShown: false,
        }}
      />
     
      <Stack2.Screen
        name="Categories"
        component={Category}
      />
      <Stack2.Screen
        name="MentionsLégales"
        component={MentionsLegales}
      />
      <Stack2.Screen
        name="ExternalPage2"
        component={ExternalPage2}
      />
    </Stack2.Navigator>
  );
};

export default MyTabs;
const styles = StyleSheet.create({});
