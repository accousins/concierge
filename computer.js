//this class will handle the computer object.
function loadComputer() {
	var computer = new Sprite();
	computer.x = 200;
	computer.y = 150;
	computer.width = 400;
	computer.height = 300;
	computer.image = Textures.load("comp.png");
	world.addChild(computer);
	return computer;
}
