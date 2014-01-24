
window.onload = play;

function play () {
   document.getElementById("knop2").onclick = init;
   klik0();
 } 

// variabelen
var canvas;
 
var x = 300;
var y = 30;
 
var left = false;
var right = false;
var up = false;
var down = false;
 
var speed = 2;

var verticaleSnelheid = 0;

var landed =false;

var crash = 1;

var laned = 1;

var fuel = 100;

var fuelEmpty = 1; 


 
// init wordt eenmalig uitgevoerd om alles op te bouwen
function init() { 
  // canvas opvragen uit DOM
  canvas = document.getElementById("animatie");

  knop2.style.opacity = "0";
 
  // pijltjestoetsen afhandeling regelen...
  window.onkeydown = keydown;
  window.onkeyup = keyup;
 
  initAnimation();
}


function klik0 () {
  document.getElementById("knop").onclick=klik;
}

function klik () {
  document.getElementById("text1");
  text1.style.opacity = '100';
  document.getElementById("knop").onclick=klik2;
}

function klik2 () {
  document.getElementById("text1");
  text1.style.opacity = '0';
  document.getElementById("knop").onclick=klik;
} 

function initAnimation() {
  // vraag aan de browser om maximaal 60 fps te animeren
  window.looper = (function(callback){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){ 
      window.setTimeout(callback, 1000 / 60);
    };
  })();
  
  (function animatieLoop(){
    looper(animatieLoop); 
    tekenFrame();
    if (!landed) {
      beweegBlokje();
    };
  })();
}

function reload () {
  crash = 1;
  laned = 1;
  x = 300;
  y = 10;
  verticaleSnelheid = 0;
  speed = 2;  
  landed =false;
  left = false;
  right = false;
  up = false;
  down = false;
  fuel = 100;
  fuelEmpty = 1; 
}


 
function beweegBlokje() {


  y += verticaleSnelheid;
  verticaleSnelheid += 0.2;

  if (left) {
    x-=speed;
  } 

  else if (right) {
    x+=speed;
  }
  
  if  (up) {
    verticaleSnelheid -= 0.4;
  }

  if (y < 5) {
    y = 5;
  };

  if (x < 5) {
    x = 5;
  };

  if (x > canvas.width-5) {
    x = canvas.width-5;
  };


   if (y > canvas.height -5) {
    y = canvas.height -5;

    if (verticaleSnelheid < 2.2) {
      console.log('landed');
      landed = true;
      laned = 0;
    }
    else {
      console.log('crash');
      landed = true;
      crash = 0;
      
      }
    };
  

  };





 
// het tekenen van het scherm
function tekenFrame() {
  ctx = canvas.getContext("2d");
  // 2d context leeg maken, het canvas is 800px breed en 640px hoog
  ctx.clearRect(0, 0, 800, 640);
  ctx.save();
  ctx.translate(x, y);
  // vierkantje tekenen
  ctx.fillRect(-5, -5, 10, 10);

  
  if (up) {
  ctx.beginPath();
  ctx.moveTo(-2,4);
  ctx.lineTo(0, 15);
  ctx.lineTo(2, 6);
  ctx.closePath();
  ctx.strokeStyle = "red";
  ctx.stroke();
  };
  ctx.restore();

  if (laned < 1) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "20px Star Jedi Rounded";
    ctx.fillText ("You landed ", 260, 100);
  };

  if (crash < 1) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "20px Star Jedi Rounded";
    ctx.fillText ("You are a fag ", 200, 100);
  };

  if (fuelEmpty < 1) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "20px Star Jedi Rounded";
    ctx.fillText ("No more fuel Fag ", 220, 100);
  };  

  
  if (fuel > 0) {  
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.font = "18px Star Jedi Rounded";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Fuel: " + fuel, 30, 10);
}
}

function fuelCountdown () {
  fuel -= 5;
  
  if (fuel < 5) {
    fuelEmpty = 0;
    landed = true;
    up = false;
  };
  console.log(fuel)

  
}
 
// pijltjes toetsen ingedrukt
function keydown(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) { // iedere toets heeft een eigen code...
    case 37:    // pijltje links is 37
      left = true;
      break;
    case 38:    // pijltje omhoog is 38...
      up = true;
      fuelCountdown();
      break;  
    case 39:    // pijltje rechts
      right = true;
      break;
    case 40:    // pijltje omlaag
      down = true;
      break;   
    case 13: 
      if (crash < 1) {
        console.log("enter2");
        reload();
      };
      if (laned < 1) {
        console.log("enter2");
        reload();
      };

      if (fuelEmpty < 1) {
          console.log("enter3");
          reload();
      };
      break;
    case 16:
        fuel = 1000;
      break;
    case 17:
        fuel = 100;
      break;
    case 90:
      verticaleSnelheid = -10;
      break;  
 
     }
}
 
// pijltjes toetsen losgelaten
function keyup(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) { // iedere toets heeft een eigen code...
    case 37:    // pijltje links is 37
      left = false;
      break;
    case 38:    // pijltje omhoog is 38...
      up = false;
      break;  
    case 39:    // pijltje rechts
      right = false;
      break;
    case 40:    // pijltje omlaag
      down = false;
      break;    

    }

}







