-- CreateTable
CREATE TABLE "chats" (
    "id" SERIAL NOT NULL,
    "club_id" UUID NOT NULL,
    "name" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "chats_club_id_created_at_idx" ON "chats"("club_id", "created_at");

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
