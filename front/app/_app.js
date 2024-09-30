import { AuthProvider } from '@/outils/AuthContext';

function MyApp({ Component, pageProps }) {
  console.log('_app.js rendered');
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;