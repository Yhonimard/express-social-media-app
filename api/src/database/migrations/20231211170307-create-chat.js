'use strict';

import { CHAT_TABLE_NAME, USER_TABLE_NAME, TABLE_META_ATTRIBUTES } from '../../fixtures/models';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CHAT_TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sender_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: {
            tableName: USER_TABLE_NAME
          },
        },
        onDelete: 'CASCADE',
      },
      receiver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: {
            tableName: USER_TABLE_NAME
          }
        }
      },
      ...TABLE_META_ATTRIBUTES
    }, {
      uniqueKeys: {
        unique_sender_id_receiver_id: {
          fields: ['sender_id', 'receiver_id'],
          customIndex: false
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CHAT_TABLE_NAME);
  }
};