import { Request, Response } from 'express';
import { loginService } from '../services/loginService';
import { LoginData } from '../models/loginModel'; 

export const loginController = {
    login: async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body as LoginData; 
            const token = await loginService.login(username, password);
            res.status(200).json({ success: true, message: 'Login bem-sucedido', token });
        } catch (error) {
            console.error("Erro durante o login:", error);
            res.status(500).json({ success: false, message: 'Erro durante o login' });
        }
    }
};
