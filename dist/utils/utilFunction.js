"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addQuantityAndTotal = exports.shuffleArray = void 0;
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};
exports.shuffleArray = shuffleArray;
const addQuantityAndTotal = (sliceProduct) => {
    for (let i = 0; i < sliceProduct.length; i++) {
        const randomNumForQuanity = Math.floor(Math.random() * (5 - 1)) + 1;
        sliceProduct[i] = Object.assign(Object.assign({}, sliceProduct[i]), { quantity: randomNumForQuanity, netAmount: sliceProduct[i].unitPrice * randomNumForQuanity });
        sliceProduct[i] = Object.assign(Object.assign({}, sliceProduct[i]), { netAmountWithGst: sliceProduct[i].netAmount + (sliceProduct[i].netAmount * sliceProduct[i].gstRate) / 100 });
    }
    return sliceProduct;
};
exports.addQuantityAndTotal = addQuantityAndTotal;
