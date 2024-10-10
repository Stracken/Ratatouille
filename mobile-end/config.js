export const API_URL = 'http://192.168.1.3:3001'; // Pour l'émulateur Android
// ou
// export const API_URL = 'http://localhost:3001'; // Pour iOS
// 192.168.1.3
// http://192.168.1.3:3001
// 'http://192.168.1.124:3001'
// http://192.168.1.194:3001

// http://192.168.1.133
// http://192.168.1.86:3001




// Pour la production, vous devrez utiliser l'URL réelle de votre serveur backend déployé.
// Il est recommandé de stocker cette URL dans un fichier de configuration ou une variable d'environnement pour faciliter les changements entre les environnements de développement, de test et de production.
// Assurez-vous que votre serveur backend autorise les requêtes CORS si votre application frontend est hébergée sur un domaine différent.
// Pour une application React Native, vous pourriez avoir besoin d'utiliser des configurations différentes pour iOS et Android. Vous pouvez utiliser la fonction Platform de React Native pour cela.
// Voici un exemple de configuration qui pourrait fonctionner pour le développement :
// javascript
// import { Platform } from 'react-native';

// const DEV_ANDROID_URL = 'http://10.0.2.2:3000'; // Pour l'émulateur Android
// const DEV_IOS_URL = 'http://localhost:3000'; // Pour le simulateur iOS
// const PROD_URL = 'https://api.votredomaine.com'; // URL de production

// const API_URL = __DEV__ 
//   ? Platform.OS === 'android' 
//     ? DEV_ANDROID_URL 
//     : DEV_IOS_URL
//   : PROD_URL;
