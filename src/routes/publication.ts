import express from 'express';
import publicationController from '../controllers/publicationController';

const router = express.Router();

router.post('/publications', publicationController.createPublication);
router.get('/publications', publicationController.listarPublications);

export default router;
