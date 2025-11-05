"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("./routes/index");
const connectDB_1 = require("./config/connectDB");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, connectDB_1.connectDB)();
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use("/api/v1", index_1.router);
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Endpoint not found" });
});
const port = process.env.PORT || 4009;
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log("server connected port", port);
});
