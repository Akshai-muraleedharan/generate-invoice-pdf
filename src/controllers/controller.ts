import type { Request, Response, NextFunction } from "express"
import { products, paymentMethods } from "../staticDatas/productsData"
import { shuffleArray } from "../utils/utilFunction";
import { addQuantityAndTotal } from "../utils/utilFunction"
import { invoiceModel } from "../models/invoiceModel";
import { Types } from "mongoose";
import { pdfGenerate } from "../utils/utilPdfGenerete";


export const createProduct = async (req: Request, res: Response<{ success: boolean, message: string }>, next: NextFunction): Promise<void> => {

    try {


        // assign productArray
        const productArr = products;



        const shuffle = shuffleArray(productArr) // invoke shuffle array - shuffle the products in the array

        const randomNumForSlice: number = Math.floor(Math.random() * (6 - 1)) + 1 // generate Random number for slicw array

        const sliceProduct: any[] = shuffle.slice(0, randomNumForSlice) // Slice product array with random number


        const slicedProductArr = addQuantityAndTotal(sliceProduct); // invoke add quantity and total to the product object in the array

        const randomNumForPayment: number = Math.floor(Math.random() * paymentMethods.length) // generate Random number for slicw payment Method array

        const paymentMethod: string = paymentMethods[randomNumForPayment] // Slice payment array with random number



        //  generate invoice number
        const date = new Date();

        const year = date.getFullYear()
        const milliSecond = date.getMilliseconds()
        const generateInvoiceNum = year + "" + milliSecond


        const newInvoice = new invoiceModel({
            shopName: "EduMart Stationery Store",
            address: "Shop No. 14, Arcot Main Road, Vadapalani, Chennai – 600026",
            phoneNumber: "+91 9876511223",
            products: slicedProductArr,
            invoiceNumber: generateInvoiceNum,
            paymentMethod: paymentMethod,
            invoiceCreateDate: Date.now()
        })

        await newInvoice.save()

        res.setHeader('Content-Type', 'application/pdf');
        // Change 'attachment' to 'inline'
        res.setHeader('Content-Disposition', `attachment; filename="invoice_A5_${newInvoice._id}.pdf"`);


        pdfGenerate(res, newInvoice,)

    } catch (error) {
        next(error)
    }

}

export const generatePdf = async (req: Request<{ id: string }>, res: Response<{ success: boolean, message: string }>, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ success: false, message: "ID not get" })
            return;
        }


        const isValidID: boolean = Types.ObjectId.isValid(id)

        if (isValidID === false) {
            res.status(400).json({ success: false, message: "Invalid ID format" })
            return;
        }

        const findInvoice = await invoiceModel.findById(id)

        if (!findInvoice) {
            res.status(404).json({ success: false, message: "Invoice not found" })
            return
        }



        res.setHeader('Content-Type', 'application/pdf');
        // Change 'attachment' to 'inline'
        res.setHeader('Content-Disposition', `attachment; filename="invoice_A5_${findInvoice._id}.pdf"`);

        pdfGenerate(res, findInvoice,)

    } catch (error) {
        next(error)
    }
}