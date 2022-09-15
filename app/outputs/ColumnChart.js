const fs = require('fs');
const { createCanvas } = require('canvas');
const drawHorizontalLines = require('./drawModules/drawHorizontalLines');
const drawAxes = require('./drawModules/drawAxes');

module.exports = async function ColumnChart(records) {

    const dummy = [
        { label: 'One', value: 3300 },
        { label: 'Two', value: 1250 },
        { label: 'Three', value: 999 },
        { label: 'Four', value: 275 },
        { label: 'Five', value: 2750 },
        { label: 'Six', value: 2500 },
        { label: 'Seven', value: 2100 },
        { label: 'Eight', value: 1333 }];

    const background_color = '#FFF';
    const label_color = '#dadada';
    const label_value_color = '#d3d3d3';
    const value_label_shadows = true;
    const label_value_shadow_color = '#000';
    const v_axis_label_color = '#74ea87';
    const h_axis_label_color = '#000';

    const gradient = [
        '#d7d4ea',
        '#c3bedf',
        '#afa9d5',
        '#9c93cb',
        '#887ec0',
        '#7468b6',
        '#6052ab',
        '#4c3da1',
        '#392897'];

    const width = 1200;
    const height = 600;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');


    const _columns = dummy.length;

    const margin = 50;
    const dbl_margin = margin * 2;
    const half_margin = margin / 2;
    const qtr_margin = margin / 4;
    const eighth_margin = margin / 8;

    const data_area_width = width - dbl_margin;
    const data_area_height = height - dbl_margin;
    const bars_origin_y_offset = margin;
    const _origin_y = height - bars_origin_y_offset;
    const _origin_x = dbl_margin;



    const qtr_bar = data_area_width / (_columns * 4);
    const sliver = data_area_width / qtr_bar;
    const magic_width = sliver * 3;
    const magic_spacing_width = sliver;

    const label_width = magic_width;
    const label_spacing = half_margin;

    // set vertical axis and bar heights to something relative to the data
    const dummy_values_array = dummy.map((a) => a.value);
    const highest_amount = Math.round(Math.ceil(Math.max(...dummy_values_array) / 1000)) * 1000;
    const y_axis_max_amount = highest_amount;
    const max_bar_height = height - dbl_margin;

    const heading = 'Column Chart'
    const heading_y = half_margin;
    const heading_height = margin;
    const heading_border = half_margin;
    const heading_border_half = qtr_margin;
    const heading_border_qtr = eighth_margin;

    let step_x = data_area_width / 10;
    let step_y = data_area_height / 10;
    let column_value_offset = half_margin * -1; // pushes the value label up slightly 
    let column_value_shadow = 2;

    context.fillStyle = background_color;
    context.fillRect(0, 0, width, height);

    drawHorizontalLines(context, 'darkgrey', step_y, data_area_width, data_area_height, margin, dbl_margin, 0.5);

    let iter = 0;
    for (const element of dummy) {

        let _x = (iter * magic_width) + (iter * magic_spacing_width);
        let _half_space = (magic_spacing_width / 2);

        // BARS
        let _bar_h = ((element.value / y_axis_max_amount) * max_bar_height);
        context.fillStyle = gradient[iter];
        context.fillRect(
            _origin_x + _x + _half_space,
            _origin_y - _bar_h,
            magic_width - magic_spacing_width,
            _bar_h);

        // LABELS 
        context.font = 'bold 16pt Arial';
        context.fillStyle = h_axis_label_color;
        context.fillText(
            element.label,
            _origin_x + _x + _half_space,
            label_spacing + _origin_y,
            label_width
        );


        // SHADOW
        if (value_label_shadows) {
            context.font = 'bold 14pt Arial';
            context.fillStyle = label_value_shadow_color;
            context.fillText(
                element.value,
                _origin_x + _x + _half_space + column_value_shadow,
                _origin_y - _bar_h - column_value_offset + column_value_shadow,
                label_width
            );
        }

        // VALUES
        context.font = 'bold 14pt Arial';
        context.fillStyle = label_value_color;
        context.fillText(
            element.value,
            _origin_x + _x + _half_space + column_value_shadow,
            _origin_y - _bar_h - column_value_offset,
            label_width
        );

        iter++;
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
            ticks: 'none',
            axis_label_color: v_axis_label_color,
            labels: 'v',
            y_axis_max_amount,
            step_x,
            step_y,
            data_area_width,
            data_area_height,
            margin,
            dbl_margin
        });

    // SAVE
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(__dirname + '/columnchart.png', buffer)

    console.log('done drawing column chart')
    return;
}
