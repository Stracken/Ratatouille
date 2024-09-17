import { createStackNavigator } from "@react-navigation/stack";
import Profil from "./Profil";
import Home from "./Home";
import Products from "./Products";
import Category from "./Category";

const Stack = createStackNavigator();

const Root = () => {
  return (
    <Stack.Navigator
    // screenOptions={{ headerShown: false}}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profil" component={Profil} />
      <Stack.Screen name="Categories" component={Category} />
      <Stack.Screen name="Produits" component={Products} />
      <Stack.Screen name="NavigationTest" component={NavigationTest} />
    </Stack.Navigator>
  );
};
export default Root;
