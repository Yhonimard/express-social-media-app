import Sequelize, { Model } from "sequelize"
import {
  USER_TABLE_NAME,
  USER_PROFILE_BELONGS_TO_USER_ALIAS,
  USER_PROFILE_MODEL_NAME,
  TABLE_META_ATTRIBUTES,
  TABLE_META_OPTIONS,
  USER_PROFILE_TABLE_NAME,
  USER_MODEL_NAME,
  USER_PROFILE_BELONGS_TO_USER_FK
} from "../fixtures/models";

module.exports = (sequelize) => {
  class userProfile extends Model {

    static associate(models) {

      userProfile.belongsTo(models[USER_MODEL_NAME], {
        foreignKey: USER_PROFILE_BELONGS_TO_USER_FK,
        as: USER_PROFILE_BELONGS_TO_USER_ALIAS
      })

    }
  }
  userProfile.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.TEXT
    },
    birthday: {
      type: Sequelize.DATE,
    },
    bio: {
      type: Sequelize.TEXT,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        key: "id",
        model: {
          tableName: USER_TABLE_NAME,
          as: USER_PROFILE_BELONGS_TO_USER_ALIAS
        },
      },
      allowNull: false,
      onDelete: "CASCADE"
    },
    ...TABLE_META_ATTRIBUTES

  }, {
    sequelize,
    modelName: USER_PROFILE_MODEL_NAME,
    tableName: USER_PROFILE_TABLE_NAME,
    ...TABLE_META_OPTIONS,
  });
  return userProfile;
};