import { Request, Response } from 'express';
import { loginService } from '../services/loginService';
import User from '../models/user';

class LoginController {
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            const result = await loginService.login(username, password);
            const existingUser = await User.findOne({ where: { email: result.userInfo.email } });

            if (existingUser) {
                res.status(200).json({ success: true, message: 'Usuário encontrado', token: result.token });
                return; 
            }
            const newUser = await User.create({
                nome: result.userInfo.nome,
                matricula: result.userInfo.matricula,
                curso: result.userInfo.curso,
                nivel: result.userInfo.nivel,
                status: result.userInfo.status,
                email: result.userInfo.email,
                entrada: result.userInfo.entrada,
                integralizacao: result.userInfo.integralizacao,
            });

            res.status(200).json({ success: true, message: 'Login bem-sucedido', token: result.token, userInfo: newUser });
        } catch (error) {
            console.error("Erro durante o login:", error);
            let errorMessage = 'Erro durante o login';
            if (error instanceof Error) {
                errorMessage = error.message || errorMessage;
            }
            res.status(500).json({ success: false, message: errorMessage });
        }
    }
}

export const loginController = new LoginController();
