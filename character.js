//this class will handle the main character moving around.

function loadCharacter() {
	var character = new Sprite();
	character.x = 200;
	character.y = 400;
	character.width = 175;
	character.height = 200;
	character.xoffset = -character.width / 2;
	character.yoffset = -character.height / 2;
	character.image = Textures.load("MainCharacter.png");

	character.moveTo = function(x, y) {
		this.x = x;
		this.y = y;
	};
	
	world.addChild(character);
	return character;
}
