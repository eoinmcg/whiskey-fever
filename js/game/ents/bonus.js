class Bonus extends Sprite {

  constructor(g, o) {
    o.group = 'bonus';
    o.vx = $.H.rnd(-40, 40);
    o.vy = -100;
    o.w = 10;
    o.w = 10;
    o.scale = 1;
    o.i = 'circle';
    o.alpha = 1;
    super(g, o);
    this.fader = 0;

  }

  update(step) {

    this.mkImg('circle');
    this.fader = Math.sin(new Date().getTime() * 0.002);

    if (this.y < 0 || this.alpha <= 0.1) {
      this.kill();
    }

    this.x += ( this.vx * step ) + this.fader; 
    this.y += this.vy * step; 
    this.alpha -= 0.01; 

  }


  render() {
    this.g.ctx.globalAlpha = this.alpha;
    this.g.ctx.drawImage(this.iHurt, this.x, this.y);
    this.g.ctx.globalAlpha = 1;
  }

}
