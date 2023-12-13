"use-strict"
const {
  POST_TABLE_NAME,
  TABLE_META_ATTRIBUTES,
  USER_LIKE_POST_TABLE_NAME,
  USER_TABLE_NAME
} = require("../../fixtures/models")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_LIKE_POST_TABLE_NAME, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: {
            tableName: USER_TABLE_NAME,
          }
        },
        onDelete: "CASCADE"
      },

      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: {
            tableName: POST_TABLE_NAME,
          }
        },
        onDelete: "CASCADE"
      },
      ...TABLE_META_ATTRIBUTES,

    }, {
      uniqueKeys: {
        user_like_post_unique: {
          fields: ["user_id", "post_id"],
          customIndex: true
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_LIKE_POST_TABLE_NAME);
  }
};