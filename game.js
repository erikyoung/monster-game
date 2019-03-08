/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/



let count;
let canvas;
let ctx;

let monstersCaught = 0; 


canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");


canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//declared all the variables


let bgReady, heroReady, monsterReady;
let bgImage, heroImage, monsterImage;



function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/space-background.png";
  heroImage = new Image();
  heroImage.onload = function () {
    // show the hero image
    heroReady = true;
  };
  heroImage.src = "images/spaceship.png";

  monsterImage = new Image();
  monsterImage.onload = function () {
    // show the monster image
    monsterReady = true;
  };
  monsterImage.src = "images/Default.png";
}

/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * 
 * The same applies to the monster.
 */
//part of the display
let heroX = canvas.width / 2;
let heroY = canvas.height / 2;


//location of the assets, make this random
let monsterX = (Math.random() * (canvas.width - 50));
let monsterY = (Math.random() * (canvas.height - 50));

    

count = 10; 
   // how many seconds the game lasts for - default 30
  var finished = false;
  var counter = function(){
  count=count-1; // countown by 1 every second
  // when count reaches 0 clear the timer, hide monster and
  // hero and finish the game
    if (count <= 0)
    {
      // stop the timer
       clearInterval(counter);
       // set game to finished
       finished = true;
       count=0; 

       
    }
}
// timer interval is every second (1000ms)
setInterval(counter, 1000);






/** 
 * Keyboard Listeners
 * You can safely ignore this part, for now. 
 * 
 * This is just to let JavaScript know when the user has pressed a key.
*/
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here. 
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
  }, false);
}




/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
  if (38 in keysDown) { // Player is holding up key
    heroY -= 5;
  }
  if (40 in keysDown) { // Player is holding down key
    heroY += 5;
  }
  if (37 in keysDown) { // Player is holding left key
    heroX -= 5;
  }
  if (39 in keysDown) { // Player is holding right key
    heroX += 5;
  }

  // Check if player and monster collided. Our images
  // are about 32 pixels big.
    heroX = Math.min(canvas.width - 25, heroX);
    heroX = Math.max(0, heroX);
    heroY = Math.min(canvas.height - 25, heroY);
    heroY = Math.max(0, heroY);

    monsterX = Math.min(canvas.width - 25, monsterX);
    monsterX = Math.max(0, monsterX);
    monsterY = Math.min(canvas.height - 25, monsterY);
    monsterY = Math.max(0, monsterY);


  





  //get a random relocation
  //monster spawns at a random location

function checkWin() {
  if (monstersCaught == 10 ) {
    alert("You win!"); 
  } 
   
}

  if (
    heroX <= (monsterX + 32)
    && monsterX <= (heroX + 32)
    && heroY <= (monsterY + 32)
    && monsterY <= (heroY + 32)
  ) {
    monstersCaught += 1; 
    checkWin(); 
   
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
    monsterX = (Math.random() * (canvas.width - 50));
    monsterY = (Math.random() * (canvas.width - 50));
  }
};

/**
 * This function, render, runs as often as possible.
 */
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, heroX, heroY);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monsterX, monsterY);
  }

  ctx.fillText("Time: " + count, 20, 50);
  // Display game over message when timer finished

  if(finished==true){
    ctx.fillText("Game over!", 200, 220);
  }
  
};



/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
var main = function () {
  update(); 
  render();


  ctx.font = "20px Raleway";
  ctx.fillText("Space Invaders", 200, 50);
  ctx.fillStyle = "#FF69B4";

  ctx.fillText("Monster Caught" +  " " + monstersCaught, 200, 400); 

  
  // Request to do this again ASAP. This is a special method
  // for web browsers. 
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();