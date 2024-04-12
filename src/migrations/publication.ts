import { QueryInterface, DataTypes } from 'sequelize';

const migration1 = {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    try {
      await queryInterface.createTable('publications', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: dataTypes.INTEGER
        },
        photo: {
          type: dataTypes.STRING,
          allowNull: false
        },
        date: {
          type: dataTypes.DATEONLY,
          allowNull: false
        },
        time: {
          type: dataTypes.TIME,
          allowNull: false
        },
        authorName: {
          type: dataTypes.STRING,
          allowNull: false
        },
        title: {
          type: dataTypes.STRING,
          allowNull: false
        },
        body: {
          type: dataTypes.TEXT,
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
  down: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.dropTable('publications');
      console.log('Migration down executed successfully.');
    } catch (error) {
      console.error('Error executing migration down:', error);
    }
  }
};

export default migration1;
