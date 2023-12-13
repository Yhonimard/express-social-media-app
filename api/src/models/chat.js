import { CHAT_BELONGS_TO_MANY_USER_CHAT_ALIAS, CHAT_BELONGS_TO_MANY_USER_CHAT_FK, CHAT_HAS_MANY_MESSAGE_ALIAS, CHAT_HAS_MANY_MESSAGE_FK, CHAT_MODEL_NAME, CHAT_TABLE_NAME, MESSAGE_MODEL_NAME, TABLE_META_ATTRIBUTES, TABLE_META_OPTIONS, USER_CHAT_MODEL_NAME, USER_MODEL_NAME, USER_TABLE_NAME } from "../fixtures/models";
import Sequelize, { Model } from "sequelize";

module.exports = (sequelize) => {
  class chat extends Model {

    static associate(models) {

      chat.belongsToMany(models[USER_MODEL_NAME], {
        foreignKey: CHAT_BELONGS_TO_MANY_USER_CHAT_FK,
        as: CHAT_BELONGS_TO_MANY_USER_CHAT_ALIAS,
        through: { model: USER_CHAT_MODEL_NAME }
      })

      chat.hasMany(models[MESSAGE_MODEL_NAME], {
        foreignKey: CHAT_HAS_MANY_MESSAGE_FK,
        as: CHAT_HAS_MANY_MESSAGE_ALIAS
      })

    }
  }
  chat.init({
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
      },
      onDelete: 'CASCADE',
    },
    ...TABLE_META_ATTRIBUTES

  }, {
    sequelize,
    modelName: CHAT_MODEL_NAME,
    tableName: CHAT_TABLE_NAME,
    ...TABLE_META_OPTIONS
  });
  return chat;
};