import { AuthProvider } from '@/outils/AuthContext';
import '@/styles/global.css'

function MyApp({ Component, pageProps }) {
  console.log('MyApp rendering');
  return (

    <AuthProvider>
      
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;