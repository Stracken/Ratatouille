import WebView from "react-native-webview";
import { View, Text, StyleSheet } from "react-native";
import { DefaultTheme } from "@react-navigation/native";
import Colors from "../constants/Colors";

export default function WebviewComponent(){
    return (
        <WebView
        source={{ uri: 'https://umap.openstreetmap.fr/fr/map/projet_1075295' }}
        style={styles.webViewContainer}

        />
        );

}
const styles = StyleSheet.create({
    webViewContainer: {
      height:200
      
    },
    
  });
  