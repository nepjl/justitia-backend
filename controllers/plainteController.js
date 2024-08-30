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
