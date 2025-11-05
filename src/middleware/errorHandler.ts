import type { Request, Response, NextFunction } from "express"



export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {

    const statusCode = error.statusCode || 500
    const errorMsg = error.message || "Internal server error"

    return res.status(statusCode).json({ success: false, message: errorMsg })
}