// models/publication.ts

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database'; 

export interface PublicationAttributes {
    id?: number;
    photo: string;
    date: Date;
    time: string;
    authorName: string;
    title: string;
    body: string;
}

class Publication extends Model<PublicationAttributes> implements PublicationAttributes {
    public id!: number;
    public photo!: string;
    public date!: Date;
    public time!: string;
    public authorName!: string;
    public title!: string;
    public body!: string;
}

Publication.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    authorName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'publications'
});

export default Publication;
