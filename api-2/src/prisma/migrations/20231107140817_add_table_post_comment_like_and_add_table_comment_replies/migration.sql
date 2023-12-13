-- CreateTable
CREATE TABLE "post_comment_like" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "post_comment_like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_replies" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "comment_replies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "post_comment_like_userId_commentId_idx" ON "post_comment_like"("userId", "commentId");

-- CreateIndex
CREATE INDEX "comment_replies_userid_commentId_idx" ON "comment_replies"("userid", "commentId");

-- AddForeignKey
ALTER TABLE "post_comment_like" ADD CONSTRAINT "post_comment_like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_comment_like" ADD CONSTRAINT "post_comment_like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_replies" ADD CONSTRAINT "comment_replies_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_replies" ADD CONSTRAINT "comment_replies_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
