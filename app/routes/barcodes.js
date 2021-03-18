
const fs = require('fs');
var express = require('express');
const Barcodes = require('../outputs/Barcodes');
var router = express.Router()


router.get('/:string', async (req, res) => {

    let data;
    let string = req.params.string.toString();

    switch (string) {
        default:
            await Barcodes(req);
            data = fs.readFileSync('./app/outputs/' + string + '.png');
            break;
    }

    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(data, 'binary');

});

module.exports = router