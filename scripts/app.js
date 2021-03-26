var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      graph: {
          center: "A",
          demos: [["B", "C", "D"], ["E", "F"], ["G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R"], ["S", "T"]]
      }
    },
    methods: {
        drawNode: function(text, x, y) {
            let circle = this.graphSVG.circle(60).fill("green").center(x, y);
            this.graphSVG.text(text).center(x, y);
            return circle;
        }
    },
    created: function () {
        this.graphSVG = SVG().addTo('#graph').size("600", "600");
        let n = 0;
        this.graph.demos.forEach(demo => n += demo.length);
        this.demosSVG = [];
        const quarter = 2 * Math.PI / n;
        let angle = 0;
        let demoBorderAngle1 = angle - (quarter / 2);
        let x1 = Math.cos(demoBorderAngle1) * 295;
        let y1 = Math.sin(demoBorderAngle1) * 295;
        for (let demo of this.graph.demos) {
            let demoSVG = {quarter: null, theoremes: []};
            this.demosSVG.push(demoSVG);
            for (let theoreme of demo) {
                let x = Math.cos(angle) * 250 + 300;
                let y = Math.sin(angle) * 250 + 300;
                demoSVG.theoremes.push(this.drawNode(theoreme, x, y));
                angle += quarter;
            }
            let demoBorderAngle2 = angle - (quarter / 2);
            let x2 = Math.cos(demoBorderAngle2) * 295;
            let y2 = Math.sin(demoBorderAngle2) * 295;
            let rot = demoBorderAngle2 - demoBorderAngle1 < Math.PI ? 0 : 1;
            let path = this.graphSVG.path("M300 300 L" + (x1 + 300) + " " + (y1 + 300) + " A295 295 0 " + rot + " 1 " + (x2 + 300) + " " + (y2 + 300) + " L300 300").fill({color: "red", opacity: 0.1});
            path.stroke({color: "red", width: 2, linecap: 'round'});
            demoSVG.quarter = path;
            x1 = x2;
            y1 = y2;
            demoBorderAngle1 = demoBorderAngle2;
        }
        this.drawNode(this.graph.center, 300, 300);
    }
});