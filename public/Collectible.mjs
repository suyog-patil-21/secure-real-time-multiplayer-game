import { canvasMetaData } from "./canvas-data.mjs";

class Collectible {
  constructor({ x, y, value, id }) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.itemHeight = canvasMetaData.collectibleHeight;
    this.itemWidth = canvasMetaData.collectibleWidth;
    this.value = value;
  }

  draw(context, collectibleTypes) {
    if (this.value == 1) {
      context.drawImage(collectibleTypes.bronzeCoinImg, this.x, this.y);
    } else if (this.value == 2) {
      context.drawImage(collectibleTypes.silverCoinImg, this.x, this.y);
    } else {
      context.drawImage(collectibleTypes.goldCoinImg, this.x, this.y);
    }
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
