import mongoose, { Schema, model } from "mongoose"
import { Invoice, IProduct } from "../interfaces/interface"

const productSchema = new Schema<IProduct>({
    productName: { type: String },
    unitPrice: { type: Number },
    gstRate: { type: Number },
    quantity: { type: Number },
    netAmount: { type: Number },
    netAmountWithGst: { type: Number }
})


const invoiceSchema = new Schema<Invoice>({
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
}, { timestamps: true })

export const invoiceModel = model<Invoice>('Invoice', invoiceSchema)