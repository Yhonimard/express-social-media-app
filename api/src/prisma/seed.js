import bcrypt from "bcryptjs";
import db from "../config/db";


async function main() {

  await db.user.deleteMany()
  await db.post.deleteMany()
  await db.comment.deleteMany()

  const user1 = await db.user.create({
    data: {
      password: await bcrypt.hash("yhoni", 5),
      photoProfile: "storage/img_seed/photo-profile-1.jpg",
      username: "yhoni",
      profile: {
        create: {}
      }
    }
  })

  const user2 = await db.user.create({
    data: {
      password: await bcrypt.hash("admin", 5),
      photoProfile: "storage/img_seed/photo-profile-2.jpeg",
      username: "admin",
      profile: {
        create: {}
      }
    }
  })

  await db.post.createMany({
    data: [
      {
        authorId: user1.id,
        content: "rog strix pink",
        title: "beautiful laptop",
        image: "storage/img_seed/1.jpeg"
      },
      {
        authorId: user1.id,
        content: "rog rainbow",
        title: "greats laptop",
        image: "storage/img_seed/2.jpg"
      },
      {
        authorId: user2.id,
        content: "gpu rtx 3090",
        title: "best gpu for gaming and game development",
        image: "storage/img_seed/3.png"
      },
      {
        authorId: user2.id,
        content: "rog 2020",
        title: "best gaming laptop",
        image: "storage/img_seed/4.png"
      },
      {
        authorId: user1.id,
        content: "rog strix from top",
        title: "cool gaming laptop",
        image: "storage/img_seed/5.png"
      },
      {
        authorId: user1.id,
        content: "rog from back",
        title: "greats gaming laptop",
        image: "storage/img_seed/6.jpg"
      },
      {
        authorId: user1.id,
        content: "lenovo thinkpad",
        title: "this is laptop for programming",
        image: "storage/img_seed/7.jpeg"
      },
      {
        authorId: user1.id,
        content: "lenovo thinkpad 2023",
        title: "good for bussiness",
        image: "storage/img_seed/8.jpeg"
      },
      {
        authorId: user2.id,
        content: "rog with night club",
        title: "perfect combination",
        image: "storage/img_seed/9.jpeg"
      },
      {
        authorId: user2.id,
        content: "rog set gaming",
        title: "best laptop with mouse keyboard set",
        image: "storage/img_seed/10.jpg"
      },
      {
        authorId: user1.id,
        content: "old rog",
        title: "still reliable",
        image: "storage/img_seed/11.jpg"
      },
      {
        authorId: user1.id,
        content: "rog with cyan color",
        title: "beautifullls",
        image: "storage/img_seed/12.jpg"
      },

    ]
  })
}


main().then(() => {
  db.$disconnect()
})