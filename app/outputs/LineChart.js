const fs = require('fs');
const { createCanvas } = require('canvas');
const drawHorizontalLines = require('./drawModules/drawHorizontalLines');
const drawAxes = require('./drawModules/drawAxes');
const drawGrid = require('./drawModules/drawGrid');

module.exports = async function LineChart(records) {

    const dummy = [{ label: 'One', value: 600 }, { label: 'Two', value: 900 }, { label: 'Three', value: 700 }, { label: 'Four', value: 800 }, { label: 'Five', value: 1000 }];

    const dummyTwo = [{ label: 'One', value: 800 }, { label: 'Two', value: 200 }, { label: 'Three', value: 99 }, { label: 'Four', value: 750 }, { label: 'Five', value: 300 }];


    const background_color = '#FFF';
    const label_color = '#dadada';
    const v_axis_label_color = '#74ea87';
    const h_axis_label_color = '#000';
    const line_color = 'lightblue';
    const positive_trend_color = 'lightgreen';
    const negative_trend_color = 'orange';
    const plot_value_color = '#000';
    const line_plot_value_offset = -10; // pushes label up and to the right

    const width = 1200;
    const height = 600;

    const number_of_lines = dummy.length;

    const margin = 50;
    const dbl_margin = margin * 2;
    const half_margin = margin / 2;

    const data_area_width = width - dbl_margin;
    const data_area_height = height - dbl_margin;
    const origin_y = height - margin;
    const origin_x = dbl_margin;
    const space_between_plots = number_of_lines * margin < data_area_width ? number_of_lines * margin : (number_of_lines * margin);

    const label_width = space_between_plots;
    const label_spacing = half_margin;

    // set vertical axis and bar heights to something relative to the data
    const dummy_values_array = dummy.map((a) => a.value)
    const highest_amount = Math.round(Math.ceil(Math.max(...dummy_values_array) / 1000)) * 1000;
    const y_axis_max_amount = highest_amount;
    const max_line_height = height - dbl_margin;



    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');


    const heading = 'Line Chart'
    const heading_y = half_margin;
    const heading_height = margin;
    const heading_border = half_margin;
    const heading_border_half = margin / 4;
    const heading_border_qtr = margin / 8;

    let step_x = margin;
    let step_y = margin;

    context.fillStyle = background_color;
    context.fillRect(0, 0, width, height);

    drawHorizontalLines(context, 'darkgrey', step_y, data_area_width, data_area_height, margin, dbl_margin, 0.5);

    // LINE GRAPH ONE
    let line_iter = 0;
    let previous_line_x = origin_x;
    let previous_line_y = origin_y;

    for (const element of dummy) {

        let calc_line_height = height - ((element.value / y_axis_max_amount) * max_line_height) - margin;

        var gradient = context.createLinearGradient(previous_line_x, previous_line_y, origin_x + (line_iter * space_between_plots), calc_line_height);
        if (calc_line_height < previous_line_y) {
            gradient.addColorStop(0, line_color);
            gradient.addColorStop(0.5, positive_trend_color);
            gradient.addColorStop(1, line_color);
        } else {
            gradient.addColorStop(0, line_color);
            gradient.addColorStop(0.5, negative_trend_color);
            gradient.addColorStop(1, line_color);

        }

        context.strokeStyle = gradient;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(previous_line_x, previous_line_y);

        if (line_iter != 0) { // skip first line segment from origin point because its ugly
            context.lineTo(origin_x + (line_iter * space_between_plots), calc_line_height);
        }

        context.stroke();


        // PLOT CIRCLES
        context.beginPath();
        context.strokeStyle = gradient;
        context.arc(
            origin_x + (line_iter * space_between_plots),
            calc_line_height,
            5,
            0,
            2 * Math.PI);
        //context.fill();
        // - OR -
        context.stroke();


        // VALUE LABEL
        context.font = '12pt Arial';
        context.fillStyle = plot_value_color;
        context.fillText(
            element.value,
            origin_x + (line_iter * space_between_plots) - line_plot_value_offset,
            calc_line_height + line_plot_value_offset,
            label_width
        );

        // LABELS 
        context.font = 'bold 16pt Arial';
        context.fillStyle = h_axis_label_color;
        context.fillText(
            element.label,
            origin_x + (line_iter * label_width),
            label_spacing + origin_y,
            label_width
        );

        // store prev
        previous_line_x = origin_x + (line_iter * space_between_plots);
        previous_line_y = calc_line_height;

        line_iter++;
    }


    // LINE GRAPH TWO
    let line_iter_two = 0;
    previous_line_x = origin_x;
    previous_line_y = origin_y;

    for (const element of dummyTwo) {

        let calc_line_height = height - ((element.value / y_axis_max_amount) * max_line_height) - margin;
        context.strokeStyle = label_color;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(previous_line_x, previous_line_y);

        if (line_iter_two != 0) { // skip first line segment from origin point
            context.lineTo(origin_x + (line_iter_two * space_between_plots), calc_line_height);

        }
        context.stroke();


        context.beginPath();
        context.arc(
            origin_x + (line_iter_two * space_between_plots),
            calc_line_height,
            5,
            0,
            2 * Math.PI);
        //context.fill();
        // - OR -
        context.stroke();

        // store prev
        previous_line_x = origin_x + (line_iter_two * space_between_plots);
        previous_line_y = calc_line_height;

        line_iter_two++;
    }



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

    drawAxes(canvas,
        {
            axis: 'both',
            ticks: 'v',
            axis_label_color: v_axis_label_color,
            labels: 'v',
            y_axis_max_amount,
            step_x, step_y,
            data_area_width,
            data_area_height,
            margin,
            dbl_margin
        });

    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(__dirname + '/linechart.png', buffer)

    console.log('done drawing line chart')
    return;
}
