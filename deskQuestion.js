function loadDeskQ() {
	var deskQ = new Sprite();
	deskQ.x = 810;
	deskQ.y = 250;
	deskQ.width = 150;
	deskQ.height = 150;
	deskQ.image = Textures.load("SpeechBubbleMockup.png");
	deskQ.visible = false;

	deskQ.click = function() {
		var dy = gInput.mouse.y - this.y;
		if (dy >= 75 && dy <= 99) {
			console.log("you picked A");
			deskQ.visible = false;
		}
		if (dy >= 100 && dy <= 124) {
			console.log("you picked B");
			deskQ.visible = false;
		}
		if (dy >= 125 && dy <= 150) {
			console.log("you picked C");
			deskQ.visible = false;
		}
	};

	return deskQ;
}