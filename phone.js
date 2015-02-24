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
	
	//What do when clicked on
	phone.click = function(){
		character.moveTo(120,500); 
	};
	
	world.addChild(phone);
	return phone;
}
