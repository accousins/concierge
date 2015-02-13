//Will run the main game loop and handle global variables
use2D = true;

//Define manager; manages clicks on sprites
var manager = new Sprite();
manager.clicked = false;
manager.target = undefined;
world.addChild(manager);
var sprites = new Array();
sprites.push(phone);
sprites.push(robot);
sprites.push(character);
sprites.push(computer);

//checkSprite: checks to see if mouse/sprite coordinates are overlapping
function checkSprite(sprite, x, y){
    var minX = sprite.x;
    var maxX = sprite.x+sprite.width;
    var minY = sprite.y;
    var maxY = sprite.y+sprite.height;
    var mx = x;
    var my = y;
    
    if(mx >= minX && mx <= maxX && my >= minY && my <= maxY){
        return true;
    }
    return false;
}

//Mouse manager function
manager.onMouseDown = function(button){
    for(var sprite in sprites){
        sprite = sprites[sprite];
        if(checkSprite(sprite, gInput.mouse.x, gInput.mouse.y)){
            this.clicked = true;
            this.target = sprite;
            break;
        }
    }
};
gInput.addMouseDownListener(manager);