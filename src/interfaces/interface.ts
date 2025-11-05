import { Types } from "mongoose"

export interface IProduct {
    productName: string,
    unitPrice: number,
    gstRate: number,
    quantity?: number,
    netAmount?: number,
    netAmountWithGst?: number
}

export interface Invoice {
    shopName: string,
    address: string,
    phoneNumber: string,
    products: Types.DocumentArray<IProduct>,
    invoiceNumber: string,
    paymentMethod: string,
    invoiceCreateDate: Date,
}

export type Method = "Cash" | "Upi" | "Card"