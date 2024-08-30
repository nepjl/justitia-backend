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
