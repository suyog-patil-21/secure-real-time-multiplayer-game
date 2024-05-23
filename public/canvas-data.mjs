const canvasWidth = 640;
const canvasHeight = 480;
const border = 5;
const playerWidth = 30;
const playerHeight = 30;
const infoBar = 45;
const collectibleWidth = 15;
const collectibleHeight = 15;

const canvasMetaData = {
    canvasWidth,
    canvasHeight,
    playgroundMinX: canvasWidth / 2 - (canvasWidth - 10) / 2,
    playgroundMinY: canvasHeight / 2 - (canvasHeight - 100) / 2,
    playgroundWidth: canvasWidth - border * 2,
    playgroundHeight: canvasHeight - infoBar - border * 2,
    playgroundMaxX: canvasWidth - playerWidth - border,
    playgroundMaxY: canvasHeight - playerHeight - border,
    playerHeight,
    playerWidth,
    collectibleHeight,
    collectibleWidth
}

function getRandomCoordinate(min, max, multiple) {
    return Math.floor(Math.random() * ((max - min) / multiple)) * multiple + min;
}

try {
    module.exports = { canvasMetaData, getRandomCoordinate };
} catch {
}

export { canvasMetaData, getRandomCoordinate };