class Sprite {

  constructor(g, o = {}) {
    this.g = g;

    this.dead = false;
    this.remove = false;

    this.id = Date.now() + '-' + g.ents.length;
    this.angle = 0;
    this.tick = 0;

    this.lastPos = { x: this.x, y: this.y };
    this.flip = { x: 0, y: 0 };

    this.scale = o.scale || 1;
    this.frame = o.frame || 1;
    this.frames = o.frames || 1;
    this.frameRate = o.frameRate || 80;
    this.frameNext = o.frameNext || 0;

    for (let n in o) {
      this[n] = o[n];
    }

    if (o.i) {
      this.mkImg(o.i);
    }

    this.init();
  }


  init() {
    this.anims = { idle: { frames: [1], rate: 80 } };
    this.changeAnim('idle');
  }

  update() {

    this.lastPos.x = this.x;
    this.lastPos.y = this.y;

    this.tick += ( this.g.dt / 100 );


    if (this.collidesWith) {
      this.hitGroup(this.collidesWith);
    }


    this.updateAnim();
    this.updateMove();
    this.restrictToScreen();


    if (this.gravity) {
      this.vy += this.gravity * this.g.dt;
    }



  }

  updateAnim() {


    if (this.frameNext < 0) {
      this.frameNext = this.anim.rate;
      this.anim.counter += 1;

      if (this.anim.counter >= this.anim.frames.length) {
        if (this.anim.next) {
          this.changeAnim(this.anim.next);
        }
        else {
          this.anim.counter = 0;
        }
      }

      this.frame = this.anim.frames[this.anim.counter];
    }
    this.frameNext -= this.g.dt;
  }


  updateMove() { }

  restrictToScreen() {
    if (this.x < 0) { this.x = 0; }
    if (this.x > this.g.w - this.w) { this.x = this.g.w - this.w; }
    if (this.y < 0) { this.y = 0; }
    if (this.y > this.g.h - this.h) { this.y = this.g.h - this.h; }
  }

  render() {

    let g = this.g,
        i = this.i,
        frame = this.frame;

    if (i) {

      if (this.flip.y) {
        i = g.draw.flip(i, 0, 1);
      }
      if (this.flip.x) {
        i = g.draw.flip(i, 1, 0);

        frame = this.frames - this.frame + 1;

      }

      g.ctx.drawImage(i, 
        ( frame * this.w ) - this.w, 0,
        this.w, this.h,
        ~~this.x, ~~this.y,
        this.w, this.h
        );
    } else {
      this.g.draw.rect(~~this.x, ~~this.y, this.w, this.h, this.col);
    }


  }

  doDamage(o) {
    // this.kill();
  }

  receiveDamage(o) {
    // this.kill();
  }


  kill() {
    this.dead = true;
    this.remove = true;
  }

  hitGroup(group) {

    let g = this.g,
      i = g.ents.length;

      while (i--) {

      if (g.ents[i] && g.ents[i].group === group && 
          g.ents[i].id !== this.id && this.hit(g.ents[i]) &&
          g.ents[i].dead === false) {
        this.doDamage(g.ents[i]);
        g.ents[i].receiveDamage(this);
      } 
    }

  }

  hit(o) {

    return !((o.y+o.h-1<this.y) || (o.y>this.y+this.h-1) ||
      (o.x+o.w-1<this.x) || (o.x>this.x+this.w-1));
      
  }

  mkImg(name) {
      
      let g = this.g;

      this.i = g.draw.scale(g.imgs[name], this.scale);

      this.w = ( this.i.width / this.frames);
      this.h = this.i.height;
      this.iHurt = g.draw.scale(g.imgs[name + '_w'], this.scale);


  }


  changeAnim(name) {

    if (this.anim && this.anim.name && this.anim.name === name) {
      return;
    }

    this.anim = this.anims[name];
    this.anim.name = name;
    this.anim.counter = 0;
    this.frame = this.anim.frames[0];
    this.frameNext = this.anim.rate;
  }
}
