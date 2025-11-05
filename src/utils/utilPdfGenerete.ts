import type { Response } from "express"
import pdfDocument from "pdfkit"
import { Invoice } from "../interfaces/interface"

function dateOrderSet(date: string) {
    const getYear = date.split("").slice(0, 4).join("")
    const getMonth = date.split("").slice(5, 7).join("")
    const getDay = date.split("").slice(8, 10).join("")


    return `${getDay}/${getMonth}/${getYear}`
}

export const pdfGenerate = (res: Response, Invoice: Invoice,): void => {
    const productsSubTotal: number = Invoice.products.reduce((accumulator, currentValue) => accumulator + currentValue.netAmount, 0)

    const doc = new pdfDocument({ size: 'A5', margins: { top: 20, bottom: 20, left: 20, right: 20 }, })

    doc.pipe(res)
    doc.moveDown()
    doc.moveDown()
    doc.fontSize(21).text(`${Invoice.shopName}`, { align: 'center' })
    doc.fontSize(9).text(`${Invoice.address}`, { align: 'center' })
    doc.fontSize(9).text(`${Invoice.phoneNumber}`, { align: 'center' })
    doc.moveDown()
    doc.moveDown()

    doc.lineWidth(2)
    doc.fontSize(16).text('Tax Invoice', { align: 'center', underline: true })
    doc.moveDown()
    const margin = doc.page.margins.left;
    const printableWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const lineY = doc.y + 5; // Position the line slightly below the current Y (after the text block)

    doc
        .save()
        .lineWidth(1)
        .strokeColor('black')
        .moveTo(margin, lineY)              // Start at the left margin
        .lineTo(margin + printableWidth, lineY) // End at the right margin
        .stroke()
        .restore();
    doc.moveDown()

    doc.fontSize(8).text(`Invoice No / Date`, { continued: true, })
    doc.fontSize(8).text(`${Invoice.invoiceNumber}`, { align: 'center', continued: true })
    doc.fontSize(8).text(`${dateOrderSet(Invoice.invoiceCreateDate.toISOString().slice(0, 10))}`, { align: 'right', continued: true, })

    doc.moveDown()



    doc
        .save()
        .lineWidth(1)
        .strokeColor('black')
        .moveTo(doc.page.margins.left, doc.y + 5)              // Start at the left margin
        .lineTo(doc.page.margins.left + doc.page.width - doc.page.margins.left - doc.page.margins.right, doc.y + 5) // End at the right margin
        .stroke()
        .restore();

    doc.moveDown()
    doc.moveDown()

    doc.fontSize(8).text(`Payment : ${Invoice.paymentMethod}`, { align: 'right', underline: false })
    doc.moveDown()
    doc.moveDown()

    const startY = doc.y;
    doc.font('Helvetica-Bold');
    doc.text('No', 30, startY);
    doc.text('Item', 60, startY);
    doc.text('Qty', 160, startY, { width: 50, align: 'right' });
    doc.text('unit price', 230, startY, { width: 80, });
    doc.text('GST %', 280, startY, { width: 50, });
    doc.text('GST Amt', 320, startY, { width: 70, });
    doc.text('Total', 370, startY, { width: 80, });
    doc.moveDown(0.3);


    let index: any = 1;
    let total = 0;
    let totalGst = 0
    Invoice.products.forEach((p) => {
        const y = doc.y;
        const lineTotal = p.quantity * p.unitPrice;
        total += lineTotal;
        totalGst += (p.netAmount * p.gstRate) / 100

        let gstAmount: any = (p.netAmount * p.gstRate) / 100
        let gstAmtWithTotal: any = p.netAmount

        doc.text(index, 30, y);
        doc.text(p.productName, 60, y);
        doc.text(p.quantity.toString(), 160, y, { width: 50, align: 'right' });
        doc.text(p.unitPrice.toFixed(2), 230, y, { width: 80, });
        doc.text(p.gstRate + '%', 280, y, { width: 50, });
        doc.text(gstAmount, 330, y, { width: 70, });
        doc.text(gstAmtWithTotal, 373, y, { width: 80, });


        doc.moveDown();
        index++;
    });


    doc
        .save()
        .lineWidth(1)
        .strokeColor('black')
        .moveTo(doc.page.margins.left, doc.y + 5)              // Start at the left margin
        .lineTo(doc.page.margins.left + doc.page.width - doc.page.margins.left - doc.page.margins.right, doc.y + 5) // End at the right margin
        .stroke()
        .restore();

    doc.moveDown()
    doc.moveDown()
    const y = doc.y;
    doc.font("Helvetica-Bold");
    doc.moveDown(0.5)
    doc.text(`Subtotal : ${productsSubTotal.toFixed(2)}`, 322, y,);
    doc.moveDown(0.5)
    doc.text(`CGST (6%) : ${(totalGst / 2).toFixed(2)}`,);
    doc.moveDown(0.5)
    doc.text(`SGST (6%) : ${(totalGst / 2).toFixed(2)}`,);
    doc.moveDown(0.5)
    doc.text(`Grand Total : ${productsSubTotal + totalGst}`,);

    const bottom = doc.page.height - 120;
    doc.fontSize(10);
    doc.text("Thank you for shopping with us!", 50, bottom, {
        align: "center",

    });


    doc.end()

}