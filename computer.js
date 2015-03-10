//this class will handle the computer object.
function loadComputer() {
	var computer = new Sprite();
	computer.x = 200;
	computer.y = 150;
	computer.width = 400;
	computer.height = 300;
	computer.image = Textures.load("comp.png");
	computer.active = false;
	//is the computer being used?
	computer.use = false;
	//world.addChild(computer);
	
	//vars that hold where the character should move to
	//to interact with the object
	computer.moveX = 400;
	computer.moveY = 500;
	
	//What do when clicked on
	computer.click = function(){
		character.moveTo(400,500);
		computer.active = true;
	};
	
	computer.arrived = function(){
		computer.active = false;
		computer.use = true;
		rooms.visible = false;
		minibot.visible = false;
	};
	
	computer.update = function(d){
		if(computer.use && character.x != computer.moveX){
			computer.use = false;
			rooms.visible = true;
			if(minibot.delivering){
				minibot.visible = true;
			}
		}
	};
	
	return computer;
}
