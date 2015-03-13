//this class will handle the robot object

function loadRobot() {
	var robot = new Sprite();
	robot.command = 0;
	robot.x = 15;
	robot.y = 450;
	robot.homeX = 15;
	robot.homeY = 450;
	robot.width = 75;
	robot.height = 150;
	robot.busy = false;
	robot.image = Textures.load("Actual_robot.png");

	// robot.frameWidth = 50;
	// robot.frameHeight = 100;
	// robot.frameCount = 21;
	// robot.frameRate = 15;
	// robot.moveRate = 15;

	//robot.addAnimations(["left", "right"], [3, 3]);

	robot.speed = 0.05;
	robot.destX = robot.x;
	robot.destY = robot.y;
	robot.xTravel = 0;
	robot.yTravel = 0;
	robot.moving = false;
	robot.active = false;

	//What do when clicked on
	robot.click = function() {
		if (character.busy == false) {
			character.moveTo(this.x, 500);
			robot.active = true;
		}
	};

	//called when the character arrives at the robot
	robot.arrived = function() {
		sArray[1].play();
		this.command = prompt("Which room number should I visit?", "");
		//check if its a valid room
		//if ( typeof this.command == 'number' && Math.floor(this.command) == this.command) {
			if (this.command > 100 && this.command < 305) {
				if ((this.command % 100) > 0 && (this.command % 100) < 5) {
					minibot.move(this.command);
					this.moveTo(-70, 500);
					robot.busy = true;
				}
			}
		//}
		if(robot.busy != true){
			console.log("thats not a room");
		}
	};

	robot.moveTo = function(x, y) {
		if (this.busy == false) {
			if (this.x != x || this.y != y) {
				this.destX = x;
				this.destY = y;
				//this.animation = "left";
				//this.frameRate = this.moveRate;
				this.moving = true;
				this.busy = true;
			}
		}
	};

	robot.calcMove = function() {
		if (this.destX - this.x < 0) {
			this.xTravel = Math.floor((this.destX - this.x) * this.speed);
		} else
			this.xTravel = Math.ceil((this.destX - this.x) * this.speed);

		if (this.destY - this.y < 0) {
			this.yTravel = Math.floor((this.destY - this.y) * this.speed);
		} else
			this.yTravel = Math.ceil((this.destY - this.y) * this.speed);
	};

	robot.goHome = function() {
		if (this.x == this.destX && this.y == this.destY && this.busy == false) {
			//this.animation = "right";
			//this.frameRate = this.moveRate;
			this.moveTo(robot.homeX, robot.homeY);
		}
	};

	robot.update = function(d) {
		//this.frameRate = 0;
		if (this.busy == true) {
			robot.calcMove();
			this.x += this.xTravel;
			this.y += this.yTravel;
			if (this.x == this.destX && this.y == this.destY) {
				this.moving = false;
				if (minibot.floor == 0) {
					sArray[1].pause();
					sArray[1].currentTime = 0;
					this.busy = false;
					robot.goHome();
				}
			}
		}
	};

	//sets the robot to a start state for the new level
	robot.newLevel = function(level) {
		//robot.frameRate = 0;
		robot.x = 15;
		robot.y = 450;
		robot.busy = false;
		robot.moving = false;
		robot.active = false;
	};

	return robot;
}
