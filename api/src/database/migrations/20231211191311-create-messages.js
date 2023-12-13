import { CHAT_TABLE_NAME, USER_TABLE_NAME, TABLE_META_ATTRIBUTES, MESSAGE_TABLE_NAME } from '../../fixtures/models';


/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(MESSAGE_TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      media: {
        type: Sequelize.STRING,
      },
      text: {
        type: Sequelize.TEXT
      },
      chat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: {
            tableName: CHAT_TABLE_NAME
          }
        },
        onDelete: "CASCADE"
      },
      sender_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: {
            tableName: USER_TABLE_NAME,
          }
        },
        onDelete: "CASCADE"
      },
      receiver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: {
            tableName: USER_TABLE_NAME
          },
        },
        onDelete: 'CASCADE'
      },
      ...TABLE_META_ATTRIBUTES
    }, {
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable(MESSAGE_TABLE_NAME);
  }
};