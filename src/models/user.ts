import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database'; // Importe a instância sequelize corretamente

interface UserAttributes {
    id?: number;
    nome: string;
    matricula: string;
    curso: string;
    nivel: string;
    status: string;
    email: string;
    entrada: string;
    integralizacao: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public nome!: string;
    public matricula!: string;
    public curso!: string;
    public nivel!: string;
    public status!: string;
    public email!: string;
    public entrada!: string;
    public integralizacao!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    matricula: {
        type: DataTypes.STRING,
        allowNull: false
    },
    curso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nivel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    entrada: {
        type: DataTypes.STRING,
        allowNull: false
    },
    integralizacao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize: sequelize, 
    tableName: 'users'
});

export default User;
