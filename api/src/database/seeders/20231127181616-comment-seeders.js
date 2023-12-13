import { COMMENT_TABLE_NAME } from "../../fixtures/models";
import { Post, User, Comment } from "../../models";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const post1 = await Post.findOne({
      where: {
        title: 'lenovo thinkpad'
      }
    })

    const user1 = await User.findOne({
      where: {
        username: "yhoni"
      }
    })

    const user2 = await User.findOne({
      where: {
        username: "admin"
      }
    })

    await queryInterface.bulkInsert(COMMENT_TABLE_NAME, [
      {
        title: "yeah its greats",
        post_id: post1.id,
        user_id: user1.id,
      },
      {
        title: "gg",
        post_id: post1.id,
        user_id: user2.id,
      },
    ])

    const parent1 = await Comment.findOne({
      where: {
        title: "yeah its greats"
      }
    })

    
    const parent2 = await Comment.findOne({
      where: {
        title: "gg"
      }
    })



    await queryInterface.bulkInsert(COMMENT_TABLE_NAME, [
      {
        title: "gg bangg",
        post_id: post1.id,
        user_id: user2.id,
        parent_id: parent1.id
      },
      {
        title: "of course",
        post_id: post1.id,
        user_id: user1.id,
        parent_id: parent2.id
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(COMMENT_TABLE_NAME, null, {});
  }
};
