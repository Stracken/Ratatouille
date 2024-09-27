const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/auth');
const app = express();
const port = 3001; // Changé à 3001 pour éviter les conflits avec Next.js

// Configuration de la connexion à la base de données
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ratatouille',
    connectTimeout: 60000, // Augmente le délai d'attente à 60 secondes
    connectionLimit: 10
});
// Configuration CORS pour accepter toutes les origines
const corsOptions =  {
    origin: '*',
    methods: ['GET','PUT','POST','DELETE'],
    credentials: true
  };


// Connexion à la base de données
// Utilisez pool.query au lieu de connection.query
pool.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    // Tentative de reconnexion ou autre logique de gestion d'erreur
    return;
}
console.log('Connecté à la base de données MySQL');
});

// Middleware
app.use(cors(corsOptions)); // Permet les requêtes cross-origin
app.use(express.json());



// Routes
app.get('/test', (req,res)=>{
  console.log('testendpointreached');
  res.status(200).json({message: 'Test endpoint reached'});
});

app.get('/api/utilisateurs', (req, res) => {
    pool.query('SELECT * FROM utilisateurs', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

app.post('/api/utilisateurs', (req, res) => {
    const { nom, email } = req.body;
    pool.query('INSERT INTO utilisateurs (nom, email) VALUES (?, ?)', [nom, email], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: result.insertId, nom, email });
    });
});


////////////                           INSCRIPTION /////

app.post('/signup', async (req, res) => {
  try {
      const { firstName, lastName, email, password, telephone, address, ville, postalCode } = req.body;
      
      // Log des données reçues (attention à ne pas logger les mots de passe en production)
      console.log('Received signup request:', { firstName, lastName, email, telephone, address, ville, postalCode });

      // Vérification que tous les champs nécessaires sont présents
      if (!firstName || !lastName || !email || !password || !telephone || !address || !ville || !postalCode) {
          return res.status(400).json({ error: 'Tous les champs sont requis' });
      }

      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertion dans la base de données
      pool.query(
          'INSERT INTO user (prenom, nom, email, mot_de_passe, telephone, adresse, ville, code_postal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [firstName, lastName, email, hashedPassword, telephone, address, ville, postalCode],
          (err, result) => {
              if (err) {
                  console.error("Erreur durant l'inscription:", err);
                  // Gestion spécifique pour les erreurs de doublon (email déjà utilisé par exemple)
                  if (err.code === 'ER_DUP_ENTRY') {
                      return res.status(409).json({ error: 'Cet email est déjà utilisé' });
                      
                  }
                  return res.status(500).json({ error: "Erreur lors du transfert de l'inscription a la bdd" });
              }

              const userId = result.insertId;
              const token = jwt.sign({ userId }, 'votre_secret_jwt', { expiresIn: '127h' });
              
              res.status(201).json({
                  message: 'Utilisateur créé avec succès',
                  token,
                  user: { id: userId, email, firstName, lastName }
              });
          }
      );
  } catch (error) {
      console.error("Erreur durant l'inscription:", error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});



////////////                           CONNEXION/////

    app.post('/signin', (req, res) => {
        const { email, password } = req.body;
        console.log('Tentative de connexion - Email reçu:', email);
        console.log('Tentative de connexion - Mot de passe reçu:', password ? '[PRÉSENT]' : '[MANQUANT]');
        if (!email || !password) {
          console.log('Erreur: Email ou mot de passe manquant');
          return res.status(400).json({ error: 'Email et mot de passe requis' });
        }

        pool.query(
          'SELECT * FROM user WHERE email = ?',
          [email],
          (err, rows) => {
            if (err) {
              console.error('Erreur durant la requete SQL:', err);
              return res.status(500).json({ error: 'Erreur interne du serveur' });
              
            }
            console.log('Nombre d\'utilisateurs trouvés:', rows.length);
            if (rows.length === 0) {
              console.log('Aucun utilisateur trouvé pour cet email');
              return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
            }
      
            const user = rows[0];

            console.log('Utilisateur trouvé:', { id: user.id, email: user.email });
            console.log('Mot de passe haché stocké:', user.mot_de_passe ? '[PRÉSENT]' : '[MANQUANT]');


            if (!user.mot_de_passe) {
              console.error('Mot de passe haché manquant pour l\'utilisateur:', email);
              return res.status(500).json({ error: 'Erreur interne du serveur' });
            }

            bcrypt.compare(password, user.mot_de_passe, (err, validPassword) => {
              if (err) {
                console.error('Erreur durant la comparaison du mot de passe:', err);
                return res.status(500).json({ error: 'Erreur interne du serveur' });
              }
              console.log('Résultat de la comparaison du mot de passe:', validPassword);

              if (!validPassword) {
                console.log('Mot de passe incorrect pour l\'utilisateur:', email);
                return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
              }
      
              const token = jwt.sign({ userId: user.id }, 'votre_secret_jwt', { expiresIn: '24h' });
              console.log('Connexion réussie pour l\'utilisateur:', email);
              res.json({ token,
                user:{
                  id:user.id,
                  firstName: user.prenom,
                  lastName: user.nom,
                  email: user.email,
                  address: user.adresse,
                  telephone: user.telephone,
                  postalCode: user.code_postal,
                  ville: user.ville
                }
               });
            });
          }
        );
      });



// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});