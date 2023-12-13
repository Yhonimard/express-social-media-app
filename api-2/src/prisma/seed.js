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

  const user3 = await db.user.create({
    data: {
      password: await bcrypt.hash("jonoh", 5),
      photoProfile: "storage/img_seed/photo-profile-3.jpeg",
      username: "jonoh",
      profile: {
        create: {}
      }
    }
  })

  const user4 = await db.user.create({
    data: {
      password: await bcrypt.hash("yhonimard", 5),
      photoProfile: "storage/img_seed/photo-profile-4.jpeg",
      username: "yhonimard",
      profile: {
        create: {}
      }
    }
  })

  await db.userFriend.createMany({
    data: [
      {
        senderId: user2.id,
        receiverId: user1.id
      },
      {
        senderId: user3.id,
        receiverId: user1.id
      },
      {
        senderId: user4.id,
        receiverId: user1.id
      },
      {
        senderId: user1.id,
        receiverId: user2.id,
        confirmed: true
      },
      {
        senderId: user1.id,
        receiverId: user3.id,
        confirmed: true
      },
      {
        senderId: user1.id,
        receiverId: user4.id,
        confirmed: true
      }
    ]
  })

  await db.post.createMany({
    data: [
      {
        authorId: user2.id,
        content: "rog strix pink",
        title: "beautiful laptop",
        image: "storage/img_seed/1.jpeg"
      },
      {
        authorId: user2.id,
        content: "rog rainbow",
        title: "greats laptop",
        image: "storage/img_seed/2.jpg"
      },
      {
        authorId: user3.id,
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
        authorId: user3.id,
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
        authorId: user3.id,
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
        authorId: user3.id,
        content: "rog set gaming",
        title: "best laptop with mouse keyboard set",
        image: "storage/img_seed/10.jpg"
      },
      {
        authorId: user1.id,
        content: "old rog",
        title: "still reliable",
        image: "storage/img_seed/11.jpg",

      },
      {
        authorId: user2.id,
        content: "rog with cyan color",
        title: "beautifullls",
        image: "storage/img_seed/12.jpg",
      },
    ]
  })

  const posts = await db.post.findFirst({
    where: {
      authorId: user2.id,
      content: "rog rainbow",
      title: "greats laptop"
    }
  })

  const comments1 = await db.comment.create({
    data: {
      authorId: user2.id,
      postId: posts.id,
      title: "greatss",
    }
  })

  await db.comment.create({
    data: {
      authorId: user2.id,
      postId: posts.id,
      title: "ici kiwir",
    }
  })

  await db.comment.create({
    data: {
      authorId: user2.id,
      postId: posts.id,
      title: "good choice",
    }
  })


  await db.comment.createMany({
    data: [
      {
        authorId: user1.id,
        postId: posts.id,
        parentCommentId: comments1.id,
        title: "yeah its great 1"
      },
      {
        authorId: user1.id,
        postId: posts.id,
        parentCommentId: comments1.id,
        title: "yeah its great 2"
      },

    ]
  })

}


main().then(() => {
  db.$disconnect()
})