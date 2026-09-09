import type {
  Request,
  Response,
} from "express";

import {
  createSpecialtySchema,
  specialtyIdSchema,
  updateSpecialtySchema,
} from "./specialty.schema.js";

import {
  createSpecialty,
  deactivateSpecialty,
  getAllSpecialties,
  getSpecialtyById,
  updateSpecialty,
} from "./specialty.service.js";

export const getAllSpecialtiesController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const specialties = await getAllSpecialties();

  res.status(200).json({
    success: true,
    data: specialties,
  });
};

export const getSpecialtyByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const parsed = specialtyIdSchema.safeParse(
    req.params,
  );

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "ID chuyên khoa không hợp lệ",
    });
    return;
  }

  try {
    const specialty = await getSpecialtyById(
      parsed.data.id,
    );

    res.status(200).json({
      success: true,
      data: specialty,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "SPECIALTY_NOT_FOUND"
    ) {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy chuyên khoa",
      });
      return;
    }

    throw error;
  }
};

export const createSpecialtyController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const parsed =
    createSpecialtySchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Dữ liệu chuyên khoa không hợp lệ",
      errors: parsed.error.flatten(),
    });
    return;
  }

  try {
    const specialty = await createSpecialty(
      parsed.data,
    );

    res.status(201).json({
      success: true,
      message: "Tạo chuyên khoa thành công",
      data: specialty,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        "SPECIALTY_ALREADY_EXISTS"
    ) {
      res.status(409).json({
        success: false,
        message: "Chuyên khoa đã tồn tại",
      });
      return;
    }

    throw error;
  }
};

export const updateSpecialtyController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const paramsParsed =
    specialtyIdSchema.safeParse(req.params);

  if (!paramsParsed.success) {
    res.status(400).json({
      success: false,
      message: "ID chuyên khoa không hợp lệ",
    });
    return;
  }

  const bodyParsed =
    updateSpecialtySchema.safeParse(req.body);

  if (!bodyParsed.success) {
    res.status(400).json({
      success: false,
      message: "Dữ liệu chuyên khoa không hợp lệ",
      errors: bodyParsed.error.flatten(),
    });
    return;
  }

  try {
    const specialty = await updateSpecialty(
      paramsParsed.data.id,
      bodyParsed.data,
    );

    res.status(200).json({
      success: true,
      message: "Cập nhật chuyên khoa thành công",
      data: specialty,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "SPECIALTY_NOT_FOUND"
    ) {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy chuyên khoa",
      });
      return;
    }

    if (
      error instanceof Error &&
      error.message ===
        "SPECIALTY_ALREADY_EXISTS"
    ) {
      res.status(409).json({
        success: false,
        message: "Tên chuyên khoa đã tồn tại",
      });
      return;
    }

    throw error;
  }
};

export const deactivateSpecialtyController =
  async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const parsed = specialtyIdSchema.safeParse(
      req.params,
    );

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "ID chuyên khoa không hợp lệ",
      });
      return;
    }

    try {
      const specialty = await deactivateSpecialty(
        parsed.data.id,
      );

      res.status(200).json({
        success: true,
        message: "Ngừng sử dụng chuyên khoa thành công",
        data: specialty,
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "SPECIALTY_NOT_FOUND"
      ) {
        res.status(404).json({
          success: false,
          message: "Không tìm thấy chuyên khoa",
        });
        return;
      }

      if (
        error instanceof Error &&
        error.message ===
          "SPECIALTY_ALREADY_INACTIVE"
      ) {
        res.status(409).json({
          success: false,
          message: "Chuyên khoa đã ngừng hoạt động",
        });
        return;
      }

      throw error;
    }
  };