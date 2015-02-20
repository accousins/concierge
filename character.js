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

	character.moveTo = function(x, y) {
		character.destX = x;
		character.destY = y;
	};

	character.update = function(d) {
		var xd = ((this.destX - this.x) * this.speed);
		var yd = ((this.destY - this.y) * this.speed);
		this.x += xd;
		this.y += yd;
	};

	//world.addChild(character);
	return character;
}
