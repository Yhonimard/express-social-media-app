'use strict';
import {
  CHAT_TABLE_NAME,
  TABLE_META_ATTRIBUTES,
  TABLE_META_OPTIONS,
  USER_TABLE_NAME,
  USER_CHAT_TABLE_NAME,
  USER_CHAT_MODEL_NAME
} from '../fixtures/models';

import Sequelize, { Model } from "sequelize"

module.exports = (sequelize) => {
  class userChat extends Model {
    static associate(models) {
    }
  }
  userChat.init({

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

  }, {
    sequelize,
    modelName: USER_CHAT_MODEL_NAME,
    tableName: USER_CHAT_TABLE_NAME,
    ...TABLE_META_OPTIONS,
  });
  return userChat;
};