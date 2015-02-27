//This class will handle the phone object
function loadPhone(){
	var phone = new Sprite();
	phone.x = 100;
	phone.y = 500;
	phone.width = 25;
	phone.height = 25;
	phone.image = Textures.load("phone.png");
	phone.active = false;
	
	var ring = Math.floor((Math.random() *100)+ 1);
	
	var phoneQuestion = new Sprite();
	phoneQuestion.x = 50;
	phoneQuestion.y = 300;
	phoneQuestion.width = 150;
	phoneQuestion.height = 113;
	phoneQuestion.image = Textures.load("phone_question.png");
	phoneQuestion.visible = false;
	
	
	
	var phones = [phone, phoneQuestion];
	
	//What do when clicked on
	phone.click = function(){
		character.moveTo(90,500);
		console.log(character.x,character.y);
		if (character.xTravel == 0 && ring >= 95){
			phoneQuestion.visible = true;
		}
	};
	
	//world.addChild(phone);
//	return phone;
	return phones;
}
