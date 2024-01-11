import Sequelize, { Model } from 'sequelize';
import { USER_TABLE_NAME, TABLE_META_ATTRIBUTES, USER_FRIEND_MODEL_NAME, USER_FRIEND_TABLE_NAME, TABLE_META_OPTIONS, USER_MODEL_NAME, USER_FRIEND_BELONGS_TO_USER_FOLLOWER_FK, USER_FRIEND_BELONGS_TO_USER_FOLLOWER_ALIAS, USER_FRIEND_BELONGS_TO_USER_FOLLOWING_ALIAS, USER_FRIEND_BELONGS_TO_USER_FOLLOWING_FK } from '../fixtures/models';
module.exports = (sequelize) => {
  class userFriend extends Model {
    static associate(models) {
      
      userFriend.belongsTo(models[USER_MODEL_NAME], {
        as: USER_FRIEND_BELONGS_TO_USER_FOLLOWER_ALIAS,
        foreignKey: USER_FRIEND_BELONGS_TO_USER_FOLLOWER_FK,
      })

      userFriend.belongsTo(models[USER_MODEL_NAME], {
        foreignKey: USER_FRIEND_BELONGS_TO_USER_FOLLOWING_FK,
        as: USER_FRIEND_BELONGS_TO_USER_FOLLOWING_ALIAS
      })

    }
  }
  userFriend.init({
    user_id: {
      type: Sequelize.INTEGER,
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
    sequelize,
    modelName: USER_FRIEND_MODEL_NAME,
    tableName: USER_FRIEND_TABLE_NAME,
    ...TABLE_META_OPTIONS
  });
  return userFriend;
};