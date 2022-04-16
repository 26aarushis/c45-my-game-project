var rabbit, rabbitRightImg, rabbitLeftImg;
var bg, backgroundImg;
var platform, platform1Img, platform2Img, platform3Img, platform4Img, platform5Img;
var platformsGroup;
var coin, coinImg, coinsGroup;
var score = 0;
var lives = 3;
var bird, birdImg, birdsGroup;
var birdsArr = [];
var isGameOver = false;

function preload() {
  rabbitRightImg = loadImage("/assets/bunny_right.png");
  rabbitLeftImg = loadImage("/assets/bunny_left.png");
  backgroundImg = loadImage("/assets/cloud_bg.png");
  platform1Img = loadImage("/assets/platform1.png");
  platform2Img = loadImage("/assets/platform2.png");
  platform3Img = loadImage("/assets/platform3.png");
  platform4Img = loadImage("/assets/platform4.png");
  platform5Img = loadImage("/assets/platform5.png");
  coinImg = loadImage("/assets/coin.png");
  birdImg = loadImage("/assets/bird.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight-5);

  bg = createSprite(width/2, height/2);
  bg.addImage(backgroundImg);
  bg.scale = 2;

  rabbit = createSprite(width/2, height-100);
  rabbit.addImage("right",rabbitRightImg);
  rabbit.addImage("left",rabbitLeftImg);
  rabbit.scale = 2.3;

  platformsGroup = createGroup();
  coinsGroup = createGroup();
  birdsGroup = createGroup();
}

function draw() {
  background(0);

  bg.velocityY = 2;
  if(bg.y >= height) {
    bg.y = height/2;
  }

  if(keyDown("up") && rabbit.y<height-10 && rabbit.y>-10) {
    rabbit.velocityY = -10;
  }

  rabbit.velocityY = rabbit.velocityY+0.8;

  rabbit.debug= true;
  console.log(rabbit.height);

  if(keyDown("left") && rabbit.x>100) {
    rabbit.x -= 7;
    rabbit.changeImage("left");
    rabbit.setCollider("rectangle", 4, 14, rabbit.width-10, rabbit.height-34);
  }

  if(keyDown("right") && rabbit.x<width-100) {
    rabbit.x += 7;
    rabbit.changeImage("right");
    rabbit.setCollider("rectangle", -4, 14, rabbit.width-10, rabbit.height-34);
  }

  if(rabbit.isTouching(platformsGroup)) {
    rabbit.velocityY = 0;
  }

  if(lives==0) {
    isGameOver = true;
  }

  if(rabbit.y>height+50){
    isGameOver = true;
  }

  drawSprites();

  textSize(25);
  text("Score: "+ score, 10, 20);

  textSize(25);
  text("Lives: "+ lives, 10, 50);

  spawnBirds();
  spawnPlatforms();
}

function spawnPlatforms() {
  if(frameCount%30 === 0){
    platform = createSprite(random(250, width-250), -20);
    platform.velocityY = 2;
    platform.lifetime = 510;
    platform.addImage(platform1Img);
    platform.scale = 1.5;
   
    ran  = Math.round(random(1,5));
    switch(ran){
        case 1: platform.addImage(platform1Img);
                platform.setCollider("rectangle", 0, -10, platform.width-165, 10);
                platform.debug=false;
                break;
        case 2: platform.addImage(platform2Img);
                platform.setCollider("rectangle", 0, -10, platform.width-40, 10);
                platform.debug=false;
               break;
        case 3: platform.addImage(platform3Img);
                platform.setCollider("rectangle", 0, -10, platform.width-60, 10);
                platform.debug=false;
               break;
        case 4: platform.addImage(platform4Img);
                platform.setCollider("rectangle", 0, -10, platform.width-130, 10);
                platform.debug=false;
               break;
        case 5: platform.addImage(platform5Img);
                platform.setCollider("rectangle", 0, -10, platform.width-100, 10);
                platform.debug=false;
               break;
        default:  
    }  

    var randomNum = Math.round(random(0,1));

    if(frameCount%170==0) {
      coin = createSprite(platform.x, platform.y-30);
      coin.velocityY = 2;
      coin.lifetime = 510;
      coin.addImage(coinImg);
      coin.scale = 0.07;
  
      coinsGroup.add(coin);
    }

    //code that isnt working, its also showing some error if i uncomment
    if(rabbit.isTouching(coinsGroup)){
      //delete coin that rabbit is touching 
      score++;
    }
    
    
    platformsGroup.add(platform);
    /*if(ran === 1) {
        obstacle.addImage(obstacleImage1);
    }
    else if(ran === 2) */
  
  }
}

function spawnBirds() {
  if(frameCount%150 === 0){
    bird = createSprite(-20, random(100, height-100));
    bird.velocityX = 2;
    bird.lifetime = 800;
    bird.addImage(birdImg);
    bird.scale = 0.05;
    birdsArr.push(bird);

    birdsGroup.add(bird);

    }   

    if(rabbit.isTouching(birdsGroup)) {
      //delete the bird that the rabbit is touching
      lives--;
    }
}
