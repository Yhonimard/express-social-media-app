'use strict';
import { POST_TABLE_NAME } from '../../fixtures/models';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    queryInterface.addIndex(POST_TABLE_NAME, {
      fields: [Sequelize.fn('to_tsvector', 'english', Sequelize.col('title')), Sequelize.fn('to_tsvector', 'english', Sequelize.col('content'))],
      using: 'gin',
      name: 'idx_post_title_content'
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeIndex(POST_TABLE_NAME, 'idx_post_title_content')
  }
};
