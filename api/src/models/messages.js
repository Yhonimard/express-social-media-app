'use strict';
import Sequelize, { Model } from "sequelize";
import { CHAT_TABLE_NAME, USER_TABLE_NAME, TABLE_META_ATTRIBUTES, TABLE_META_OPTIONS, MESSAGE_MODEL_NAME, MESSAGE_TABLE_NAME, CHAT_MODEL_NAME, MESSAGE_BELONGS_TO_CHAT_FK, MESSAGE_BELONGS_TO_CHAT_ALIAS, USER_MODEL_NAME, MESSAGE_BELONGS_TO_RECEIVER_FK, MESSAGE_BELONGS_TO_RECEIVER_ALIAS, MESSAGE_BELONGS_TO_SENDER_FK, MESSAGE_BELONGS_TO_SENDER_ALIAS } from "../fixtures/models";
module.exports = (sequelize) => {
  class messages extends Model {
    static associate(models) {
      messages.belongsTo(models[CHAT_MODEL_NAME], {
        foreignKey: MESSAGE_BELONGS_TO_CHAT_FK,
        as: MESSAGE_BELONGS_TO_CHAT_ALIAS
      })
      messages.belongsTo(models[USER_MODEL_NAME], {
        foreignKey: MESSAGE_BELONGS_TO_RECEIVER_FK,
        as: MESSAGE_BELONGS_TO_RECEIVER_ALIAS
      })
      messages.belongsTo(models[USER_MODEL_NAME], {
        foreignKey: MESSAGE_BELONGS_TO_SENDER_FK,
        as: MESSAGE_BELONGS_TO_SENDER_ALIAS
      })
    }
  }
  messages.init({
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
    render_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ...TABLE_META_ATTRIBUTES
  }, {
    sequelize,
    modelName: MESSAGE_MODEL_NAME,
    tableName: MESSAGE_TABLE_NAME,
    ...TABLE_META_OPTIONS

  });
  return messages;
};