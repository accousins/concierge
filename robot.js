//this class will handle the robot object
function loadRobot() {
	var robot = new Sprite();
	robot.command;
	robot.moving = false;
	robot.x = 15;
	robot.y = 500;
	robot.homeX = 15;
	robot.homeY = 500;
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
	robot.active = false;
	
	//What do when clicked on
	robot.click = function(){
		if(character.busy == false){
			character.moveTo(this.x, this.y);
			robot.active = true;
		}
	};	
	
	//called when the character arrives at the robot
	robot.arrived = function(){
		this.command = prompt("Which room number should I visit?", "");			
		this.moveTo(-70,500);
		robot.busy = true;
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
	
	robot.calcMove = function(){
		if(this.destX - this.x < 0){
			this.xTravel = Math.floor((this.destX - this.x) * this.speed);			
		} else this.xTravel = Math.ceil((this.destX - this.x) * this.speed);
		
		if(this.destY - this.y < 0){
			this.yTravel = Math.floor((this.destY - this.y) * this.speed);	
		} else this.yTravel = Math.ceil((this.destY - this.y) * this.speed);
	};
	
	robot.goHome = function(){
		if(this.x == this.destX && this.y == this.destY && this.busy == false){
			this.moveTo(robot.homeX, robot.homeY);
		}
	};
		
	robot.update = function(d) {
		if(this.moving == true){
			robot.calcMove();
			this.x += this.xTravel;
			this.y += this.yTravel;
			if(this.x == this.destX && this.y == this.destY){
				this.moving = false;
				this.busy = false;
				robot.goHome();
			}
		}
		//console.log(robot.moving, robot.x, robot.y);
	};
	return robot;
}
