class Play extends State {


  init() {

    this.g.plays += 1;
    this.gameOver = false;
    this.floor = 377;

    this.p = this.g.mkFont('r', 7);

    this.g.player = new P1(this.g, { x: 100, y: this.floor, p: this});
    this.g.ents.push(this.g.player);

    this.g.cloud = new Cloud(this.g, { x: 100, y: 50, p: this});
    this.g.ents.push(this.g.cloud);

    this.g.audio.play('levelup');

    this.hills = this.g.draw.scale(this.g.imgs.hills, 2);
    this.grass = this.g.draw.scale(this.g.imgs.grass, 2);
    this.heart = this.g.draw.scale(this.g.imgs.heart, 4);
    this.g.lives = 2;
    this.g.score = 0;
    this.scoreFont = this.g.mkFont('w', 4);

    this.spilt = false;
    this.sky = new Sky(this.g, this);
    this.wave = 0;
    this.startWave();

  }

  update(step) {
    super.update(step);

    if (this.g.lives < 0 && !this.gameOver) {
      this.g.audio.play('gameover');
      this.g.player.changeAnim('gulp');
      this.gameOver = true;
      if (this.g.score > this.g.hiScore) {
        this.g.hiScore = this.g.score;

        this.g.ents.push(new Text(this.g, {x: false, y: 350, text: 'NEW HISCORE', 
          scale: 6, col: 'w'}));

      }
      // this.g.addEvent({
      //   time: 6,
      //   cb: () => {
      //     this.g.changeState('Title');
      //   }
      // });
      this.g.addEvent({
        time: 3,
        cb: () => {
          this.startButton = this.g.ents.push(new Button(this.g, {
            y: 280,
            triggerOnEnter: true,
            col: $.cols.pigmeat,
            state: 'Play',
            text: 'RETRY',
            cb: () => { 
              this.g.audio.play('tap');
              this.g.changeState('Play');
            }
          }));
          this.quitButton = this.g.ents.push(new Button(this.g, {
            y: 360,
            col: $.cols.skyblue,
            state: 'Title',
            text: 'TWEET',
            cb: () => { 

              window.location = 'https://twitter.com/intent/tweet?&text=I+scored+'+this.g.score+'+in+Whiskey+Fever&via=eoinmcg&url=https%3A%2F%2Feoinmcg.github.io%2Fwhiskey'; }
          }));
        }
      });

    }

    if (this.inWave < 0 && !this.waveInterval) {
      this.waveInterval = true;
      this.g.addEvent({
        time: 2,
        cb: () => {
          this.startWave();
        }
      });
    }

    this.sky.update();

  }

  render()  {

    this.g.draw.clear($.cols.cloudblue);

    this.g.ctx.drawImage(this.hills, 0, 290);

    this.sky.render();
    this.g.ctx.drawImage(this.grass, 0, 400);

    for (let n of this.g.ents) {
      n.render();
    }

    if (this.gameOver && this.fader > 0) {
      this.g.draw.text('GAME OVER', this.p, false, 200);
    }


    for (let i = 0; i < this.g.lives; i += 1) {
      this.g.ctx.drawImage(this.heart, 220 + (i * 27), 20);
    }

    this.g.draw.text(this.g.score, this.scoreFont, 20, 20);

  }


  doSpill() {
    this.spilt = true;
    this.g.addEvent({
      time: 0.5,
      cb: () => {
        this.explodeDrips();
      }
    });
  }

  explodeDrips() {
    let i = 0,
      found = false;
    for (i = 0; i < this.g.ents.length; i += 1) {
      if (this.g.ents[i].name === 'drop') {
        found = true;
        this.g.audio.play('drip');
        this.g.ents[i].explode();
        this.doSpill();
        break;
      }  
    }

    if (!found) {
      this.spilt = false;
      this.g.lives -= 1;
      if (this.wave !== 1) {
        this.wave -= 2;
        this.startWave();
      }
    }
  }

  spawn() {
    let scale = $.H.rnd(2,6),
      delay = $.H.rnd(0.5,2.5),
      s = this;

    if (this.gameOver || this.inWave < 0) {
      return;
    }

    this.g.addEvent({
      time: delay,
      cb: () => {
        if (!this.gameOver && this.inWave >= 0) {
          this.spawn();
          if (!this.spilt) {
            this.g.cloud.changeAnim('burp');
            this.g.audio.play('fart');
            this.g.ents.push(new Drop(this.g, {
              p: this,
              x: this.g.cloud.x + (this.g.cloud.w / 2),
              y: this.g.cloud.y + this.g.cloud.h
            }));
          }
        }
      }
    });

  }


  startWave() {
    let diff = 0;
    this.wave += 1;
    this.inWave = 1 + (this.wave * 2);
    this.waveInterval = false;

    diff = (this.wave < 8) ?
      (this.wave / 10) : 1.5;

    this.g.player.vx = (this.wave > 2) ?
      6 : 4;

    this.delay = {
      min: 0.5,
      max: 2.6 - diff
    };

  }


  doDrop() {
    if (!this.spilt) {
      this.g.cloud.changeAnim('burp');
      this.g.audio.play('fart');
      this.g.ents.push(new Drop(this.g, {
        p: this,
        x: this.g.cloud.x + (this.g.cloud.w / 2),
        y: this.g.cloud.y + this.g.cloud.h
      }));
    }
  }

}


