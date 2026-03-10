/*
  Warnings:

  - A unique constraint covering the columns `[deviceId]` on the table `devices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "devices_deviceId_key" ON "devices"("deviceId");
