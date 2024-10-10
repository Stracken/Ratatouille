import { useState } from 'react';
import { signup } from '@/outils/api';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: '',
    adresse: '',
    ville: '',
    code_postal: '',
    telephone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      alert('Inscription réussie !');
      // Réinitialiser le formulaire après une inscription réussie
      setFormData({
        email: '',
        password: '',
        nom: '',
        prenom: '',
        adresse: '',
        ville: '',
        code_postal: '',
        telephone: ''
      });
    } catch (error) {
      alert('Erreur lors de l\'inscription : ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="nom">Nom:</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="prenom">Prénom:</label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="adresse">Adresse:</label>
        <input
          type="text"
          id="adresse"
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="ville">Ville:</label>
        <input
          type="text"
          id="ville"
          name="ville"
          value={formData.ville}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="code_postal">Code Postal:</label>
        <input
          type="text"
          id="code_postal"
          name="code_postal"
          value={formData.code_postal}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="telephone">Téléphone:</label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
        />
      </div>
      <button type="submit">S'inscrire</button>
    </form>
  );
}