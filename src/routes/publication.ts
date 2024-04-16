import express from 'express';
import publicationController from '../controllers/publicationController';
import { authMiddleware } from '../middlewares/auth';
const router = express.Router();

router.post('/publications',  authMiddleware, publicationController.createPublication);
router.get('/publications', publicationController.listarPublications);
router.put('/publication/:editar')
export default router;
