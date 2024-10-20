"use client"
import SignupForm from '@/componets/SignupForm/SignupForm';
import Head from '@/componets/Head/head';
import Foot from '@/componets/Footer/foot';

export default function Signup(){
    return (
        <>
        <Head/>
        <div className='formulaire'>
            <h2>Signup</h2>
            <SignupForm/>
            <Foot/>
        </div>
        </>
    )
}