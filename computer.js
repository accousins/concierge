//this class will handle the computer object.
function loadComputer() {
	var computer = new Sprite();
	computer.x = 200;
	computer.y = 150;
	computer.width = 400;
	computer.height = 300;
	computer.image = Textures.load("rooms.png");
	computer.active = false;
	//is the computer being used?
	computer.use = false;
	//world.addChild(computer);

	//vars that hold where the character should move to
	//to interact with the object
	computer.moveX = 400;
	computer.moveY = 500;

	var delivText = new TextBox();
	delivText.x = 10;
	delivText.y = 250;
	delivText.fontSize = 18;
	delivText.visible = false;
	
	computer.addChild(delivText);

	//text of help to answer customer questions
	var helpText = new TextBox();
	helpText.x = 10;
	helpText.y = 50;
	helpText.fontSize = 16;
	helpText.text = "Helpful information about customer's \nquestions can be found here!";
	helpText.visible = false;

	computer.addChild(helpText);

	//What do when clicked on
	computer.click = function() {
		character.moveTo(400, 500);
		computer.active = true;
	};

	computer.arrived = function() {
		computer.active = false;
		computer.use = true;
		this.showScreen();
	};

	computer.update = function(d) {
		if (computer.use && character.x != computer.moveX) {
			computer.use = false;
			//rooms.visible = true;
			this.showRooms();
		}
	};

	computer.showScreen = function() {
		computer.image = Textures.load("comp.png");
		minibot.visible = false;
		delivText.visible = true;
		helpText.visible = true;
	};

	computer.showRooms = function() {
		computer.image = Textures.load("rooms.png");
		if (minibot.delivering) {
			minibot.visible = true;
		}
		delivText.visible = false;
		helpText.visible = false;
	};
	
	computer.updateDelivs = function(){
		delivText.text = deliveries.toString();
	};
	
	computer.setHelp = function(text){
		helpText.text = text;
	};

	return computer;
}
