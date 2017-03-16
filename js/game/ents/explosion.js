class Explosion extends Sprite {

  constructor(g, o){

    let i;

    o.i = 'circle';

    super(g, o);

    this.name = 'explosion';
    this.group = 'na';
    this.startX = o.x;
    this.startY = o.y;
    this.particles = o.particles || 3;
    this.magnitude = o.magnitude || 9;
    this.factor = 1;

    this.angle = 0;
    this.grow = 1;


  }


  update() {

    let g = this.g;

    super.update();

    if (this.scale <= this.magnitude) {
      this.scale += this.factor;
    }
    if (this.scale === this.magnitude) {
      this.factor *= -1;
    }
    if (this.scale <= 1) {
      this.remove = true;
    }

    this.mkImg('circle');

  }


  render() {

    let x = this.startX - (this.w /2),
      y = this.startY - (this.h / 2),
      g = this.g,
      i = this.i;

    g.ctx.drawImage(i, x, y);

  }


}


