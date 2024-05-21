import { canvasMetaData } from "./canvas-data.mjs";

class Player {
  constructor({ x, y, score = 0, id }) {
    this.id = id;
    this.score = score;
    this.x = x;
    this.y = y;
    this.playerWidth = canvasMetaData.playerWidth;
    this.playerHeight = canvasMetaData.playerHeight;
    this.speed = 5;
    this.movementDirection = {};
  }

  draw(context, playerType, playersArry) {
    const currDir = Object.keys(this.movementDirection).filter(
      dir => this.movementDirection[dir]
    );
    context.fillStyle = 'white';
    context.font = `13px 'Press Start 2P'`;
    context.textAlign = "center";
    context.fillText(this.calculateRank(playersArry), 560, 32.5)
    currDir.forEach(dir => this.movePlayer(dir, this.speed));
    context.drawImage(playerType.mainPlayerImg, this.x, this.y);
  }

  startDirection(dir) {
    this.movementDirection[dir] = true;
  }

  stopDirection(dir) {
    this.movementDirection[dir] = false;
  }

  movePlayer(dir, speed) {
    if (dir == 'up') {
      this.y - speed >= canvasMetaData.playgroundMinY ?
        this.y -= speed :
        this.y -= 0;
    }
    if (dir == 'down') {
      this.y + speed <= canvasMetaData.playgroundMaxY ?
        this.y += speed :
        this.y += 0;
    }
    if (dir == 'left') {
      this.x - speed >= canvasMetaData.playgroundMinX ?
        this.x -= speed :
        this.x -= 0;
    }
    if (dir == 'right') {
      this.x + speed <= canvasMetaData.playgroundMaxX ?
        this.x += speed :
        this.x += 0;
    }
  }

  collision(item) {
    if (
      this.x < item.x + item.itemWidth &&
      this.x + this.playerWidth > item.x &&
      this.y < item.y + item.itemHeight &&
      this.y + this.playerHeight > item.y
    ) return true;
  }

  calculateRank(arr) {
    const totalPlayers = arr.length;
    arr.sort(function (a, b) { return b.score - a.score });
    let currentRanking = totalPlayers;
    for (let i = 0; i < totalPlayers; i++) {
      if (arr[i].id == this.id)
        currentRanking = i + 1;
    }
    return `Rank: ${currentRanking}/${totalPlayers}`;
  }
}

export default Player;
