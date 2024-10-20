const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;

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
app.use(cors());
app.use(express.json());

// Middleware pour vérifier le token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'votre_secret_jwt', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/signup', async (req, res) => {
    try {
        const { email, password, nom, prenom, adresse, ville, code_postal, telephone, photo_profil, photo_banniere } = req.body;

        // Ajoutez la variable role par défaut si elle n'est pas présente dans req.body
        const role = req.body.role || 'client'; // Vous pouvez changer 'utilisateur' par la valeur par défaut que vous souhaitez

        console.log('Received signup request:', email, role, nom, prenom);

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);

        connection.query(
            'INSERT INTO user (email, mot_de_passe, role, nom, prenom, adresse, ville, code_postal, telephone, photo_profil, photo_banniere) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [email, hashedPassword, role, nom, prenom, adresse, ville, code_postal, telephone, photo_profil, photo_banniere],
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

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    connection.query(
        'SELECT * FROM user WHERE email = ?',
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
            bcrypt.compare(password, user.mot_de_passe, (err, validPassword) => {
                if (err) {
                    console.error('Error during login:', err);
                    res.status(500).json({ error: err.message });
                    return;
                }
                if (!validPassword) {
                    return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
                }

                const token = jwt.sign({ userId: user.id, role: user.role }, 'votre_secret_jwt', { expiresIn: '1h' });
                res.json({ token, role: user.role });
            });
        }
    );
});

// Nouvelle route pour ajouter un produit
app.post('/produit', authenticateToken, (req, res) => {
    const { nom, categorie, images, prix, quantite, description, sous_categorie } = req.body;
    const userId = req.user.userId;

    connection.query(
        'INSERT INTO produit (nom, categorie, images, prix, quantite, description, user_id, sous_categorie) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nom, categorie, images, prix, quantite, description, userId, sous_categorie],
        (err, result) => {
            if (err) {
                console.error('Error adding product:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ message: 'Produit ajouté avec succès', productId: result.insertId });
        }
    );
});

// Nouvelle route pour consulter tous les produits
app.get('/produits/all', (req, res) => {
    connection.query(
        'SELECT * FROM produit',
        (err, rows) => {
            if (err) {
                console.error('Error fetching products:', err);
                res.status(500).json({ error: err.message });
                return;
            }
        res.json(rows);
        }
    );
});


// Nouvelle route pour consulter les produits par userId
app.get('/produits/user/:userId', (req, res) => {
    const userId = req.params.userId;

    connection.query(
        'SELECT * FROM produit WHERE user_id = ?',
        [userId],
        (err, rows) => {
            if (err) {
                console.error('Error fetching products by userId:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(rows);
        }
    );
});

app.get('/produit/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
      'SELECT * FROM produit WHERE id = ?',
      [id],
      (err, rows) => {
        if (err) {
          console.error('Error fetching product:', err);
          res.status(500).json({ error: err.message });
          return;
        }
        if (rows.length === 0) {
          res.status(404).json({ error: 'Produit non trouvé' });
          return;
        }
        const product = rows[0];
        res.json(product);
      }
    );
  });

// Nouvelle route pour consulter un utilisateur par son ID
app.get('/user/:id', (req, res) => {
    const id = req.params.id;

    connection.query(
        'SELECT id, email, nom, prenom, adresse, ville, code_postal, telephone, photo_profil, photo_banniere, role FROM user WHERE id = ?',
        [id],
        (err, rows) => {
            if (err) {
                console.error('Error fetching user:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }
            const user = rows[0];
            res.json(user);
        }
    );
});

// Route pour récupérer toutes les catégories
app.get('/categories', (req, res) => {
    connection.query(
        'SELECT * FROM categories', // Assurez-vous que cette table existe dans votre base de données
        (err, rows) => {
            if (err) {
                console.error('Error fetching categories:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(rows);
        }
    );
});

// Nouvelle route pour consulter les produits par catégorie
app.get('/produits', (req, res) => {
    const { categorie } = req.query;
    let query = 'SELECT * FROM produit';
    const params = [];

    if (categorie) {
        query += ' WHERE categorie = ?';
        params.push(categorie);
    }

    connection.query(query, params, (err, rows) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
