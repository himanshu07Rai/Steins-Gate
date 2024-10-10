/*
  Warnings:

  - You are about to drop the `club_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "club_users" DROP CONSTRAINT "club_users_club_id_fkey";

-- DropTable
DROP TABLE "club_users";

-- CreateTable
CREATE TABLE "club_members" (
    "id" SERIAL NOT NULL,
    "club_id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "club_members_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "club_members" ADD CONSTRAINT "club_members_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
