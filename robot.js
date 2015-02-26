//this class will handle the robot object
function loadRobot() {
	var robot = new Sprite();
	robot.command;
	robot.moving = false;
	robot.x = 15;
	robot.y = 500;
	robot.width = 50;
	robot.height = 100;
	robot.busy = false;
	robot.image = Textures.load("Pre-Robot.png");
	
	robot.speed = 0.05;
	robot.destX = robot.x;
	robot.destY = robot.y;
	robot.xTravel = 0;
	robot.yTravel = 0;
	robot.moving = false;
	
	//What do when clicked on
	robot.click = function(){
		if(character.busy == false){
			character.moveTo(this.x, this.y);
			this.command = prompt("Which room number should I visit?", "");			
			this.moveTo(-70,500);
		}
	};	
	
	robot.moveTo = function(x, y) {
		if(this.busy == false){
			if(this.x != x || this.y != y){
				this.destX = x;
				this.destY = y;
				this.moving = true;
				this.busy = true;
			}
		}
	};
	
	robot.update = function(d) {
		if(this.moving == true){
			this.xTravel = Math.round((this.destX - this.x) * this.speed);
			this.yTravel = Math.round((this.destY - this.y) * this.speed);
			this.x += this.xTravel;
			this.y += this.yTravel;
			if(this.x == this.destX && this.y == this.destY){
				this.moving = false;
				this.busy = false;
			}
		}
	};
	return robot;
}
