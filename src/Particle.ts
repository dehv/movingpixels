import P5 from "p5";

export default class Particle {
  _p5: P5;
  private _pos: P5.Vector;
  public get pos(): P5.Vector {
    return this._pos;
  }
  public set pos(value: P5.Vector) {
    this._pos = value;
  }
  _lpos: P5.Vector;
  _dir: P5.Vector;
  _speed: number;
  private _brightness: number;
  public get brightness(): number {
    return this._brightness;
  }
  public set brightness(value: number) {
    this._brightness = value;
  }

  constructor(
    p5: P5,
    position: P5.Vector,
    direction: P5.Vector,
    speed: number
  ) {
    this._p5 = p5;
    this._pos = position;
    this._dir = direction;
    this._speed = speed;
    this._brightness = 255;
    this._lpos = p5.createVector(0, 0);
  }

  move() {
    //Move the particle according to speed and direction.
    this._speed = this._p5.map(this._brightness, 0, 255, 20, 1) / 2;
    this._lpos.x = this._pos.x;
    this._lpos.y = this._pos.y;
    this._pos.x = this._pos.x + this._dir.x * this._speed;
    this._pos.y = this._pos.y + this._dir.y * this._speed;
    if (this._pos.x >= this._p5.width) {
      this._dir.x = this._dir.x * -1;
      this._pos.x = this._p5.width;
    }
    if (this._pos.x <= 0) {
      this._dir.x = this._dir.x * -1;
      this._pos.x = 0;
    }
    if (this._pos.y >= this._p5.height) {
      this._dir.y = this._dir.y * -1;
      this._pos.y = this._p5.width;
    }
    if (this._pos.y <= 0) {
      this._dir.y = this._dir.y * -1;
      this._pos.y = 0;
    }
  }
  draw() {
    this._p5.stroke(this._brightness);
    this._p5.line(this._pos.x, this._pos.y, this._lpos.x, this._lpos.y);
  }
}
