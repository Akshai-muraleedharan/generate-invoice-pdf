"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const errorMsg = error.message || "Internal server error";
    return res.status(statusCode).json({ success: false, message: errorMsg });
};
exports.errorHandler = errorHandler;
