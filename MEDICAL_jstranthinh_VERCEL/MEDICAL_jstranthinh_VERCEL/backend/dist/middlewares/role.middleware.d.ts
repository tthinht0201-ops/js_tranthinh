import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../generated/prisma/client.js";
export declare const requireRole: (...allowedRoles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=role.middleware.d.ts.map