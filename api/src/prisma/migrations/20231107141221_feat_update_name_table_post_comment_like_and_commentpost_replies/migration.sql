/*
  Warnings:

  - You are about to drop the `comment_replies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_comment_like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment_replies" DROP CONSTRAINT "comment_replies_commentId_fkey";

-- DropForeignKey
ALTER TABLE "comment_replies" DROP CONSTRAINT "comment_replies_userid_fkey";

-- DropForeignKey
ALTER TABLE "post_comment_like" DROP CONSTRAINT "post_comment_like_commentId_fkey";

-- DropForeignKey
ALTER TABLE "post_comment_like" DROP CONSTRAINT "post_comment_like_userId_fkey";

-- DropTable
DROP TABLE "comment_replies";

-- DropTable
DROP TABLE "post_comment_like";

-- CreateTable
CREATE TABLE "comment_post_like" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "comment_post_like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_post_replies" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "comment_post_replies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "comment_post_like_userId_commentId_idx" ON "comment_post_like"("userId", "commentId");

-- CreateIndex
CREATE INDEX "comment_post_replies_userid_commentId_idx" ON "comment_post_replies"("userid", "commentId");

-- AddForeignKey
ALTER TABLE "comment_post_like" ADD CONSTRAINT "comment_post_like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_post_like" ADD CONSTRAINT "comment_post_like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_post_replies" ADD CONSTRAINT "comment_post_replies_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_post_replies" ADD CONSTRAINT "comment_post_replies_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
