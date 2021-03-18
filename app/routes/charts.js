
const fs = require('fs');
var express = require('express');
const PieChart = require('../outputs/PieChart');
const ColumnChart = require('../outputs/ColumnChart');
const LineChart = require('../outputs/LineChart');
var router = express.Router()


router.get('/:type', async (req, res) => {

    let data;

    switch (req.params.type) {
        case 'column':
            await ColumnChart(req);
            data = fs.readFileSync('./app/outputs/columnchart.png');
            break;
        case 'line':
            await LineChart(req);
            data = fs.readFileSync('./app/outputs/linechart.png');
            break;
        case 'pie':
            await PieChart(req);
            data = fs.readFileSync('./app/outputs/piechart.png');
            break;
        default:
            console.log('No type supplied');
            break;
    }

    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(data, 'binary');

});

module.exports = router