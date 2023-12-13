import { USER_LIKE_POST_TABLE_NAME } from "../../fixtures/models"
import { User, Post } from "../../models"



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user1 = await User.findOne({
      where: {
        username: "yhoni"
      }
    })

    const post1 = await Post.findOne({
      where: {
        title: "lenovo thinkpad"
      }
    })


    await queryInterface.bulkInsert(USER_LIKE_POST_TABLE_NAME, [
      {
        user_id: user1.id,
        post_id: post1.id
      }
    ])

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(USER_LIKE_POST_TABLE_NAME, null, {});
  }
};
