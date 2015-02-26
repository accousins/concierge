function loadMinibot(){
	var minibot = new Sprite();
	minibot.x = 400;
	minibot.y = 320;
	minibot.width = 10;
	minibot.height = 10;
	minibot.xoffset = -minibot.width / 2;
	minibot.yoffset = -minibot.height / 2;
	minibot.image = Textures.load("minibot.png");
	
	//Minibot moving
	mbMove = function(){
		switch(robot.command){
			case "1":
				minibot.x = rooms[0].x;
				minibot.y = rooms[0].y;
				break;
			case "2":
				minibot.x = rooms[1].x;
				minibot.y = rooms[1].y;			
				break;
			case "3":
				minibot.x = rooms[2].x;
				minibot.y = rooms[2].y;
				break;
			case "4":
				minibot.x = rooms[3].x;
				minibot.y = rooms[3].y;
				break;
		}
	};

	minibot.update = function(d){
		mbMove();
	}

	return minibot;
}
