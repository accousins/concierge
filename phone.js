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

	phone.time = 3 + Math.floor(Math.random() * 5);
	phone.timeInterval = 10;
	phone.pauseTime = false;

	phone.happy = 3;
	phone.alarm = false;

	//used to count down until the phone rings
	phone.update = function(d) {
		if (!phone.pauseTime) {
			if (phone.ringing == false) {
				phone.time -= (d * MSPF) / 1000;
				if (phone.time <= 0) {
					phone.ringing = true;
					phone.alarm = true;
					// console.log("the phone is ring");
				}
			} else {
				// if (phone.alarm) {
				// phone.happy -= (d * MSPF) / 1000;
				// if (phone.happy <= 0) {
				// lives.val--;
				// phone.time = 5 + Math.floor(Math.random() * phone.timeInterval);
				// phone.ringing = false;
				// phone.alarm = false;
				// }
				// }
			}
		}
	};

	//what happens when the phone is ringing and the player arrives there
	phone.arrived = function() {
		//Time between phone calls
		phone.time = 5 + Math.floor(Math.random() * phone.timeInterval);
		phone.ringing = false;
		phone.alarm = false;
	};

	//What do when clicked on
	phone.click = function() {
		character.moveTo(this.x, this.y);
		phone.active = true;
	};

	//set the phone to the start state of the new level
	phone.newLevel = function(level) {
		phone.time = 3 + Math.floor(Math.random() * 5);
		phone.timeInterval = 10 - (2 * level);
		phone.ringing = false;
		phone.active = false;
		phone.pauseTime = false;
	};

	var phones = [phone, phoneRing];

	return phones;
}
