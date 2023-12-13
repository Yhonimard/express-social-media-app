'use strict';

import { USER_TABLE_NAME, CHAT_TABLE_NAME, TABLE_META_ATTRIBUTES, USER_CHAT_TABLE_NAME } from '../../fixtures/models';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_CHAT_TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: {
            tableName: USER_TABLE_NAME
          }
        },
        onDelete: 'CASCADE',
      },
      chat_id: {
        type: Sequelize.INTEGER,
        key: 'id',
        references: {
          model: {
            tableName: CHAT_TABLE_NAME,
          }
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      ...TABLE_META_ATTRIBUTES
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_CHAT_TABLE_NAME);
  }
};