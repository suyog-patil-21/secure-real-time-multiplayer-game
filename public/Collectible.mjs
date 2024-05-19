class Collectible {
  constructor({ x, y, value, id }) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.value = value;
  }

}

/*
  Note: Attempt to export this for use
  in server.js
*/
try {
  module.exports = Collectible;
} catch (e) { }

export default Collectible;
