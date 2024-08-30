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
