import { USER_TABLE_NAME, TABLE_META_ATTRIBUTES } from "../../fixtures/models";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.createTable(USER_TABLE_NAME, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      photo_profile: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ...TABLE_META_ATTRIBUTES,
    })

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE_NAME);
  },
};
