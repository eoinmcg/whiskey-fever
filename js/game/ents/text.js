class Text extends Sprite {

  constructor(g, o) {
    o.group = 'text';
    o.vx = 0;
    o.vy = -40;
    o.w = 10;
    o.w = 10;
    o.o = 1;
    o.scale = o.scale || 3;
    o.col = o.col || 'w';
    super(g, o);
    this.p = g.mkFont(o.col, o.scale);

  }

  update() {

    if (this.y < 0 || this.o <= 0.2) {
      this.kill();
    }

    let dt = this.g.dt/ 1000;
    this.x += this.vx * dt; 
    this.y += this.vy * dt; 
    this.o -= ( dt / 5 ); 

  }


  render() {
    this.g.ctx.globalAlpha = this.o;
    this.g.draw.text(this.text, this.p, this.x, this.y);
    this.g.ctx.globalAlpha = 1;
  }

}

