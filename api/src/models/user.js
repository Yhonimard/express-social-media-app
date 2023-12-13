import Sequelize from "sequelize";
import {
  CHAT_MODEL_NAME,
  COMMENT_MODEL_NAME,
  POST_MODEL_NAME,
  TABLE_META_ATTRIBUTES,
  TABLE_META_OPTIONS,
  USER_BELONGS_TO_MANY_FRIEND_ALIAS,
  USER_BELONGS_TO_MANY_FRIEND_FK,
  USER_BELONGS_TO_MANY_LIKE_COMMENT_ALIAS,
  USER_BELONGS_TO_MANY_LIKE_COMMENT_FK,
  USER_BELONGS_TO_MANY_POST_LIKE_ALIAS,
  USER_BELONGS_TO_MANY_POST_LIKE_FK,
  USER_BELONGS_TO_MANY_USER_CHAT_ALIAS,
  USER_BELONGS_TO_MANY_USER_CHAT_FK,
  USER_BELONGS_TO_MANY_USER_FRIEND_ALIAS,
  USER_BELONGS_TO_MANY_USER_FRIEND_FK,
  USER_CHAT_MODEL_NAME,
  USER_FRIEND_MODEL_NAME,
  USER_HAS_MANY_COMMENT_ALIAS,
  USER_HAS_MANY_COMMENT_FK,
  USER_HAS_MANY_POST_ALIAS,
  USER_HAS_MANY_POST_FK,
  USER_HAS_ONE_USER_PROFILE_ALIAS,
  USER_HAS_ONE_USER_PROFILE_FK,
  USER_LIKE_COMMENT_MODEL_NAME,
  USER_LIKE_POST_MODEL_NAME,
  USER_MODEL_NAME,
  USER_PROFILE_MODEL_NAME,
  USER_TABLE_NAME
} from "../fixtures/models";
import { Model } from "sequelize"

module.exports = (sequelize) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models[POST_MODEL_NAME], {
        as: USER_HAS_MANY_POST_ALIAS,
        foreignKey: USER_HAS_MANY_POST_FK,
      })

      user.hasMany(models[COMMENT_MODEL_NAME], {
        foreignKey: USER_HAS_MANY_COMMENT_FK,
        as: USER_HAS_MANY_COMMENT_ALIAS
      })

      user.belongsToMany(models[POST_MODEL_NAME], {
        through: { model: USER_LIKE_POST_MODEL_NAME },
        foreignKey: USER_BELONGS_TO_MANY_POST_LIKE_FK,
        as: USER_BELONGS_TO_MANY_POST_LIKE_ALIAS
      })

      user.belongsToMany(models[COMMENT_MODEL_NAME], {
        through: { model: USER_LIKE_COMMENT_MODEL_NAME },
        foreignKey: USER_BELONGS_TO_MANY_LIKE_COMMENT_FK,
        as: USER_BELONGS_TO_MANY_LIKE_COMMENT_ALIAS
      })

      user.hasOne(models[USER_PROFILE_MODEL_NAME], {
        foreignKey: USER_HAS_ONE_USER_PROFILE_FK,
        as: USER_HAS_ONE_USER_PROFILE_ALIAS,
      })

      user.belongsToMany(models[USER_MODEL_NAME], {
        foreignKey: USER_BELONGS_TO_MANY_FRIEND_FK,
        as: USER_BELONGS_TO_MANY_FRIEND_ALIAS,
        through: { model: USER_FRIEND_MODEL_NAME }
      })

      user.belongsToMany(models[USER_MODEL_NAME], {
        foreignKey: USER_BELONGS_TO_MANY_USER_FRIEND_FK,
        as: USER_BELONGS_TO_MANY_USER_FRIEND_ALIAS,
        through: { model: USER_FRIEND_MODEL_NAME }
      })

      user.belongsToMany(models[CHAT_MODEL_NAME], {
        through: { model: USER_CHAT_MODEL_NAME },
        foreignKey: USER_BELONGS_TO_MANY_USER_CHAT_FK,
        as: USER_BELONGS_TO_MANY_USER_CHAT_ALIAS,
      })

    }
  }
  user.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      photo_profile: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ...TABLE_META_ATTRIBUTES
    },
    {
      sequelize,
      modelName: USER_MODEL_NAME,
      tableName: USER_TABLE_NAME,
      ...TABLE_META_OPTIONS,
    }
  );

  user.afterCreate(async (user, opt) => {
    await sequelize.models[USER_PROFILE_MODEL_NAME].create({
      name: null,
      phone: null,
      birthday: null,
      bio: null,
      user_id: user.id
    })
  })

  return user;
};
