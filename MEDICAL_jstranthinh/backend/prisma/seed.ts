import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

import {
  DayOfWeek,
  PrismaClient,
  UserRole,
} from "../src/generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

const upsertUser = async (params: {
  email: string;
  password: string;
  role: UserRole;
}) => {
  const passwordHash = await bcrypt.hash(
    params.password,
    12,
  );

  return prisma.user.upsert({
    where: {
      email: params.email,
    },

    update: {
      passwordHash,
      role: params.role,
      isActive: true,
    },

    create: {
      email: params.email,
      passwordHash,
      role: params.role,
      isActive: true,
    },
  });
};

const main = async () => {
  /*
   * ============================================================
   * ADMIN
   * ============================================================
   */

  await upsertUser({
    email: "admin@medical.local",
    password: "Admin@123456",
    role: UserRole.ADMIN,
  });

  /*
   * ============================================================
   * RECEPTIONIST
   * ============================================================
   */

  await upsertUser({
    email: "reception@medical.local",
    password: "Reception@123456",
    role: UserRole.RECEPTIONIST,
  });

  /*
   * ============================================================
   * SPECIALTIES
   * ============================================================
   */

  const specialtySeeds = [
    [
      "Nội tổng quát",
      "Khám và tư vấn các bệnh lý nội khoa thường gặp.",
    ],
    [
      "Nhi",
      "Khám và theo dõi sức khỏe trẻ em.",
    ],
    [
      "Da liễu",
      "Khám các vấn đề về da, tóc và móng.",
    ],
    [
      "Thần kinh",
      "Khám các triệu chứng và bệnh lý liên quan hệ thần kinh.",
    ],
    [
      "Tim mạch",
      "Khám và theo dõi các vấn đề tim mạch, huyết áp.",
    ],
    [
      "Tiêu hóa",
      "Khám các vấn đề về dạ dày, ruột và hệ tiêu hóa.",
    ],
    [
      "Hô hấp",
      "Khám các bệnh lý đường hô hấp và phổi.",
    ],
    [
      "Tâm lý",
      "Tư vấn, hỗ trợ các vấn đề tâm lý và sức khỏe tinh thần.",
    ],
  ] as const;

  const specialties = new Map<string, string>();

  for (const [name, description] of specialtySeeds) {
    const specialty =
      await prisma.specialty.upsert({
        where: {
          name,
        },

        update: {
          description,
          isActive: true,
        },

        create: {
          name,
          description,
          isActive: true,
        },
      });

    specialties.set(name, specialty.id);
  }

  /*
   * ============================================================
   * DOCTORS
   * ============================================================
   *
   * Mỗi chuyên khoa có 2 bác sĩ.
   *
   * Bác sĩ 1:
   * 08:00 - 12:00
   *
   * Bác sĩ 2:
   * 13:00 - 17:00
   *
   * Thứ 2 -> Thứ 6
   * Slot: 30 phút
   *
   * Tất cả dùng password:
   * Doctor@123456
   * ============================================================
   */

  const doctorSeeds = [
    /*
     * --------------------------------------------------------
     * NỘI TỔNG QUÁT
     * --------------------------------------------------------
     */

    {
      specialty: "Nội tổng quát",
      email: "doctor@medical.local",
      fullName: "BS. Nguyễn Minh An",
      phone: "0900000101",
      experienceYears: 8,
      shift: "MORNING",
      bio: "Bác sĩ Nội tổng quát, có kinh nghiệm khám sức khỏe ban đầu và theo dõi các bệnh lý nội khoa thường gặp.",
    },

    {
      specialty: "Nội tổng quát",
      email: "doctor.noi2@medical.local",
      fullName: "BS. Trần Hoàng Phúc",
      phone: "0900000102",
      experienceYears: 6,
      shift: "AFTERNOON",
      bio: "Bác sĩ Nội tổng quát, chuyên tư vấn và quản lý các bệnh lý nội khoa ở người trưởng thành.",
    },

    /*
     * --------------------------------------------------------
     * NHI
     * --------------------------------------------------------
     */

    {
      specialty: "Nhi",
      email: "doctor.nhi1@medical.local",
      fullName: "BS. Lê Thu Hà",
      phone: "0900000103",
      experienceYears: 9,
      shift: "MORNING",
      bio: "Bác sĩ Nhi, có kinh nghiệm khám và theo dõi sức khỏe trẻ sơ sinh, trẻ nhỏ và trẻ em.",
    },

    {
      specialty: "Nhi",
      email: "doctor.nhi2@medical.local",
      fullName: "BS. Phạm Gia Bảo",
      phone: "0900000104",
      experienceYears: 5,
      shift: "AFTERNOON",
      bio: "Bác sĩ Nhi, tư vấn chăm sóc sức khỏe và theo dõi sự phát triển của trẻ em.",
    },

    /*
     * --------------------------------------------------------
     * DA LIỄU
     * --------------------------------------------------------
     */

    {
      specialty: "Da liễu",
      email: "doctor.dalieu1@medical.local",
      fullName: "BS. Võ Ngọc Anh",
      phone: "0900000105",
      experienceYears: 7,
      shift: "MORNING",
      bio: "Bác sĩ Da liễu, khám và tư vấn các vấn đề thường gặp về da, tóc và móng.",
    },

    {
      specialty: "Da liễu",
      email: "doctor.dalieu2@medical.local",
      fullName: "BS. Đặng Thanh Tâm",
      phone: "0900000106",
      experienceYears: 6,
      shift: "AFTERNOON",
      bio: "Bác sĩ Da liễu, có kinh nghiệm theo dõi và điều trị các bệnh lý da liễu thường gặp.",
    },

    /*
     * --------------------------------------------------------
     * THẦN KINH
     * --------------------------------------------------------
     */

    {
      specialty: "Thần kinh",
      email: "doctor.thankinh1@medical.local",
      fullName: "BS. Bùi Quốc Huy",
      phone: "0900000107",
      experienceYears: 10,
      shift: "MORNING",
      bio: "Bác sĩ Thần kinh, khám các triệu chứng đau đầu, chóng mặt, mất ngủ và các vấn đề liên quan hệ thần kinh.",
    },

    {
      specialty: "Thần kinh",
      email: "doctor.thankinh2@medical.local",
      fullName: "BS. Nguyễn Hải Yến",
      phone: "0900000108",
      experienceYears: 8,
      shift: "AFTERNOON",
      bio: "Bác sĩ Thần kinh, có kinh nghiệm tư vấn và theo dõi các bệnh lý thần kinh thường gặp.",
    },

    /*
     * --------------------------------------------------------
     * TIM MẠCH
     * --------------------------------------------------------
     */

    {
      specialty: "Tim mạch",
      email: "doctor.timmach1@medical.local",
      fullName: "BS. Trần Đức Long",
      phone: "0900000109",
      experienceYears: 12,
      shift: "MORNING",
      bio: "Bác sĩ Tim mạch, khám và theo dõi huyết áp, tim mạch và các yếu tố nguy cơ tim mạch.",
    },

    {
      specialty: "Tim mạch",
      email: "doctor.timmach2@medical.local",
      fullName: "BS. Lê Minh Thư",
      phone: "0900000110",
      experienceYears: 9,
      shift: "AFTERNOON",
      bio: "Bác sĩ Tim mạch, tư vấn và quản lý các bệnh lý tim mạch thường gặp.",
    },

    /*
     * --------------------------------------------------------
     * TIÊU HÓA
     * --------------------------------------------------------
     */

    {
      specialty: "Tiêu hóa",
      email: "doctor.tieuhoa1@medical.local",
      fullName: "BS. Phạm Khánh Linh",
      phone: "0900000111",
      experienceYears: 8,
      shift: "MORNING",
      bio: "Bác sĩ Tiêu hóa, khám và tư vấn các vấn đề liên quan dạ dày, ruột và hệ tiêu hóa.",
    },

    {
      specialty: "Tiêu hóa",
      email: "doctor.tieuhoa2@medical.local",
      fullName: "BS. Võ Hoàng Nam",
      phone: "0900000112",
      experienceYears: 7,
      shift: "AFTERNOON",
      bio: "Bác sĩ Tiêu hóa, có kinh nghiệm quản lý các bệnh lý tiêu hóa thường gặp.",
    },

    /*
     * --------------------------------------------------------
     * HÔ HẤP
     * --------------------------------------------------------
     */

    {
      specialty: "Hô hấp",
      email: "doctor.hohap1@medical.local",
      fullName: "BS. Nguyễn Tuấn Kiệt",
      phone: "0900000113",
      experienceYears: 9,
      shift: "MORNING",
      bio: "Bác sĩ Hô hấp, khám các bệnh lý đường hô hấp, ho kéo dài và các vấn đề về phổi.",
    },

    {
      specialty: "Hô hấp",
      email: "doctor.hohap2@medical.local",
      fullName: "BS. Trần Ngọc Mai",
      phone: "0900000114",
      experienceYears: 6,
      shift: "AFTERNOON",
      bio: "Bác sĩ Hô hấp, tư vấn và theo dõi các bệnh lý đường hô hấp thường gặp.",
    },

    /*
     * --------------------------------------------------------
     * TÂM LÝ
     * --------------------------------------------------------
     */

    {
      specialty: "Tâm lý",
      email: "doctor.tamly1@medical.local",
      fullName: "BS. Lê Quỳnh Anh",
      phone: "0900000115",
      experienceYears: 7,
      shift: "MORNING",
      bio: "Bác sĩ tư vấn tâm lý, hỗ trợ các vấn đề căng thẳng, lo âu, mất ngủ và sức khỏe tinh thần.",
    },

    {
      specialty: "Tâm lý",
      email: "doctor.tamly2@medical.local",
      fullName: "BS. Phạm Minh Khoa",
      phone: "0900000116",
      experienceYears: 5,
      shift: "AFTERNOON",
      bio: "Bác sĩ tư vấn tâm lý, hỗ trợ đánh giá và theo dõi các vấn đề sức khỏe tinh thần.",
    },
  ] as const;

  /*
   * ============================================================
   * WORK DAYS
   * ============================================================
   */

  const workDays = [
    DayOfWeek.MONDAY,
    DayOfWeek.TUESDAY,
    DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY,
    DayOfWeek.FRIDAY,
  ];

  /*
   * ============================================================
   * CREATE DOCTORS + SCHEDULES
   * ============================================================
   */

  for (const doctorSeed of doctorSeeds) {
    const specialtyId = specialties.get(
      doctorSeed.specialty,
    );

    if (!specialtyId) {
      throw new Error(
        `Missing specialty: ${doctorSeed.specialty}`,
      );
    }

    /*
     * Tạo / cập nhật User của bác sĩ.
     */

    const doctorUser = await upsertUser({
      email: doctorSeed.email,
      password: "Doctor@123456",
      role: UserRole.DOCTOR,
    });

    /*
     * Tạo / cập nhật DoctorProfile.
     */

    const doctor =
      await prisma.doctorProfile.upsert({
        where: {
          userId: doctorUser.id,
        },

        update: {
          specialtyId,
          fullName: doctorSeed.fullName,
          phone: doctorSeed.phone,
          experienceYears:
            doctorSeed.experienceYears,
          bio: doctorSeed.bio,
        },

        create: {
          userId: doctorUser.id,
          specialtyId,
          fullName: doctorSeed.fullName,
          phone: doctorSeed.phone,
          experienceYears:
            doctorSeed.experienceYears,
          bio: doctorSeed.bio,
        },
      });

    /*
     * Xóa lịch seed cũ của bác sĩ.
     *
     * Nhờ vậy nếu chạy seed nhiều lần
     * sẽ không bị trùng lịch.
     */

    await prisma.doctorSchedule.deleteMany({
      where: {
        doctorId: doctor.id,
      },
    });

    /*
     * Bác sĩ thứ nhất:
     * 08:00 - 12:00
     *
     * Bác sĩ thứ hai:
     * 13:00 - 17:00
     */

    const startMinute =
      doctorSeed.shift === "MORNING"
        ? 8 * 60
        : 13 * 60;

    const endMinute =
      doctorSeed.shift === "MORNING"
        ? 12 * 60
        : 17 * 60;

    /*
     * Tạo lịch từ Thứ 2 -> Thứ 6.
     */

    await prisma.doctorSchedule.createMany({
      data: workDays.map((dayOfWeek) => ({
        doctorId: doctor.id,
        dayOfWeek,
        startMinute,
        endMinute,
        slotMinutes: 30,
        isActive: true,
      })),
    });
  }

  /*
   * ============================================================
   * TEST PATIENT
   * ============================================================
   */

  const patientUser = await upsertUser({
    email: "patient@medical.local",
    password: "Patient@123456",
    role: UserRole.PATIENT,
  });

  await prisma.patientProfile.upsert({
    where: {
      userId: patientUser.id,
    },

    update: {
      fullName: "Nguyễn Văn Bệnh Nhân",
      phone: "0900000002",
      dateOfBirth: new Date(
        "2000-01-15T00:00:00.000Z",
      ),
    },

    create: {
      userId: patientUser.id,
      fullName: "Nguyễn Văn Bệnh Nhân",
      phone: "0900000002",
      dateOfBirth: new Date(
        "2000-01-15T00:00:00.000Z",
      ),
    },
  });

  /*
   * ============================================================
   * CONSOLE
   * ============================================================
   */

  console.log("");
  console.log("====================================");
  console.log("MEDICAL BOOKING SEED COMPLETED");
  console.log("====================================");

  console.log("");
  console.log("ADMIN");
  console.log(
    "admin@medical.local / Admin@123456",
  );

  console.log("");
  console.log("RECEPTIONIST");
  console.log(
    "reception@medical.local / Reception@123456",
  );

  console.log("");
  console.log("PATIENT");
  console.log(
    "patient@medical.local / Patient@123456",
  );

  console.log("");
  console.log(
    "DOCTOR PASSWORD: Doctor@123456",
  );

  console.log("");

  for (const doctor of doctorSeeds) {
    console.log(
      `${doctor.specialty.padEnd(16)} | ${doctor.fullName.padEnd(
        24,
      )} | ${doctor.email}`,
    );
  }

  console.log("");
  console.log(
    `Total doctors: ${doctorSeeds.length}`,
  );
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });