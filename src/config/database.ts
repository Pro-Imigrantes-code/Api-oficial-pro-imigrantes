import { DataTypes, Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import migration from '../migrations/userInfo';

dotenv.config();

const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env;
if (!DB_USER || !DB_HOST || !DB_DATABASE || !DB_PASSWORD || !DB_PORT) {
    console.error('Some environment variables are not defined.');
    process.exit(1); 
}

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: parseInt(DB_PORT)
});

async function runMigration(sequelize: Sequelize) { 
    try {
        await migration.up(sequelize.getQueryInterface(), DataTypes); 
        console.log('Migration executada com sucesso.');
    } catch (error) {
        console.error('Erro ao executar a migração:', error);
    }
}

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection successful!');
        await runMigration(sequelize);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
})();

export { sequelize };
