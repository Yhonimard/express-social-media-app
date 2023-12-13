/*
  Warnings:

  - You are about to drop the `PostUserLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostUserLike" DROP CONSTRAINT "PostUserLike_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostUserLike" DROP CONSTRAINT "PostUserLike_userId_fkey";

-- DropTable
DROP TABLE "PostUserLike";

-- CreateTable
CREATE TABLE "user_post_like" (
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_post_like_pkey" PRIMARY KEY ("postId","userId")
);

-- AddForeignKey
ALTER TABLE "user_post_like" ADD CONSTRAINT "user_post_like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_post_like" ADD CONSTRAINT "user_post_like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
