import Player from './Player.mjs';
import Collectible from './Collectible.mjs';
import { canvasMetaData, getRandomCoordinate } from './canvas-data.mjs';
import controls from './game-control.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');


const loadImg = src => {
    const image = new Image();
    image.src = src;
    return image;
}

// preloading assets
const goldCoinImg = loadImg('/assets/gold-coin.png');
const silverCoinImg = loadImg('/assets/silver-coin.png');
const bronzeCoinImg = loadImg('/assets/bronze-coin.png');
const mainPlayerImg = loadImg('/assets/main-player.png');
const otherPlayerImg = loadImg('/assets/other-player.png');

let currentPlayers = [];
let collectible;

socket.on('init', ({ id, players, coin }) => {
    console.log(`User ${id} connected`);

    const mainPlayer = new Player({
        x: getRandomCoordinate(canvasMetaData.playgroundMinX, canvasMetaData.playgroundMaxX, 5),
        y: getRandomCoordinate(canvasMetaData.playgroundMinY, canvasMetaData.playgroundMaxY, 5),
        score: 0,
        id: id,
        main: true
    });

    socket.emit('new-player', mainPlayer);

    controls(mainPlayer, socket);

    socket.on('new-player', (newPlayer) => {
        const ids = currentPlayers.map((value, index, arr) => value.id);
        console.log(`New-player ${newPlayer} ${ids}`);
        if (!ids.includes(newPlayer.id)) currentPlayers.push(newPlayer);
    });

    currentPlayers = players.map(value => new Player(value)).concat(mainPlayer);
    collectible = new Collectible(coin);
    
    draw();
    console.log(`Init End: \n${coin}\n${currentPlayers}`)
});

const draw = () => {
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

    currentPlayers.forEach(player => player.draw(context, collectible, { mainPlayerImg, otherPlayerImg }, currentPlayers));

    collectible.draw(context, { goldCoinImg, silverCoinImg, bronzeCoinImg });

    window.requestAnimationFrame(draw);
}