//This class will handle the phone object
function loadPhone(){
	var phone = new Sprite();
	phone.x = 100;
	phone.y = 500;
	phone.width = 25;
	phone.height = 25;
	phone.image = Textures.load("phone.png");
	
	//vars that hold where the character should move to
	//to interact with the object
	phone.moveX = 120;
	phone.moveY = 500;
	
	//What do when clicked on
	phone.click = function(){
		character.moveTo(120,500);
		if (character.x == phone.x){
		  var ptext = new TextBox();
		  ptext.x = 10;
		  ptext.y = 10;
		  ptext.border = 400;
		  ptext.fontSize = 15;
		  world.addChild(ptext);
		  ptext.text = "Where is the Pool?"
		}
	};
	
	
	
	world.addChild(phone);
	return phone;
}
