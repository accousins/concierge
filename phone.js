//This class will handle the phone object
function loadPhone(){
	var phone = new Sprite();
	phone.x = 100;
	phone.y = 500;
	phone.width = 25;
	phone.height = 25;
	phone.image = Textures.load("phone.png");
	phone.active = false;
	
	//What do when clicked on
	phone.click = function(){
		character.moveTo(90,500);
		console.log(character.x,character.y);
		phone.active = true;
	};
	
	return phone;
}
