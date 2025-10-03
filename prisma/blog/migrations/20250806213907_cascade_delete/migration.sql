-- DropForeignKey
ALTER TABLE "public"."Comments" DROP CONSTRAINT "Comments_comment_author_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comments" DROP CONSTRAINT "Comments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Posts" DROP CONSTRAINT "Posts_author_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."RefreshTokens" DROP CONSTRAINT "RefreshTokens_user_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."Posts" ADD CONSTRAINT "Posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comments" ADD CONSTRAINT "Comments_comment_author_id_fkey" FOREIGN KEY ("comment_author_id") REFERENCES "public"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comments" ADD CONSTRAINT "Comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RefreshTokens" ADD CONSTRAINT "RefreshTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
