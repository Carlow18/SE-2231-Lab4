import p5 from "p5";
import Point2D from "./doNotTouch/point2D";

const width: number = 400;
const height: number = 400;
const padding: number = 25;

let sketch = function (p) {
  

  p.setup = function () {
    p.createCanvas(width, height);

    p.strokeWeight(2);
    p.stroke("gray");

    p.rect(padding, padding, width - padding - 5, height - padding - 5);

    p.strokeWeight(4 / height);
    p.translate(padding, height - padding + 20)
    p.scale(height - padding - 5, -(height - padding - 5));


    p.stroke("black");
    // Make your points here:
    const point1 = new Point2D(0.3, 0.4);
    const point2 = new Point2D(0.5, 0.7);
    const point3 = new Point2D(0.372, 0.497)
    const point4 =new Point2D(0.564, 0.413)
    const point5 =new Point2D(0.226, 0.577)
    const point6 =new Point2D(0.144, 0.179)
    const point7 =new Point2D(0.083, 0.510)
    const point8 =new Point2D(0.77, 0.777)
    const point9 =new Point2D(0.888, 0.888)
    const point10 =new Point2D(0.999, 0.999)
    
    // Draw them here:
    point1.draw(p);
    point2.draw(p);
    point3.draw(p);
    point4.draw(p);
    point5.draw(p);
    point6.draw(p);
    point7.draw(p);
    point8.draw(p);
    point9.draw(p);
    point10.draw(p);
  };
};

new p5(sketch);
