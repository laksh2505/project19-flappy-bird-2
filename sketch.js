
var PLAY = 1;
var END = 2;
var START = 0
var gamestate = START;
var ground, invisibleGround1, invisibleGround2, groundImg;
var obstacle1, obstacle2, obstacle1Img, obstacle2Img;
var balloon, balloonImg;
var coin, coinImg;
var getready, names, reset, getreadyImg, namesImg, resetImg;
var score;

function preload(){
groundImg  = loadImage("bg.png");
obstacle1Img = loadImage("rodbottom.png");
obstacle2Img = loadImage("rodtop.png");
balloonImg = loadImage("balloon.png");
coinImg = loadImage ("coin.png");
getreadyImg = loadImage("getready.png");
namesImg = loadImage("name.png");
resetImg = loadImage ("reset.png");
}

function setup() {
createCanvas(700, 400);

ground = createSprite(350,200,350,200);
ground.addImage("ground",groundImg);
ground.x = ground.width /2;
ground.scale = 0.8;
ground.x = 350;
ground.y = 200;
  
balloon = createSprite(50,200);
balloon.addImage("balloon", balloonImg);
balloon.scale = 0.2;
balloon.debug = true;
  
invisibleGround1 = createSprite(350,395,700,10);
invisibleGround1.visible = true;

invisibleGround2 = createSprite(350,5,700,10);
invisibleGround2.visible = true;
  
reset = createSprite(350,200);
reset.addImage(resetImg);
reset.scale = 0.1;
reset.visible = false;
reset.debug = false;
  
names = createSprite(350,160);
names.addImage(namesImg);
names.scale = 0.3;
names.visible = false;

getready = createSprite(350,350);
getready.addImage(getreadyImg);
getready.scale = 0.3;
getready.visible = false;

score = 0;

obstaclesGroup = createGroup();
coinsGroup = createGroup();
}
function draw(){
  
//displaying score
text("Score: "+ score, 500,50);
 
gamestate = START
if(gamestate === START){
 names.visible = true;
 getready.visible = true;

if(mousePressedOver(getready)) {
   gamestate = PLAY;
    }  
if (gamestate === PLAY){
  names.visible = false;
  getready.visible = false;
  ground.velocityX = -(4 + 3* score/200)
    //scoring
  score = score + Math.round(getFrameRate()/100); 
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  balloon.velocityY = 1.0;
  if(keyDown("space")) {
    trex.velocityY = trex.velocityY - 5;
  }
  if(obstaclesGroup.isTouching(balloon)){
        //trex.velocityY = -12;jumpSound.play();
        gamestate = END;
  }

}
 else if (gamestate === END) {
    gameover.visible = true;
    restart.visible = true;
    balloon.velocityY = 0;
    ground.velocityY = 0;
 }
}
  balloon.collide(invisibleGround1);
  balloon.collide(invisibleGround2);
  
  if(mousePressedOver(reset)) {
      gamestate = START;
    }
  drawSprites();
}
  

