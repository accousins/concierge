//this class will handle the robot object
function loadRobot() {
	var robot = new Sprite();
	robot.x = 15;
	robot.y = 500;
	robot.width = 50;
	robot.height = 100;
	robot.image = Textures.load("Pre-Robot.png");
	
	robot.destX = robot.x;
	robot.destY = robot.y;
	robot.xDist = 0;
	robot.yDist = 0;
	
	world.addChild(robot);

	//vars that hold where the character should move to
	//to interact with the object
	robot.moveX = 65;
	robot.moveY = 500;
	
	//What do when clicked on
	robot.click = function(){
		character.moveTo(65,500);
		var command = prompt("Where should I go?", "");
		this.moveTo(-50,500);
	};
	
	robot.moveTo = function(x, y) {
		this.destX = x;
		this.destY = y;
		this.xDist = this.destX - this.x;
		this.yDist = this.destY - this.y;
	};
	
	robot.update = function(d) {
		var xd = this.xDist / 100;
		var yd = this.yDist / 100;
		this.x += xd;
		this.y += yd;
	};

	return robot;
}