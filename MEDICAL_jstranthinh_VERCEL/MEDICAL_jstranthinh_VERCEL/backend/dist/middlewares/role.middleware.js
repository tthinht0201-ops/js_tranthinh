export const requireRole = (...allowedRoles) => (req, res, next) => {
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
//# sourceMappingURL=role.middleware.js.map