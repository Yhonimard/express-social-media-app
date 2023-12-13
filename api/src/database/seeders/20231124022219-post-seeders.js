'use strict';

import { POST_TABLE_NAME } from "../../fixtures/models";
import { User } from "../../models/"

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(POST_TABLE_NAME)

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
    Sequelize.literal("NOW()")
    await queryInterface.bulkInsert(POST_TABLE_NAME,
      [
        {
          title: "lenovo thinkpad",
          content: "good laptop for bussines",
          image: "storage/img_seed/1.jpeg",
          user_id: user1.id,
          created_at: Sequelize.literal("NOW()"),
          updated_at: Sequelize.literal("NOW()")
        },
        {
          title: "asus rog",
          content: "good laptop for gaming",
          image: "storage/img_seed/2.jpg",
          user_id: user1.id,
          created_at: Sequelize.literal("NOW()"),
          updated_at: Sequelize.literal("NOW()")
        },
        {
          title: "geforce rtx 3080",
          content: "extreme gpu for gaming",
          image: "storage/img_seed/3.png",
          user_id: user2.id,
          created_at: Sequelize.literal("NOW()"),
          updated_at: Sequelize.literal("NOW()")
        },
        {
          title: "rog strix",
          content: "beautiful laptop",
          image: "storage/img_seed/4.png",
          user_id: user2.id,
          created_at: Sequelize.literal("NOW()"),
          updated_at: Sequelize.literal("NOW()")
        },
        {
          title: "rog strix 2",
          content: "good laptop",
          image: "storage/img_seed/5.png",
          user_id: user3.id,
          created_at: Sequelize.literal("NOW()"),
          updated_at: Sequelize.literal("NOW()")
        },
        {
          title: "rog strix purple",
          content: "best price laptop",
          image: "storage/img_seed/6.jpg",
          user_id: user3.id,
          created_at: Sequelize.literal("NOW()"),
          updated_at: Sequelize.literal("NOW()")
        },
        {
          title: "fan cpu rgb",
          content: "good controlled fan",
          image: "storage/img_seed/7.jpg",
          user_id: user4.id,
          created_at: Sequelize.literal("NOW()"),
          updated_at: Sequelize.literal("NOW()")
        },
        {
          title: "lenovo thinkpad x1",
          content: "carbon laptop!!",
          image: "storage/img_seed/8.jpeg",
          user_id: user4.id,
          created_at: Sequelize.literal("NOW()"),
          updated_at: Sequelize.literal("NOW()")
        },
        {
          title: "nigth club",
          content: "rog with nite club",
          image: "storage/img_seed/9.jpeg",
          user_id: user1.id,
          created_at: Sequelize.literal("NOW()"),
          updated_at: Sequelize.literal("NOW()")
        },
        {
          title: "full set gaming asus rog",
          content: "cheapers set gaming",
          image: "storage/img_seed/10.jpg",
          user_id: user2.id,
          created_at: Sequelize.literal("NOW()"),
          updated_at: Sequelize.literal("NOW()")
        },
        {
          title: "asus rog with rtx",
          content: "csgo with rog",
          image: "storage/img_seed/11.jpg",
          user_id: user3.id,
          created_at: Sequelize.literal("NOW()"),
          updated_at: Sequelize.literal("NOW()")
        },
        {
          title: "prabowo subianto",
          content: "the next president",
          image: "storage/img_seed/12.jpg",
          user_id: user4.id,
          created_at: Sequelize.literal("NOW()"),
          updated_at: Sequelize.literal("NOW()")
        },
      ]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(POST_TABLE_NAME);
  }
};
