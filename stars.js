var star1 = new Sprite();
star1.x = 160;
star1.y = 15;
star1.width = 75;
star1.height = 75;
star1.image = Textures.load("star png.png");
star1.update = function(d){
	if(lives < 1){
		star1.image = Textures.load("gray star.png");
	} else{
		star1.image = Textures.load("star png.png");
	}
};

var star2 = new Sprite();
star2.x = 245;
star2.y = 15;
star2.width = 75;
star2.height = 75;
star2.image = Textures.load("star png.png");
star2.update = function(d){
	if(lives < 2){
		star2.image = Textures.load("gray star.png");
	} else{
		star2.image = Textures.load("star png.png");
	}
};

var star3 = new Sprite();
star3.x = 330;
star3.y = 15;
star3.width = 75;
star3.height = 75;
star3.image = Textures.load("star png.png");
star3.update = function(d){
	if(lives < 3){
		star3.image = Textures.load("gray star.png");
	} else{
		star3.image = Textures.load("star png.png");
	}
};

var star4 = new Sprite();
star4.x = 415;
star4.y = 15;
star4.width = 75;
star4.height = 75;
star4.image = Textures.load("star png.png");
star4.update = function(d){
	if(lives < 4){
		star4.image = Textures.load("gray star.png");
	} else{
		star4.image = Textures.load("star png.png");
	}
};

var star5 = new Sprite();
star5.x = 500;
star5.y = 15;
star5.width = 75;
star5.height = 75;
star5.image = Textures.load("star png.png");
star5.update = function(d){
	if(lives < 5){
		star5.image = Textures.load("gray star.png");
	} else{
		star5.image = Textures.load("star png.png");
	}
};
