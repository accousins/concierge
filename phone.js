//This class will handle the phone object
function loadPhone(){
	var phone = new Sprite();
	phone.x = 100;
	phone.y = 500;
	phone.width = 25;
	phone.height = 25;
	phone.image = Textures.load("phone.png");
	world.addChild(phone);
	
	//vars that hold where the character should move to
	//to interact with the object
	phone.moveX = 120;
	phone.moveY = 500;
	
	return phone;
}
