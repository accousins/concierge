//this class will handle the computer object.
function loadComputer() {
	var computer = new Sprite();
	computer.x = 200;
	computer.y = 150;
	computer.width = 400;
	computer.height = 300;
	computer.image = Textures.load("comp.png");
	world.addChild(computer);
	
	//vars that hold where the character should move to
	//to interact with the object
	computer.moveX = 400;
	computer.moveY = 500;
	
	//What do when clicked on
	computer.click = function(){
		character.moveTo(400,500);
	};
	
	return computer;
}
