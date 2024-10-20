
// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const app = express();
// const port = 3001; 
// const multer = require('multer');
// const upload = multer();
// const stripe = require('stripe')('sk_test_51PfNmyRpKgZkfjqiKOClHuOcFVUgJPdk5OqpYGCNHVPUBugcz2RpBOiTLYpNweAOtrJMS2Q6DXR5o3dl1d2tXQ6e00A9T86gec');


// // Configuration de la connexion à la base de données
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'ratatouille',
//     connectTimeout: 60000, // Augmente le délai d'attente à 60 secondes
//     connectionLimit: 10,
//     queueLimit: 0
// });

// // const db = mysql.createPool({
// //   host: 'localhost',
// //   user: 'root',
// //   password: '',
// //   database: 'ratatouille',
// // });
// // Configuration CORS pour accepter toutes les origines
// const corsOptions =  {
//     origin: '*',
//     methods: ['GET','PUT','POST','DELETE'],
//     credentials: true
//   };


// // Connexion à la base de données
// // Utilisez pool.query au lieu de connection.query
// // pool.connect((err) => {
// //   if (err) {
// //     console.error('Erreur de connexion à la base de données :', err);
// //     // Tentative de reconnexion ou autre logique de gestion d'erreur
// //     return;
// // }
// // console.log('Connecté à la base de données MySQL');
// // });

// // Middleware
// app.use(cors(corsOptions)); // Permet les requêtes cross-origin
// app.use(express.json());

// // Vérification de la connexion au démarrage (facultatif)
// (async () => {
//   try {
//       const connection = await pool.getConnection();
//       console.log('Connecté à la base de données MySQL');
//       connection.release(); // Libération de la connexion après vérification
//   } catch (err) {
//       console.error('Erreur de connexion à la base de données :', err);
//       process.exit(1); // Arrête le serveur si la connexion échoue
//   }
// })();

// // Vérification de la connexion au démarrage (facultatif)
// // (async () => {
// //   try {
// //       const connection = await pool.getConnection();
// //       console.log('Connecté à la base de données MySQL');
// //       connection.release(); // Libération de la connexion après vérification
// //   } catch (err) {
// //       console.error('Erreur de connexion à la base de données :', err);
// //       process.exit(1); // Arrête le serveur si la connexion échoue
// //   }
// // })();


// // Routes
// app.get('/products/:userId', async (req, res) => {
//   const userId = req.params.userId;
//   console.log('Received product request for user:', userId);

//   if (!userId) {
//     return res.status(400).json({ error: 'UserId est requis' });
//   }

//   let connection;
//   try {
//     connection = await pool.getConnection(); // Obtenir une connexion du pool

//     const [results] = await connection.query(
//       'SELECT * FROM produit WHERE user_id = ?',
//       [userId]
//     );

//     res.status(200).json({
//       message: results.length > 0 ? 'Produits récupérés avec succès' : 'Aucun produit trouvé pour cet utilisateur',
//       products: results
//     });
//   } catch (error) {
//     console.error("Erreur lors de la récupération des produits:", error);
//     res.status(500).json({ error: 'Erreur interne du serveur' });
//   } finally {
//     if (connection) connection.release(); // Libérer la connexion après utilisation
//   }
// });

// // app.get('/products/:userId', async (req, res) => {
// //   try {
// //     const userId = req.params.userId;
// //     console.log('Received product request for user:', userId);

// //     if (!userId) {
// //       return res.status(400).json({ error: 'UserId est requis' });
// //     }

// //     pool.query(
// //       'SELECT * FROM produit WHERE user_id = ?',
// //       [userId],
// //       (err, results) => {
// //         if (err) {
// //           console.error("Erreur lors de la récupération des produits:", err);
// //           return res.status(500).json({ error: "Erreur lors de la récupération des produits" });
// //         }

// //         res.status(200).json({
// //           message: results.length > 0 ? 'Produits récupérés avec succès' : 'Aucun produit trouvé pour cet utilisateur',
// //           products: results
// //         });
// //       }
// //     );
// //   } catch (error) {
// //     console.error("Erreur lors de la récupération des produits:", error);
// //     res.status(500).json({ error: 'Erreur interne du serveur' });
// //   }
// // });

// ////////////                           INSCRIPTION /////

// // app.post('/signup', async (req, res) => {
// //   const { firstName, lastName, email, password, telephone, address, ville, postalCode, role, raisonSociale } = req.body;

// //   console.log('Received signup request:', { firstName, lastName, email, telephone, address, ville, postalCode, role, raisonSociale });

// //   // Validate required fields
// //   if (!firstName || !lastName || !email || !password || !telephone || !address || !ville || !postalCode || !role) {
// //       return res.status(400).json({ error: 'Tous les champs sont requis' });
// //   }
// //   if (role === 'vendeur' && (!raisonSociale)) {
// //       return res.status(400).json({ error: 'Raison sociale est requise pour les vendeurs' });
// //   }

// //   try {
// //       // Hash the password
// //       const hashedPassword = await bcrypt.hash(password, 10);

// //       // Get a connection from the pool
// //       pool.getConnection(async (err, connection) => {
// //           if (err) {
// //               console.error("Erreur lors de l'acquisition de la connexion:", err);
// //               return res.status(500).json({ error: 'Erreur interne du serveur' });
// //           }

// //           try {
// //               // Insert into the database
// //               const result = await new Promise((resolve, reject) => {
// //                   connection.query(
// //                       'INSERT INTO user (prenom, nom, email, mot_de_passe, telephone, adresse, ville, code_postal, role, raison_sociale) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
// //                       [firstName, lastName, email, hashedPassword, telephone, address, ville, postalCode, role, raisonSociale],
// //                       (error, results) => {
// //                           if (error) return reject(error);
// //                           resolve(results);
// //                       }
// //                   );
// //               });

// //               const userId = result.insertId;
// //               const token = jwt.sign({ userId }, 'votre_secret_jwt', { expiresIn: '24h' });

// //               res.status(201).json({
// //                   message: 'Utilisateur créé avec succès',
// //                   token,
// //                   user: { id: userId, email, firstName, lastName, role, raisonSociale }
// //               });
// //           } catch (queryError) {
// //               console.error("Erreur durant l'inscription:", queryError);
// //               if (queryError.code === 'ER_DUP_ENTRY') {
// //                   return res.status(409).json({ error: 'Cet email est déjà utilisé' });
// //               }
// //               return res.status(500).json({ error: "Erreur lors du transfert de l'inscription à la bdd" });
// //           } finally {
// //               // Release the connection back to the pool
// //               if (connection) connection.release();
// //           }
// //       });
// //   } catch (error) {
// //       console.error("Erreur durant le traitement:", error);
// //       res.status(500).json({ error: 'Erreur interne du serveur' });
// //   }
// // });

// // app.post('/signup', async (req, res) => {
// //   try {
// //       const { firstName, lastName, email, password, telephone, address, ville, postalCode, role, raisonSociale } = req.body;

// //       // Log received data (be cautious not to log passwords in production)
// //       console.log('Received signup request:', { firstName, lastName, email, telephone, address, ville, postalCode, role, raisonSociale });

// //       // Validate required fields
// //       if (!firstName || !lastName || !email || !password || !telephone || !address || !ville || !postalCode || !role) {
// //           return res.status(400).json({ error: 'Tous les champs sont requis' });
// //       }
// //       if (role === 'vendeur' && (!raisonSociale)) {
// //           return res.status(400).json({ error: 'Raison sociale est requise pour les vendeurs' });
// //       }

// //       // Hash the password
// //       const hashedPassword = await bcrypt.hash(password, 10);

// //       // Insert into the database using a promise-based approach
// //       pool.query(
// //           'INSERT INTO user (prenom, nom, email, mot_de_passe, telephone, adresse, ville, code_postal, role, raison_sociale) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
// //           [firstName, lastName, email, hashedPassword, telephone, address, ville, postalCode, role, raisonSociale],
// //           (err, result) => {
// //               if (err) {
// //                   console.error("Erreur durant l'inscription:", err);
// //                   // Handle specific error for duplicate entries (e.g., email already used)
// //                   if (err.code === 'ER_DUP_ENTRY') {
// //                       return res.status(409).json({ error: 'Cet email est déjà utilisé' });
// //                   }
// //                   return res.status(500).json({ error: "Erreur lors du transfert de l'inscription à la bdd" });
// //               }

// //               const userId = result.insertId;
// //               const token = jwt.sign({ userId }, 'votre_secret_jwt', { expiresIn: '24h' });

// //               res.status(201).json({
// //                   message: 'Utilisateur créé avec succès',
// //                   token,
// //                   user: { id: userId, email, firstName, lastName, role, raisonSociale }
// //               });
// //           }
// //       );
// //   } catch (error) {
// //       console.error("Erreur durant l'inscription:", error);
// //       res.status(500).json({ error: 'Erreur interne du serveur' });
// //   }
// // });
// app.post('/signup', async (req, res) => {
//   try {
//       const { firstName, lastName, email, password, telephone, address, ville, postalCode, role, raisonSociale } = req.body;
      
//       // Log des données reçues (attention à ne pas logger les mots de passe en production)
//       console.log('Received signup request:', { firstName, lastName, email, telephone, address, ville, postalCode, role, raisonSociale });

//       // Vérification que tous les champs nécessaires sont présents
//       if (!firstName || !lastName || !email || !password || !telephone || !address || !ville || !postalCode || !role) {
//           return res.status(400).json({ error: 'Tous les champs sont requis' });
//       }
//       if (role === 'vendeur' && (!raisonSociale)) {
//         return res.status(400).json({ error: 'Raison sociale et image sont requis pour les vendeurs' });
//       }

//       // Hachage du mot de passe
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Insertion dans la base de données
//       pool.query(
// ' INSERT INTO user (prenom, nom, email, mot_de_passe, telephone, adresse, ville, code_postal, role, raison_sociale) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',

// [firstName, lastName, email, hashedPassword, telephone, address, ville, postalCode, role, raisonSociale],

//           (err, result) => {
//               if (err) {
//                   console.error("Erreur durant l'inscription:", err);
//                   // Gestion spécifique pour les erreurs de doublon (email déjà utilisé par exemple)
//                   if (err.code === 'ER_DUP_ENTRY') {
//                       return res.status(409).json({ error: 'Cet email est déjà utilisé' });
                      
//                   }
//                   return res.status(500).json({ error: "Erreur lors du transfert de l'inscription a la bdd" });
//               }

//               const userId = result.insertId;
//               const token = jwt.sign({ userId }, 'votre_secret_jwt', { expiresIn: '24h' });
              
//               res.status(201).json({
//                   message: 'Utilisateur créé avec succès',
//                   token,
//                   user: { id: userId, email, firstName, lastName, role, raisonSociale }
//               });
//           }
//       );
//   } catch (error) {
//       console.error("Erreur durant l'inscription:", error);
//       res.status(500).json({ error: 'Erreur interne du serveur' });
//   }
// });



// ////////////                           CONNEXION/////

// // app.post('/signin', async (req, res) => {
// //   const { email, password } = req.body;
// //   console.log('Tentative de connexion - Email reçu:', email);
// //   console.log('Tentative de connexion - Mot de passe reçu:', password ? '[PRÉSENT]' : '[MANQUANT]');
  
// //   if (!email || !password) {
// //       console.log('Erreur: Email ou mot de passe manquant');
// //       return res.status(400).json({ error: 'Email et mot de passe requis' });
// //   }

// //   let connection;
// //   try {
// //       connection = await pool.getConnection(); // Obtenir une connexion du pool

// //       const [rows] = await connection.query(
// //           'SELECT * FROM user WHERE email = ?',
// //           [email]
// //       );

// //       console.log('Nombre d\'utilisateurs trouvés:', rows.length);
// //       if (rows.length === 0) {
// //           console.log('Aucun utilisateur trouvé pour cet email');
// //           return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
// //       }

// //       const user = rows[0];
// //       console.log('Utilisateur trouvé:', { id: user.id, email: user.email });
// //       console.log('Mot de passe haché stocké:', user.mot_de_passe ? '[PRÉSENT]' : '[MANQUANT]');

// //       if (!user.mot_de_passe) {
// //           console.error('Mot de passe haché manquant pour l\'utilisateur:', email);
// //           return res.status(500).json({ error: 'Erreur interne du serveur' });
// //       }

// //       // Comparaison du mot de passe
// //       const validPassword = await bcrypt.compare(password, user.mot_de_passe);
// //       console.log('Résultat de la comparaison du mot de passe:', validPassword);

// //       if (!validPassword) {
// //           console.log('Mot de passe incorrect pour l\'utilisateur:', email);
// //           return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
// //       }

// //       // Génération du token JWT
// //       const token = jwt.sign({ userId: user.id }, 'votre_secret_jwt', { expiresIn: '24h' });
// //       console.log('Connexion réussie pour l\'utilisateur:', email);

// //       res.json({
// //           token,
// //           user: {
// //               id: user.id,
// //               firstName: user.prenom,
// //               lastName: user.nom,
// //               email: user.email,
// //               address: user.adresse,
// //               telephone: user.telephone,
// //               postalCode: user.code_postal,
// //               ville: user.ville,
// //               role: user.role,
// //               raisonSociale: user.raisonSociale
// //           }
// //       });
// //   } catch (error) {
// //       console.error('Erreur lors de la tentative de connexion:', error);
// //       return res.status(500).json({ error: 'Erreur interne du serveur' });
// //   } finally {
// //       if (connection) connection.release(); // Libérer la connexion après utilisation
// //   }
// // });

//     app.post('/signin', (req, res) => {
//         const { email, password } = req.body;
//         console.log('Tentative de connexion - Email reçu:', email);
//         console.log('Tentative de connexion - Mot de passe reçu:', password ? '[PRÉSENT]' : '[MANQUANT]');
//         if (!email || !password) {
//           console.log('Erreur: Email ou mot de passe manquant');
//           return res.status(400).json({ error: 'Email et mot de passe requis' });
//         }

//         pool.query(
//           'SELECT * FROM user WHERE email = ?',
//           [email],
//           (err, rows) => {
//             if (err) {
//               console.error('Erreur durant la requete SQL:', err);
//               return res.status(500).json({ error: 'Erreur interne du serveur' });
              
//             }
//             console.log('Nombre d\'utilisateurs trouvés:', rows.length);
//             if (rows.length === 0) {
//               console.log('Aucun utilisateur trouvé pour cet email');
//               return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
//             }
      
//             const user = rows[0];

//             console.log('Utilisateur trouvé:', { id: user.id, email: user.email });
//             console.log('Mot de passe haché stocké:', user.mot_de_passe ? '[PRÉSENT]' : '[MANQUANT]');


//             if (!user.mot_de_passe) {
//               console.error('Mot de passe haché manquant pour l\'utilisateur:', email);
//               return res.status(500).json({ error: 'Erreur interne du serveur' });
//             }

//             bcrypt.compare(password, user.mot_de_passe, (err, validPassword) => {
//               if (err) {
//                 console.error('Erreur durant la comparaison du mot de passe:', err);
//                 return res.status(500).json({ error: 'Erreur interne du serveur' });
//               }
//               console.log('Résultat de la comparaison du mot de passe:', validPassword);

//               if (!validPassword) {
//                 console.log('Mot de passe incorrect pour l\'utilisateur:', email);
//                 return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
//               }
      
//               const token = jwt.sign({ userId: user.id }, 'votre_secret_jwt', { expiresIn: '24h' });
//               console.log('Connexion réussie pour l\'utilisateur:', email);
//               res.json({ token,
//                 user:{
//                   id:user.id,
//                   firstName: user.prenom,
//                   lastName: user.nom,
//                   email: user.email,
//                   address: user.adresse,
//                   telephone: user.telephone,
//                   postalCode: user.code_postal,
//                   ville: user.ville,
//                   role:user.role,
//                   raisonSociale:user.raisonSociale
//                 }
//                });
//             });
//           }
//         );
//       });

//    // Dans votre fichier principal d'application (par exemple, app.js ou server.js)
  
//   //  app.get('/:categorie', async (req, res) => {
//   //   const { categorie } = req.params; // Récupérer la catégorie depuis les paramètres de l'URL
  
//   //   try {
//   //     const connection = await pool.getConnection(); // Obtenir une connexion du pool
//   //     const [results] = await connection.query(
//   //       'SELECT id, nom, categorie, prix, quantite, description, user_id, images FROM produit WHERE categorie = ? ORDER BY date_creation DESC',
//   //       [categorie]
//   //     );
  
//   //     // Convertir les images en Base64
//   //     const productsWithImages = results.map(product => ({
//   //       ...product,
//   //       images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
//   //     }));
  
//   //     // Renvoyer tous les produits trouvés
//   //     res.status(200).json({
//   //       message: 'Produits récupérés avec succès',
//   //       products: productsWithImages
//   //     });
//   //   } catch (error) {
//   //     console.error("Erreur lors de la récupération des produits:", error);
//   //     res.status(500).json({ error: 'Erreur interne du serveur' });
//   //   } finally {
//   //     if (connection) connection.release(); // Libérer la connexion après utilisation
//   //   }
//   // });
//     app.get('/:categorie', async (req, res) => {
//     try {
//       // Récupération de tous les produits depuis la base de données
//       pool.query(
//         'SELECT id, nom, categorie, prix, quantite, description, user_id, images FROM produit ORDER BY date_creation DESC',
//         (err, results) => {
//           if (err) {
//             console.error("Erreur lors de la récupération des produits:", err);
//             return res.status(500).json({ error: "Erreur lors de la récupération des produits" });
//           }
//           // Convertir les images en Base64
//           const productsWithImages = results.map(product => ({
//             ...product,
//             images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
//           }));
//           // Renvoyer tous les produits trouvés
//           res.status(200).json({
//             message: 'Produits récupérés avec succès',
//             products:productsWithImages
//           });
//         }
//       );
//     } catch (error) {
//       console.error("Erreur lors de la récupération des produits:", error);
//       res.status(500).json({ error: 'Erreur interne du serveur' });
//     }
//   });

//   // app.get('/product', async (req, res) => {
//   //   try {
//   //     const connection = await pool.getConnection(); // Obtenir une connexion du pool
//   //     const [results] = await connection.query(
//   //       'SELECT id, nom, categorie, prix, quantite, description, user_id, images FROM produit ORDER BY date_creation DESC'
//   //     );
  
//   //     // Convertir les images en Base64
//   //     const productsWithImages = results.map(product => ({
//   //       ...product,
//   //       images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
//   //     }));
  
//   //     // Renvoyer tous les produits trouvés
//   //     res.status(200).json({
//   //       message: 'Produits récupérés avec succès',
//   //       products: productsWithImages
//   //     });
//   //   } catch (error) {
//   //     console.error("Erreur lors de la récupération des produits:", error);
//   //     res.status(500).json({ error: 'Erreur interne du serveur' });
//   //   } finally {
//   //     if (connection) connection.release(); // Libérer la connexion après utilisation
//   //   }
//   // });

// app.get('/product', async (req, res) => {
//   try {
//     // Récupération de tous les produits depuis la base de données
//     pool.query(
//       'SELECT id, nom, categorie, prix, quantite, description, user_id, images FROM produit ORDER BY date_creation DESC',
//       (err, results) => {
//         if (err) {
//           console.error("Erreur lors de la récupération des produits:", err);
//           return res.status(500).json({ error: "Erreur lors de la récupération des produits" });
//         }
//         // Convertir les images en Base64
//         const productsWithImages = results.map(product => ({
//           ...product,
//           images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
//         }));
//         // Renvoyer tous les produits trouvés
//         res.status(200).json({
//           message: 'Produits récupérés avec succès',
//           products:productsWithImages
//         });
//       }
//     );
//   } catch (error) {
//     console.error("Erreur lors de la récupération des produits:", error);
//     res.status(500).json({ error: 'Erreur interne du serveur' });
//   }
// });
// /////////////////////////////////////////// barre de recherche /////////////////////////////////////////////////////////////////////////////////////////////////////////

// // app.get('/search-products', async (req, res) => {
// //   try {
// //     const { q } = req.query;
// //     if (!q || q.length < 3) {
// //       return res.status(400).json({ error: "La requête de recherche doit contenir au moins 3 caractères" });
// //     }

// //     const connection = await pool.getConnection(); // Obtenir une connexion du pool
// //     const [results] = await connection.query(
// //       'SELECT id, nom, categorie, prix, quantite, description, user_id, images FROM produit WHERE nom LIKE ? ORDER BY date_creation DESC',
// //       [`%${q}%`]
// //     );

// //     // Convertir les images en Base64
// //     const productsWithImages = results.map(product => ({
// //       ...product,
// //       images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
// //     }));

// //     // Renvoyer les produits trouvés
// //     res.status(200).json({
// //       message: 'Produits trouvés avec succès',
// //       products: productsWithImages
// //     });
// //   } catch (error) {
// //     console.error("Erreur lors de la recherche des produits:", error);
// //     res.status(500).json({ error: 'Erreur interne du serveur' });
// //   } finally {
// //     if (connection) connection.release(); // Libérer la connexion après utilisation
// //   }
// // });

// app.get('/search-products', async (req, res) => {
//   try {
//     const { q } = req.query;
//     if (!q || q.length < 3) {
//       return res.status(400).json({ error: "La requête de recherche doit contenir au moins 3 caractères" });
//     }

//     pool.query(
//       'SELECT id, nom, categorie, prix, quantite, description, user_id, images FROM produit WHERE nom LIKE ? ORDER BY date_creation DESC',
//       [`%${q}%`],
//       (err, results) => {
//         if (err) {
//           console.error("Erreur lors de la recherche des produits:", err);
//           return res.status(500).json({ error: "Erreur lors de la recherche des produits" });
//         }
//         // Convertir les images en Base64
//         const productsWithImages = results.map(product => ({
//           ...product,
//           images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
//         }));
//         // Renvoyer les produits trouvés
//         res.status(200).json({
//           message: 'Produits trouvés avec succès',
//           products: productsWithImages
//         });
//       }
//     );
//   } catch (error) {
//     console.error("Erreur lors de la recherche des produits:", error);
//     res.status(500).json({ error: 'Erreur interne du serveur' });
//   }
// });

// // app.get('/produit/', async (req, res) => {
// //   try {
// //     const connection = await pool.getConnection(); // Obtenir une connexion du pool
// //     const [results] = await connection.query(
// //       'SELECT id, nom, categorie, prix, quantite, description, user_id, images FROM produit ORDER BY date_creation DESC'
// //     );

// //     // Convertir les images en Base64
// //     const productsWithImages = results.map(product => ({
// //       ...product,
// //       images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
// //     }));

// //     // Renvoyer tous les produits trouvés
// //     res.status(200).json({
// //       message: 'Produits récupérés avec succès',
// //       products: productsWithImages
// //     });
// //   } catch (error) {
// //     console.error("Erreur lors de la récupération des produits:", error);
// //     res.status(500).json({ error: 'Erreur interne du serveur' });
// //   } finally {
// //     if (connection) connection.release(); // Libérer la connexion après utilisation
// //   }
// // });

// app.get('/produit/', async (req, res) => {
//   try {
//     // Récupération de tous les produits depuis la base de données
//     pool.query(
//       'SELECT id, nom, categorie, prix, quantite, description, user_id, images FROM produit ORDER BY date_creation DESC',
//       (err, results) => {
//         if (err) {
//           console.error("Erreur lors de la récupération des produits:", err);
//           return res.status(500).json({ error: "Erreur lors de la récupération des produits" });
//         }
//         // Convertir les images en Base64
//         const productsWithImages = results.map(product => ({
//           ...product,
//           images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
//         }));
//         // Renvoyer tous les produits trouvés
//         res.status(200).json({
//           message: 'Produits récupérés avec succès',
//           products:productsWithImages
//         });
//       }
//     );
//   } catch (error) {
//     console.error("Erreur lors de la récupération des produits:", error);
//     res.status(500).json({ error: 'Erreur interne du serveur' });
//   }
// });

// ////////////                       CRUD PRODUIT  MANAGEMENT/////

// // app.get('/products/:userId', async (req, res) => {
// //   try {
// //     const userId = req.params.userId;

// //     if (!userId) {
// //       return res.status(400).json({ error: 'UserId est requis' });
// //     }

// //     const connection = await pool.getConnection(); // Obtenir une connexion du pool
// //     const [results] = await connection.query(
// //       'SELECT id, nom, categorie, prix, quantite, description, user_id, images FROM produit WHERE user_id = ? ORDER BY date_creation DESC',
// //       [userId]
// //     );

// //     if (results.length === 0) {
// //       return res.status(404).json({ message: 'Aucun produit trouvé pour cet utilisateur' });
// //     }

// //     const productsWithImages = results.map(product => ({
// //       ...product,
// //       images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
// //     }));

// //     res.status(200).json({
// //       message: 'Produits récupérés avec succès',
// //       products: productsWithImages
// //     });
// //   } catch (error) {
// //     console.error("Erreur lors de la récupération des produits:", error);
// //     res.status(500).json({ error: 'Erreur interne du serveur' });
// //   } finally {
// //     if (connection) connection.release(); // Libérer la connexion après utilisation
// //   }
// // });
// // app.get('/products/:userId', async (req, res) => {
// //   try {
// //     const userId = req.params.userId;
    
// //     console.log('Received product request for user:', userId);

// //     if (!userId) {
// //       return res.status(400).json({ error: 'UserId est requis' });
// //     }

// //     pool.query(
// //       'SELECT id, nom, categorie, prix, quantite, description, user_id, images FROM produit WHERE user_id = ? ORDER BY date_creation DESC',
// //       [userId],
// //       (err, results) => {
// //         if (err) {
// //           console.error("Erreur lors de la récupération des produits:", err);
// //           return res.status(500).json({ error: "Erreur lors de la récupération des produits" });
// //         }

// //         if (results.length === 0) {
// //           return res.status(404).json({ message: 'Aucun produit trouvé pour cet utilisateur' });
// //         }

// //         const productsWithImages = results.map(product => ({
// //           ...product,
// //           images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
// //         }));

// //         res.status(200).json({
// //           message: 'Produits récupérés avec succès',
// //           products: productsWithImages
// //         });
// //       }
// //     );
// //   } catch (error) {
// //     console.error("Erreur lors de la récupération des produits:", error);
// //     res.status(500).json({ error: 'Erreur interne du serveur' });
// //   }
// // });

// // app.get('/products/:userId', async (req, res) => {
// //   try {
    
// //     const userId = req.params.userId;
    
// //     // Log de la requête reçue
// //     console.log('Received product request for user:', userId);

// //     // Vérification que l'userId est présent
// //     if (!userId) {
// //       return res.status(400).json({ error: 'UserId est requis' });
// //     }

// //     // Récupération des produits depuis la base de données
// //     pool.query(
// //       'SELECT * FROM produit WHERE user_id = ?',
// //       [userId],
// //       (err, results) => {
// //         if (err) {
// //           console.error("Erreur lors de la récupération des produits:", err);
// //           return res.status(500).json({ error: "Erreur lors de la récupération des produits" });
// //         }

// //         // Si aucun produit n'est trouvé, renvoyer un message approprié
// //         if (results.length === 0) {
// //           return res.status(404).json({ message: 'Aucun produit trouvé pour cet utilisateur' });
// //         }

// //         // Convertir les images en Base64
// //         const productsWithImages = results.map(product => ({
// //           ...product,
// //           images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
// //         }));
// //         // Renvoyer les produits trouvés
// //         res.status(200).json({
// //           message: 'Produits récupérés avec succès',
// //           products: productsWithImages
// //         });
// //       }
// //     );
// //   } catch (error) {
// //     console.error("Erreur lors de la récupération des produits:", error);
// //     res.status(500).json({ error: 'Erreur interne du serveur' });
// //   }
// // });
// // Add a new product

// // app.post('/products', upload.single('images'), async (req, res) => {
// //   const {nom, categorie, prix, quantite, description } = req.body;
// //   const user_id = req.body.user_id; // Assurez-vous que user_id est bien envoyé dans le corps de la requête

// //   // Vérification des champs requis
// //   if (!user_id || !nom || !categorie || !prix || !quantite || !description) {
// //     return res.status(400).json({ message: 'Tous les champs requis doivent être remplis' });
// //   }

// //   // Vérification de l'image
// //   if (!req.file) {
// //     return res.status(400).json({ message: 'L\'image est requise' });
// //   }

// //   const images = req.file.buffer;
  

// //   const query = 'INSERT INTO produit (user_id, nom, categorie, images, prix, quantite, description, date_creation) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())';
  
// //     pool.query(query, [user_id, nom, categorie, images, prix, quantite, description], (error, results) => {
// //     if (error) {
// //       console.error('Erreur lors de l\'ajout du produit:', error);
// //       return res.status(500).json({ message: 'Erreur serveur', error: error.message });
// //     }
// //     res.status(201).json({ message: 'Produit ajouté avec succès', productId: results.insertId });
// //   });
// // });
// app.post('/products', upload.single('images'), async (req, res) => {
//   const {nom, categorie, prix, quantite, description } = req.body;
//   const user_id = req.body.user_id;

//   if (!user_id || !nom || !categorie || !prix || !quantite || !description) {
//     return res.status(400).json({ message: 'Tous les champs requis doivent être remplis' });
//   }

//   if (!req.file) {
//     return res.status(400).json({ message: 'L\'image est requise' });
//   }

//   let images;
//   try {
//     // Conversion de l'image en base64
//     const imageBase64 = req.file.buffer.toString('base64');
//     // Vérification de la validité de la chaîne base64
//     if (imageBase64.length % 4 !== 0) {
//       return res.status(400).json({ message: 'L\'image fournie est invalide' });
//     }
//     images = `data:${req.file.mimetype};base64,${imageBase64}`;
//     console.log('Image data:', images.substring(0, 50) + '...');
//   } catch (error) {
//     console.error('Erreur lors du traitement de l\'image:', error);
//     return res.status(500).json({ message: 'Erreur lors du traitement de l\'image' });
//   }

//   const query = 'INSERT INTO produit (user_id, nom, categorie, images, prix, quantite, description, date_creation) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())';
  
//   pool.query(query, [user_id, nom, categorie, images, prix, quantite, description], (error, results) => {
//     if (error) {
//       console.error('Erreur lors de l\'ajout du produit:', error);
//       return res.status(500).json({ message: 'Erreur serveur', error: error.message });
//     }
//     res.status(201).json({ message: 'Produit ajouté avec succès', productId: results.insertId });
//   });
// });
// // app.post('/products', async (req, res) => {
// //   const { user_id, categorie, image, prix, quantite, description } = req.body;
// //   const query = 'INSERT INTO produit (user_id, categorie, image, prix, quantite, description, date_creation) VALUES (?, ?, ?, ?, ?, ?, NOW())';
  
// //   pool.query(query, [user_id, categorie, image, prix, quantite, description], (error, results) => {
// //     if (error) {
// //       console.error('Erreur lors de l\'ajout du produit (post):', error);
// //       return res.status(500).json({ message: 'Erreur serveur' });
// //     }
// //     res.status(201).json({ message: 'Produit ajouté avec succès', productId: results.insertId });
// //   });
// // });

// app.put('/products/:id', upload.single('images'), async (req, res) => {
//   const productId = req.params.id;
//   const { categorie, prix, quantite, description } = req.body;
//   const images = req.file ? req.file.buffer : null;

//   // Déterminer la requête SQL et les paramètres en fonction de la présence d'images
//   const query = images
//     ? 'UPDATE produit SET categorie = ?, images = ?, prix = ?, quantite = ?, description = ? WHERE id = ?'
//     : 'UPDATE produit SET categorie = ?, prix = ?, quantite = ?, description = ? WHERE id = ?';
  
//   const params = images
//     ? [categorie, images, prix, quantite, description, productId]
//     : [categorie, prix, quantite, description, productId];

//   let connection;
//   try {
//     connection = await pool.getConnection(); // Obtenir une connexion du pool
//     const [results] = await connection.query(query, params); // Exécuter la requête

//     if (results.affectedRows === 0) {
//       return res.status(404).json({ message: 'Produit non trouvé' });
//     }
    
//     res.json({ message: 'Produit mis à jour avec succès' });
//   } catch (error) {
//     console.error('Erreur lors de la mise à jour du produit:', error);
//     return res.status(500).json({ message: 'Erreur serveur', error: error.message });
//   } finally {
//     if (connection) connection.release(); // Libérer la connexion après utilisation
//   }
// });

// // Update a product
// // app.put('/products/:id',  upload.single('images'), async (req, res) => {
// //   const productId = req.params.id;
// //   const { categorie, prix, quantite, description } = req.body;
// //   const images = req.file ? req.file.buffer : null;
// //   const query = images
// //   ? 'UPDATE produit SET categorie = ?, images = ?, prix = ?, quantite = ?, description = ? WHERE id = ?'
// //   : 'UPDATE produit SET categorie = ?, prix = ?, quantite = ?, description = ? WHERE id = ?';
  
// //   const params = images
// //     ? [categorie, images, prix, quantite, description, productId]
// //     : [categorie, prix, quantite, description, productId];

// //   pool.query(query, params, (error, results) => {
// //     if (error) {
// //       console.error('Erreur lors de la mise à jour du produit(put):', error);
// //       return res.status(500).json({ message: 'Erreur serveur', error:error.message });
// //     }
// //     if (results.affectedRows === 0) {
// //       return res.status(404).json({ message: 'Produit non trouvé' });
// //     }
// //     res.json({ message: 'Produit mis à jour avec succès' });
// //   });
// // });

// // // Delete a product
// // app.delete('/products/:id', async (req, res) => {
// //   const productId = req.params.id;
// //   const query = 'DELETE FROM produit WHERE id = ?';
  
// //   pool.query(query, [productId], (error, results) => {
// //     if (error) {
// //       console.error('Erreur lors de la suppression du produit:', error);
// //       return res.status(500).json({ message: 'Erreur serveur' });
// //     }
// //     if (results.affectedRows === 0) {
// //       return res.status(404).json({ message: 'Produit non trouvé' });
// //     }
// //     res.json({ message: 'Produit supprimé avec succès' });
// //   });
// // });

// //paiement /////////////////////////////////////////////////////////////
// // app.post('/create-payment-intent', async (req, res) => {
// //   const { amount } = req.body; // Montant en centimes

// //   try {
// //      const paymentIntent = await stripe.paymentIntents.create({
// //        amount,
// //        currency: 'eur', // ou la devise que vous utilisez
// //      });
// //      res.send({ clientSecret: paymentIntent.client_secret });
    
// //  } catch (error) {
// //      res.status(500).send({ error });
// //  }
// // });

// // Endpoint pour créer une intention de paiement
// // Endpoint pour créer une intention de paiement
// // app.post('/create-payment-intent', async (req, res) => {
// //   const { items } = req.body;

// //   try {
// //     // Calculer le montant total
// //     let total = 0;
// //     for (const item of items) {
// //       const [rows] = await pool.promise().query('SELECT prix, quantite FROM produit WHERE id = ?', [item.id]);
// //       if (rows.length > 0) {
// //         const { prix, quantite } = rows[0];
// //         if (item.quantity > quantite) {
// //           return res.status(400).json({ error: `Quantité insuffisante pour le produit ${item.id}` });
// //         }
// //         total += prix * item.quantity;
// //       }
// //     }

// //     // Créer l'intention de paiement
// //     const paymentIntent = await stripe.paymentIntents.create({
// //       amount: Math.round(total * 100), // Stripe utilise les centimes
// //       currency: 'eur',
// //     });

// //     // Envoyer la réponse avec le client secret
// //     return res.json({ clientSecret: paymentIntent.client_secret });
    
// //   } catch (error) {
// //     console.error('Erreur lors de la création de l\'intention de paiement:', error);
// //     return res.status(500).json({ error: 'Erreur lors de la création de l\'intention de paiement' });
// //   }
// // });

// // app.post('/create-payment-intent', async (req, res) => {
// //   const { items } = req.body;

// //   try {
// //     let total = 0;
// //     for (const item of items) {
// //       const [rows] = await pool.promise().query('SELECT prix, quantite FROM produit WHERE id = ?', [item.id]);
// //       if (rows.length > 0) {
// //         const { prix, quantite } = rows[0];
// //         if (item.quantity > quantite) {
// //           return res.status(400).json({ error: `Quantité insuffisante pour le produit ${item.id}` });
// //         }
// //         total += prix * item.quantity;
// //       }
// //     }

// //     if (total < 0.50) {
// //       return res.status(400).json({ error: 'Le montant total doit être d\'au moins 0,50 €' });
// //     }

// //     const paymentIntent = await stripe.paymentIntents.create({
// //       amount: Math.round(total * 100),
// //       currency: 'eur',
// //     });

// //     return res.json({ clientSecret: paymentIntent.client_secret });
// //   } catch (error) {
// //     console.error('Erreur lors de la création de l\'intention de paiement:', error);
// //     return res.status(500).json({ error: 'Erreur lors de la création de l\'intention de paiement' });
// //   }
// // });
// app.post('/create-payment-intent', async (req, res) => {
//   const { items } = req.body;

//   // Vérification des données reçues
//   if (!Array.isArray(items) || items.length === 0) {
//     return res.status(400).json({ error: 'Items est requis et doit être un tableau.' });
//   }

//   let connection;
//   try {
//     connection = await pool.getConnection(); // Obtenir une connexion du pool

//     let total = 0;
//     for (const item of items) {
//       const [rows] = await connection.query('SELECT prix, quantite FROM produit WHERE id = ?', [item.id]);
      
//       if (rows.length > 0) {
//         const { prix, quantite } = rows[0];
        
//         // Vérification de la quantité disponible
//         if (item.quantity > quantite) {
//           return res.status(400).json({ error: `Quantité insuffisante pour le produit ${item.id}` });
//         }
        
//         total += prix * item.quantity; // Calcul du total
//       } else {
//         return res.status(404).json({ error: `Produit avec l'ID ${item.id} non trouvé.` });
//       }
//     }

//     // Vérification du montant total
//     if (total < 0.50) {
//       return res.status(400).json({ error: 'Le montant total doit être d\'au moins 0,50 €' });
//     }

//     // Création de l'intention de paiement avec Stripe
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(total * 100), // Montant en centimes
//       currency: 'eur',
//     });

//     return res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error('Erreur lors de la création de l\'intention de paiement:', error);
//     return res.status(500).json({ error: 'Erreur lors de la création de l\'intention de paiement' });
//   } finally {
//     if (connection) connection.release(); // Libérer la connexion après utilisation
//   }
// });

// // Endpoint pour mettre à jour les quantités après un paiement réussi
// // app.post('/update-quantities', async (req, res) => {
// //   const { items } = req.body;

// //   if (!Array.isArray(items) || items.length === 0) {
// //       return res.status(400).json({ error: 'Items est requis et doit être un tableau.' });
// //   }

// //   const connection = await pool.getConnection();
// //   try {
// //       await connection.beginTransaction(); // Démarre une transaction

// //       await Promise.all(items.map(async (item) => {
// //           const [result] = await connection.query(
// //               'UPDATE produit SET quantite = quantite - ? WHERE id = ? AND quantite >= ?',
// //               [item.quantity, item.id, item.quantity]
// //           );

// //           if (result.affectedRows === 0) {
// //               throw new Error(`Quantité insuffisante pour le produit ${item.id}`);
// //           }
// //       }));

// //       await connection.commit(); // Valide la transaction
// //       res.json({ success: true });
// //   } catch (error) {
// //       console.error('Erreur lors de la mise à jour des quantités:', error);
// //       await connection.rollback(); // Annule la transaction en cas d'erreur
// //       res.status(500).json({ error: 'Erreur lors de la mise à jour des quantités' });
// //   } finally {
// //       connection.release(); // Libère la connexion après utilisation
// //   }
// // });
// app.post('/update-quantities', async (req, res) => {
//   const { items } = req.body;

//   // Vérification des données reçues
//   if (!Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({ error: 'Items est requis et doit être un tableau.' });
//   }

//   // Obtenir une connexion du pool
//   let connection; // Déclaration de la connexion
//   try {
//     connection = await pool.getConnection(); // Obtenir une connexion du pool
//     await connection.beginTransaction(); // Démarre une transaction

//       // Mise à jour des quantités pour chaque item
//       await Promise.all(items.map(async (item) => {
//           const [result] = await connection.query(
//               'UPDATE produit SET quantite = quantite - ? WHERE id = ? AND quantite >= ?',
//               [item.quantity, item.id, item.quantity]
//           );

//           if (result.affectedRows === 0) {
//               throw new Error(`Quantité insuffisante pour le produit ${item.id}`);
//           }
//       }));

//       await connection.commit(); // Valide la transaction
//       res.json({ success: true });
//   } catch (error) {
//       console.error('Erreur lors de la mise à jour des quantités:', error);
//       await connection.rollback(); // Annule la transaction en cas d'erreur
//       res.status(500).json({ error: 'Erreur lors de la mise à jour des quantités' });
//   } finally {
//       connection.release(); // Libère la connexion après utilisation
//   }
// });


// // Démarrage du serveur
// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });

// app.listen(port, () => {
//     console.log(`Serveur en écoute sur le port ${port}`);
// });

// app.post('/signup', async (req, res) => {
//     const { firstName, lastName, email, password, telephone, address, ville, postalCode, role, raisonSociale } = req.body;

//     console.log('Received signup request:', { firstName, lastName, email, telephone, address, ville, postalCode, role, raisonSociale });

//     // Validate required fields
//     if (!firstName || !lastName || !email || !password || !telephone || !address || !ville || !postalCode || !role) {
//         return res.status(400).json({ error: 'Tous les champs sont requis' });
//     }
//     if (role === 'vendeur' && (!raisonSociale)) {
//         return res.status(400).json({ error: 'Raison sociale est requise pour les vendeurs' });
//     }

//     try {
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Get a connection from the pool
//         pool.getConnection(async (err, connection) => {
//             if (err) {
//                 console.error("Erreur lors de l'acquisition de la connexion:", err);
//                 return res.status(500).json({ error: 'Erreur interne du serveur' });
//             }

//             try {
//                 // Insert into the database
//                 const result = await new Promise((resolve, reject) => {
//                     connection.query(
//                         'INSERT INTO user (prenom, nom, email, mot_de_passe, telephone, adresse, ville, code_postal, role, raison_sociale) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//                         [firstName, lastName, email, hashedPassword, telephone, address, ville, postalCode, role, raisonSociale],
//                         (error, results) => {
//                             if (error) return reject(error);
//                             resolve(results);
//                         }
//                     );
//                 });

//                 const userId = result.insertId;
//                 const token = jwt.sign({ userId }, 'votre_secret_jwt', { expiresIn: '24h' });

//                 res.status(201).json({
//                     message: 'Utilisateur créé avec succès',
//                     token,
//                     user: { id: userId, email, firstName, lastName, role, raisonSociale }
//                 });
//             } catch (queryError) {
//                 console.error("Erreur durant l'inscription:", queryError);
//                 if (queryError.code === 'ER_DUP_ENTRY') {
//                     return res.status(409).json({ error: 'Cet email est déjà utilisé' });
//                 }
//                 return res.status(500).json({ error: "Erreur lors du transfert de l'inscription à la bdd" });
//             } finally {
//                 // Release the connection back to the pool
//                 if (connection) connection.release();
//             }
//         });
//     } catch (error) {
//         console.error("Erreur durant le traitement:", error);
//         res.status(500).json({ error: 'Erreur interne du serveur' });
//     }
// });



const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3001; 
const multer = require('multer');
const upload = multer();
const stripe = require('stripe')('sk_test_51PfNmyRpKgZkfjqiKOClHuOcFVUgJPdk5OqpYGCNHVPUBugcz2RpBOiTLYpNweAOtrJMS2Q6DXR5o3dl1d2tXQ6e00A9T86gec');


// Configuration de la connexion à la base de données
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ratatouille',
    connectTimeout: 60000, // Augmente le délai d'attente à 60 secondes
    connectionLimit: 10,
    queueLimit: 0
});

// const db = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'ratatouille',
// });
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

// Vérification de la connexion au démarrage (facultatif)
// (async () => {
//   try {
//       const connection = await pool.getConnection();
//       console.log('Connecté à la base de données MySQL');
//       connection.release(); // Libération de la connexion après vérification
//   } catch (err) {
//       console.error('Erreur de connexion à la base de données :', err);
//       process.exit(1); // Arrête le serveur si la connexion échoue
//   }
// })();


// Routes
app.get('/products/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('Received product request for user:', userId);

    if (!userId) {
      return res.status(400).json({ error: 'UserId est requis' });
    }

    pool.query(
      'SELECT * FROM produit WHERE user_id = ?',
      [userId],
      (err, results) => {
        if (err) {
          console.error("Erreur lors de la récupération des produits:", err);
          return res.status(500).json({ error: "Erreur lors de la récupération des produits" });
        }

        res.status(200).json({
          message: results.length > 0 ? 'Produits récupérés avec succès' : 'Aucun produit trouvé pour cet utilisateur',
          products: results
        });
      }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

////////////                           INSCRIPTION /////

app.post('/signup', async (req, res) => {
  try {
      const { firstName, lastName, email, password, telephone, address, ville, postalCode, role, raisonSociale } = req.body;
      
      // Log des données reçues (attention à ne pas logger les mots de passe en production)
      console.log('Received signup request:', { firstName, lastName, email, telephone, address, ville, postalCode, role, raisonSociale });

      // Vérification que tous les champs nécessaires sont présents
      if (!firstName || !lastName || !email || !password || !telephone || !address || !ville || !postalCode || !role) {
          return res.status(400).json({ error: 'Tous les champs sont requis' });
      }
      if (role === 'vendeur' && (!raisonSociale)) {
        return res.status(400).json({ error: 'Raison sociale et image sont requis pour les vendeurs' });
      }

      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertion dans la base de données
      pool.query(
' INSERT INTO user (prenom, nom, email, mot_de_passe, telephone, adresse, ville, code_postal, role, raison_sociale) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',

[firstName, lastName, email, hashedPassword, telephone, address, ville, postalCode, role, raisonSociale],

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
              const token = jwt.sign({ userId }, 'votre_secret_jwt', { expiresIn: '1h' });
              
              res.status(201).json({
                  message: 'Utilisateur créé avec succès',
                  token,
                  user: { id: userId, email, firstName, lastName, role, raisonSociale }
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
      
              const token = jwt.sign({ userId: user.id }, 'votre_secret_jwt', { expiresIn: '1h' });
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
                  ville: user.ville,
                  role:user.role,
                  raisonSociale:user.raisonSociale
                }
               });
            });
          }
        );
      });

   // Dans votre fichier principal d'application (par exemple, app.js ou server.js)
   app.get('/:categorie', async (req, res) => {
    try {
      // Récupération de tous les produits depuis la base de données
      pool.query(
        'SELECT id, nom, categorie, prix, quantite, description, user_id, images FROM produit ORDER BY date_creation DESC',
        (err, results) => {
          if (err) {
            console.error("Erreur lors de la récupération des produits:", err);
            return res.status(500).json({ error: "Erreur lors de la récupération des produits" });
          }
          // Convertir les images en Base64
          const productsWithImages = results.map(product => ({
            ...product,
            images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
          }));
          // Renvoyer tous les produits trouvés
          res.status(200).json({
            message: 'Produits récupérés avec succès',
            products:productsWithImages
          });
        }
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  });
app.get('/product', async (req, res) => {
  try {
    // Récupération de tous les produits depuis la base de données
    pool.query(
      'SELECT id, nom, categorie, prix, quantite, description, user_id, images FROM produit ORDER BY date_creation DESC',
      (err, results) => {
        if (err) {
          console.error("Erreur lors de la récupération des produits:", err);
          return res.status(500).json({ error: "Erreur lors de la récupération des produits" });
        }
        // Convertir les images en Base64
        const productsWithImages = results.map(product => ({
          ...product,
          images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
        }));
        // Renvoyer tous les produits trouvés
        res.status(200).json({
          message: 'Produits récupérés avec succès',
          products:productsWithImages
        });
      }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});
/////////////////////////////////////////// barre de recherche /////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/search-products', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 3) {
      return res.status(400).json({ error: "La requête de recherche doit contenir au moins 3 caractères" });
    }

    pool.query(
      'SELECT id, nom, categorie, prix, quantite, description, user_id, images FROM produit WHERE nom LIKE ? ORDER BY date_creation DESC',
      [`%${q}%`],
      (err, results) => {
        if (err) {
          console.error("Erreur lors de la recherche des produits:", err);
          return res.status(500).json({ error: "Erreur lors de la recherche des produits" });
        }
        // Convertir les images en Base64
        const productsWithImages = results.map(product => ({
          ...product,
          images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
        }));
        // Renvoyer les produits trouvés
        res.status(200).json({
          message: 'Produits trouvés avec succès',
          products: productsWithImages
        });
      }
    );
  } catch (error) {
    console.error("Erreur lors de la recherche des produits:", error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});
app.get('/produit/', async (req, res) => {
  try {
    // Récupération de tous les produits depuis la base de données
    pool.query(
      'SELECT id, nom, categorie, prix, quantite, description, user_id, images FROM produit ORDER BY date_creation DESC',
      (err, results) => {
        if (err) {
          console.error("Erreur lors de la récupération des produits:", err);
          return res.status(500).json({ error: "Erreur lors de la récupération des produits" });
        }
        // Convertir les images en Base64
        const productsWithImages = results.map(product => ({
          ...product,
          images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
        }));
        // Renvoyer tous les produits trouvés
        res.status(200).json({
          message: 'Produits récupérés avec succès',
          products:productsWithImages
        });
      }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

////////////                       CRUD PRODUIT  MANAGEMENT/////
// app.get('/products/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
    
//     console.log('Received product request for user:', userId);

//     if (!userId) {
//       return res.status(400).json({ error: 'UserId est requis' });
//     }

//     pool.query(
//       'SELECT id, nom, categorie, prix, quantite, description, user_id, images FROM produit WHERE user_id = ? ORDER BY date_creation DESC',
//       [userId],
//       (err, results) => {
//         if (err) {
//           console.error("Erreur lors de la récupération des produits:", err);
//           return res.status(500).json({ error: "Erreur lors de la récupération des produits" });
//         }

//         if (results.length === 0) {
//           return res.status(404).json({ message: 'Aucun produit trouvé pour cet utilisateur' });
//         }

//         const productsWithImages = results.map(product => ({
//           ...product,
//           images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
//         }));

//         res.status(200).json({
//           message: 'Produits récupérés avec succès',
//           products: productsWithImages
//         });
//       }
//     );
//   } catch (error) {
//     console.error("Erreur lors de la récupération des produits:", error);
//     res.status(500).json({ error: 'Erreur interne du serveur' });
//   }
// });
app.get('/products/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      
      console.log('Received product request for user:', userId);
  
      if (!userId) {
        return res.status(400).json({ error: 'UserId est requis' });
      }
  
      // Requête modifiée avec une jointure
      const query = `
        SELECT p.*, u.nom, u.prenom, u.email, u.telephone, u.adresse, u.ville, u.code_postal, u.raison_sociale
        FROM produit p
        LEFT JOIN user u ON p.user_id = u.id
        WHERE p.user_id = ?
      `;
  
      pool.query(query, [userId], (err, results) => {
        if (err) {
          console.error("Erreur lors de la récupération des produits:", err);
          return res.status(500).json({ error: "Erreur lors de la récupération des produits" });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ message: 'Aucun produit trouvé pour cet utilisateur' });
        }
  
        const productsWithImages = results.map(product => ({
          ...product,
          images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
          userId: {
            nom: product.nom,
            prenom: product.prenom,
            email: product.email,
            telephone: product.telephone,
            adresse: product.adresse,
            ville: product.ville,
            code_postal: product.code_postal,
            raison_sociale: product.raison_sociale
          }
        }));
  
        res.status(200).json({
          message: 'Produits récupérés avec succès',
          products: productsWithImages
        });
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  });
// app.get('/products/:userId', async (req, res) => {
//   try {
    
//     const userId = req.params.userId;
    
//     // Log de la requête reçue
//     console.log('Received product request for user:', userId);

//     // Vérification que l'userId est présent
//     if (!userId) {
//       return res.status(400).json({ error: 'UserId est requis' });
//     }

//     // Récupération des produits depuis la base de données
//     pool.query(
//       'SELECT * FROM produit WHERE user_id = ?',
//       [userId],
//       (err, results) => {
//         if (err) {
//           console.error("Erreur lors de la récupération des produits:", err);
//           return res.status(500).json({ error: "Erreur lors de la récupération des produits" });
//         }

//         // Si aucun produit n'est trouvé, renvoyer un message approprié
//         if (results.length === 0) {
//           return res.status(404).json({ message: 'Aucun produit trouvé pour cet utilisateur' });
//         }

//         // Convertir les images en Base64
//         const productsWithImages = results.map(product => ({
//           ...product,
//           images: product.images ? `data:image/jpeg;base64,${Buffer.from(product.images).toString('base64')}` : null,
//         }));
//         // Renvoyer les produits trouvés
//         res.status(200).json({
//           message: 'Produits récupérés avec succès',
//           products: productsWithImages
//         });
//       }
//     );
//   } catch (error) {
//     console.error("Erreur lors de la récupération des produits:", error);
//     res.status(500).json({ error: 'Erreur interne du serveur' });
//   }
// });
// Add a new product

// app.post('/products', upload.single('images'), async (req, res) => {
//   const {nom, categorie, prix, quantite, description } = req.body;
//   const user_id = req.body.user_id; // Assurez-vous que user_id est bien envoyé dans le corps de la requête

//   // Vérification des champs requis
//   if (!user_id || !nom || !categorie || !prix || !quantite || !description) {
//     return res.status(400).json({ message: 'Tous les champs requis doivent être remplis' });
//   }

//   // Vérification de l'image
//   if (!req.file) {
//     return res.status(400).json({ message: 'L\'image est requise' });
//   }

//   const images = req.file.buffer;
  

//   const query = 'INSERT INTO produit (user_id, nom, categorie, images, prix, quantite, description, date_creation) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())';
  
//     pool.query(query, [user_id, nom, categorie, images, prix, quantite, description], (error, results) => {
//     if (error) {
//       console.error('Erreur lors de l\'ajout du produit:', error);
//       return res.status(500).json({ message: 'Erreur serveur', error: error.message });
//     }
//     res.status(201).json({ message: 'Produit ajouté avec succès', productId: results.insertId });
//   });
// });
app.post('/products', upload.single('images'), async (req, res) => {
  const {nom, categorie, prix, quantite, description } = req.body;
  const user_id = req.body.user_id;

  if (!user_id || !nom || !categorie || !prix || !quantite || !description) {
    return res.status(400).json({ message: 'Tous les champs requis doivent être remplis' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'L\'image est requise' });
  }

  let images;
  try {
    // Conversion de l'image en base64
    const imageBase64 = req.file.buffer.toString('base64');
    // Vérification de la validité de la chaîne base64
    if (imageBase64.length % 4 !== 0) {
      return res.status(400).json({ message: 'L\'image fournie est invalide' });
    }
    images = `data:${req.file.mimetype};base64,${imageBase64}`;
    console.log('Image data:', images.substring(0, 50) + '...');
  } catch (error) {
    console.error('Erreur lors du traitement de l\'image:', error);
    return res.status(500).json({ message: 'Erreur lors du traitement de l\'image' });
  }

  const query = 'INSERT INTO produit (user_id, nom, categorie, images, prix, quantite, description, date_creation) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())';
  
  pool.query(query, [user_id, nom, categorie, images, prix, quantite, description], (error, results) => {
    if (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
      return res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
    res.status(201).json({ message: 'Produit ajouté avec succès', productId: results.insertId });
  });
});
// app.post('/products', async (req, res) => {
//   const { user_id, categorie, image, prix, quantite, description } = req.body;
//   const query = 'INSERT INTO produit (user_id, categorie, image, prix, quantite, description, date_creation) VALUES (?, ?, ?, ?, ?, ?, NOW())';
  
//   pool.query(query, [user_id, categorie, image, prix, quantite, description], (error, results) => {
//     if (error) {
//       console.error('Erreur lors de l\'ajout du produit (post):', error);
//       return res.status(500).json({ message: 'Erreur serveur' });
//     }
//     res.status(201).json({ message: 'Produit ajouté avec succès', productId: results.insertId });
//   });
// });

// Update a product
app.put('/products/:id',  upload.single('images'), async (req, res) => {
  const productId = req.params.id;
  const { categorie, prix, quantite, description } = req.body;
  const images = req.file ? req.file.buffer : null;
  const query = images
  ? 'UPDATE produit SET categorie = ?, images = ?, prix = ?, quantite = ?, description = ? WHERE id = ?'
  : 'UPDATE produit SET categorie = ?, prix = ?, quantite = ?, description = ? WHERE id = ?';
  
  const params = images
    ? [categorie, images, prix, quantite, description, productId]
    : [categorie, prix, quantite, description, productId];

  pool.query(query, params, (error, results) => {
    if (error) {
      console.error('Erreur lors de la mise à jour du produit(put):', error);
      return res.status(500).json({ message: 'Erreur serveur', error:error.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json({ message: 'Produit mis à jour avec succès' });
  });
});

// Delete a product
app.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const query = 'DELETE FROM produit WHERE id = ?';
  
  pool.query(query, [productId], (error, results) => {
    if (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json({ message: 'Produit supprimé avec succès' });
  });
});

//paiement /////////////////////////////////////////////////////////////
// app.post('/create-payment-intent', async (req, res) => {
//   const { amount } = req.body; // Montant en centimes

//   try {
//      const paymentIntent = await stripe.paymentIntents.create({
//        amount,
//        currency: 'eur', // ou la devise que vous utilisez
//      });
//      res.send({ clientSecret: paymentIntent.client_secret });
    
//  } catch (error) {
//      res.status(500).send({ error });
//  }
// });

// Endpoint pour créer une intention de paiement
// Endpoint pour créer une intention de paiement
// app.post('/create-payment-intent', async (req, res) => {
//   const { items } = req.body;

//   try {
//     // Calculer le montant total
//     let total = 0;
//     for (const item of items) {
//       const [rows] = await pool.promise().query('SELECT prix, quantite FROM produit WHERE id = ?', [item.id]);
//       if (rows.length > 0) {
//         const { prix, quantite } = rows[0];
//         if (item.quantity > quantite) {
//           return res.status(400).json({ error: `Quantité insuffisante pour le produit ${item.id}` });
//         }
//         total += prix * item.quantity;
//       }
//     }

//     // Créer l'intention de paiement
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(total * 100), // Stripe utilise les centimes
//       currency: 'eur',
//     });

//     // Envoyer la réponse avec le client secret
//     return res.json({ clientSecret: paymentIntent.client_secret });
    
//   } catch (error) {
//     console.error('Erreur lors de la création de l\'intention de paiement:', error);
//     return res.status(500).json({ error: 'Erreur lors de la création de l\'intention de paiement' });
//   }
// });

app.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body;

  try {
    let total = 0;
    for (const item of items) {
      const [rows] = await pool.promise().query('SELECT prix, quantite FROM produit WHERE id = ?', [item.id]);
      if (rows.length > 0) {
        const { prix, quantite } = rows[0];
        if (item.quantity > quantite) {
          return res.status(400).json({ error: `Quantité insuffisante pour le produit ${item.id}` });
        }
        total += prix * item.quantity;
      }
    }

    if (total < 0.50) {
      return res.status(400).json({ error: 'Le montant total doit être d\'au moins 0,50 €' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: 'eur',
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Erreur lors de la création de l\'intention de paiement:', error);
    return res.status(500).json({ error: 'Erreur lors de la création de l\'intention de paiement' });
  }
});

// Endpoint pour mettre à jour les quantités après un paiement réussi
app.post('/update-quantities', async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items est requis et doit être un tableau.' });
  }

  const connection = await pool.getConnection();
  try {
      await connection.beginTransaction(); // Démarre une transaction

      await Promise.all(items.map(async (item) => {
          const [result] = await connection.query(
              'UPDATE produit SET quantite = quantite - ? WHERE id = ? AND quantite >= ?',
              [item.quantity, item.id, item.quantity]
          );

          if (result.affectedRows === 0) {
              throw new Error(`Quantité insuffisante pour le produit ${item.id}`);
          }
      }));

      await connection.commit(); // Valide la transaction
      res.json({ success: true });
  } catch (error) {
      console.error('Erreur lors de la mise à jour des quantités:', error);
      await connection.rollback(); // Annule la transaction en cas d'erreur
      res.status(500).json({ error: 'Erreur lors de la mise à jour des quantités' });
  } finally {
      connection.release(); // Libère la connexion après utilisation
  }
});


// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});