-- CreateTable: lịch làm việc ghi đè theo ngày cụ thể
CREATE TABLE "DoctorDateSchedule" (
    "id" UUID NOT NULL,
    "doctorId" UUID NOT NULL,
    "workDate" DATE NOT NULL,
    "startMinute" INTEGER NOT NULL,
    "endMinute" INTEGER NOT NULL,
    "slotMinutes" INTEGER NOT NULL DEFAULT 30,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "note" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "DoctorDateSchedule_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "DoctorDateSchedule_doctorId_workDate_idx"
ON "DoctorDateSchedule"("doctorId", "workDate");

CREATE UNIQUE INDEX "DoctorDateSchedule_doctorId_workDate_startMinute_endMinute_key"
ON "DoctorDateSchedule"("doctorId", "workDate", "startMinute", "endMinute");

ALTER TABLE "DoctorDateSchedule"
ADD CONSTRAINT "DoctorDateSchedule_doctorId_fkey"
FOREIGN KEY ("doctorId") REFERENCES "DoctorProfile"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

-- Quy trình mới: bệnh nhân đặt lịch được xác nhận ngay.
UPDATE "Appointment"
SET "status" = 'CONFIRMED'
WHERE "status" = 'PENDING';

ALTER TABLE "Appointment"
ALTER COLUMN "status" SET DEFAULT 'CONFIRMED';
