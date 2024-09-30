"use client"
import SignupForm from '@/componets/SignupForm/SignupForm';
import LoginForm from '@/componets/SignupForm/SignupForm';
import AddProductForm from '@/componets/Addproduct/AddproductForm';
import AuthStatus from '@/componets/AuthStatus/AuthStatus';

export default function Home() {
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