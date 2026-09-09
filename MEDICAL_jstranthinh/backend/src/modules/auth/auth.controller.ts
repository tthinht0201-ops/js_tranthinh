import type { Request, Response } from "express";

import { prisma } from "../../lib/prisma.js";
import {
  login,
  registerPatient,
} from "./auth.service.js";
import {
  loginSchema,
  registerSchema,
} from "./auth.schema.js";

export const registerController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Dữ liệu đăng ký không hợp lệ",
      errors: parsed.error.flatten(),
    });
    return;
  }

  try {
    const result = await registerPatient(parsed.data);

    res.status(201).json({
      success: true,
      message: "Đăng ký tài khoản thành công",
      data: result,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "EMAIL_ALREADY_EXISTS"
    ) {
      res.status(409).json({
        success: false,
        message: "Email đã được sử dụng",
      });
      return;
    }

    if (
      error instanceof Error &&
      error.message === "PHONE_ALREADY_EXISTS"
    ) {
      res.status(409).json({
        success: false,
        message: "Số điện thoại đã được sử dụng",
      });
      return;
    }

    throw error;
  }
};

export const loginController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Dữ liệu đăng nhập không hợp lệ",
      errors: parsed.error.flatten(),
    });
    return;
  }

  try {
    const result = await login(parsed.data);

    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      data: result,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "INVALID_CREDENTIALS"
    ) {
      res.status(401).json({
        success: false,
        message: "Email hoặc mật khẩu không chính xác",
      });
      return;
    }

    if (
      error instanceof Error &&
      error.message === "ACCOUNT_DISABLED"
    ) {
      res.status(403).json({
        success: false,
        message: "Tài khoản đã bị vô hiệu hóa",
      });
      return;
    }

    throw error;
  }
};

export const meController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Bạn chưa đăng nhập",
    });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: req.user.userId,
    },
    select: {
      id: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,

      patientProfile: true,

      doctorProfile: {
        include: {
          specialty: true,
        },
      },
    },
  });

  if (!user) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy tài khoản",
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: user,
  });
};