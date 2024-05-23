require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai');
const { createServer } = require("http");
const socket = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');
const { canvasMetaData, getRandomCoordinate } = require('./public/canvas-data.mjs');

const app = express();
const httpServer = createServer(app);
const io = new socket.Server(httpServer);

app.use(helmet.noSniff())
app.use(helmet.xssFilter())
app.use(helmet.noCache())
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.4.3' }))

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/assets', express.static(process.cwd() + '/assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//For FCC testing purposes and enables user to connect from outside the hosting platform
app.use(cors({ origin: '*' }));

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });


function generateCoin() {
  return {
    x: getRandomCoordinate(canvasMetaData.playgroundMinX, canvasMetaData.canvasWidth, 5),
    y: getRandomCoordinate(canvasMetaData.playgroundMinY, canvasMetaData.canvasHeight, 5),
    value: Math.floor(Math.random()) * 3 + 1, id: Date.now()
  };
}

let players = [];
let coin = new generateCoin();
const MAX_TIME = 2 * 60 * 1000;
let timerId = null;

function setTimer() {
  if (timerId) {
    clearTimeout(timerId);
  };
  timerId = setTimeout(
    () => {
      players.sort(function (a, b) { return b.score - a.score });
      players.forEach((player) => {
        io.to(player.id).emit('end-game', player.id == players[0].id ? "Win" : "Lose");
      });
    }, MAX_TIME);
}

io.on('connection', (socketConn) => {
  console.log(`User ${socketConn.id} connected`);

  socketConn.emit('init', { id: socketConn.id, players, coin });

  socketConn.on('disconnect', (reason) => {
    console.log(`id: ${socketConn.id}Disconnected, reason:${reason}`);
    players = players.filter((player) => player.id !== socketConn.id);
    io.emit('remove-player', socketConn.id);
    if (players.length === 0 && timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  });

  socketConn.on('new-player', (data) => {
    const ids = players.map((value) => value.id);
    data.isMain = (data.id === socketConn.id);
    io.emit('new-player', data);
    delete data.isMain;
    if (!ids.includes(data.id)) players.push(data);
    setTimer();
  });

  socketConn.on('move-player', (dir, posObj) => {
    const player = players.find((value) => value.id === socketConn.id);
    players.x = posObj.x;
    players.y = posObj.y;
    io.emit('move-player', { id: socketConn.id, dir, posObj: { x: players.x, y: players.y } })
  });

  socketConn.on('stop-player', (dir, posObj) => {
    const player = players.find((value) => value.id === socketConn.id);
    players.x = posObj.x;
    players.y = posObj.y;
    io.emit('stop-player', { id: socketConn.id, dir, posObj: { x: players.x, y: players.y } })
  });

  socketConn.on('destroyed-coin', ({ playerId, coinValue, coinId }) => {
    if (coin.id == coinId) {
      const player = players.find((value) => value.id === playerId);
      player.score += coin.value;
      coin = generateCoin();
      io.emit('new-coin', coin);
      io.emit('update-player', player);
    }
  });
});


//For FCC testing purposes
fccTestingRoutes(app);

// 404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
const server = httpServer.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});

module.exports = app; // For testing
