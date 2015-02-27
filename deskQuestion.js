function loadDeskQ() {
	var deskQ = new Sprite();
	deskQ.x = 810;
	deskQ.y = 250;
	deskQ.width = 150;
	deskQ.height = 150;
	deskQ.image = Textures.load("SpeechBubbleMockup.png");

	deskQ.click = function() {
		var dy = gInput.mouse.y - this.y;
		if (dy >= 75 && dy <= 99) {
			console.log("you picked A");
			deskQ.x = 810;
			deskQ.y = 250;
		}
		if (dy >= 100 && dy <= 124) {
			console.log("you picked B");
			deskQ.x = 810;
			deskQ.y = 250;
		}
		if (dy >= 125 && dy <= 150) {
			console.log("you picked C");
			deskQ.x = 810;
			deskQ.y = 250;
		}
	};

	return deskQ;
}