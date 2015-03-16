function loadPhoneQ() {
	var phoneQ = new Sprite();
	phoneQ.x = 50;
	phoneQ.y = 250;
	phoneQ.width = 150;
	phoneQ.height = 150;
	phoneQ.image = Textures.load("phone_question_delivery.png");
	phoneQ.visible = false;

	var roomText = new TextBox();
	roomText.x = 75;
	roomText.y = 50;
	roomText.fontSize = 20;
	//roomText.visible = false;
	roomText.text = "Number";
	
	phoneQ.addChild(roomText);
	
	phoneQ.roomNum = function(num){
		roomText.text = num;
	};

	phoneQ.click = function() {
		var dy = gInput.mouse.y - this.y;
		if (dy >= 75 && dy <= 150 && phoneQ.visible) {
			console.log("you picked A");
			phoneQ.visible = false;
			//roomText.visible = false;
		}
	};

	phoneQ.newLevel = function(level) {
		phoneQ.visible = false;
		//roomText.visible = false;
	};

	return phoneQ;
}