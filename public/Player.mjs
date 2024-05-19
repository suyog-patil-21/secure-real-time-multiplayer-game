class Player {
  constructor({ x, y, score, id }) {
    this.id = id;
    this.score = score;
    this.x = x;
    this.y = y;
  }

  movePlayer(dir, speed) {
    if (dir == 'up') {
      this.y = this.y + speed;
    }
    if (dir == 'down') {
      this.y = this.y + speed;
    }
    if (dir == 'left') {
      this.x = this.x - speed;
    }
    if (dir == 'right') {
      this.x = this.x + speed;
    }
  }

  collision(item) {
    if (this.x == item.x && this.y == item.y) return true;
    return false;
  }

  calculateRank(arr) {
    const totalPlayers = arr.length;
    arr.sort(function (a, b) { return b.score - a.score });
    let currentRanking = arr.length;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == this.id)
        currentRanking = i + 1;
    }
    return `Rank: ${currentRanking}/${totalPlayers}`;
  }
}

export default Player;
