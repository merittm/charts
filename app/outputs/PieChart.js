const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const DrawPieChart = require('./DrawPieChart');


module.exports = async function PieChart(records) {

    const dummy = [{ label: 'One', value: 600 }, { label: 'Two', value: 900 }, { label: 'Three', value: 700 }, { label: 'Four', value: 800 }, { label: 'Five', value: 1000 }];
    const colors = ["#68e85d", "#e7e85d", "#dbb58e", "#44A6C3", "#ffd5dc"];

    const width = 1200;
    const height = 600;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    const label_color = '#dadada';

    const margin = 50;
    const dbl_margin = margin * 2;
    const half_margin = margin / 2;
    const data_area_width = width - dbl_margin;
    const data_area_height = height - dbl_margin;
    const origin_y = height - margin;
    const origin_x = dbl_margin;


    const logo_x = 10;
    const logo_y = 10;
    const logo_destination_width = 100;
    const logo_destination_height = 50;

    const heading = 'Pie Chart'
    const heading_y = half_margin;
    const heading_height = margin;
    const heading_border = half_margin;
    const heading_border_half = margin / 4;
    const heading_border_qtr = margin / 8;

    context.fillStyle = '#FFF'; // Background
    context.fillRect(0, 0, width, height);


    // CHART
    var chart = new DrawPieChart(
        {
            measurements: { margin, dbl_margin, half_margin, data_area_width, data_area_height, origin_x, origin_y },
            canvas: canvas,
            data: dummy,
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

    for (element of dummy) {
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
            fs.writeFileSync(__dirname + '/piechart.png', buffer)
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