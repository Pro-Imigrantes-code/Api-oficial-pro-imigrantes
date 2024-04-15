import Publication, { PublicationAttributes } from '../models/publication';

class PublicationService {
    public async createPublication(data: PublicationAttributes): Promise<Publication> {
        return Publication.create(data);
    }

    public async listarPublications(): Promise<Publication[]> {
        try {
            const publications = await Publication.findAll();
            return publications;
        } catch (error) {
            console.error('Erro ao listar publicações:', error);
            throw error;
        }
    }
}

export default new PublicationService();
