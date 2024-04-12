import Publication, { PublicationAttributes } from '../models/publication';


class PublicationService {
    public async createPublication(data: PublicationAttributes): Promise<Publication> {
        return Publication.create(data);
    }
}

export default new PublicationService();
