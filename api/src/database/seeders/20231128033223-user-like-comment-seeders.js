import { User, Comment } from "../../models"
import { USER_LIKE_COMMENT_TABLE_NAME } from "../../fixtures/models";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const user1 = await User.findOne({
      where: {
        username: "yhoni"
      }
    })
    const comment1 = await Comment.findOne({
      where: {
        title: "yeah its greats"
      }
    })

    const childComment1 = await Comment.findOne({
      where: {
        title: "gg bangg"
      }
    })

    await queryInterface.bulkInsert(USER_LIKE_COMMENT_TABLE_NAME, [
      {
        user_id: user1.id,
        comment_id: comment1.id
      },
      {
        user_id: user1.id,
        comment_id: childComment1.id
      },
    ])

  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(USER_LIKE_COMMENT_TABLE_NAME)
  }
};
