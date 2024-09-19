"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchUtilisateurs();
    }, []);

    const fetchUtilisateurs = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/utilisateurs');
            setUtilisateurs(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
        }
    };

    const ajouterUtilisateur = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/utilisateurs', { nom, email });
            setNom('');
            setEmail('');
            fetchUtilisateurs(); // Rafraîchir la liste après l'ajout
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        }
    };

    return (
        <div>
            <h1>Liste des utilisateurs</h1>
            <ul>
                {utilisateurs.map(user => (
                    <li key={user.id}>{user.nom} - {user.email}</li>
                ))}
            </ul>
            <h2>Ajouter un utilisateur</h2>
            <form onSubmit={ajouterUtilisateur}>
                <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Nom"
                    required
                    />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
}