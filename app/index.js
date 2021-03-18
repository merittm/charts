var cors = require('cors');
const express = require('express');
const app = express();
var charts = require('./routes/charts');
var barcodes = require('./routes/barcodes');
var bodyParser = require('body-parser');

const port = process.env.PORT || 3060;

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use('/api/charts', charts)
app.use('/api/barcodes', barcodes)

app.listen(port, () => console.log('Listening on port ' + port));