import { IProduct } from "../interfaces/interface"


export const shuffleArray = (array: IProduct[]): IProduct[] => {
    for (let i = array.length - 1; i > 0; i--) {

        const j: number = Math.floor(Math.random() * (i + 1))

        const temp = array[i]
        array[i] = array[j]
        array[j] = temp

    }
    return array
}


export const addQuantityAndTotal = (sliceProduct: IProduct[]): IProduct[] => {
    for (let i = 0; i < sliceProduct.length; i++) {
        const randomNumForQuanity = Math.floor(Math.random() * (5 - 1)) + 1
        sliceProduct[i] = { ...sliceProduct[i], quantity: randomNumForQuanity, netAmount: sliceProduct[i].unitPrice * randomNumForQuanity, }
        sliceProduct[i] = { ...sliceProduct[i], netAmountWithGst: sliceProduct[i].netAmount + (sliceProduct[i].netAmount * sliceProduct[i].gstRate) / 100 }
    }
    return sliceProduct
}