function loadMinibot() {
	var minibot = new Sprite();
	minibot.x = 400;
	minibot.y = 320;
	minibot.width = 20;
	minibot.height = 30;
	minibot.image = Textures.load("Actual_robot.png");
	minibot.visible = false;
	minibot.floor = 0;
	minibot.room = 0;
	minibot.moveSpeed = 3;
	minibot.correctDelivery = false;
	minibot.delivering = false;

	minibot.move = function(room) {
		delivTimer = delivTime;
		room = Number(room);
		this.delivering = true;

		this.floor = Math.floor(room / 100);
		this.room = room % 100;
		console.log(room, this.floor, this.room);

		this.x = 226;
		this.y = 515 - (95 * this.floor);
		this.visible = true;
		//check if delivering to the right room
		if (deliveries.indexOf(room) >= 0) {
			console.log("correct delivery!");
			this.correctDelivery = true;
			deliveries.splice(deliveries.indexOf(room), 1);
		}

	};

	//Minibot moving
	// mbMove = function(){
	// switch(robot.command){
	// case "1":
	// minibot.x = rooms[0].x;
	// minibot.y = rooms[0].y;
	// break;
	// case "2":
	// minibot.x = rooms[1].x;
	// minibot.y = rooms[1].y;
	// break;
	// case "3":
	// minibot.x = rooms[2].x;
	// minibot.y = rooms[2].y;
	// break;
	// case "4":
	// minibot.x = rooms[3].x;
	// minibot.y = rooms[3].y;
	// break;
	// }
	// };

	minibot.update = function(d) {
		//mbMove();
		if (!timePaused) {
			if (this.floor != 0) {
				this.x += this.moveSpeed;
				if (this.x > (275 + (75 * (this.room - 1)))) {
					this.moveSpeed = -1 * this.moveSpeed;
				}
				if (this.x < 225) {
					this.floor = 0;
					this.moveSpeed = -1 * this.moveSpeed;
					this.visible = false;
					this.delivering = false;
					if (this.correctDelivery) {
						lives++;
						this.correctDelivery = false;
					} else {
						lives--;
					}
				}
			}
		}
	};

	return minibot;
}
