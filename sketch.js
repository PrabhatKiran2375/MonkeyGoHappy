// declearing veriables
var PLAY=1;
var END=0;
var gameState=PLAY;

var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup
var score, ground;
var survivalTime;

function preload(){
  
  //load image
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  //create Group
  FoodGroup= new Group();
  obstacleGroup= new Group();
  
}



function setup() {
  createCanvas(670, 400);
  score=0;
  survivalTime=0;
  //createSprites          
  ground=createSprite(0,400,1500,10);
  
  monkey=createSprite(90,370,10,10);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale=0.1;
  
  }
function draw() {
  background("green");
  if(gameState===PLAY){
     if(keyDown("space")&&monkey.y >= 350){
    monkey.velocityY=-10;
  }
  monkey.velocityY = monkey.velocityY + 0.3;
  monkey.collide(ground);
  
  
  ground.velocityX = -7 ;
 ground.x = ground.width/2;
    
    fruits();   

    stones();
 
  
  if(monkey.isTouching(FoodGroup)){
     FoodGroup[0].destroy();
     score=score+1;
      }
  if(monkey.isTouching(obstacleGroup)){
    gameState=END;
    
  }
  
  fill("black");
  var survivalTime=Math.round(getFrameRate()/1);
    
     fill("white") ;
  text("Score: "+ score, 500,50);
 
  text("Survival Time: "+ survivalTime,350,50);
 
    
  }
  else if(gameState===END){
    ground.velocityX=0;
    monkey.velocityX=0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.visible=false;
    fill("yellow");
    textSize(50);
    text("GAME OVER",200,200);
  }
 
 drawSprites();
  
}

function fruits(){
  if(World.frameCount%150===0){
  banana=createSprite(670,Math.round(random(170,230)),10,10);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.velocityX=-3;
  FoodGroup.add(banana);
}
}
function stones(){
  if(World.frameCount%200===0){
  obstacle=createSprite(670,380,10,10);
  obstacle.addImage(obstaceImage);
  obstacle.velocityX=-4;
  obstacle.scale=0.2;
  obstacleGroup.add(obstacle);
}
}