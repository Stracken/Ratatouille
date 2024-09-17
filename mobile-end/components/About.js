import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React from "react";
import MentionsLegales from "../screens/MentionsLegales";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import AboutUsScreen from "../screens/AboutUsScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import Colors from "../constants/Colors";
import { Dimensions } from "react-native";

const Stack2 = createStackNavigator();
const { height } = Dimensions.get("window");
// Définissez le composant AboutScreen séparément
const AboutScreen = ({ navigation }) => (
  <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.aboutPage}>
      <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
        <Text style={styles.aboutPageText}>A Propos de nous</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ContactUs")}>
        <Text style={styles.aboutPageText}>Contactez-nous</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MentionsLegales")}>
        <Text style={styles.aboutPageText}>Mentions Légales</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const About = () => {
  return (
    <Stack2.Navigator
      screenOptions={{
        headerTitle: ({ children }) => (
          <Text style={styles.headerTitle}>{children}</Text>
        ),
        headerTitleAlign: "center",
        headerTitleContainerStyle: {
          flex: 1, // Permet d'utiliser l'espace disponible
          justifyContent: "center", // Centre verticalement
          flexDirection: "row",
          marginHorizontal: -60, // Permet d'augmenter l'espace disponible,
        },
        headerTitleContainerStyle: {
          justifyContent: "center",
          height: 30,
        },
        headerLeftContainerStyle: {
          alignItems: "center",
          height: 30,
        },
        headerStyle: {
          backgroundColor: Colors.danger,
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack2.Screen
        name="About"
        component={AboutScreen}
        options={{ title: "A Propos" }}
      />
      <Stack2.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{ title: "A Propos de nous" }}
      />
      <Stack2.Screen
        name="ContactUs"
        component={ContactUsScreen}
        options={{ title: "Contactez-Nous" }}
      />
      <Stack2.Screen
        name="MentionsLegales"
        component={MentionsLegales}
        options={{ title: "Mentions L\u00E9gales" }}
      />
    </Stack2.Navigator>
  );
};

export default About;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  aboutPage: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
    paddingVertical: height * 0.1,
  },
  aboutPageText: {
    fontSize: 20,
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
