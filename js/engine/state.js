class State {

  constructor(g) {
    this.g = g;
    this.init();
  }

  init() {
    this.bgCol = $.cols.nightblue;
    this.fader = 0;
  }

  update() {

    let g = this.g,
        i = g.ents.length;

    for (let n of g.ents) {
      n.update();
    }

    while (i--) {
          if (g.ents[i].remove) {
              g.ents.splice(i, 1);
          }
    }


    i = g.events.length;
    while(i--) {
      let e = g.events[i]; 
      if (!e) {
        break;
      }
      e.time -= ( g.dt / 1000 );
      // console.log(i, e.time);
      if (e.time < 0) {
        e.cb.call(this);
        g.events.splice(i, 1);
      }
    }

    this.fader = Math.sin(new Date().getTime() * 0.005);
  }

  render() {

    this.g.draw.clear(this.bgCol);

    for (let n of this.g.ents) {
      n.render();
    }
  }

}
