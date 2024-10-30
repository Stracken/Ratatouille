import WebView from "react-native-webview";
import { StyleSheet } from "react-native";

export default function WebviewComponent() {
  return (
    <WebView
      source={{ uri: "https://umap.openstreetmap.fr/fr/map/projet_1075295" }}
      style={styles.webViewContainer}
    />
  );
}
const styles = StyleSheet.create({
  webViewContainer: {
    height: 200,
  },
});
