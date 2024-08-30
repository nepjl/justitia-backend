import express from 'express';
import { getAdmins, createAdmin, updateAdmin, deleteAdmin, getByIdAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.get('/', getAdmins);
router.get('/:id', getByIdAdmin);

router.post('/', createAdmin);

router.put('/:id', updateAdmin);

router.delete('/:id', deleteAdmin);


export default router;
