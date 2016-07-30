class Title extends State {


  init() {


    if (!this.g.hiScore) {
      this.g.hiScore = 20;
    }

    let nextState = (this.g.plays === 0) ? 'Intro' : 'Play',
        delay = (this.g.plays === 0) ? 1.5: 0.5;
        console.log(delay);

    this.bgCol = $.cols.nightblue;

    this.hi = this.g.mkFont('w', 3);
    this.sm = this.g.mkFont('w', 2);


    this.g.addEvent({
        time: delay,
        cb: () => {
          this.g.ents.push(new Button(this.g, {
            y: 380,
            triggerOnEnter: true,
            col: $.cols.leafgreen,
            state: nextState,
            text: 'PLAY',
            cb: () => { 
              this.g.changeState(nextState);
              }
          }));
          this.g.ents.push(new Button(this.g, {
            y: 450,
            size: 2,
            clickCol: $.cols.blaze,
            col: $.cols.blaze,
            state: nextState,
            text: 'BY EOINMCG',
            cb: () => { 
                window.location = '//twitter.com/eoinmcg';
              }
          }));

        }
    });


    this.g.ents.push(new Label(this.g, {p: this, speed: this.g.plays > 0 ? 100 : 1000}));

    this.bubble();

  }


  render()  {
    
    this.g.draw.clear(this.bgCol);

    this.g.draw.rect(125, 70, 70, 100, $.cols.blaze);
    this.g.draw.rect(60, 170, 200, 330, $.cols.blaze);
    this.g.draw.text('HI ', this.hi, 20, 20);
    this.g.draw.text(this.g.hiScore, this.hi, 50, 20);

    for (let n of this.g.ents) {
      n.render();
    }

    this.g.draw.rect(0, 170, 60, 330, this.bgCol);

  }


  bubble() {


    this.g.addEvent({
      time: $.H.rnd(0.1, 2),
      cb: () => {
        this.bubble();
      }
    });

    this.g.ents.push(new Bonus(this.g, {
      x: $.H.rnd(102, 108), y: 50
    }));
  }

}

