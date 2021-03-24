var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      graph: {
          center: "A",
          demos: [["B", "C", "D"], ["E", "F"], ["G", "H", "I", "J", "K", "L"], ["M", "N", "O", "P"]]
      }
    },
    methods: {
        drawNode: function(text, x, y) {
            this.graphSVG.circle(30).fill("#C12828").center(x, y);
            this.graphSVG.text(text).center(x, y);
        }
    },
    created: function () {
        this.graphSVG = SVG().addTo('#graph').size("600", "600");
        let n = 0;
        this.graph.demos.forEach(demo => n += demo.length);
        const quarter = 2 * Math.PI / n;
        let angle = 0;
        for (let demo of this.graph.demos) {
            for (let theoreme of demo) {
                let x = Math.cos(angle) * 260 + 300;
                let y = Math.sin(angle) * 260 + 300;
                this.drawNode(theoreme, x, y);
                angle += quarter;
            }
            let demoBorderAngle = angle - (quarter / 2);
            let x = Math.cos(demoBorderAngle) * 295 + 300;
            let y = Math.sin(demoBorderAngle) * 295 + 300;
            let line = this.graphSVG.line(300, 300, x, y)
            line.stroke({color: "#C12828", width: 2, linecap: 'round'});
        }
        this.graphSVG.circle(590).fill("none").stroke({color: "#C12828", width: 2}).center(300,300);
        this.drawNode(this.graph.center, 300, 300);
    }
});