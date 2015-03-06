function loadPhoneQ() {
	var phoneQ = new Sprite();
	phoneQ.x = 50;
	phoneQ.y = 250;
	phoneQ.width = 150;
	phoneQ.height = 150;
	phoneQ.image = Textures.load("phone_question.png");
	phoneQ.visible = false;

	phoneQ.click = function() {
		var dy = gInput.mouse.y - this.y;
		if (dy >= 75 && dy <= 99) {
			console.log("you picked A");
			phoneQ.visible = false;
		}
		if (dy >= 100 && dy <= 124) {
			console.log("you picked B");
			lives--;
			phoneQ.visible = false;
		}
		if (dy >= 125 && dy <= 150) {
			console.log("you picked C");
			lives--;
			phoneQ.visible = false;
		}
	};

	return phoneQ;
}