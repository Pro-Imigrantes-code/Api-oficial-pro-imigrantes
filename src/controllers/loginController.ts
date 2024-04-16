import { Request, Response } from 'express';
import { loginService } from '../services/loginService';

import User from '../models/user';

class LoginController {
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            const result = await loginService.login(username, password);
            const existingUser = await User.findOne({ where: { email: result.userInfo.email, integralizacao: result.userInfo.integralizacao } });

            if (existingUser) {
                res.status(200).json({ message: 'Usuário encontrado', token: result.token });
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

            res.status(200).json({ message: 'Login bem-sucedido', token: result.token, userInfo: newUser });
        } catch (error) {
            console.error("Erro durante o login:", error);
            let errorMessage = 'Erro durante o login';
            if (error instanceof Error) {
                errorMessage = error.message || errorMessage;
            }
            res.status(500).json({ success: false, message: errorMessage });
        }
    }
    public async createAdmin(req: Request, res: Response) {
        try {
            const adminData = req.body;
            const newAdmin = await loginService.addAdmin(adminData); 
            res.status(201).send({ message: "Admin created successfully", data: newAdmin });
        } catch (error) {
            res.status(500).send({ message: "Error creating admin" });
        }
    }

    public async listAllAdmins(req: Request, res: Response) {
        try {
            const admins = await loginService.getAllAdmins(); 
            res.status(200).json(admins);
        } catch (error) {
            res.status(500).send({ message: "Error retrieving admins"});
        }
    }
    public loginAdm(req: Request, res: Response) {
        const { username, password } = req.body;

        if (username === "admin" && password === "admin123") {
            res.status(200).send({ message: "Login successful" });
        } else {
            res.status(401).send({ message: "Invalid credentials" });
        }
    }

    public async deleteAdmin(req: Request, res: Response) {
        const { email } = req.params;
        try {
            const deleted = await loginService.deleteAdmin(email);
            if (deleted) {
                res.status(200).send({ message: "Admin deleted successfully" });
            } else {
                res.status(404).send({ message: "Admin not found" });
            }
        } catch (error) {
            res.status(500).send({ message: "Error deleting admin" });
        }
    }
}

export const loginController = new LoginController();
