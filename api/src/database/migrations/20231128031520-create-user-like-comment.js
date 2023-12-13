import {
  COMMENT_TABLE_NAME,
  TABLE_META_ATTRIBUTES,
  USER_TABLE_NAME,
  USER_LIKE_COMMENT_TABLE_NAME
} from "../../fixtures/models";
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_LIKE_COMMENT_TABLE_NAME, {
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
          model: {
            tableName: USER_TABLE_NAME,
          },
          key: "id",
        },
        onDelete: "CASCADE"
      },
      comment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: COMMENT_TABLE_NAME,
          },
          key: "id",
        },
        onDelete: "CASCADE"
      },
      ...TABLE_META_ATTRIBUTES
    }, {
      uniqueKeys: {
        unique_user_like_comment: {
          fields: ['user_id', 'comment_id'],
          customIndex: true
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_LIKE_COMMENT_TABLE_NAME);
  }
};