const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001; // Changé à 3001 pour éviter les conflits avec Next.js

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ratatouille'
});

// Connexion à la base de données
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

// Middleware
app.use(cors()); // Permet les requêtes cross-origin
app.use(express.json());

// Routes
app.get('/api/utilisateurs', (req, res) => {
    connection.query('SELECT * FROM utilisateurs', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

app.post('/api/utilisateurs', (req, res) => {
    const { nom, email } = req.body;
    connection.query('INSERT INTO utilisateurs (nom, email) VALUES (?, ?)', [nom, email], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: result.insertId, nom, email });
    });
});

app.post('/signup', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log('Received signup request:', username, email, password);
  
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed password:', hashedPassword);
  
      connection.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error('Error during signup:', err);
            res.status(500).json({ error: err.message });
            return;
          }
          console.log('Insert result:', result);
          res.status(201).json({ message: 'Utilisateur créé avec succès' });
        }
      );
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: error.message });
    }
  });

    // Route de connexion
    app.post('/login', (req, res) => {
        const { email, password } = req.body;
      
        connection.query(
          'SELECT * FROM users WHERE email = ?',
          [email],
          (err, rows) => {
            if (err) {
              console.error('Error during login:', err);
              res.status(500).json({ error: err.message });
              return;
            }
            if (rows.length === 0) {
              return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
            }
      
            const user = rows[0];
            bcrypt.compare(password, user.password, (err, validPassword) => {
              if (err) {
                console.error('Error during login:', err);
                res.status(500).json({ error: err.message });
                return;
              }
              if (!validPassword) {
                return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
              }
      
              const token = jwt.sign({ userId: user.id }, 'votre_secret_jwt', { expiresIn: '1h' });
              res.json({ token });
            });
          }
        );
      });

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});