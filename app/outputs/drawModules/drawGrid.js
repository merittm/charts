/**
 * Draws grid lines across the chart area
 * @param {context} context canvas context.
 * @param {string} color color.
 * @param {number} step_y pixels - how far apart vertically each line is.
 * @param {number} step_x pixels - how far apart horizontally each line is.
 * @param {number} data_area_width pixels - canvas area without margins.
 * @param {number} data_area_height pixels - canvas area without margins.
 * @param {number} margin pixels - double margin.
 * @param {number} dbl_margin pixels - double margin.
 * @param {double} line_width OPTIONAL line width - best range: 0.1 ~ 0.9)(0.5 default)
 */
module.exports = function drawGrid(context, color, step_x, step_y, data_area_width, data_area_height, margin, dbl_margin, line_width = 0.5) {

    context.save();

    context.strokeStyle = color;
    context.lineWidth = line_width;

    for (var i = dbl_margin + line_width; i < data_area_width + margin; i += step_x) {
        context.beginPath();
        context.moveTo(i, margin);
        context.lineTo(i, data_area_height + margin);
        context.stroke();
    }

    for (var i = step_y + line_width; i < data_area_height + dbl_margin; i += step_y) {
        context.beginPath();
        context.moveTo(dbl_margin, i);
        context.lineTo(data_area_width, i);
        context.stroke();
    }

    context.restore();
}