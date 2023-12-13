import bcrypt from "bcryptjs"
import { USER_TABLE_NAME } from "../../fixtures/models"
import { UserProfile as userProfileRepo } from "../../models"


/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(USER_TABLE_NAME)

    await queryInterface.bulkInsert(USER_TABLE_NAME, [
      {
        username: "yhoni",
        password: await bcrypt.hash("yhoni", 5),
        photo_profile: "storage/img_seed/photo-profile-1.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "admin",
        password: await bcrypt.hash("admin", 5),
        photo_profile: "storage/img_seed/photo-profile-2.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "yhonimard",
        password: await bcrypt.hash("yhonimard", 5),
        photo_profile: "storage/img_seed/photo-profile-3.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "jonoh",
        password: await bcrypt.hash("jonoh", 5),
        photo_profile: "storage/img_seed/photo-profile-4.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      }
    ],{})


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(USER_TABLE_NAME);
  }
};
