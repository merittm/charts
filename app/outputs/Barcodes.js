const fs = require('fs');
const { createCanvas } = require('canvas');
const JsBarcode = require('jsbarcode');


module.exports = async function Barcodes(req) {

    let string = req.params.string.toString();

    let canvas = createCanvas();

    let options = {
        width: 6,
        margin: 32,
        fontSize: 48,
        height: 200,
        displayValue: true
    };

    JsBarcode(canvas, string, { ...options });

    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(__dirname + '/' + string + '.png', buffer)

    console.log('done drawing barcode')
    return;
}