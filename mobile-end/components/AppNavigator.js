import { createStackNavigator } from "@react-navigation/stack";
import Profil from "./Profil";
import Home from "./Home";
import Products from "./Products";
import Category from "./Category";
import BuyPage from "./BuyPage";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator
    // screenOptions={{ headerShown: false}}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profil" component={Profil} />
      <Drawer.Screen name="Produits" component={Products} />
      <Drawer.Screen name="Categories" component={Category} />
      <Drawer.Screen name="BuyPage" component={BuyPage} />
      <Drawer.Screen name="NavigationTest" component={NavigationTest} />
    </Drawer.Navigator>
  );
};
export default AppNavigator;
