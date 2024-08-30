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
