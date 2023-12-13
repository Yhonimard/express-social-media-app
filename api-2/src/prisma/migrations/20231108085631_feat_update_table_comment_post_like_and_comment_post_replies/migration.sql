/*
  Warnings:

  - A unique constraint covering the columns `[userId,commentId]` on the table `comment_post_like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userid,commentId]` on the table `comment_post_replies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "comment_post_like_userId_commentId_idx";

-- DropIndex
DROP INDEX "comment_post_replies_userid_commentId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "comment_post_like_userId_commentId_key" ON "comment_post_like"("userId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "comment_post_replies_userid_commentId_key" ON "comment_post_replies"("userid", "commentId");
