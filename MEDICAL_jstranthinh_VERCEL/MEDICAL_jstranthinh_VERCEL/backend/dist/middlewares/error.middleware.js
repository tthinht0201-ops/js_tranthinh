export const errorHandler = (error, _req, res, _next) => {
    if (error instanceof Error && error.message === "CORS_NOT_ALLOWED") {
        res.status(403).json({
            success: false,
            message: "Nguồn truy cập không được phép",
        });
        return;
    }
    console.error(error);
    res.status(500).json({
        success: false,
        message: "Đã xảy ra lỗi hệ thống",
    });
};
//# sourceMappingURL=error.middleware.js.map