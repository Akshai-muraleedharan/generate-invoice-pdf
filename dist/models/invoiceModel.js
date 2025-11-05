"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    productName: { type: String },
    unitPrice: { type: Number },
    gstRate: { type: Number },
    quantity: { type: Number },
    netAmount: { type: Number },
    netAmountWithGst: { type: Number }
});
const invoiceSchema = new mongoose_1.Schema({
    shopName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    products: {
        type: [productSchema]
    },
    invoiceNumber: String,
    paymentMethod: String,
    invoiceCreateDate: Date,
}, { timestamps: true });
exports.invoiceModel = (0, mongoose_1.model)('Invoice', invoiceSchema);
