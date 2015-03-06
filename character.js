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
	character.image = Textures.load("Character.png");

	character.speed = 0.05;
	character.destX = character.x;
	character.destY = character.y;
	character.xTravel = 0;
	character.yTravel = 0;
	character.moving = false;
	character.paused = false;

	character.moveTo = function(x, y) {
		if(!this.busy){
			if(this.x != x || this.y != y){
				this.destX = x;
				this.destY = y;
				this.moving = true;
				this.busy = true;
		 	}
		}
	};
	
	character.calcMove = function(){
		if(this.destX - this.x < 0){
			this.xTravel = Math.floor((this.destX - this.x) * this.speed);			
		} else this.xTravel = Math.ceil((this.destX - this.x) * this.speed);
		
		if(this.destY - this.y < 0){
			this.yTravel = Math.floor((this.destY - this.y) * this.speed);	
		} else this.yTravel = Math.ceil((this.destY - this.y) * this.speed);
	};
	
	character.update = function(d) {
		if(this.moving && !this.paused){
			character.calcMove();
			this.x += this.xTravel;
			this.y += this.yTravel;			
			if(this.x == this.destX && this.y == this.destY){
				this.moving = false;
				this.busy = false;
			}
		}		
	};
	
	character.newLevel = function(level){
		character.x = 285;
		character.y = 500;
		character.moving = false;
		character.busy = false;
		character.paused = false;
	};
	
	return character;
}
