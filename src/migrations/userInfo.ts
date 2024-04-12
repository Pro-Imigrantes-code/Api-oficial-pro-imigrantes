import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

const migration = {
    up: async (queryInterface:QueryInterface, dataTypes: typeof DataTypes) => {
      try {
        await queryInterface.createTable('users', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
          },
          nome: {
            type: dataTypes.STRING,
            allowNull: false
          },
          matricula: {
            type: dataTypes.STRING,
            allowNull: false
          },
          curso: {
            type: dataTypes.STRING,
            allowNull: false
          },
          nivel: {
            type: dataTypes.STRING,
            allowNull: false
          },
          status: {
            type: dataTypes.STRING,
            allowNull: false
          },
          email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
          },
          entrada: {
            type: dataTypes.STRING,
            allowNull: false
          },
          integralizacao: {
            type: dataTypes.STRING,
            allowNull: false
          },
          createdAt: {
            allowNull: false,
            type: dataTypes.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            allowNull: false,
            type: dataTypes.DATE,
            defaultValue: new Date()
        }
        });
        console.log('Migration up executed successfully.');
      } catch (error) {
        console.error('Error executing migration up:', error);
      }
    },
    down: async (queryInterface:QueryInterface, dataTypes: typeof DataTypes) => {
      try {
        await queryInterface.dropTable('users');
        console.log('Migration down executed successfully.');
      } catch (error) {
        console.error('Error executing migration down:', error);
      }
    }
  };
  
  export default migration;
  