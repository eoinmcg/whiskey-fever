class Text extends Sprite {

  constructor(g, o) {
    o.group = 'text';
    o.vy = o.vy || -10;
    o.vx = o.vx || 0;
    o.w = 10;
    o.w = 10;
    o.o = 1;
    o.alpha = 1;
    o.scale = o.scale || 4;
    o.col = o.col || 'w';
    o.accel = o.accel || 0.5;
    super(g, o);
    this.p = g.mkFont(o.col, o.scale);

  }

  update(step) {

    if (this.y < 0 || this.alpha < 0.1) {
      this.kill();
    }

    this.vy -= this.accel;
    this.alpha -= 0.01;

    if (this.vx) {
      this.x += this.vx * step; 
    }
    this.y += this.vy * step; 

  }


  render() {
    if (this.text) {
      this.g.ctx.globalAlpha = this.alpha;
      this.g.draw.text(this.text, this.p, this.x, this.y);
      this.g.ctx.globalAlpha = 1;
    } else if (this.o) {
      this.g.ctx.drawImage(this.i, this.x, this.y);
    }
  }

}


