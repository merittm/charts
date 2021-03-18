
function drawSlice(ctx, center_x, center_y, margin, radius, start_angle, end_angle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(center_x + margin, center_y + margin);
    ctx.arc(center_x + margin, center_y + margin, radius, start_angle, end_angle);
    ctx.closePath();
    ctx.fill();
}

module.exports = function DrawPieChart(options) {

    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.options = options;
    this.colors = options.colors;
    this.measurements = options.measurements;

    this.draw = function () {
        let total = 0;
        let color_index = 0;
        for (element of this.options.data) {
            let val = element.value;
            total += val;
        }

        let start_angle = 0;
        for (element of this.options.data) {
            val = element.value;
            let slice_angle = 2 * Math.PI * val / total;


            drawSlice(
                this.ctx,
                this.measurements.data_area_width / 2,
                this.measurements.data_area_height / 2,
                this.measurements.margin,
                Math.min(this.measurements.data_area_width / 2, this.measurements.data_area_height / 2),
                start_angle,
                start_angle + slice_angle,
                this.colors[color_index % this.colors.length]
            );


            start_angle += slice_angle;
            color_index++;
        }

        // DOUGHNUT HOLE
        if (this.options.doughnut_hole) {
            drawSlice(
                this.ctx,
                this.measurements.data_area_width / 2,
                this.measurements.data_area_height / 2,
                this.measurements.margin,
                this.options.doughnut_hole * Math.min(this.measurements.data_area_width / 2, this.measurements.data_area_height / 2),
                0,
                2 * Math.PI,
                "#FFF"
            );
        }

        // LABELS 
        start_angle = 0;
        for (element of this.options.data) {
            val = element.value;
            slice_angle = 2 * Math.PI * val / total;
            let pie_radius = Math.min(this.measurements.data_area_width / 2, this.measurements.data_area_height / 2);
            let labelX = this.measurements.data_area_width / 2 + (pie_radius / 2) * Math.cos(start_angle + slice_angle / 2) + this.measurements.half_margin;
            let labelY = this.measurements.data_area_height / 2 + (pie_radius / 2) * Math.sin(start_angle + slice_angle / 2) + this.measurements.margin;

            if (this.options.doughnut_hole) {
                let offset = (pie_radius * this.options.doughnut_hole) / 2;
                labelX = this.measurements.data_area_width / 2 + (offset + pie_radius / 2) * Math.cos(start_angle + slice_angle / 2) + this.measurements.half_margin;
                labelY = this.measurements.data_area_height / 2 + (offset + pie_radius / 2) * Math.sin(start_angle + slice_angle / 2) + this.measurements.margin;
            }

            let labelText = Math.round(100 * val / total);
            this.ctx.font = "bold 20px Arial";

            this.ctx.fillStyle = "black"; // SHADOW
            this.ctx.fillText(labelText + "%", labelX + 2, labelY + 2); // SHADOW
            this.ctx.fillStyle = "white";
            this.ctx.fillText(labelText + "%", labelX, labelY);

            if (this.options.showValue) {
                this.ctx.font = "20px Arial";
                this.ctx.fillStyle = "black"; // SHADOW
                this.ctx.fillText(val, labelX + this.measurements.half_margin + 2, labelY + this.measurements.half_margin + 2); // SHADOW
                this.ctx.fillStyle = "white";
                this.ctx.fillText(val, labelX + this.measurements.half_margin, labelY + this.measurements.half_margin);
            }


            start_angle += slice_angle;
        }
    }
}