import express from "express";
import dotEnv from "dotenv";
import type { Express, Request, Response } from "express"
import { router } from "./routes/index"
import { connectDB } from "./config/connectDB"
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./swagger"
import { errorHandler } from "./middleware/errorHandler"

dotEnv.config();

const app: Express = express();

connectDB()

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use("/api/v1", router)

app.use((req: Request, res: Response<{ success: boolean, message: string }>) => {
    res.status(404).json({ success: false, message: "Endpoint not found" })
})


const port: string | number = process.env.PORT || 4009;

app.use(errorHandler)

app.listen(port, (): void => {
    console.log("server connected port", port)
})
