import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

const migration2 = {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    await queryInterface.createTable('admins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER
      },
      username: {
        type: dataTypes.STRING,
        allowNull: false
      },
      password: {
        type: dataTypes.STRING,
        allowNull: false
      },
      email: {
        type: dataTypes.STRING,
        allowNull: false
      },
      matricula: {
        type: dataTypes.STRING(12), 
        allowNull: false,
        unique: true, 
      },
      createdAt: {
        allowNull: false,
        type: dataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: dataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('admins');
  }
};


export default migration2;