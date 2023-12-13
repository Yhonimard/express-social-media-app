
import {
  COMMENT_BELONGS_TO_PARENT_ALIAS,
  COMMENT_BELONGS_TO_PARENT_FK,
  COMMENT_BELONGS_TO_POST_ALIAS,
  COMMENT_BELONGS_TO_USER_ALIAS,
  COMMENT_TABLE_NAME,
  POST_TABLE_NAME,
  TABLE_META_ATTRIBUTES,
  USER_TABLE_NAME
} from "../../fixtures/models";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(COMMENT_TABLE_NAME, {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: {
            tableName: POST_TABLE_NAME,
            as: COMMENT_BELONGS_TO_POST_ALIAS,
          }
        },
        onDelete: "CASCADE"
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: {
            tableName: USER_TABLE_NAME,
            as: COMMENT_BELONGS_TO_USER_ALIAS,
          }
        },
        onDelete: "CASCADE"
      },
      parent_id: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: {
            tableName: COMMENT_TABLE_NAME,
            as: COMMENT_BELONGS_TO_PARENT_ALIAS
          }
        },
        onDelete: "CASCADE"
      },
      ...TABLE_META_ATTRIBUTES
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(COMMENT_TABLE_NAME);
  }
};