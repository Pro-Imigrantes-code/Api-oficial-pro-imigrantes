import { Model, DataTypes, Sequelize } from 'sequelize';

export class Admin extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public email!: string;
    public matricula!: string; 
    public createdAt!: Date;
    public updatedAt!: Date;
}

export function initAdmin(sequelize: Sequelize): void {
    Admin.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        matricula: {
            type: DataTypes.STRING(128), // Assumindo que matricula é uma string
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'admins',
        sequelize: sequelize,
        timestamps: true
    });
}
