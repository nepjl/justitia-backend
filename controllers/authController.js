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
