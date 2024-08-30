import express from 'express';
import { getPlaintes, createPlainte, updatePlainte, deletePlainte } from '../controllers/plainteController.js';

const router = express.Router();

router.get('/', getPlaintes);
router.post('/', createPlainte);
router.put('/:id', updatePlainte);
router.delete('/:id', deletePlainte);

export default router;


