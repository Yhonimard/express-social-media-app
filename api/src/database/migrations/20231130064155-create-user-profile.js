import { USER_PROFILE_TABLE_NAME, TABLE_META_ATTRIBUTES, USER_TABLE_NAME, USER_PROFILE_BELONGS_TO_USER_ALIAS } from '../../fixtures/models';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_PROFILE_TABLE_NAME, {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.TEXT
      },
      birthday: {
        type: Sequelize.DATE,
      },
      bio: {
        type: Sequelize.TEXT,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: {
            tableName: USER_TABLE_NAME,
            as: USER_PROFILE_BELONGS_TO_USER_ALIAS
          },
        },
        onDelete: "CASCADE"
      },
      ...TABLE_META_ATTRIBUTES

    }, {});
  },
  async down(queryInterface) {
    await queryInterface.dropTable(USER_PROFILE_TABLE_NAME);
  }
};