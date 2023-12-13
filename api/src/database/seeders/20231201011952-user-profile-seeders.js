import { USER_PROFILE_TABLE_NAME } from "../../fixtures/models"
import { User } from "../../models"

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


    await queryInterface.bulkInsert(USER_PROFILE_TABLE_NAME, [
      {
        name: null,
        phone: null,
        birthday: null,
        bio: null,
        user_id: user1.id
      },
      {
        name: null,
        phone: null,
        birthday: null,
        bio: null,
        user_id: user2.id
      },
      {
        name: null,
        phone: null,
        birthday: null,
        bio: null,
        user_id: user3.id
      },
      {
        name: null,
        phone: null,
        birthday: null,
        bio: null,
        user_id: user4.id
      },
    ])

  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete(USER_PROFILE_TABLE_NAME)

  }
};
