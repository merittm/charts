
/**
 * Draws horizontal lines across the chart area
 * @param {context} context canvas context.
 * @param {string} color color.
 * @param {number} step_y pixels - how far apart vertically each line is.
 * @param {number} data_area_width pixels - canvas area without margins.
 * @param {number} data_area_height pixels - canvas area without margins.
 * @param {number} dbl_margin pixels - double margin.
 * @param {double} line_width OPTIONAL line width - best range: 0.1 ~ 0.9)(0.5 default)
 */
module.exports = function drawHorizontalLines(context, color, step_y, data_area_width, data_area_height, margin, dbl_margin, line_width = 0.5) {

    context.save();

    context.strokeStyle = color;
    context.lineWidth = line_width;

    for (var y = step_y + margin + line_width; y < data_area_height + dbl_margin; y += step_y) {
        context.beginPath();
        context.moveTo(dbl_margin, y);
        context.lineTo(data_area_width, y);
        context.stroke();
    }

    context.restore();
}