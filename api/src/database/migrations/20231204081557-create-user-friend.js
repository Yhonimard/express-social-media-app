import { TABLE_META_ATTRIBUTES, TABLE_META_OPTIONS, USER_FRIEND_TABLE_NAME, USER_TABLE_NAME } from '../../fixtures/models';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_FRIEND_TABLE_NAME, {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: {
            tableName: USER_TABLE_NAME,
          },
        },
        onDelete: "CASCADE"
      },
      friend_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: {
            tableName: USER_TABLE_NAME,
          },
        },
        onDelete: "CASCADE"
      },
      confirm: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      ...TABLE_META_ATTRIBUTES
    }, {
      uniqueKeys: {
        user_id_friend_id: {
          fields: ['user_id', 'friend_id'],
          customIndex: true
        }
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable(USER_FRIEND_TABLE_NAME);
  }
};