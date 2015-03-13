//Will run the main game loop and handle global variables
use2D = true;
clearColor = [0, 0, 0, 0];
//Potential causes for breaks:
//Sprite name changes
var sprites = new Array();
var busy;

//how long can deliveries wait?
var delivTime = 15;
var delivTimer = delivTime;

//time
var time = 60;
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
    peopleSpeech,
    mainFromPause = false;
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

// lives/stars
var lives = 5;

//the room to deliver to
var roomText = new TextBox();
roomText.x = 150;
roomText.y = 300;
roomText.fontSize = 16;
roomText.visible = false;

//rooms to deliver to
var deliveries = [];

//text of rooms to deliver to
var delivText = new TextBox();
delivText.x = 210;
delivText.y = 400;
delivText.fontSize = 14;

//text of help to answer customer questions
var helpText = new TextBox();
helpText.x = 210;
helpText.y = 200;
helpText.fontSize = 14;
helpText.text = "Helpful information about customer's \nquestions can be found here!";

//text of the customer's questions
var peopleQ = new TextBox();
peopleQ.x = 650;
peopleQ.y = 260;
peopleQ.fontSize = 14;
peopleQ.text = "test question?";
peopleQ.visible = false;

//text of answers to the customer's questions
var peopleA = new TextBox();
peopleA.x = 642;
peopleA.y = 325;
peopleA.fontSize = 10;
peopleA.text = "test\n\nwith\n\nnewlines";
peopleA.visible = false;

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

//Override the defult update function
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

resGame = function() {
	//resume game things
	phone.resume();
	people.pauseTime = false;
	character.paused = false;
	timePause = false;
	sArray[3].play();
	if (character.x == people.x && people.active) {
		if (customers.length > 0) {
			customers.getAt(0).voice.play();
		}

	}
	

};

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
		lives = 5;
	};

	var credButton = new TextButton("Credits");
	credButton.label.dropShadow = true;

	credButton.x = newGame.x - 55;
	credButton.y = newGame.y + 20;

	credButton.label.fontSize = 30;
	credButton.setLabelColors("#000000", "#ffffff", "#ff0000");
	this.gui.addChild(credButton);
	credButton.func = function() {
		screenMan.push(credits);
	};

	var tutorialButton = new TextButton("Tutorial");
	tutorialButton.label.dropShadow = true;
	tutorialButton.x = newGame.x - 55;
	tutorialButton.y = newGame.y - 55;
	//tutorialButton.center = true;
	tutorialButton.label.fontSize = 30;
	tutorialButton.setLabelColors("#000000", "#ffffff", "#ff0000");
	this.gui.addChild(tutorialButton);
	tutorialButton.func = function() {
		screenMan.push(tutorialScreen);
	};

	var credits = new Screen(false, false);
	credits.image = Textures.load("credits.png");
	credits.init = function(){
		this.width = canvas.width;
		this.height = canvas.height;
		this.gui.x = 0;
		this.gui.y = 0;
		var back = new TextButton("Main Menu");
		back.x = 350;
		back.y = 500;
		back.label.dropShadow = true;
		back.label.fontSize = 30;
		back.setLabelColors("#aaaaaa", "#ffffff", "#ff0000");
		this.gui.addChild(back);
		back.func = function() {
			screenMan.remove(credits);
		};
	};

	var gameOver = new Screen(false, false);
	gameOver.init = function() {
		this.width = canvas.width;
		this.height = canvas.height;
		pauseGame();

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

	//tutorial screen
	var tutorialScreen = new Screen(false, false);
	tutorialScreen.image = Textures.load("Slide1.JPG");
	tutorialScreen.init = function() {
		this.width = canvas.width;
		this.height = canvas.height;

		var slides = ["Slide1.JPG", "Slide2.JPG", "Slide3.JPG", "Slide4.JPG", "Slide5.JPG"];
		var currSlide = 0;

		var next = new TextButton("Next");
		next.y = 50;
		next.x = canvas.width - canvas.width / 4;
		next.center = true;
		next.label.dropShadow = true;
		next.label.fontSize = 30;
		next.setLabelColors("#aaaaaa", "#ffffff", "#ff0000");
		this.gui.addChild(next);
		next.func = function() {
			//advance the background
			if (currSlide < slides.length - 1) {
				currSlide++;
				tutorialScreen.image = Textures.load(slides[currSlide]);
				prev.visible = true;
			}
			if (currSlide >= slides.length - 1) {
				next.visible = false;
			}
		};

		var prev = new TextButton("Prev");
		prev.y = 50;
		prev.x = canvas.width / 4;
		prev.center = true;
		prev.label.dropShadow = true;
		prev.label.fontSize = 30;
		prev.setLabelColors("#aaaaaa", "#ffffff", "#ff0000");
		prev.visible = false;
		this.gui.addChild(prev);
		prev.func = function() {
			//advance the background
			if (currSlide > 0) {
				currSlide--;
				tutorialScreen.image = Textures.load(slides[currSlide]);
				next.visible = true;
			}
			if (currSlide <= 0) {
				prev.visible = false;
			}
		};

		var returnToMenu = new TextButton("Main Menu");
		returnToMenu.y = 50;
		returnToMenu.x = canvas.width / 2;
		returnToMenu.center = true;
		returnToMenu.label.dropShadow = true;
		returnToMenu.label.fontSize = 30;
		returnToMenu.setLabelColors("#aaaaaa", "#ffffff", "#ff0000");
		this.gui.addChild(returnToMenu);
		returnToMenu.func = function() {
			screenMan.remove(tutorialScreen);
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
		deskQ = loadDeskQ();
		this.stage.addChild(deskQ);
		//text boxes
		this.stage.addChild(waiting);
		this.stage.addChild(timeText);
		sArray = loadSounds();
		this.stage.addChild(sArray);
		peopleSpeech = loadSpeech();
		this.stage.addChild(peopleSpeech);

		this.stage.addChild(roomText);
		this.stage.addChild(delivText);
		this.stage.addChild(helpText);
		this.stage.addChild(peopleQ);
		this.stage.addChild(peopleA);

		// rooms = loadRooms();
		// for (var i = 0; i < rooms.length; i++) {
		// this.stage.addChild(rooms[i]);
		// }

		rooms = loadRooms();
		this.stage.addChild(rooms);

		// elevator = loadElevator();
		// this.stage.addChild(elevator);
		minibot = loadMinibot();
		this.stage.addChild(minibot);
		people = loadPeople();
		this.stage.addChild(people);

		// add stars
		this.stage.addChild(star1);
		this.stage.addChild(star2);
		this.stage.addChild(star3);
		this.stage.addChild(star4);
		this.stage.addChild(star5);

		character = loadCharacter();
		this.stage.addChild(character);

		//clickable things
		sprites.push(phone);
		sprites.push(robot);
		sprites.push(computer);
		sprites.push(people);
		sprites.push(deskQ);
		sprites.push(phoneQ);
		sArray[3].play();
	};

	//essentially restarts the game with a new level.
	gameScreen.newLevel = function(level) {
		currLevel = level;
		//empty the customers list
		while (customers.length > 0) {
			customers.pop();
		}

		//empty deliveries
		deliveries = [];

		phone.newLevel(level);
		robot.newLevel(level);
		phoneRing.visible = false;
		phoneRing.frameRate = 15;
		phoneRing.moveRate = 15;
		people.newLevel(level);
		character.newLevel(level);
		phoneQ.newLevel(level);
		deskQ.newLevel(level);
		roomText.visible = false;
		
		time = 60;
		timePause = false;
		minibot.visible = false;
		minibot.floor = 0;
		delivTime = delivTime - currLevel;
		if(level == 1){
			delivTime = 20;
		}
		helpText.text = "Helpful information about customer's \nquestions can be found here!";
	};

	var pauseMenu = new Screen(false, true);
	//Override the empty init function to set some properties
	pauseMenu.init = function() {

		//Since we set a background we want the screen to fill  the canvas
		this.width = canvas.width;
		this.height = canvas.height;

		this.gui.x = canvas.width / 2;
		this.gui.y = canvas.height / 2;
		
		// this.stage.addChild(star1);
		// this.stage.addChild(star2);
		// this.stage.addChild(star3);
		// this.stage.addChild(star4);
		// this.stage.addChild(star5);

		var resumeGame = new TextButton("Resume Game");
		resumeGame.center = true;
		resumeGame.label.dropShadow = true;
		resumeGame.label.fontSize = 30;
		resumeGame.setLabelColors("#aaaaaa", "#ffffff", "#ff0000");
		this.gui.addChild(resumeGame);
		resumeGame.func = function() {
			resGame();
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
			mainFromPause = true;
		};
	};

	var levelComplete = new Screen(false, true);
	levelComplete.image = Textures.load("levelComplete.png");
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
		nextLevel.setLabelColors("#000000", "#ffffff", "#ff0000");
		this.gui.addChild(nextLevel);
		nextLevel.func = function() {
			screenMan.remove(levelComplete);
			gameScreen.newLevel(currLevel + 1);
		};
		
		var returnToMenu = new TextButton("Main Menu");
		returnToMenu.y = 50;
		returnToMenu.center = true;
		returnToMenu.label.dropShadow = true;
		returnToMenu.label.fontSize = 30;
		returnToMenu.setLabelColors("#000000", "#ffffff", "#ff0000");
		this.gui.addChild(returnToMenu);
		returnToMenu.func = function() {
			screenMan.remove(levelComplete);
			screenMan.remove(gameScreen);
			//resGame();
		};
	};

	gInput.addFunc(27, function() {
		if (screenMan.screens.find(gameScreen) && !screenMan.screens.find(pauseMenu)) {
			screenMan.push(pauseMenu);
			pauseGame();
		}
	});

	gameScreen.update = function(d) {
		delivText.text = deliveries.toString();

		waiting.text = "Customers waiting: " + customers.length;

		if (!timePause) {
			time -= (d * MSPF) / 1000;
		}
		timeText.text = "Time: " + Math.round(time);
		if (time <= 0) {
			pauseGame();
			screenMan.push(levelComplete);
		}

		if (lives > 5) {
			lives = 5;
		}
		if (lives <= 0) {
			screenMan.push(gameOver);
		}

		this.updateChildren(d);
		//tick down delivery timers
		if (!timePause) {
			delivTimer -= (d * MSPF) / 1000;
		}

		if (delivTimer < 0) {
			if (deliveries.length > 0) {
				lives--;
				delivTimer = delivTime;
			}
		}
		if (character.x == phone.x && phone.active) {
			phone.active = false;
			if (phone.ringing) {
				phoneQ.visible = true;
				phoneRing.visible = false;
				//Pick a room number
				var roomNum = Math.floor(Math.random() * 4) + 1;
				roomNum += 100 * (1 + Math.floor(Math.random() * 3));
				roomText.text = roomNum;
				roomText.visible = true;
				//add it to the list of rooms needing a delivery
				deliveries.push(roomNum);
				if (deliveries.length == 1) {
					delivTimer = delivTime;
				}

				phone.arrived();
			}
		}
		if (character.x == people.x && people.active) {
			people.active = false;
			console.log("I've arrived!");
			if (customers.length > 0) {
				deskQ.showQuestion();
				customers.getAt(0).voice.play();
			}
		}
		if (character.x != people.x && deskQ.visible) {
			deskQ.hideQuestion();
			customers.getAt(0).voice.pause();
			customers.getAt(0).voice.currentTime = 0;
		}
		if (deskQ.answered == true) {
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
		if (character.x == computer.moveX && computer.active) {
			computer.arrived();
		}
	};

	pauseGame = function() {
		//pause things in the main game
		character.paused = true;
		phone.pause();
		people.pauseTime = true;
		timePause = true;
		var i,
		    j;
		for ( i = 0; i < sArray.length; i++) {
			sArray[i].pause();
			sArray[i].currentTime = 0;
		}
		customers.getAt(0).voice.pause();
		customers.getAt(0).voice.currentTime = 0;
	};	

};
