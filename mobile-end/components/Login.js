// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import React, { useState } from "react";
// import Colors from "../constants/Colors";
// import { login } from "../api/api";

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const validateForm = () => {
//     if (!email || !password) {
//       Alert.alert("Erreur", "Veuillez remplir tous les champs");
//       return false;
//     }
//     if (!/\S+@\S+\.\S+/.test(email)) {
//       Alert.alert("Erreur", "Veuillez entrer une adresse email valide");
//       return false;
//     }
//     return true;
//   };

//   const handleLogin = async () => {
//     if (!validateForm()) return;

//     setIsLoading(true);
//     try {
//       const response = await login(email, password);
//       // Supposons que la réponse contient un token et les informations de l'utilisateur
//       // Vous devrez adapter ceci en fonction de la réponse réelle de votre API
//       const { token, user } = response;

//       // Ici, vous pouvez stocker le token et les informations de l'utilisateur
//       // par exemple avec AsyncStorage ou un état global

//       navigation.navigate("NavigationTest", { userName: user.name });
//     } catch (error) {
//       Alert.alert(
//         "Erreur de connexion",
//         error.message || "Identifiants invalides"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcomeText}>Login</Text>
//       <View style={styles.inputView}>
//         <TextInput
//           style={styles.inputText}
//           placeholder="E-mail"
//           placehoderTextColor="black"
//           onChangeText={setEmail}
//           value={email}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//       </View>
//       <View style={styles.inputView}>
//         <TextInput
//           // required
//           style={styles.inputText}
//           placeholder="Password"
//           placeholderTextColor="#fff"
//           onChangeText={setPassword}
//           value={password}
//           secureTextEntry
//         />
//       </View>
//       <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
//         <Text style={styles.forgot}>Forgot Password?</Text>
//       </TouchableOpacity>
//       {isLoading ? (
//         <ActivityIndicator
//           size="large"
//           color={Colors.greenAgri}
//           style={styles.loader}
//         />
//       ) : (
//         <TouchableOpacity
//           style={styles.loginButton}
//           title="Login"
//           onPress={handleLogin}
//         >
//           <Text style={styles.loginText}>LOGIN</Text>
//         </TouchableOpacity>
//       )}
//       <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
//         <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   welcomeText: {
//     color: Colors.greenAgri,
//     fontWeight: "bold",
//     fontSize: 50,
//     textAlign: "center",
//     margin: 40,
//   },
//   inputView: {
//     width: "80%",
//     backgroundColor: "#465880",
//     borderRadius: 25,
//     height: 50,
//     marginBottom: 20,
//     justifyContent: "center",
//     padding: 20,
//   },
//   inputText: {
//     height: 50,
//     color: "white",
//   },
//   loginButton: {
//     width: "80%",
//     backgroundColor: "#fb5b5a",
//     borderRadius: 25,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 40,
//     marginBottom: 10,
//   },
//   forgot: {
//     color: "grey",
//   },
//   loginText: {
//     color: "#ffff",
//     fontWeight: "bold",
//   },
// });
