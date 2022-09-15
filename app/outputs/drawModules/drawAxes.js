/**
* @param {canvas} canvas canvas.
* @param {Object} options - options object.
* @param {string} options.axis - show axis lines on ('h', 'v', 'both', 'none')
* @param {string} options.ticks - show axis tick marks on ('h', 'v', 'both', 'none')
* @param {string} options.labels - show labels on ('h', 'v', 'both', 'none')
* @param {number} options.y_axis_max_amount max amount.
* @param {string} [options.axis_color] OPTIONAL: color of axis lines. DEFAULT: 'black'
* @param {string} [options.tick_color] OPTIONAL: color of tick marks. DEFAULT: 'black'
* @param {number} options.step_y pixels - how far apart vertically each line is.
* @param {number} options.step_x pixels - how far apart horizontally each line is.
* @param {number} options.data_area_width pixels - canvas area without margins.
* @param {number} options.data_area_height pixels - canvas area without margins.
* @param {number} options.margin pixels - margin.
* @param {number} options.dbl_margin pixels - double margin.
* @param {number} [options.line_width] OPTIONAL line width - suggested range: 0.1 ~ 0.9 DEFAULT: 0.5
  */

module.exports = function drawAxes(
    canvas,
    {
        axis = 'none',
        ticks = 'none',
        labels = 'both',
        y_axis_max_amount,
        axis_color = 'black',
        axis_label_color = 'black',
        tick_color = 'black',
        step_x = 50,
        step_y = 50,
        margin = 50,
        dbl_margin = 100,
        data_area_width = canvas.width - dbl_margin,
        data_area_height = canvas.height - dbl_margin,
        line_width = 0.5
    }) {

    const context = canvas.getContext('2d');
    let axis_origin = { x: dbl_margin, y: canvas.height - margin };

    let axis_top = margin;
    let axis_right = data_area_width;
    let tick_spacing_horiz = step_y;
    let tick_spacing_vert = step_x;
    let vertical_ticks = 10;
    let horizontal_ticks = 20;
    let tick_width = 10;
    let tick_line_width = line_width;
    let axis_line_width = 1.0;
    let axis_label_spacing = margin / 4;

    context.save();

    context.strokeStyle = axis_color;
    context.lineWidth = axis_line_width;

    if (axis == 'both') {
        drawHorizontalAxis(context);
        drawVerticalAxis(context);
    } else if (axis == 'h') {
        drawHorizontalAxis(context);
    } else if (axis == 'v') {
        drawVerticalAxis(context);
    }

    context.lineWidth = tick_line_width;
    context.strokeStyle = tick_color;

    if (ticks == 'both') {
        drawHorizontalAxisTicks(context);
        drawVerticalAxisTicks(context);
    } else if (ticks == 'h') {
        drawHorizontalAxisTicks(context);
    } else if (ticks == 'v') {
        drawVerticalAxisTicks(context);
    }

    if (labels == 'both') {
        drawHorizontalAxisLabels(context);
        drawVerticalAxisLabels(context);
    } else if (labels == 'h') {
        drawHorizontalAxisLabels(context);
    } else if (labels == 'v') {
        drawVerticalAxisLabels(context);
    }

    context.restore();


    function drawHorizontalAxis(context) {
        context.beginPath();
        context.moveTo(axis_origin.x, axis_origin.y);
        context.lineTo(axis_right, axis_origin.y);
        context.stroke();
    }

    function drawVerticalAxis(context) {
        context.beginPath();
        context.moveTo(axis_origin.x, axis_origin.y);
        context.lineTo(axis_origin.x, axis_top);
        context.stroke();
    }

    function drawVerticalAxisTicks(context) {
        var deltaX;

        for (var i = 1; i < vertical_ticks; ++i) {

            context.beginPath();
            if (i % 5 === 0) deltaX = tick_width;

            else deltaX = tick_width / 2;
            context.moveTo(axis_origin.x - deltaX,
                axis_origin.y - i * tick_spacing_vert);
            context.lineTo(axis_origin.x + deltaX,
                axis_origin.y - i * tick_spacing_vert);
            context.stroke();

        }
    }


    function drawHorizontalAxisTicks(context) {
        var deltaY;

        for (var i = 1; i < horizontal_ticks; ++i) {

            context.beginPath();
            if (i % 5 === 0) deltaY = tick_width;
            else deltaY = tick_width / 2;
            context.moveTo(axis_origin.x + i * tick_spacing_horiz,
                axis_origin.y - deltaY);
            context.lineTo(axis_origin.x + i * tick_spacing_horiz,
                axis_origin.y + deltaY);
            context.stroke();

        }
    }

    function drawVerticalAxisLabels(context) {
        let value_segment = Math.ceil(y_axis_max_amount / vertical_ticks);
        for (let i = 1, val = value_segment; i <= vertical_ticks; val += value_segment, ++i) {
            context.font = '16pt Arial';
            context.fillStyle = axis_label_color;
            context.fillText(
                val,
                margin,
                axis_origin.y - i * step_y - axis_label_spacing,
            );

        }
    }

    function drawHorizontalAxisLabels(context) {
        let value_segment = Math.ceil(y_axis_max_amount / vertical_ticks);
        for (let i = 1, val = value_segment; i <= vertical_ticks; val += value_segment, ++i) {
            context.font = '16pt Arial';
            context.fillStyle = axis_color;
            context.fillText(
                val,
                margin,
                axis_origin.y - i * tick_spacing_vert - axis_label_spacing,
            );

        }
    }


}