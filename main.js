//Will run the main game loop and handle global variables
use2D = true;
clearColor = [0, 0, 0, 0];
//Potential causes for breaks:
//Sprite name changes
var sprites = new Array();
var busy;
//time
var time = 20;
var timePause = false;
var currLevel = 1;
//the different objects in the world
var phone,
    robot,
    computer,
    character,
    elevator,
    rooms,
    minibot,
    people,
    phoneQ,
    deskQ,
    phoneRing,
    currSpeech;
//a list of the customers waiting
var customers = new List();
//the text for how many customers are waiting
var waiting = new TextBox();
waiting.x = 600;
waiting.y = 100;

//time text for each level
var timeText = new TextBox();
timeText.x = 595;
timeText.y = 5;
timeText.fontSize = 32;
timeText.text = "Time: 0";

var lives = new TextBox();
lives.x = 200;
lives.y = 10;

//Define manager; manages clicks on sprites
var manager = new Sprite();
manager.clicked = false;
manager.target = undefined;
world.addChild(manager);

//checkSprite: checks to see if mouse/sprite coordinates are overlapping
function checkSprite(sprite, x, y) {
	var minX = sprite.x;
	var maxX = sprite.x + sprite.width;
	var minY = sprite.y;
	var maxY = sprite.y + sprite.height;
	var mx = x;
	var my = y;

	if (mx >= minX && mx <= maxX && my >= minY && my <= maxY) {
		return true;
	}
	return false;
}

//Mouse manager function
manager.onMouseDown = function(button) {
	for (var sprite in sprites) {
		sprite = sprites[sprite];
		//check if clicked on a clickable thing
		if (checkSprite(sprite, gInput.mouse.x, gInput.mouse.y)) {
			sprite.click();
			break;
		}
	}
};

gInput.addMouseDownListener(manager);

//Menu System
function Screen(alwaysUpdate, alwaysDraw) {
	//Call the Sprite constructor to copy any object properties
	Sprite.call(this);

	//These determine if the screen should be update/drawn when it is not the top screen
	this.alwaysUpdate = alwaysUpdate;
	this.alwaysDraw = alwaysDraw;

	//Has the screen been initialized
	this.initialized = false;

	//Create a stage for the screen that we can add sprites to
	this.stage = new Sprite();
	this.addChild(this.stage);

	//Create a gui object which extends sprite and supports buttons
	this.gui = new GUI(gInput);
	this.addChild(this.gui);
}

//Inherit all Sprite properties
Screen.prototype = new Sprite();

//Called once to set up anything that needs to be called after the game is initialized
//some values aren't available before initGame such as any canvas property
Screen.prototype.init = function() {
};

//Create a screen manager class
function ScreenManager() {
	//Call the Sprite constructor to copy any object properties
	Sprite.call(this);

	this.screens = new List();
}

//Inherit all Sprite properties
ScreenManager.prototype = new Sprite();

//Push a screen on to the stack
ScreenManager.prototype.push = function(screen) {
	this.screens.remove(screen);
	this.screens.push(screen);
};

//Pop a screen off of the stack
ScreenManager.prototype.pop = function() {
	this.screens.tail.item.gui.visible = false;
	return this.screens.pop();
};
//Remove a screen from the stack
ScreenManager.prototype.remove = function(screen) {
	screen.gui.visible = false;
	this.screens.remove(screen);
};

//Override th defult update function
ScreenManager.prototype.update = function(d) {
	var screens = this.screens;

	//Loop through the screens and update if they are supposed to always update or if they ar the top screen
	for (var node = screens.head; node != null; node = node.link) {
		var screen = node.item;

		//The gui wasn't exactly made for this situation so we need to hide it if it's not in the current screen
		if (node != screens.tail) {
			screen.gui.visible = false;
		} else {
			screen.gui.visible = true;
		}

		if (screen.alwaysUpdate || node == screens.tail) {
			if (!screen.initialized) {
				screen.init();
				screen.initialized = true;
			}
			screen.update(d);
		}
	}
};

//Override the defualt draw function the same as the update function except we're drawing
ScreenManager.prototype.draw = function(ctx) {
	var screens = this.screens;

	for (var node = screens.head; node != null; node = node.link) {
		var screen = node.item;
		if (screen.alwaysDraw || node == screens.tail) {
			screen.draw(ctx);
		}
	}
};

//Create a new screen manager
var screenMan = new ScreenManager();
//Add it as a child of the world.
//Here we're taking advantage of the sprite hierarchy structure
world.addChild(screenMan);

//Create a main menu screen
var mainMenu = new Screen(false, false);
//Optionally set a background for the main menu
mainMenu.image = Textures.load("TitleImg.png");
screenMan.push(mainMenu);

//Override the empty init function to set some properties
mainMenu.init = function() {
	//Since we set a background we want the screen to fill  the canvas
	this.width = canvas.width;
	this.height = canvas.height;

	this.gui.x = canvas.width / 2;
	this.gui.y = canvas.height / 2;

	//Add some buttons
	var newGame = new TextButton("New Game");
	newGame.center = true;
	newGame.label.dropShadow = true;
	newGame.label.fontSize = 30;
	newGame.setLabelColors("#000000", "#ffffff", "#ff0000");
	this.gui.addChild(newGame);

	newGame.func = function() {
		screenMan.push(gameScreen);
		gameScreen.newLevel(1);
		lives.val = 5;
	};

	var gameOver = new Screen(false, false);
	gameOver.init = function() {
		this.width = canvas.width;
		this.height = canvas.height;

		var gameOverScreen = new Sprite();
		gameOverScreen.width = 600;
		gameOverScreen.height = 400;
		gameOverScreen.x = 100;
		gameOverScreen.y = 100;
		gameOverScreen.image = Textures.load("gameover.png");
		this.stage.addChild(gameOverScreen);

		this.gui.x = canvas.width / 2;
		this.gui.y = canvas.height / 2;

		var returnToMenu = new TextButton("Main Menu");
		returnToMenu.y = 50;
		returnToMenu.center = true;
		returnToMenu.label.dropShadow = true;
		returnToMenu.label.fontSize = 30;
		returnToMenu.setLabelColors("#aaaaaa", "#ffffff", "#ff0000");
		this.gui.addChild(returnToMenu);
		returnToMenu.func = function() {
			screenMan.remove(gameOver);
			screenMan.remove(gameScreen);
		};
	};

	var gameScreen = new Screen(true, true);
	//Game Background here:
	gameScreen.image = Textures.load("background.png");

	//Override the empty init function to set some properties
	gameScreen.init = function() {
		//Since we set a background we want the screen to fill  the canvas
		this.width = canvas.width;
		this.height = canvas.height;

		//is the character busy?
		busy = false;

		//call load functions for all objects
		var phones = loadPhone();
		phone = phones[0];
		phoneRing = phones[1];
		this.stage.addChild(phone);
		this.stage.addChild(phoneRing);
		phoneQ = loadPhoneQ();
		this.stage.addChild(phoneQ);
		robot = loadRobot();
		this.stage.addChild(robot);
		computer = loadComputer();
		this.stage.addChild(computer);
		character = loadCharacter();
		this.stage.addChild(character);
		deskQ = loadDeskQ();
		this.stage.addChild(deskQ);
		//text boxes
		this.stage.addChild(waiting);
		this.stage.addChild(timeText);
		sArray = loadSounds();
		this.stage.addChild(sArray);

		this.stage.addChild(lives);
		lives.val = 5;

		rooms = loadRooms();
		for (var i = 0; i < rooms.length; i++) {
			this.stage.addChild(rooms[i]);
		}

		elevator = loadElevator();
		this.stage.addChild(elevator);
		minibot = loadMinibot();
		this.stage.addChild(minibot);
		people = loadPeople();
		this.stage.addChild(people);

		//clickable things
		sprites.push(phone);
		sprites.push(robot);
		sprites.push(computer);
		sprites.push(people);
		sprites.push(deskQ);
		sprites.push(phoneQ);
	};

	//essentially restarts the game with a new level.
	gameScreen.newLevel = function(level) {
		currLevel = level;
		//empty the customers list
		while (customers.length > 0) {
			customers.pop();
		}
		phone.newLevel(level);
		robot.newLevel(level);
		phoneRing.visible = false;
		people.newLevel(level);
		character.newLevel(level);
		time = 20;
		timePause = false;
	};

	var pauseMenu = new Screen(false, true);
	//Override the empty init function to set some properties
	pauseMenu.init = function() {

		//Since we set a background we want the screen to fill  the canvas
		this.width = canvas.width;
		this.height = canvas.height;

		this.gui.x = canvas.width / 2;
		this.gui.y = canvas.height / 2;

		var resumeGame = new TextButton("Resume Game");
		resumeGame.center = true;
		resumeGame.label.dropShadow = true;
		resumeGame.label.fontSize = 30;
		resumeGame.setLabelColors("#aaaaaa", "#ffffff", "#ff0000");
		this.gui.addChild(resumeGame);
		resumeGame.func = function() {
			screenMan.remove(pauseMenu);
		};

		var returnToMenu = new TextButton("Main Menu");
		returnToMenu.y = 50;
		returnToMenu.center = true;
		returnToMenu.label.dropShadow = true;
		returnToMenu.label.fontSize = 30;
		returnToMenu.setLabelColors("#aaaaaa", "#ffffff", "#ff0000");
		this.gui.addChild(returnToMenu);
		returnToMenu.func = function() {
			screenMan.remove(pauseMenu);
			screenMan.remove(gameScreen);
			resumeGame();
		};
	};

	var levelComplete = new Screen(false, true);
	levelComplete.init = function() {

		//Since we set a background we want the screen to fill  the canvas
		this.width = canvas.width;
		this.height = canvas.height;

		this.gui.x = canvas.width / 2;
		this.gui.y = canvas.height / 2;

		var nextLevel = new TextButton("Next Level");
		nextLevel.center = true;
		nextLevel.label.dropShadow = true;
		nextLevel.label.fontSize = 30;
		nextLevel.setLabelColors("#aaaaaa", "#ffffff", "#ff0000");
		this.gui.addChild(nextLevel);
		nextLevel.func = function() {
			screenMan.remove(levelComplete);
			gameScreen.newLevel(currLevel + 1);
		};
	};

	gInput.addFunc(27, function() {
		if (screenMan.screens.find(gameScreen) && !screenMan.screens.find(pauseMenu)) {
			screenMan.push(pauseMenu);
			pauseGame();
		}
	});

	gameScreen.update = function(d) {
		waiting.text = "Customers waiting:\n" + customers.length;
		if (!timePause) {
			time -= (d * MSPF) / 1000;
		}
		timeText.text = "Time: " + Math.round(time);
		if (time <= 0) {
			pauseGame();
			screenMan.push(levelComplete);
		}

		if (lives.val > 5) {
			lives.val = 5;
		}
		if (lives.val <= 0) {
			screenMan.push(gameOver);
		}
		lives.text = "Stars: " + lives.val;

		this.updateChildren(d);
		if (character.x == phone.x && phone.active) {
			phone.active = false;
			if (phone.ringing) {
				phoneQ.visible = true;
				phoneRing.visible = false;
				phone.arrived();
			}
		}
		if (character.x == people.x && people.active) {
			people.active = false;
			console.log("I've arrived!");
			if (customers.length > 0) {
				deskQ.pickQuestion();
				deskQ.visible = true;
				currSpeech = sArray[2][Math.round(Math.random())];
				currSpeech.play();
			}
		}
		if (character.x != people.x && deskQ.visible) {
			deskQ.visible = false;
		}
		if (deskQ.answered == true){
			currSpeech.pause();
			currSpeech.currentTime = 0;
			deskQ.answered = false;
		}
		if (character.x == robot.x && robot.active) {
			robot.active = false;
			robot.arrived();
		}
		if (phone.ringing) {
			phoneRing.visible = true;
		}
		if (customers.length > 0) {
			people.visible = true;
		} else {
			people.visible = false;
		}
	};

	pauseGame = function() {
		//pause things in the main game
		character.paused = true;
		phone.pauseTime = true;
		people.pauseTime = true;
		timePause = true;
	};
	resumeGame = function() {
		//resume game things
		phone.pauseTime = false;
		people.pauseTime = false;
		character.paused = false;
		timePause = false;
	};
};
