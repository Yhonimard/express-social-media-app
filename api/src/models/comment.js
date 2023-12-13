import Sequelize, { Model } from "sequelize";
import {
  COMMENT_BELONGS_TO_MANY_LIKE_USER_ALIAS,
  COMMENT_BELONGS_TO_MANY_LIKE_USER_FK,
  COMMENT_BELONGS_TO_PARENT_ALIAS,
  COMMENT_BELONGS_TO_PARENT_FK,
  COMMENT_BELONGS_TO_POST_ALIAS,
  COMMENT_BELONGS_TO_POST_FK,
  COMMENT_BELONGS_TO_USER_ALIAS,
  COMMENT_BELONGS_TO_USER_FK,
  COMMENT_HAS_MANY_CHILD_ALIAS,
  COMMENT_HAS_MANY_CHILD_FK,
  COMMENT_MODEL_NAME,
  COMMENT_TABLE_NAME,
  POST_MODEL_NAME,
  POST_TABLE_NAME,
  TABLE_META_ATTRIBUTES,
  TABLE_META_OPTIONS,
  USER_LIKE_COMMENT_MODEL_NAME,
  USER_MODEL_NAME,
  USER_TABLE_NAME
} from "../fixtures/models";

module.exports = (sequelize) => {
  class comment extends Model {

    static associate(models) {

      comment.belongsTo(models[USER_MODEL_NAME], {
        foreignKey: COMMENT_BELONGS_TO_USER_FK,
        as: COMMENT_BELONGS_TO_USER_ALIAS
      })

      comment.belongsTo(models[POST_MODEL_NAME], {
        foreignKey: COMMENT_BELONGS_TO_POST_FK,
        as: COMMENT_BELONGS_TO_POST_ALIAS
      })

      comment.hasMany(models[COMMENT_MODEL_NAME], {
        foreignKey: COMMENT_HAS_MANY_CHILD_FK,
        as: COMMENT_HAS_MANY_CHILD_ALIAS
      })

      comment.belongsTo(models[COMMENT_MODEL_NAME], {
        foreignKey: COMMENT_BELONGS_TO_PARENT_FK,
        as: COMMENT_BELONGS_TO_PARENT_ALIAS
      })

      comment.belongsToMany(models[USER_MODEL_NAME], {
        through: { model: USER_LIKE_COMMENT_MODEL_NAME },
        foreignKey: COMMENT_BELONGS_TO_MANY_LIKE_USER_FK,
        as: COMMENT_BELONGS_TO_MANY_LIKE_USER_ALIAS
      })

    }
  }
  comment.init({
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    post_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        key: "id",
        model: {
          tableName: POST_TABLE_NAME,
          as: COMMENT_BELONGS_TO_POST_ALIAS,
        }
      },
      onDelete: "CASCADE"
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        key: "id",
        model: {
          tableName: USER_TABLE_NAME,
          as: COMMENT_BELONGS_TO_USER_ALIAS,
        }
      },
      onDelete: "CASCADE"
    },
    parent_id: {
      type: Sequelize.INTEGER,
      references: {
        key: "id",
        model: {
          tableName: COMMENT_TABLE_NAME,
          as: COMMENT_BELONGS_TO_PARENT_ALIAS
        },
      },
      onDelete: "CASCADE"
    },
    ...TABLE_META_ATTRIBUTES
  }, {
    sequelize,
    modelName: COMMENT_MODEL_NAME,
    tableName: COMMENT_TABLE_NAME,
    ...TABLE_META_OPTIONS
  });
  return comment;
};