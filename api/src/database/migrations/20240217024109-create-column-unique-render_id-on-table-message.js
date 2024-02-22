'use strict';

import { MESSAGE_TABLE_NAME } from "../../fixtures/models";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn(MESSAGE_TABLE_NAME, 'render_id', {
      allowNull: false,
      type: Sequelize.STRING,
    })

    queryInterface.addIndex(MESSAGE_TABLE_NAME, {
      fields: ['render_id'],
      unique: true,
      name: 'unique_message_render_id'
    })

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(MESSAGE_TABLE_NAME, 'render_id', {})
    await queryInterface.removeIndex(MESSAGE_TABLE_NAME, 'unique_message_render_id')
  }
};
