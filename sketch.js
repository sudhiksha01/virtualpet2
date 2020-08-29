const Bodies = Matter.Bodies;
const Engine = Matter.Engine;
const World = Matter.World;
var dog, happyDog, database, foodS, foodStock
var feed,lastFed,fedTime,foodObj

function preload()
{
  //load images here
  dog=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database()
  engine = Engine.create();
	world = engine.world;
  Dog1=createSprite(300,250,10,10);
  Dog=Bodies.rectangle(250,250,10,10,{isStatic:true})
  foodObj=Bodies.rectangle(720,220,20,20,{isStatic:true})
  feed=createButton("Feed the Dog")
  feed.position(500,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food")
  addFood.position(650,95);
  addFood.mousePressed(addFoods);
 
 World.add(world,Dog);
 //imageMode(CENTER)
 //image(dog,Dog.position.x,Dog.position.y,100,100)
 Dog1.addImage(dog)
 Dog1.scale=0.2
 updateFood(40);
 getFood()
}


function draw() {  
 background(46, 139, 87)
  drawSprites();
  //add styles here
 
  Engine.run(engine);
  fill("black")
  stroke("black")
  textSize(20)
  text(foodStock,250,100)
  
  }
 
function getFood(){
  database.ref("food").on("value",function(data){
    foodStock=data.val()
  //  imageMode(CENTER)
 //image(happyDog,Dog.position.x,Dog.position.y,100,100)
  })
  
}
function updateFood(count){
database.ref("/").update({
 food:count 
 
})
fedTime=database.ref("FeedTime")
fedTime.on("value",function(data){
lastFed=data.val();
})
//imageMode(CENTER)
 //image(happyDog,Dog.position.x,Dog.position.y,100,100)
}
function feedDog(){
  Dog1.addImage(happyDog) 
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })

}
function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}
//unction keyPressed()
//{
  //if(keyCode===UP_ARROW && foodStock>0){
    //foodStock--
    //updateFood(foodStock);
    //getFood();
   
 // Dog1.addImage(happyDog)
  //Dog1.scale=0.5
 // }
//}

