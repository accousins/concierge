//Will run the main game loop and handle global variables
use2D = true;
//Potential causes for breaks:
//Sprite name changes

//is the character busy?
var busy = false;

//call load functions for all objects
var phone = loadPhone();
var robot = loadRobot();
var computer = loadComputer();
var character = loadCharacter();

function loadPhone(){
	var phone = new Sprite();
	phone.x = 100;
	phone.y = 500;
	phone.width = 25;
	phone.height = 25;
	phone.image = Textures.load("phone.png");
	world.addChild(phone);
	return phone;
}

function loadRobot(){
	var robot = new Sprite();
	robot.x = 15;
	robot.y = 500;
	robot.width = 50;
	robot.height = 100;
	robot.image = Textures.load("Pre-Robot.png");
	world.addChild(robot);
	return robot;
}
function loadCharacter(){
	var character = new Sprite();
	character.x = 200;
	character.y = 400;
	character.width = 175;
	character.height = 200;
	character.image = Textures.load("MainCharacter.png");
	world.addChild(character);
	return character;
}
function loadComputer(){
	var computer = new Sprite();
	computer.x = 200;
	computer.y = 150;
	computer.width = 400;
	computer.height = 300;
	computer.image = Textures.load("comp.png");
	world.addChild(computer);
	return computer;
}
