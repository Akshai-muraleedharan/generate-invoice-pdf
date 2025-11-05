import { IProduct, Method } from "../interfaces/interface"

export const products: IProduct[] = [
    { productName: "Classmate Notebook (200p)", unitPrice: 70.00, gstRate: 12 },
    { productName: "Apsara Pencil (Pack of 10)", unitPrice: 50.00, gstRate: 12 },
    { productName: "Nataraj Eraser", unitPrice: 10.00, gstRate: 12 },
    { productName: "Fevicol 100ml", unitPrice: 35.00, gstRate: 12 },
    { productName: "Camlin Geometry Box", unitPrice: 120.00, gstRate: 12 },
    { productName: "Cello Gel Pen (Pack of 5)", unitPrice: 80.00, gstRate: 12 },
    { productName: "A4 Printing Paper (500 Sheets)", unitPrice: 310.00, gstRate: 12 },
    { productName: "Stick File Folder (Set of 5)", unitPrice: 50.00, gstRate: 12 },
    { productName: "Permanent Marker (Single)", unitPrice: 25.00, gstRate: 12 },
    { productName: "Camlin Color Pencil (12 Shades)", unitPrice: 75.00, gstRate: 12 },
    { productName: "Scale 30cm", unitPrice: 20.00, gstRate: 12 },
    { productName: "Glue Stick", unitPrice: 25.00, gstRate: 12 },
    { productName: "Sharpener", unitPrice: 8.00, gstRate: 12 },
    { productName: "Ball Pen (Blue)", unitPrice: 10.00, gstRate: 12 },
    { productName: "Apsara Pencil Sharpener (Pack)", unitPrice: 25.00, gstRate: 12 },
    { productName: "Crayons (12 Shades)", unitPrice: 65.00, gstRate: 12 },
]


export const paymentMethods: Method[] = ["Cash", "Upi", "Card"]