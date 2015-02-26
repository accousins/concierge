//this class will handle the robot object
function loadRobot() {
	var robot = new Sprite();
	robot.command;
	robot.moving = false;
	robot.x = 15;
	robot.y = 500;
	robot.width = 50;
	robot.height = 100;
	robot.image = Textures.load("Pre-Robot.png");
	
	robot.destX = robot.x;
	robot.destY = robot.y;
	robot.xDist = 0;
	robot.yDist = 0;

	//world.addChild(robot);

	//vars that hold where the character should move to
	//to interact with the object
	robot.moveX = 65;
	robot.moveY = 500;
	
	//What do when clicked on
	robot.click = function(){
		character.moveTo(this.x, this.y);
		this.command = prompt("Which room number should I visit?", "");		
		this.moveTo(-50,500);
	};	
	
	robot.moveTo = function(x, y) {
		if(this.x != x || this.y != y){
			this.destX = x;
			this.destY = y;
			this.xDist = this.destX - this.x;
			this.yDist = this.destY - this.y;
			this.moving = true;
		}
	};
	
	robot.update = function(d) {
		if(this.moving == true){
			var xd = Math.round(this.xDist / 100);
			var yd = Math.round(this.yDist / 100);
			console.log(xd, yd);
			this.x += xd;
			this.y += yd;
			if(this.x == this.destX && this.y == this.destY){
				this.moving = false;
			}
		}
	};

	return robot;
}
