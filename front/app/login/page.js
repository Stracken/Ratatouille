"use client"
import LoginForm from '@/componets/LoginForm/LoginForm';
import AddProductForm from '@/componets/Addproduct/AddproductForm';
import Link from 'next/link'
import Head from '@/componets/Head/head';
import Foot from '@/componets/Footer/foot';

export default function Login() {
  console.log('Home component rendering');
  return (
    <>
    <Head/>
      <div className='formulaire'>
        <h2>Connexion</h2>
        <LoginForm />
        <button type="button" className='button'> 
          <Link href="/signup">Créer un compte</Link>
        </button>
        <h2>Ajouter un produit</h2>
        <AddProductForm />
        <Foot/>
      </div>
      
    </>
  );
}