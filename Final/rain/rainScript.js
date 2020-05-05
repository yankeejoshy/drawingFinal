var width; var height; var pxScale = window.devicePixelRatio;

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

var background = document.getElementById("background");
var lightning = false; var lightningTimer = 10; var flashArray = [];
var thunder1 = document.getElementById("thunder1"); var thunder2 = document.getElementById("thunder2"); var thunder3 = document.getElementById("thunder3");

var bgAudio = document.getElementById("bgAudio");
var dpr = 100; // drops per row, also, total number of rows

var rainArray = []; // array of raindrops
for (let i = 0; i < dpr*dpr; i++) {
  if (Math.random() < 0.05) {
    if (Math.random() < 0.2) {
      rainArray.push(2); // falling raindrop
    }
    else {
      rainArray.push(1); // stationary raindrop
    }
  }
  else {
    rainArray.push(0); // empty
  }
}

function setup() {
  width = window.innerWidth; height = window.innerHeight;
  canvas.style.width = width + "px"; canvas.style.height = height + "px";
  canvas.width = width * pxScale; canvas.height = height * pxScale;
  context.scale(pxScale, pxScale);

  draw();
}

function newRaindrop(array, rowLength) {
  var pos = Math.floor(Math.random() * rowLength);
  if (Math.random() < 0.3) {
      array[pos] = 2;
  }
  else array[pos] = 1;
}

function checkBelow(rainArray, index) {

  let column = index % dpr;
  let row = (index - column)/dpr;
  if (row + 1 > dpr) {
    return "bottom";
  }
  else {
    let newIndex = (row+1) * dpr + column; // index of drop below
    if (rainArray[newIndex] == 0) {
      return "empty";
    }
    else {
      return "filled";
    }
  }
}

function thunder(length) {
  if (length == "short") {
    thunder1.play();
    return [1, 1];
  }
  else if (length == "medium") {
    thunder2.play();
    return [1, 1, 0, 1];
  }
  else {
    thunder3.play();
    return [1, 1, 0, 1, 0, 1, 1, 1, 0, 1];
  }
}

function draw() {
  if (bgAudio.paused || bgAudio.currentTime == 0) bgAudio.play();
  context.clearRect(0, 0, width, height);

  for (let row = 0; row < dpr; row++) {
    for (let column = 0; column < dpr; column++) {
      let index = row * dpr + column;
      if (rainArray[index] == 0) {
        context.fillStyle = "silver";
      }
      else {
        // context.fillStyle = "grey";
        context.fillStyle = "hsl(220, 40%, 70%)";
      }
      context.save();
      context.translate(width/(dpr*2), width/(dpr*2));
      context.beginPath();
      context.arc(column * (width/dpr), row * (width/dpr), width/(dpr*2), 0, Math.PI*2);
      context.fill();
      context.restore();
    }
  }

  // update raindrops
  for (let i = 0; i < rainArray.length; i++) {
    if (rainArray[i] == 3 || rainArray[i] == 4) rainArray[i] = 2;
  }
  for (let i = 0; i < rainArray.length; i++) {
    if (rainArray[i] == 1) {
      if (Math.random() < 0.05) rainArray[i] = 2; // chance for stationary raindrop to fall
    }
    if (rainArray[i] == 2 || rainArray[i] == 4) {
      let cellBelow = checkBelow(rainArray, i);
      if (cellBelow == "bottom") {
        rainArray[i] = 0;
      }
      else if (cellBelow == "empty") {
        if (rainArray[i] == 2) { // single drop
          let stillRaindrop = (Math.random() < 0.03); // 3% chance to revert to a still raindrop
          if (!stillRaindrop) {
            rainArray[i] = 0;
            rainArray[i + dpr] = 3;
          }
          else {
            rainArray[i] = 1;
          }
        }
        else { // multiple drops, just go
          rainArray[i + dpr] = 3;
        }

      }
      else if (cellBelow == "filled") {
        if (rainArray[i] == 2) rainArray[i] = 0;
        else rainArray[i] = 3;
        if (checkBelow(rainArray, i + dpr) == "empty") {
          rainArray[i + dpr] = 4;
        }
        else if (checkBelow(rainArray, i + dpr) == "filled") {
          rainArray[i + dpr] = 4;
        }
      }
    }
  }
  for (let i = 0; i < dpr; i++) {
      if (Math.random() < 0.1) newRaindrop(rainArray, dpr);
  }

  if (!lightning) {
    if (Math.random() < 0.06 && lightningTimer > 50) {
      lightning = true;
      let thunderVar = Math.random();
      if (thunderVar < 0.45) {
        flashArray = thunder("short");
      }
      else if (thunderVar < 0.75){
        flashArray = thunder("medium");
      }
      else {
        flashArray = thunder("long");
      }
    }
  }
  // if flashArray has any children, take the last index
  if (flashArray.length > 0) {
    if (flashArray.pop() == 1) background.style["background-color"] = "white";
    else background.style["background-color"] = "hsl(240, 20%, 50%)";
    // check if it was the last flash, if so, set lightning to false and start lightningTimer
    if (flashArray.length == 0) {
      lightning = false;
      lightningTimer = 0;
    }
  }
  else {
    background.style["background-color"] = "hsl(240, 20%, 50%)";
    lightningTimer++;
  }

  console.log(flashArray, lightning, lightningTimer);
  setTimeout(draw, 30);
}

window.addEventListener("load", setup);
window.addEventListener("resize", setup);
