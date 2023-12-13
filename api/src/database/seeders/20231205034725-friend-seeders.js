import { USER_FRIEND_TABLE_NAME } from '../../fixtures/models';
import { UserFriend, User } from "../../models"

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {

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
    const user3 = await User.findOne({
      where: {
        username: "yhonimard"
      }
    })
    const user4 = await User.findOne({
      where: {
        username: "jonoh"
      }
    })


    queryInterface.bulkInsert(USER_FRIEND_TABLE_NAME, [
      {
        user_id: user2.id,
        friend_id: user1.id
      },
      {
        user_id: user3.id,
        friend_id: user1.id
      },
      {
        user_id: user4.id,
        friend_id: user1.id
      }
    ])

  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete(USER_FRIEND_TABLE_NAME)
  }
};
