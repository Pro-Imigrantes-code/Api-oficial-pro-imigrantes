// routes/publication.ts

import express from 'express';
import publicationController from '../controllers/publicationController';

const router = express.Router();

router.post('/publications', publicationController.createPublication);

export default router;
