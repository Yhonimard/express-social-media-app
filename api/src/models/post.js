/* eslint-disable quotes */
import Sequelize, { Model } from 'sequelize';

import {
  COMMENT_MODEL_NAME,
  POST_BELONGS_TO_MANY_USER_LIKE_ALIAS,
  POST_BELONGS_TO_MANY_USER_LIKE_FK,
  POST_BELONGS_TO_USER_ALIAS,
  POST_BELONGS_TO_USER_FK,
  POST_HAS_MANY_COMMENT_ALIAS,
  POST_HAS_MANY_COMMENT_FK,
  POST_MODEL_NAME,
  POST_TABLE_NAME,
  TABLE_META_ATTRIBUTES,
  TABLE_META_OPTIONS,
  USER_LIKE_POST_MODEL_NAME,
  USER_MODEL_NAME,
  USER_TABLE_NAME
} from '../fixtures/models';
module.exports = (sequelize) => {
  class post extends Model {

    static associate(models) {

      post.belongsTo(models[USER_MODEL_NAME], {
        as: POST_BELONGS_TO_USER_ALIAS,
        foreignKey: POST_BELONGS_TO_USER_FK,
      })

      post.hasMany(models[COMMENT_MODEL_NAME], {
        foreignKey: POST_HAS_MANY_COMMENT_FK,
        as: POST_HAS_MANY_COMMENT_ALIAS
      })

      post.belongsToMany(models[USER_MODEL_NAME], {
        through: { model: USER_LIKE_POST_MODEL_NAME },
        foreignKey: POST_BELONGS_TO_MANY_USER_LIKE_FK,
        as: POST_BELONGS_TO_MANY_USER_LIKE_ALIAS
      })

    }
  }
  post.init({
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
  }, {
    sequelize,
    modelName: POST_MODEL_NAME,
    tableName: POST_TABLE_NAME,
    ...TABLE_META_OPTIONS
  });
  return post;
};

