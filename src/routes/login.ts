import express from 'express';
import {loginController} from '../controllers/loginController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.post('/login', loginController.login);
router.post('/loginAdm', loginController.loginAdm);
router.post('/createAdmin',authMiddleware, loginController.createAdmin);
router.get('/listarAdm',authMiddleware, loginController.listAllAdmins);
router.delete('/deletarAdm/:id', authMiddleware, loginController.deleteAdmin);

export default router;
