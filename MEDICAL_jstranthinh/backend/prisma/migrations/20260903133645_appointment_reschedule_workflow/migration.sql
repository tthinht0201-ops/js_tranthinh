-- CreateEnum
CREATE TYPE "CancellationSource" AS ENUM ('PATIENT', 'DOCTOR', 'ADMIN');

-- AlterEnum
ALTER TYPE "AppointmentStatus" ADD VALUE 'NEEDS_RESCHEDULE';

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "cancellationSource" "CancellationSource",
ADD COLUMN     "relatedBlockedTimeId" UUID,
ADD COLUMN     "reschedulePreviousStatus" "AppointmentStatus",
ADD COLUMN     "rescheduleReason" VARCHAR(500);

-- CreateIndex
CREATE INDEX "Appointment_relatedBlockedTimeId_idx" ON "Appointment"("relatedBlockedTimeId");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_relatedBlockedTimeId_fkey" FOREIGN KEY ("relatedBlockedTimeId") REFERENCES "BlockedTime"("id") ON DELETE SET NULL ON UPDATE CASCADE;
