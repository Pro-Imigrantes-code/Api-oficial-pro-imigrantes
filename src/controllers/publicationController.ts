// controllers/publicationController.ts

import { Request, Response } from 'express';
import publicationService from '../services/publicationService';

class PublicationController {
    public async createPublication(req: Request, res: Response): Promise<void> {
        try {
            const { photo, date, time, authorName, title, body } = req.body;
            const publication = await publicationService.createPublication({ photo, date, time, authorName, title, body });
            res.status(201).json({ success: true, message: 'Publicação criada com sucesso', publication });
        } catch (error) {
            console.error('Erro ao criar publicação:', error);
            res.status(500).json({ success: false, message: 'Erro ao criar publicação' });
        }
    }
}

export default new PublicationController();
