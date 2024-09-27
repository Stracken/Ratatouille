const jwt = require('jsonwebtoken');

// Assurez-vous que JWT_SECRET est accessible ici, soit par import, soit par variable d'environnement
const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_jwt';

// Middleware pour authentifier le token du profiluser
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401); // Non autorisé
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Interdit
      req.user = user;
      next();
    });
  }
  module.exports = authenticateToken;