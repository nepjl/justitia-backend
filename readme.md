
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



