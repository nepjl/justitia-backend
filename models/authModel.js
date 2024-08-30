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
