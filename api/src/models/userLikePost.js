import Sequelize, { Model } from "sequelize";
import {
  POST_MODEL_NAME,
  POST_TABLE_NAME,
  TABLE_META_ATTRIBUTES,
  TABLE_META_OPTIONS,
  USER_LIKE_POST_BELONGS_TO_POST_ALIAS,
  USER_LIKE_POST_BELONGS_TO_POST_FK,
  USER_LIKE_POST_MODEL_NAME,
  USER_LIKE_POST_TABLE_NAME,
  USER_TABLE_NAME
} from "../fixtures/models";


module.exports = (sequelize) => {
  class userLikePost extends Model {
    static associate(models) {
      userLikePost.belongsTo(models[POST_MODEL_NAME], {
        foreignKey: USER_LIKE_POST_BELONGS_TO_POST_FK,
        as: USER_LIKE_POST_BELONGS_TO_POST_ALIAS
      })

    }
  }
  userLikePost.init({
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
        key: "id",
        model: {
          tableName: USER_TABLE_NAME,
        }
      },
      onDelete: "CASCADE"
    },

    post_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        key: "id",
        model: {
          tableName: POST_TABLE_NAME,
        }
      },
      onDelete: "CASCADE"
    },
    ...TABLE_META_ATTRIBUTES
  }, {
    sequelize,
    modelName: USER_LIKE_POST_MODEL_NAME,
    tableName: USER_LIKE_POST_TABLE_NAME,
    ...TABLE_META_OPTIONS,
  });
  return userLikePost;
};