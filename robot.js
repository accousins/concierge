//this class will handle the robot object
function loadRobot() {
	var robot = new Sprite();
	robot.x = 15;
	robot.y = 500;
	robot.width = 50;
	robot.height = 100;
	robot.image = Textures.load("Pre-Robot.png");
	//world.addChild(robot);

	//vars that hold where the character should move to
	//to interact with the object
	robot.moveX = 65;
	robot.moveY = 500;
	
	//What do when clicked on
	robot.click = function(){
		character.moveTo(65,500);
	};

	return robot;
}

