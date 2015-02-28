//This class will handle the phone object
function loadPhone() {
	var phone = new Sprite();
	phone.x = 100;
	phone.y = 500;
	phone.width = 25;
	phone.height = 25;
	phone.image = Textures.load("phone.png");
	phone.active = false;
	phone.ringing = false;
	var act = 0;

	var phoneRing = new Sprite();
	phoneRing.x = 100;
	phoneRing.y = 450;
	phoneRing.width = 25;
	phoneRing.height = 25;
	phoneRing.image = Textures.load("ringing_phone.png");
	phoneRing.visible = false;

	var phones = [phone, phoneRing];

	phone.update = function(d) {
		if (phone.ringing == false) {
			act = Math.floor((Math.random() * 100) + 1);
			console.log(act);
			if (act >= 95) {
				phone.ringing = true;
				console.log("the phone is ring");
			}
		}

	};
	//What do when clicked on
	phone.click = function() {
		character.moveTo(this.x, this.y);
		phone.active = true;
	};

	return phones;
}
