var canvas = document.getElementById('screen');
var c = canvas.getContext("2d");
var objs = [[100,100,300,0,0]];
var player = [100,80];
var touch = false, g = 0;
var energy = 100;
var scene = "start";
var lastDeathTime;
var score = 0;
var fuck = false;

canvas.addEventListener('touchstart', click);
canvas.addEventListener('touchend', clickend);
document.getElementById("pausebtn").addEventListener("click", pause);

function initial() {
  objs = [[100,100,300,0,-0.2]];
  player = [100,80];
  touch = false;
  g = 0;
  energy = 100;
  score = 0;
}

function extBool(singi) {
  if (singi){
    return 1;
  } else {
    return -1;
  }
}

function click() {
  touch = true;
}

function clickend() {
  touch = false;
}

function pause() {
  var btn = document.getElementById("pausebtn")
  if (fuck) {
    btn.innerHTML = "If you want to pause this game, you may wish to click this button";
    fuck = false;
  } else {
    btn.innerHTML = "If you want to continue this game, you may wish to click this button";
    fuck = true;
  }
}

function checkbox() {
  for (var i of objs) {
    if (i[0] > 110) {
      break;
    } else {
      if ( ( (player[1] < i[1] && i[1] < player[1]+g) || (9.5 < i[1]-player[1] && i[1]-player[1] < 10.5) ) && i[0]+i[2] > 100 && g >= 0) {
        player[1] = i[1]-10;
        if (energy < 100) {
          energy += 2;
          if (energy == 101) {
            energy = 100;
          }
        }
        i[3] = 1;
        score += 19;
        g = 0;
      }
    }
  }
}

function downbox() {
  for (var i of objs) {
    if (i[3]) {
        i[1] += i[4];
        i[4] += 0.01;
        i[2] -= 0.2;
    }
  }
}

function amIdown() {
  if (player[1] > 200) {
    scene = "game over"
    lastDeathTime = new Date
    lastDeathTime = lastDeathTime.getTime()
  }
}

function update() {
  if (scene == "main" && !fuck) {
    if (objs[0][0] < -1*objs[0][2]) {
      objs.shift();
    }
    for (var i of objs) {
      i[0] -= 1;
    }
    if (objs[objs.length-1][0] < 450 && Math.random() < 0.05) {
      objs.push([500, Math.random()*150+25,30,0,0]);
    }
    if (touch && energy > 0) {
      g = -1
      energy -= 1;
      player[1] += g;
    } else {
      player[1] += g;
      g += 0.05;
    }
    checkbox();
    amIdown();
    score += 1;
    downbox();
  }
}

function draw() {
  if (scene == "start") {
    c.fillStyle = "navy";
    c.fillRect(0,0,500,200);
    c.font = "40px serif";
    c.fillStyle = "yellow";
    c.textAlign = "center";
    c.fillText("Platformer - M", 250,100);
    c.font = "20px serif";
    c.fillText("Tap to play", 350,150);
    if (touch) {
      initial();
      scene = "main";
    }
  } else if (scene == "main") {
    c.clearRect(0,0,500,200);
    c.fillStyle = "white";
    for (var i of objs) {
      if (i[3]) {
        c.fillStyle = "orange";
      } else {
        c.fillStyle = "white";
      }
      c.fillRect(i[0],i[1],i[2],5);
    }
    c.fillStyle = "white";
    c.fillRect(player[0],player[1],10,10);
    c.fillStyle = "red";
    c.fillRect(5,193,energy/100*490,5);
    c.font = "18px serif";
    c.tetAlign = "left";
    c.fillStyle = "yellow";
    c.fillText("SCORE : "+score, 80,20)
  } else if (scene == "game over") {
    c.fillStyle = "rgba(255,255,255, 0.01)";
    c.fillRect(0,0,500,201)
    c.font = "40px serif";
    c.fillStyle = "yellow";
    c.textAlign = "center";
    c.fillText("GAME OVER",250, 100)
    c.font = "20px serif";
    c.fillText("Tap to play again",250,150);
    var now = new Date;
    if (now.getTime() - lastDeathTime > 500 && touch) {
      initial();
      scene = "main";
    }
  }
}

function game() {
  console.log(objs);
  update();
  draw();
}

setInterval(game,10);
