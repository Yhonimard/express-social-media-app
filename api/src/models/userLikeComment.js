'use strict';
import Sequelize, { Model } from "sequelize";
import {
  COMMENT_TABLE_NAME,
  USER_LIKE_COMMENT_MODEL_NAME,
  USER_LIKE_COMMENT_TABLE_NAME,
  USER_TABLE_NAME,
  TABLE_META_ATTRIBUTES,
  TABLE_META_OPTIONS
} from "../fixtures/models";
module.exports = (sequelize) => {
  class userLikeComment extends Model {

    static associate(models) {
    }
  }
  userLikeComment.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: USER_TABLE_NAME,
        },
        key: "id",
      },
      onDelete: "CASCADE"
    },
    comment_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: COMMENT_TABLE_NAME,
        },
        key: "id",
      },
      onDelete: "CASCADE"
    },
    ...TABLE_META_ATTRIBUTES
  }, {
    sequelize,
    modelName: USER_LIKE_COMMENT_MODEL_NAME,
    tableName: USER_LIKE_COMMENT_TABLE_NAME,
    ...TABLE_META_OPTIONS
  });
  return userLikeComment;
};