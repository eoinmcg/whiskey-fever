class P1 extends Sprite {


  constructor(g, o = {}) {
    o.w = 16;
    o.h = 16;
    o.group = 'player';
    o.collidesWith = 'baddie';
    o.frames = 6;
    o.scale = 4;
    o.i = 'p1';

    super(g, o); 
    this.x = g.w / 2 - (this.w / 2); 
  }


  init() {
    this.anims = {
      walk: { frames: [2,1], rate: 80 },
      fry: { frames: [6,4], rate: 80 },
      stand: { frames: [1,1,1,5,1,1], rate: 200 },
      gulp: { frames: [3], rate: 100, next: 'stand' }
    };

    this.changeAnim('walk');

  }


  updateMove() {

    let keys = this.g.input.keys,
        m = this.g.input.m;

    if (this.p.gameOver) {
      // this.changeAnim('fry');
      return;
    } else if (this.p.spilt) {
      this.changeAnim('gulp');
      return;
    }

    this.x = m.x - (this.w / 2);
    if (this.lastPos.x < this.x) {
      this.flip.x = 0;
    } else if (this.lastPos.x > this.x) {
      this.flip.x = 1;
    }

    if (this.lastPos.x !== this.x 
      && this.anim.name !== 'walk'
      && this.anim.name !== 'gulp') {
      this.changeAnim('walk');
    } else if (this.lastPos.x === this.x && this.anim.name !== 'gulp') {
      this.changeAnim('stand');
    }


  }

  render() {
    
    super.render();
  }

  receiveDamage(o) {
    console.log(o.group);
  }


  doDamage(o) {
    o.kill();
  }

  
  kill() {
    this.g.audio.play('die');
    this.g.emitter.particle(20, this.x + (this.w / 2), this.y + (this.h / 2),
        ['slimegreen', 'bloodred']);
    super.kill();
  }

}
