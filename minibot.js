function loadMinibot(){
	var minibot = new Sprite();
	minibot.x = 400;
	minibot.y = 320;
	minibot.width = 10;
	minibot.height = 10;
	minibot.xoffset = -minibot.width / 2;
	minibot.yoffset = -minibot.height / 2;
	minibot.image = Textures.load("minibot.png");
	
	
	return minibot;
}
