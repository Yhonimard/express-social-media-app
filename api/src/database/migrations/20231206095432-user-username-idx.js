import { USER_TABLE_NAME } from "../../fixtures/models"

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    queryInterface.addIndex(USER_TABLE_NAME, {
      name: 'idx_user_username',
      fields: [Sequelize.fn('to_tsvector', 'english', Sequelize.col('username'))],
      using: 'gin',
    })
    queryInterface.addIndex(USER_TABLE_NAME, {
      fields: ['username'],
      unique: true,
      name: 'unique_user_username'
    })
  },
  async down(queryInterface, Sequelize) {
    queryInterface.removeIndex(USER_TABLE_NAME, 'idx_user_username')
    queryInterface.removeIndex(USER_TABLE_NAME, 'unique_user_username')
  }
};
