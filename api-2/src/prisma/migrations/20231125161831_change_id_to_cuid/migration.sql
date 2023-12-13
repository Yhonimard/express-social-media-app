/*
  Warnings:

  - The primary key for the `comment_post_like` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "comment_post_like" DROP CONSTRAINT "comment_post_like_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "comment_post_like_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "comment_post_like_id_seq";
