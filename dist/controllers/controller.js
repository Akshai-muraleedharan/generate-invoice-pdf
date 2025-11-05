"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdf = exports.createProduct = void 0;
const productsData_1 = require("../staticDatas/productsData");
const utilFunction_1 = require("../utils/utilFunction");
const utilFunction_2 = require("../utils/utilFunction");
const invoiceModel_1 = require("../models/invoiceModel");
const mongoose_1 = require("mongoose");
const utilPdfGenerete_1 = require("../utils/utilPdfGenerete");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // assign productArray
        const productArr = productsData_1.products;
        const shuffle = (0, utilFunction_1.shuffleArray)(productArr); // invoke shuffle array - shuffle the products in the array
        const randomNumForSlice = Math.floor(Math.random() * (6 - 1)) + 1; // generate Random number for slicw array
        const sliceProduct = shuffle.slice(0, randomNumForSlice); // Slice product array with random number
        const slicedProductArr = (0, utilFunction_2.addQuantityAndTotal)(sliceProduct); // invoke add quantity and total to the product object in the array
        const randomNumForPayment = Math.floor(Math.random() * productsData_1.paymentMethods.length); // generate Random number for slicw payment Method array
        const paymentMethod = productsData_1.paymentMethods[randomNumForPayment]; // Slice payment array with random number
        //  generate invoice number
        const date = new Date();
        const year = date.getFullYear();
        const milliSecond = date.getMilliseconds();
        const generateInvoiceNum = year + "" + milliSecond;
        const newInvoice = new invoiceModel_1.invoiceModel({
            shopName: "EduMart Stationery Store",
            address: "Shop No. 14, Arcot Main Road, Vadapalani, Chennai – 600026",
            phoneNumber: "+91 98765 11223",
            products: slicedProductArr,
            invoiceNumber: generateInvoiceNum,
            paymentMethod: paymentMethod,
            invoiceCreateDate: Date.now()
        });
        yield newInvoice.save();
        res.setHeader('Content-Type', 'application/pdf');
        // Change 'attachment' to 'inline'
        res.setHeader('Content-Disposition', `attachment; filename="invoice_A5_${newInvoice._id}.pdf"`);
        (0, utilPdfGenerete_1.pdfGenerate)(res, newInvoice);
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
const generatePdf = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ success: false, message: "ID not get" });
            return;
        }
        const isValidID = mongoose_1.Types.ObjectId.isValid(id);
        if (isValidID === false) {
            res.status(400).json({ success: false, message: "Invalid ID format" });
            return;
        }
        const findInvoice = yield invoiceModel_1.invoiceModel.findById(id);
        if (!findInvoice) {
            res.status(404).json({ success: false, message: "Invoice not found" });
            return;
        }
        res.setHeader('Content-Type', 'application/pdf');
        // Change 'attachment' to 'inline'
        res.setHeader('Content-Disposition', `attachment; filename="invoice_A5_${findInvoice._id}.pdf"`);
        (0, utilPdfGenerete_1.pdfGenerate)(res, findInvoice);
    }
    catch (error) {
        next(error);
    }
});
exports.generatePdf = generatePdf;
