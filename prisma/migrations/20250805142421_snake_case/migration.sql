/*
  Warnings:

  - You are about to drop the column `hashedToken` on the `RefreshTokens` table. All the data in the column will be lost.
  - You are about to drop the column `hashedPassword` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hashed_token]` on the table `RefreshTokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashed_token` to the `RefreshTokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashed_password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."RefreshTokens_hashedToken_key";

-- AlterTable
ALTER TABLE "public"."RefreshTokens" DROP COLUMN "hashedToken",
ADD COLUMN     "hashed_token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "hashedPassword",
ADD COLUMN     "hashed_password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshTokens_hashed_token_key" ON "public"."RefreshTokens"("hashed_token");
