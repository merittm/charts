const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const DrawPieChart = require('./DrawPieChart');


module.exports = async function PieChart2(records) {

    const dummy = {
        data: [
            { label: 'One', value: 600 },
            { label: 'Two', value: 900 },
            { label: 'Three', value: 700 },
            { label: 'Four', value: 800 },
            { label: 'Five', value: 1000 }
        ],
        colors: ["#68e85d", "#e7e85d", "#dbb58e", "#44A6C3", "#ffd5dc"],
        canvas: {
            width: 1200,
            height: 600,
            margin: 50,
            dbl_margin: 100,
            half_margin: 25,
            data_area_width: 1100,
            data_area_height: 500,
            origin_y: 550,
            origin_x: 100,
            logo_x: 10,
            logo_y: 10,
            logo_destination_width: 100,
            logo_destination_height: 50,
            heading: 'Pie Chart',
            heading_y: 25,
            heading_height: 50,
            heading_border: 25,
            heading_border_half: 12.5,
            heading_border_qtr: 6.25
        },
        label_color: '#dadada'
    };




    // CHART
    const {
        data,
        colors,
        label_color } = dummy;

    const {
        width,
        height,
        margin,
        dbl_margin,
        half_margin,
        data_area_width,
        data_area_height,
        origin_y,
        origin_x,
        logo_x,
        logo_y,
        logo_destination_width,
        logo_destination_height,
        heading,
        heading_y,
        heading_height,
        heading_border,
        heading_border_half,
        heading_border_qtr
    } = dummy.canvas;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    context.fillStyle = '#FFF'; // Background
    context.fillRect(0, 0, width, height);

    var chart = new DrawPieChart(
        {
            measurements: { margin, dbl_margin, half_margin, data_area_width, data_area_height, origin_x, origin_y },
            canvas: canvas,
            data: data,
            colors: colors,
            //doughnut_hole: 0.5, // optional 0.3 - 0.7 is a good range
            showValue: true // optional
        }
    );
    chart.draw();


    context.font = 'bold 70pt Arial';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillStyle = '#999999';


    // HEADER
    context.font = 'bold 24pt Arial';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillStyle = '#999999';

    const heading_width = context.measureText(heading).width;

    context.fillRect(
        width / 2 - heading_width / 2 - heading_border_half,
        heading_y - heading_border_qtr,
        heading_width + heading_border,
        heading_height
    )

    context.fillStyle = label_color;
    context.fillText(heading, width / 2, heading_y);

    // LEGEND
    let leg_iter = 1;
    context.textAlign = "start";
    context.font = 'bold 14pt Arial';

    for (element of data) {
        context.fillStyle = colors[leg_iter - 1];
        context.fillRect(
            margin,
            data_area_height - (dbl_margin * 2) + (leg_iter * margin),
            heading_border,
            heading_border
        )

        context.fillStyle = 'black';
        context.fillText(element.label, dbl_margin, data_area_height - (dbl_margin * 2) + (leg_iter * margin), dbl_margin * 2);
        leg_iter++;
    }



    // IMAGE LOGO
    loadImage('./app/outputs/stamp.png')
        .then(image => {

            context.drawImage(image, logo_x, logo_y, logo_destination_width, logo_destination_height)

            const buffer = canvas.toBuffer('image/png')
            fs.writeFileSync(__dirname + '/piechart2.png', buffer)
        })
        .then(d => {
            console.log('done drawing chart')
            return;
        })
        .catch(err => {
            console.log(err)
            return;
        })

}