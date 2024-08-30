
justitia-backend/
├── config/
│   └── db.js
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── plainteController.js
│   └── userController.js
├── models/
│   ├── adminModel.js
│   ├── plainteModel.js
│   ├── userModel.js
│   └── authModel.js
├── routes/
│   ├── admin.js
│   ├── auth.js
│   ├── plainte.js
│   └── user.js
├── .env
├── app.js
└── server.js

INSERT INTO invites (nom, prenom, email, photo, preference_boisons, allergie, qr_code) VALUES ('NTEME ELONGO', 'Prince Junior', 'elongoprince1995@gmail.com', '', 'Pamplemousse', 'Aucune', ''), ('MOUGOULA', 'Stevine', 'mougoulastevine.com', '', 'Jus d'orange', 'Aucune', ''), ('NDONG ABOUROU', 'Marvine', 'leskalpel@gmail', '', 'Regab', 'Aucune', '');


INSERT INTO invites (nom, prenom, email, photo, preference_boisons, allergie, qr_code) 
VALUES 
('NTEME ELONGO', 'Prince Junior', 'elongoprince1995@gmail.com', '', 'Pamplemousse', 'Aucune', ''),
('DUPONT', 'Marie', 'marie.dupont@example.com', '', 'Orange', 'Gluten', ''),
('NGOMA', 'Jean-Pierre', 'jeanpierre.ngoma@example.com', '', 'Coca-Cola', 'Lactose', ''),
('KAMGA', 'Amandine', 'amandine.kamga@example.com', '', 'Jus de pomme', 'Arachides', ''),
('MBOULA', 'Charles', 'charles.mboul@example.com', '', 'Thé', 'Aucune', '');

*****************************************
import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';

import admin from './routes/admin.js';
import auth from './routes/auth.js';
import plainte from './routes/plainte.js';
import user from './routes/user.js';

dotenv.config();

const app = express();

// Middleware pour parser le JSON (sans body-parser)
app.use(express.json());

//Routes
// app.use('/', (req, res) => {
//     res.status(200).json({message: "Bienvenue sur mon API !"})
// })
app.use('/api/admin', admin);
app.use('/api/auth', auth);
app.use('/api/plainte', plainte);
app.use('/api/user', user);

*****************************************
export default app;

import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
***************************************************
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=app_db

************************
// routes/userRoutes.js
import express from 'express';
import { getAllUser, createUser, loginUser, logoutUser, getByIdUser, deleteByIdUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUser);
router.get('/:id', getByIdUser);
router.post('/inscription', createUser);
router.post('/connecter', loginUser);
router.post('/deconnecter', logoutUser);
router.delete('/:id', deleteByIdUser);

export default router;

*****

import express from 'express';
import { getPlaintes, createPlainte, updatePlainte, deletePlainte } from '../controllers/plainteController.js';

const router = express.Router();

router.get('/', getPlaintes);
router.post('/', createPlainte);
router.put('/:id', updatePlainte);
router.delete('/:id', deletePlainte);

export default router;


*****

import express from 'express';
import { login, signup, logout } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

export default router;
*****

import express from 'express';
import { getAdmins, createAdmin, updateAdmin, deleteAdmin, getByIdAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.get('/', getAdmins);
router.get('/:id', getByIdAdmin);

router.post('/', createAdmin);

router.put('/:id', updateAdmin);

router.delete('/:id', deleteAdmin);


export default router;
****

// models/userModel.js
import db from '../config/db.js';

export const createUser = (userData, callback) => {
    const sql = 'INSERT INTO user (nom, prenom, email, password, role) VALUES (?, ?, ?, ?, "utilisateur")';
    db.query(sql, userData, callback);
};

export const getUserByEmail = (email, callback) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    db.query(sql, [email], callback);
};

export const getUserById = (id, callback) => {
    const sql = 'SELECT * FROM user WHERE id = ?';
    db.query(sql, [id], callback);
};

export const logoutUser = (userId, callback) => {
    const sql = 'INSERT INTO logout (user_id) VALUES (?)';
    db.query(sql, [userId], callback);
};
***********
import db from '../config/db.js';

export const getAllPlaintes = (callback) => {
  const query = 'SELECT * FROM plainte';
  db.query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

export const createPlainte = (plainte, callback) => {
  const query = 'INSERT INTO plainte SET ?';
  db.query(query, plainte, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

export const updatePlainte = (id, plainte, callback) => {
  const query = 'UPDATE plainte SET ? WHERE id = ?';
  db.query(query, [plainte, id], (err) => {
    if (err) return callback(err);
    callback(null);
  });
};

export const deletePlainte = (id, callback) => {
  const query = 'DELETE FROM plainte WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return callback(err);
    callback(null);
  });
};
*******
// models/authModel.js
import connection from '../config/db.js';

export const createUser = (nom, prenom, email, password, role, callback) => {
    const query = 'INSERT INTO user (nom, prenom, email, password, role) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [nom, prenom, email, password, role], callback);
};

export const createAdmin = (nom, prenom, email, password, role, callback) => {
    const query = 'INSERT INTO admin (nom, prenom, email, password, role) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [nom, prenom, email, password, role], callback);
};

export const findUserOrAdminByEmail = (email, callback) => {
    const query = `SELECT * FROM user WHERE email = ? UNION SELECT * FROM admin WHERE email = ?`;
    connection.query(query, [email, email], callback);
};

export const createLogout = (user_id, admin_id, callback) => {
    const query = 'INSERT INTO logout (user_id, admin_id) VALUES (?, ?)';
    connection.query(query, [user_id, admin_id], callback);
};
******
// models/adminModel.js
import db from '../config/db.js';

export const getAllAdmins = (callback) => {
    const query = 'SELECT * FROM admin';
    db.query(query, callback);
};

export const createAdmin = (admin, callback) => {
    const query = 'INSERT INTO admin (nom, prenom, email, password) VALUES (?, ?, ?, ?)';
    const { nom, prenom, email, password } = admin;
    db.query(query, [nom, prenom, email, password], callback);
};

export const updateAdmin = (id, admin, callback) => {
    const query = 'UPDATE admin SET nom = ?, prenom = ?, email = ?, password = ? WHERE id = ?';
    const { nom, prenom, email, password } = admin;
    db.query(query, [nom, prenom, email, password, id], callback);
};

export const deleteAdmin = (id, callback) => {
    const query = 'DELETE FROM admin WHERE id = ?';
    db.query(query, [id], callback);
};
********
// controllers/userController.js
import db from '../config/db.js';

export const getAllUser = (req, res) => {
    const query = 'SELECT * FROM user';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};
// Créer un nouvel utilisateur (signup)
export const createUser = (req, res) => {
    const { nom, prenom, email, password } = req.body;
    const sql = 'INSERT INTO user (nom, prenom, email, password, role) VALUES (?, ?, ?, ?, "utilisateur")';

    db.query(sql, [nom, prenom, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error: ' + err });
        }
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    });
};

// Se connecter (login)
export const loginUser = (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error: ' + err });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', user: result[0] });
    });
};

// Se déconnecter (logout)
export const logoutUser = (req, res) => {
    const { user_id } = req.body;
    const sql = 'INSERT INTO logout (user_id) VALUES (?)';

    db.query(sql, [user_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error: ' + err });
        }
        res.status(200).json({ message: 'User logged out successfully' });
    });
};

// Obtenir les détails d'un utilisateur par son ID
export const getByIdUser = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM user WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error: ' + err });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(result[0]);
    });
};

export const deleteByIdUser = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM user WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    });
};

******

import db from '../config/db.js';

// Get all plaintes
export const getPlaintes = (req, res) => {
  const query = 'SELECT * FROM plainte';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Create a new plainte
export const createPlainte = (req, res) => {
  const { nom, prenom, sexe, nationalite, profession, domicile, province, ville, arrondissement, naturePiece, numeroPiece, telephone, email, typeInfraction, contenuPlainte, fichiers, user_id, admin_id } = req.body;
  const query = 'INSERT INTO plainte (nom, prenom, sexe, nationalite, profession, domicile, province, ville, arrondissement, naturePiece, numeroPiece, telephone, email, typeInfraction, contenuPlainte, fichiers, user_id, admin_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [nom, prenom, sexe, nationalite, profession, domicile, province, ville, arrondissement, naturePiece, numeroPiece, telephone, email, typeInfraction, contenuPlainte, fichiers, user_id, admin_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: results.insertId, ...req.body });
  });
};

// Update a plainte
export const updatePlainte = (req, res) => {
  const { id } = req.params;
  const { nom, prenom, sexe, nationalite, profession, domicile, province, ville, arrondissement, naturePiece, numeroPiece, telephone, email, typeInfraction, contenuPlainte, fichiers, user_id, admin_id } = req.body;
  const query = 'UPDATE plainte SET nom = ?, prenom = ?, sexe = ?, nationalite = ?, profession = ?, domicile = ?, province = ?, ville = ?, arrondissement = ?, naturePiece = ?, numeroPiece = ?, telephone = ?, email = ?, typeInfraction = ?, contenuPlainte = ?, fichiers = ?, user_id = ?, admin_id = ? WHERE id = ?';
  db.query(query, [nom, prenom, sexe, nationalite, profession, domicile, province, ville, arrondissement, naturePiece, numeroPiece, telephone, email, typeInfraction, contenuPlainte, fichiers, user_id, admin_id, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Plainte updated successfully' });
  });
};

// Delete a plainte
export const deletePlainte = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM plainte WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Plainte deleted successfully' });
  });
};
********
// controllers/authController.js
import db from '../config/db.js';

// Contrôleur pour le login
export const login = (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM user WHERE email = ? AND password = ?`;

    db.query(query, [email, password], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

        res.status(200).json({ message: 'Connexion réussie', user: result[0] });
    });
};

// Contrôleur pour le signup
export const signup = (req, res) => {
    const { nom, prenom, email, password, role } = req.body;
    const query = `INSERT INTO user (nom, prenom, email, password, role) VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [nom, prenom, email, password, role], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ message: 'Inscription réussie', userId: result.insertId });
    });
};

// Contrôleur pour le logout
export const logout = (req, res) => {
    const { userId, adminId } = req.body;
    const query = `INSERT INTO logout (user_id, admin_id) VALUES (?, ?)`;

    db.query(query, [userId, adminId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json({ message: 'Déconnexion réussie' });
    });
};
*********
// controllers/adminController.js
import db from '../config/db.js';

export const getAdmins = (req, res) => {
    const query = 'SELECT * FROM admin';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtenir les détails d'un utilisateur par son ID
export const getByIdAdmin = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM user WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error: ' + err });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(result[0]);
    });
};

export const createAdmin = (req, res) => {
    const { nom, prenom, email, password } = req.body;
    const query = 'INSERT INTO admin (nom, prenom, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [nom, prenom, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, nom, prenom, email });
    });
};


export const updateAdmin = (req, res) => {  
    const { id } = req.params;
    const { nom, prenom, email, password } = req.body;
    const query = 'UPDATE admin SET nom = ?, prenom = ?, email = ?, password = ? WHERE id = ?';
    db.query(query, [nom, prenom, email, password, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Admin mis à jour avec succès' });
    });
};

export const deleteAdmin = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM admin WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Admin supprimé avec succès' });
    });
};
*****

import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

export default db;




