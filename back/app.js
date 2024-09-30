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
        const { email, password, nom, prenom, adresse, ville, code_postal, telephone } = req.body;
        console.log('Received signup request:', email, nom, prenom);

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);

        connection.query(
            'INSERT INTO user (email, mot_de_passe, role, nom, prenom, adresse, ville, code_postal, telephone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [email, hashedPassword, 'client', nom, prenom, adresse, ville, code_postal, telephone],
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
    const { nom, categorie, images, prix, quantite, description } = req.body;
    const userId = req.user.userId;

    connection.query(
        'INSERT INTO produit (nom, categorie, images, prix, quantite, description, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nom, categorie, images, prix, quantite, description, userId],
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

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
