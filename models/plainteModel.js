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
