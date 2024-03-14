class MusicNotation {
  constructor(tempo) {
    this.mm = tempo;
    this.bps = tempo / 60;
    this.ms = (1 / this.bps) * 1000;
  }
  updateMM(newTempo) {
    this.mm = newTempo;
    this.bps = newTempo / 60;
    this.ms = (1 / this.bps) * 1000;
  }
  sixteenth() {
    return this.ms / 4;
  }
  eigth() {
    return this.ms / 2;
  }
  quarter() {
    return this.ms;
  }
  dottedQuarter() {
    return this.ms * 1.5;
  }
  half() {
    return this.ms * 2;
  }
  dottedHalf() {
    return this.ms * 3;
  }
  whole() {
    return this.ms * 4;
  }
}
export { MusicNotation };
