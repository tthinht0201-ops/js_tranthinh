import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";
export const requireAuth = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization?.startsWith("Bearer ")) {
        res.status(401).json({
            success: false,
            message: "Bạn chưa đăng nhập",
        });
        return;
    }
    const token = authorization.slice(7);
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
            },
            select: {
                id: true,
                role: true,
                isActive: true,
            },
        });
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Tài khoản không còn tồn tại",
            });
            return;
        }
        if (!user.isActive) {
            res.status(403).json({
                success: false,
                message: "Tài khoản đã bị vô hiệu hóa",
            });
            return;
        }
        req.user = {
            userId: user.id,
            role: user.role,
        };
        next();
    }
    catch {
        res.status(401).json({
            success: false,
            message: "Token không hợp lệ hoặc đã hết hạn",
        });
    }
};
//# sourceMappingURL=auth.middleware.js.map