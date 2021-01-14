var END = 0;
var PLAY = 1;
var gameState = PLAY;

var goodWitch,goodImage;

var smallWitch,smallWitchImage,smallWitchGroup,bigWitch,bigImage;

var goodBlast,goodBlastImage,goodBlastGroup;

var badBlast1,badBlast2,smallBlastGroup,bigBlastGroup,badBlast1Image,badBlast2Image;

var backGround,backGroundImage;

var potion,potionImage;

var gameOver,gameOverImage,reset,resetImage,youWonImage,youWon;

var score = 0;

var collided = 0;

var hit  = 0 ;

var bossHealth = 0;

//var health = 0;

function preload(){

  goodWitchImage = loadImage("good witch.jpg");
  
   goodBlastImage = loadImage("goodb.png");
  
   bigWitchImage = loadImage("bigb.jpg");
  
   smallWitchImage = loadImage("small witch.jpg");
  
  badBlast1Image = loadImage("badsb.png");
  
  badBlast2Image = loadImage("badbigb.png");
  
  backGroundImage = loadImage("dark backkground.jpg");
  
  gameOverImage = loadImage("gameOver.png");
  
  resetImage = loadImage("reset 1.png");
  
  potionImage = loadImage("potion.jpg");
  
  youWonImage = loadImage("you won.png");
  
}

function setup() {
 createCanvas(600,400);
  
//sprite for background
  backGround = createSprite(300,200,100,100);
  backGround.addImage("b",backGroundImage);
  backGround.scale = 2.5;
  backGround.x = width/2;
  backGround.velocityX = -4;
  
//sprite for goodwitch
  goodWitch = createSprite(30,200,10,10);
  goodWitch.addImage("gw",goodWitchImage);
  goodWitch.scale = 0.3;
  
//creating gameOver sprite 
  gameOver = createSprite(300,200,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;

//creating reset sprite 
  reset = createSprite(300,300,10,10);
  reset.addImage(resetImage);
  reset.scale = 0.5;
 
//creating you Won sprite     
  youWon = createSprite(300,250,10,50);
  youWon.addImage(youWonImage);
  youWon.scale = 0.3;
  
//create potion sprite
  potion = createSprite(300,100,10,10);
  potion.addImage(potionImage);
  potion.scale = 0.5;
  
  bigWitch = createSprite(500,200,10,10);
  bigWitch.addImage("bw",bigWitchImage);
  bigWitch.scale = 0.5;
  
//declaration of group
  goodBlastGroup = new Group();
  smallWitchGroup = new Group();
  bigBlastGroup = new Group();
  smallBlastGroup = new Group();
  
}

function draw() {
 background("white");
  
//for infanite ground loop
  if(backGround.x<190){
    
   backGround.x = 400;
    
  }
 
  
if(gameState===PLAY){
  
///gameOver and reset invisible
  gameOver.visible = false;
  reset.visible = false;
  potion.visible = false;
  youWon.visible = false;
  bigWitch.visible = false;
 
  
//commmand for moving goodwitch with mouse
  goodWitch.x = mouseX;
  goodWitch.y = mouseY;
  
//command for firing blasts with space key
  if(keyDown("space")){
    
    goodBlastSpawn();
    
  }
  
//function for spawing small witch
  smallWitchSpawn();
  
//function for spawing small blasts
  smallBlastSpawn();
  
//command for distroing good blast and small witch when touches with each other and score +1
  
  if(smallWitchGroup.isTouching(goodBlastGroup)){
    
    smallWitchGroup.destroyEach();
    goodBlastGroup.destroyEach();
    
    score = score+1;
    
  }
  
//command for when score = 10 create big witch
 if(score===10){
  
  bigWitch.visible = true;

  //destroys small witch and  small blast
  smallBlastGroup.destroyEach();
  smallWitchGroup.destroyEach();
 
  if(goodBlastGroup.isTouching(bigWitch)){
  
  bossHealth = bossHealth + 1;
  
}
   
   
//for spawing big blasts
   bigBlastSpawn();
   
 }
  
  //command for gameState end when touces with small blast
 
  
//command for score  + 1 when goodBlast touches Big witch
  
  
  
  
//command for when big blast touches goodwitch hit +1
if(bigBlastGroup.isTouching(goodWitch)||smallBlastGroup.isTouching(goodWitch)||(smallWitchGroup.isTouching(goodWitch))){
  
  gameState = END;

}  
  
  if (bossHealth === 5||(hit===5)){
    
    gameState = END;
    
  }

  
  
  
}else if(gameState===END){
  
// making gameOver and Reset visible
 gameOver.visible = true;
 reset.visible = true;
  
//chenging the lifeTime to never disapear
  goodBlastGroup.setLifetimeEach(-1);
  smallBlastGroup.setLifetimeEach(-1);
  smallWitchGroup.setLifetimeEach(-1);
  bigBlastGroup.setLifetimeEach(-1);
  
// chenging the vilocity to 0
  goodBlastGroup.setVelocityXEach(0);
  smallBlastGroup.setVelocityXEach(0);
  smallWitchGroup.setVelocityXEach(0);
  bigBlastGroup.setVelocityXEach(0);

//command for restart game whe mouse pressed over reset sprite
  if(mousePressedOver(reset)){
  
 restart();
  
}
  
}
  
  
drawSprites(); 

//text for score
  stroke("white");
  fill("white");
  textSize(24);
  text("score " + score,150,50);
  
  
  
if(score === 10){
  stroke("white");
  fill("white");
  textSize(24);
  text("boss health " + bossHealth,400,50);
}
}

//function for spawing good blast
function goodBlastSpawn(){
  
  goodBlast = createSprite(30,0,10,10);
  goodBlast.addImage("g",goodBlastImage);
  goodBlast.scale = 0.5;
  goodBlast.velocityX = 4;
  goodBlast.x = goodWitch.x;
  goodBlast.y = goodWitch.y;
  goodBlast.lifeTime = 150;
  goodBlastGroup.add(goodBlast);
  
  
  
}

//function for spawing smallwitch
function smallWitchSpawn(){
  
 if(frameCount%80===0){
   
   smallWitch = createSprite(550,0,10,10)
   smallWitch.addImage(smallWitchImage);
   smallWitch.scale = 0.3;
   smallWitch.y = Math.round(random(100,500));
   smallWitch.velocityX = -4;
   smallWitch.lifeTime = 150;
   smallWitchGroup.add(smallWitch);
   
 }
  
}

//function for spawing small blast
function smallBlastSpawn(){
  
  if(frameCount%100===0){
   
   badBlast1 = createSprite(550,0,10,10)
   badBlast1.addImage(badBlast1Image);
   badBlast1.scale = 0.5;
   badBlast1.y = Math.round(random(100,500));
   badBlast1.velocityX = -5;
   badBlast1.lifeTime = 200;
   smallBlastGroup.add(badBlast1);
   
 }
  
}

//function for spawing bigblast
function bigBlastSpawn(){
  
 if(frameCount%80===0){
   
  badBlast2 = createSprite(400,0,10,10);
  badBlast2.addImage(badBlast2Image);
  badBlast2.scale = 0.5;
  badBlast2.velocityX = -4;
  badBlast2.y = Math.round(random(100,500));
  badBlast2.lifeTime = 200;
  bigBlastGroup.add(badBlast2);
   
 }
  
}

//function for resett the game
function restart(){
  
  gameState = PLAY;
  
  goodBlastGroup.destroyEach();
  smallBlastGroup.destroyEach();
  bigBlastGroup.destroyEach();
 
  hit = 0;
  
  collided = 0;
  
  bossHealth = 0;
  
  score = 0;
  
}