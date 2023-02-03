
const canvas = document.getElementById("game-canvas");
canvas.width = 805;
canvas.height = 600;
const ctx = canvas.getContext("2d");

// draw background
const backgroundImage = new Image();
backgroundImage.src = "./images/Level1 Grass plane.png";

// limit the canvas
let backgroundX = 0
const limit = backgroundImage.width - canvas.width;

let isRunning = false;

// keyboard navigation
document.addEventListener("keydown", function(event) {
  switch (event.key) {
    case "a":
      backgroundX = Math.min(backgroundX + 10, 0);
      isRunning = true;
      break;
    case "d":
      backgroundX = Math.max(backgroundX - 10, -limit);
      isRunning = true;
      break;
  }
});

document.addEventListener("keyup", function(event) {
  switch (event.key) {
    case "a":
    case "d":
      isRunning = false;
      break;
  }
});

// update loop
backgroundImage.onload = function() {
  ctx.drawImage(backgroundImage, backgroundX, 0);
  requestAnimationFrame(update);
};

// load sprite sheet // only do sprite animation when keys are pressed
const playerImage = new Image();
playerImage.src = "./images/Run.png";

let frameIndex = 0;
let tickCount = 0;
const ticksPerFrame = 5;
const playerWidth = 70;
const playerHeight = 500 / 5;
const playerX = 0;
const playerY = 365;


function update() {
  tickCount += 1;

  if (tickCount > ticksPerFrame) {
    tickCount = 0;

    // Go to the next frame
    if (frameIndex < 5) {
      frameIndex += 1;
    } else {
      frameIndex = 0;
    }
  }

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw the background
  // Show message if the end is reached
  const endImage = new Image();
  endImage.src = "./images/sinisterr level1 map.png";

  // Load next image
  let battle1Image = new Image();
  battle1Image.src = "./images/Battle1.png";

  let displayImage = endImage;

  function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the current display image
    ctx.drawImage(displayImage, 0, 0, canvas.width, canvas.height);
  }

  setTimeout(function() {
    displayImage = battle1Image;
    draw();
  }, 10000);

  //background limit
  if (backgroundX <= -limit) {
  ctx.drawImage(endImage, canvas.width / 2 - endImage.width / 2, canvas.height / 2 - endImage.height / 2);
  } else {
  
  ctx.drawImage(backgroundImage, backgroundX, 0);

  // Draw the current frame of the sprite sheet
  if (isRunning) {
    tickCount += 1;

    if (tickCount > ticksPerFrame) {
      tickCount = 0;

      // Go to the next frame
      if (frameIndex < 5) {
        frameIndex += 1;
      } else {
        frameIndex = 0;
      }
    }

    ctx.drawImage(
      playerImage,
      frameIndex * playerWidth,
      0,
      playerWidth,
      playerHeight,
      playerX,
      playerY,
      playerWidth,
      playerHeight
    );
    
  } else {
    frameIndex = 0;
    ctx.drawImage(
      playerImage,
      frameIndex * playerWidth,
      0,
      playerWidth,
      playerHeight,
      playerX,
      playerY,
      playerWidth,
      playerHeight
    );
  }

  requestAnimationFrame(update);
}


// render loop
function render() {
  ctx.drawImage(playerImage, 0, 360);
}

playerImage.onload = function() {
  render();
};

}

