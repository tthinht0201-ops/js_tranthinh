import type {
  NextFunction,
  Request,
  Response,
} from "express";

import type { UserRole } from "../generated/prisma/client.js";

export const requireRole =
  (...allowedRoles: UserRole[]) =>
  (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Bạn chưa đăng nhập",
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "Bạn không có quyền thực hiện chức năng này",
      });
      return;
    }

    next();
  };