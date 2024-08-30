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


app.use('/api/admin', admin);
app.use('/api/auth', auth);
app.use('/api/plainte', plainte);
app.use('/api/user', user);

export default app;
