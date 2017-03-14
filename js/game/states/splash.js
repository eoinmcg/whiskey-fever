class Splash extends State {


  init() {
    this.tick = 1000;

    this.bgCol = $.cols.black;
    this.p = this.g.mkFont('w', 5);
    this.p2 = this.g.mkFont('w', 3);
    this.skull = this.g.ents.push(new Skull(this.g, { }));

    var fs = document.getElementById('fs');
    fs.style.display = 'block';

    fs.addEventListener('click',() => {
        $.H.toggleFullScreen();
        setTimeout(() => { this.g.scale(); }, 100);
    });


  }

  update() {

      super.update();
      this.tick -= 1;
      //
      if (this.tick < 0 || (this.g.input.m.click || this.g.input.keys.enter)) {
        this.g.input.keys.enter = false;
        this.g.changeState('Title');
      }

  }


  render() {
    
    super.render();
    this.g.draw.text('EOINMCG', this.p, false, 145);
    this.g.draw.text('PRESENTS', this.p2, false, 300);
  }



}


class Skull extends Sprite {

  constructor(g, o) {
    o.vx = 0;
    o.vy = 0;
    o.scale = 1;
    o.i = 'skull';
    o.group = 'baddie';
    super(g, o);
    this.growRate = 1;
    this.grow = this.growRate;
    this.maxSize = 7;
  
  }


  update() {
    this.grow -= 1;
    if (this.grow < 0 && this.scale <= 10) {
      this.grow = this.growRate;
      this.scale += 1;
      this.mkImg('skull');
      if (this.scale === 7) {
        // this.g.audio.play('powerup');
      }
      if (this.scale === 10) {
        this.g.audio.play('fart');
        this.g.shake.start(20, 10);
      }
    }


    this.x = this.g.w / 2 - (this.w / 2);
    this.y = this.g.h / 2 - (this.h / 2);

  }



}
