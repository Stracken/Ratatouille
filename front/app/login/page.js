// "use client"
// import { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const router = useRouter();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post('http://localhost:3001/login', { email, password });
//             localStorage.setItem('token', data.token);
//             router.push('/');
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
//             <button type="submit">Se connecter</button>
//             <Link href="/signup"><button>Créer un compte</button></Link>
//             </form>
//     );
// }

"use client"
import SignupForm from '@/componets/SignupForm/SignupForm';
import LoginForm from '@/componets/LoginForm/LoginForm'; // Assurez-vous que le chemin est correct
import AddProductForm from '@/componets/Addproduct/AddproductForm';
import AuthStatus from '@/componets/AuthStatus/AuthStatus';

export default function Home() {
  console.log('Home component rendering');
  return (
    <div>
      <h1>Ma boutique en ligne</h1>
      <AuthStatus />
      <h2>Inscription</h2>
      <SignupForm />
      <h2>Connexion</h2>    
      <LoginForm />
      <h2>Ajouter un produit</h2>
      <AddProductForm />
    </div>
  );
}