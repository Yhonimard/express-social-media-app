import {
  POST_BELONGS_TO_USER_ALIAS,
  POST_TABLE_NAME,
  TABLE_META_ATTRIBUTES,
  USER_TABLE_NAME
} from '../../fixtures/models';
"use strict";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(POST_TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: {
            tableName: USER_TABLE_NAME,
            as: POST_BELONGS_TO_USER_ALIAS
          },
        },
        onDelete: "CASCADE"
      },
      ...TABLE_META_ATTRIBUTES
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(POST_TABLE_NAME);
  }
};