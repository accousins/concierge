//Will run the main game loop and handle global variables
use2D = true;
clearColor = [0, 0, 0, 0];
//Potential causes for breaks:
//Sprite name changes
var sprites = new Array();
var busy;
var phone, robot, computer, character, elevator, rooms, minibot, people;
var customers = new List();
var waiting = new TextBox();
	waiting.x = 600;
	waiting.y = 100;

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
			// console.log("I clicked a thing");
			break;
		}
	}
	//character.moveTo(gInput.mouse.x, gInput.mouse.y);
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
Screen.prototype.init = function(){
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
ScreenManager.prototype.push = function(screen){
    this.screens.remove(screen);
    this.screens.push(screen);
};

//Pop a screen off of the stack
ScreenManager.prototype.pop = function(){
    this.screens.tail.item.gui.visible = false;
    return this.screens.pop();
}
;
//Remove a screen from the stack
ScreenManager.prototype.remove = function(screen){
    screen.gui.visible = false;
    this.screens.remove(screen);
};

//Override th defult update function
ScreenManager.prototype.update = function (d) {
    var screens = this.screens;
    
    //Loop through the screens and update if they are supposed to always update or if they ar the top screen
    for (var node = screens.head; node != null; node = node.link) {
        var screen = node.item;
        
        //The gui wasn't exactly made for this situation so we need to hide it if it's not in the current screen
        if(node != screens.tail){
            screen.gui.visible = false;
        }else{
            screen.gui.visible = true;
        }
        
        if (screen.alwaysUpdate || node == screens.tail) {
            if(!screen.initialized){
                screen.init();
                screen.initialized = true;
            }
            screen.update(d);
        }
    }
};

//Override the defualt draw function the same as the update function except we're drawing
ScreenManager.prototype.draw = function (ctx) {
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
mainMenu.init = function(){
    //Since we set a background we want the screen to fill  the canvas
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.gui.x = canvas.width/2;
    this.gui.y = canvas.height/2;
    
    //Add some buttons
    var newGame = new TextButton("New Game");
    newGame.center = true;
    newGame.label.dropShadow = true;
    newGame.label.fontSize = 30;
    newGame.setLabelColors("#000000", "#ffffff", "#ff0000");
    this.gui.addChild(newGame);
    
    newGame.func = function(){
        screenMan.push(gameScreen);
    };
    
};

var gameScreen = new Screen(true, true);
//Game Background here:
//gameScreen.image = Textures.load("http://www.jar42.com/brine/laststop/images/grass.png");

//Override the empty init function to set some properties
gameScreen.init = function(){
    //Since we set a background we want the screen to fill  the canvas
    this.width = canvas.width;
    this.height = canvas.height;
    
    //is the character busy?
	busy = false;

	//call load functions for all objects
	phone = loadPhone();
	this.stage.addChild(phone);
	robot = loadRobot();
	this.stage.addChild(robot);
	computer = loadComputer();
	this.stage.addChild(computer);
	character = loadCharacter();
	this.stage.addChild(character);
	deskQ = loadDeskQ();
	this.stage.addChild(deskQ);
	this.stage.addChild(waiting);
	
	rooms = loadRooms();
	for(var i = 0; i < rooms.length; i++){
		this.stage.addChild(rooms[i]);
	}
	
	elevator = loadElevator();
	this.stage.addChild(elevator);
	minibot = loadMinibot();
	this.stage.addChild(minibot);
	people = loadPeople();
	this.stage.addChild(people);
	customers.push(people);

	//clickable things
	sprites.push(phone);
	sprites.push(robot);
	sprites.push(character);
	sprites.push(computer);
	sprites.push(people);
	sprites.push(deskQ);
};

var pauseMenu = new Screen(false, true);
//Override the empty init function to set some properties
pauseMenu.init = function(){
    //Since we set a background we want the screen to fill  the canvas
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.gui.x = canvas.width/2;
    this.gui.y = canvas.height/2;
    
    var resumeGame = new TextButton("Resume Game");
    resumeGame.center = true;
    resumeGame.label.dropShadow = true;
    resumeGame.label.fontSize = 30;
    resumeGame.setLabelColors("#aaaaaa", "#ffffff", "#ff0000");
    this.gui.addChild(resumeGame);
    resumeGame.func = function(){
        screenMan.remove(pauseMenu);
    };
    
    var returnToMenu = new TextButton("Main Menu");
    returnToMenu.y = 50;
    returnToMenu.center = true;
    returnToMenu.label.dropShadow = true;
    returnToMenu.label.fontSize = 30;
    returnToMenu.setLabelColors("#aaaaaa", "#ffffff", "#ff0000");
    this.gui.addChild(returnToMenu);
    returnToMenu.func = function(){
        screenMan.remove(pauseMenu);
        screenMan.remove(gameScreen);
    };
};

gInput.addFunc(27, function(){
    if(screenMan.screens.find(gameScreen) && !screenMan.screens.find(pauseMenu)){
        screenMan.push(pauseMenu);
    }
});



gameScreen.update = function(d){	
	waiting.text = "Customers waiting:\n"+customers.length;
	//console.log(character.x, character.y);
	this.updateChildren(d);
};

//Old function for people; used for reference
/*customerLoop = function(){
	var time = 0;
	var spawn = 0;
	for(i=1; i<1000; i++){		
		if(time%6000 == 0){
			var newCust = loadPeople();
			newCust.y = customers.getAt(spawn).y - people.space;
			customers.push(newCust);
			spawn++;
		}
		time++;
		if(time==61) time=0;
	}
};*/