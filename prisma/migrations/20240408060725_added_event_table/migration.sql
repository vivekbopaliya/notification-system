/*
  Warnings:

  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DONE', 'UPCOMING');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('BIRTHDAY', 'MARRIAGE', 'PARTY', 'OTHERS');

-- DropTable
DROP TABLE "payments";

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'UPCOMING',
    "date" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RandomReminder" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "RandomReminder_pkey" PRIMARY KEY ("id")
);
