//this class will handle the main character moving around.

function loadCharacter() {
	var character = new Sprite();
	character.x = 285;
	character.y = 500;
	character.width = 175;
	character.height = 200;
	character.xoffset = -character.width / 2;
	character.yoffset = -character.height / 2;
	character.busy = false;
	character.image = Textures.load("MainCharacter.png");

	character.speed = 0.05;
	character.destX = character.x;
	character.destY = character.y;
	character.xTravel = 0;
	character.yTravel = 0;
	character.moving = false;

	character.moveTo = function(x, y) {
		if(this.busy == false){
			if(this.x != x || this.y != y){
				this.destX = x;
				this.destY = y;
				this.moving = true;
				this.busy = true;
		 	}
		}
	};

	character.update = function(d) {
		if(this.moving == true){
			this.xTravel = Math.round((this.destX - this.x) * this.speed);
			this.yTravel = Math.round((this.destY - this.y) * this.speed);
			this.x += this.xTravel;
			this.y += this.yTravel;			
			if(this.xTravel == 0 && this.yTravel == 0){
				this.moving = false;
				this.busy = false;
			}
		}		
	};
	return character;
}
