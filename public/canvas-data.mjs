const canvasWidth = 640;
const canvasHeight = 480;
const border = 5;
const playerWidth = 30;
const playerHeight = 30;
const infoBar = 45;


const canvasMetaData = {
    canvasWidth,
    canvasHeight,
    playgroundMinX: canvasWidth / 2 - (canvasWidth - 10) / 2,
    playgroundMinY: canvasHeight / 2 - (canvasHeight - 100) / 2,
    playgroundWidth: canvasWidth - border * 2,
    playgroundHeight: canvasHeight - infoBar - border * 2,
    playgroundMaxX: canvasWidth - playerWidth - border,
    playgroundMaxY: canvasHeight - playerWidth - border,
}

export { canvasMetaData };