var star1 = new Sprite();
star1.x = 160;
star1.y = 15;
star1.width = 75;
star1.height = 75;
star1.visible = true;
star1.image = Textures.load("star png.png");
star1.update = function(d){
	if(lives < 1){
		this.visible = false;
	} else{
		this.visible = true;
	}
};

var star2 = new Sprite();
star2.x = 245;
star2.y = 15;
star2.width = 75;
star2.height = 75;
star2.visible = true;
star2.image = Textures.load("star png.png");
star2.update = function(d){
	if(lives < 2){
		this.visible = false;
	} else{
		this.visible = true;
	}
};

var star3 = new Sprite();
star3.x = 330;
star3.y = 15;
star3.width = 75;
star3.height = 75;
star3.visible = true;
star3.image = Textures.load("star png.png");
star3.update = function(d){
	if(lives < 3){
		this.visible = false;
	} else{
		this.visible = true;
	}
};

var star4 = new Sprite();
star4.x = 415;
star4.y = 15;
star4.width = 75;
star4.height = 75;
star4.visible = true;
star4.image = Textures.load("star png.png");
star4.update = function(d){
	if(lives < 4){
		this.visible = false;
	} else{
		this.visible = true;
	}
};

var star5 = new Sprite();
star5.x = 500;
star5.y = 15;
star5.width = 75;
star5.height = 75;
star5.visible = true;
star5.image = Textures.load("star png.png");
star5.update = function(d){
	if(lives < 5){
		this.visible = false;
	} else{
		this.visible = true;
	}
};
