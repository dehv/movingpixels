import P5 from "p5";
import { addFrame, downloadBundle } from "canvas-recorder";

// import "p5/lib/addons/p5.sound";	// Include if needed
import "./styles.scss";

// DEMO: A sample class implementation
import Particle from "./Particle";
let particles = [];
let img: P5.Image;
let canvas: P5.Renderer;
// Creating the sketch itself
const sketch = (p5: P5) => {
  // DEMO: Prepare an array of MyCircle instances
  p5.preload = () => {
    img = p5.loadImage("src/marinacig3.png");
  };
  // The sketch setup method
  p5.setup = () => {
    // Creating and positioning the canvas
    canvas = p5.createCanvas(500, 500);
    canvas.parent("app");
    for (let particle = 0; particle < 200; particle++) {
      particles.push(
        new Particle(
          p5,
          p5.createVector(p5.random(p5.width), p5.random(p5.height)),
          //p5.createVector(p5.random(-1, 1), p5.random(-1, 1)),
          p5.createVector(1, 0),
          1
        )
      );
    }

    // Configuring the canvas
    p5.background("black");
    p5.fill(0, 0, 0, 20);
    p5.frameRate(15);
  };

  // The sketch draw method
  p5.draw = () => {
    p5.stroke(0);
    p5.rect(0, 0, p5.width, p5.height);

    particles.forEach((p) => {
      p = p as Particle;

      p.move();
      (p as Particle).brightness = img.get(p.pos.x, p.pos.y)[0];
      p.draw();
    });
    addFrame(canvas.elt).then(() => {
      downloadBundle();
    });
  };
};

new P5(sketch);
