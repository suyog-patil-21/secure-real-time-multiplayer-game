import Player from './Player.mjs';
import Collectible from './Collectible.mjs';
import { canvasMetaData } from './canvas-data.mjs';

// const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');


const loadImg = src => {
    const image = new Image();
    image.src = src;
    return image;
}

const goldCoinImg = loadImg('/assets/gold-coin.png');
const silverCoinImg = loadImg('/assets/silver-coin.png');
const bronzeCoinImg = loadImg('/assets/bronze-coin.png');
const mainPlayerImg = loadImg('/assets/main-player.png');
const otherPlayerImg = loadImg('/assets/other-player.png');

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#220"
    context.fillRect(0, 0, canvasMetaData.canvasWidth, canvasMetaData.canvasHeight);

    context.strokeStyle = 'white';
    context.strokeRect(
        canvasMetaData.playgroundMinX,
        canvasMetaData.playgroundMinY,
        canvasMetaData.playgroundWidth,
        canvasMetaData.playgroundHeight
    );

    context.fillStyle = 'white';
    context.font = `13px 'Press Start 2P'`;
    context.textAlign = "center";
    context.fillText('Controls: WASD', 100, 32.5)

    context.fillStyle = 'white';
    context.font = `16px 'Press Start 2P'`;
    context.textAlign = "center";
    context.fillText('Coin Race', canvasMetaData.canvasWidth / 2, 32.5)
}

draw();