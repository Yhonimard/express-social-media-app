import { USER_CHAT_TABLE_NAME } from '../../fixtures/models';
import { Chat, User } from '../../models'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {

    const user1 = await User.findOne({
      where: {
        username: 'yhoni'
      },
      attributes: ['id']
    })

    const user2 = await User.findOne({
      where: {
        username: 'admin'
      },
      attributes: ['id']
    })

    const user3 = await User.findOne({
      where: {
        username: 'yhonimard'
      },
      attributes: ['id']
    })

    const chat1 = await Chat.create({
      sender_id: user1.id,
      receiver_id: user2.id
    })

    const chat2 = await Chat.create({
      sender_id: user1.id,
      receiver_id: user3.id
    })


    await queryInterface.bulkInsert(USER_CHAT_TABLE_NAME, [
      {
        user_id: user1.id,
        chat_id: chat1.id,
        created_at: Sequelize.literal("NOW()"),
        updated_at: Sequelize.literal("NOW()"),
      },
      {
        user_id: user2.id,
        chat_id: chat1.id,
        created_at: Sequelize.literal("NOW()"),
        updated_at: Sequelize.literal("NOW()"),
      },
      {
        user_id: user1.id,
        chat_id: chat2.id,
        created_at: Sequelize.literal("NOW()"),
        updated_at: Sequelize.literal("NOW()"),
      },
      {
        user_id: user3.id,
        chat_id: chat2.id,
        created_at: Sequelize.literal("NOW()"),
        updated_at: Sequelize.literal("NOW()"),
      },

    ])

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(USER_CHAT_TABLE_NAME)
  }
};
