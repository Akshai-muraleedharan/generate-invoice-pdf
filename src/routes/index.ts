import express from "express";
import type { Router } from "express";
import { createProduct, generatePdf } from "../controllers/controller"

export const router: Router = express.Router();

/**
 * @swagger
 * 
 * /invoice:
 *   post:
 *      summary: Create new invoice and create pdf
 *      tags: 
 *         -  Invoice Api's
 *      responseBody:
 *         '201':
 *           description: Return pdf inline
 *           content: 
 *             application/pdf:
 *                schema:
 *                   type: string
 *                   format: binary  
 *  
 */

router.post("/invoice", createProduct)

/**
 * @swagger
 * 
 * /invoice/{id}:
 *      get:
 *        summary: Get invoice pdf with ID
 *        tags:
 *           -  Invoice Api's
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
router.get("/invoice/:id", generatePdf)