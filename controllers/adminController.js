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



