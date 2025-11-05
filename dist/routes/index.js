"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controllers/controller");
exports.router = express_1.default.Router();
exports.router.post("/invoice", controller_1.createProduct);
/**
 * @swagger
 *
 * /invoice/{id}:
 *      get:
 *        summary: generate invoice pdf
 *        tags:
 *          -   Invoice Api's
 *        parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              schema:
 *                type: string
 *                example: 690a3a923dcb382f3f07d403
 *        response:
 *         '200':
 *           description: Return pdf inline
 *           content:
 *             application/pdf:
 *               schema:
 *                 type: string
 *                 format: binary
 *
 *         '404':
          description: Invoice not found
 */
exports.router.get("/invoice/:id", controller_1.generatePdf);
