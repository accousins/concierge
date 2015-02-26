//this class will handle the main character moving around.

function loadCharacter() {
	var character = new Sprite();
	character.x = 285;
	character.y = 500;
	character.width = 175;
	character.height = 200;
	character.xoffset = -character.width / 2;
	character.yoffset = -character.height / 2;
	character.image = Textures.load("MainCharacter.png");

	character.speed = 0.05;
	character.destX = character.x;
	character.destY = character.y;
	character.xDist = 0;
	character.yDist = 0;
	character.moving = false;

	character.moveTo = function(x, y) {
		if(this.moving == false){
		if(this.x != x || this.y != y){
			this.destX = x;
			this.destY = y;
			this.xDist = this.destX - this.x;
			this.yDist = this.destY - this.y;
			this.moving = true;
		 }
		}
		//character.destX = x;
		//character.destY = y;
	};

	character.update = function(d) {
		if(this.moving == true){
			/*var xd = Math.round(this.xDist / 100);
			var yd = Math.round(this.yDist / 100);
			//console.log(xd, yd);*/
			var xTravel = Math.round((this.destX - this.x) * this.speed);
			var yTravel = Math.round((this.destY - this.y) * this.speed);
			this.x += xTravel;
			this.y += yTravel;			
			if(xTravel == 0 && yTravel == 0){
				this.moving = false;
			}
		}
		/*var xd = Math.round((this.destX - this.x) * this.speed);
		var yd = Math.round((this.destY - this.y) * this.speed);
		this.x += xd;
		this.y += yd;*/
	};

	//world.addChild(character);
	return character;
}
