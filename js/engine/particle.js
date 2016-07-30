class Particle extends Sprite {

  constructor(g, o) {
    super(g, o);

    this.name = 'particle';
    this.scale = 1;
    this.group = 'na';

    this.w = 4;
    this.h = 4;


    this.lifespan = $.H.rnd(20,50);
    this.ttl = this.lifespan;
    this.alpha = 1;


    this.vx = ( $.H.rnd(0, 600) - 300 ) / 1000;  
    this.vy = ( $.H.rnd(0, 600) - 300 ) / 1000;  
  }


  update() {
    super.update();

    this.x += this.vx * this.g.dt; 
    this.y += this.vy * this.g.dt; 


    this.ttl -= 1;
    if (this.ttl < 0) {
      this.remove = true;  
    }

  }


  render() {

    var g = this.g;

    g.ctx.globalAlpha = (this.ttl / this.lifespan);

    g.draw.rect(this.x, this.y, 5, 5, $.cols[this.col]);
    g.ctx.globalAlpha = 1;

  }


}
