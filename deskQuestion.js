function loadDeskQ() {
	var deskQ = new Sprite();
	deskQ.x = 650;
	deskQ.y = 250;
	deskQ.width = 150;
	deskQ.height = 150;
	
	deskQ.visible = false;
	deskQ.answered = false;

	var questions = [{image: "SpeechBubbleMockup.png", outcomes: [1, 0, -5]}];
	deskQ.current;
	
	deskQ.pickQuestion = function(){
		deskQ.current = questions[0];
		deskQ.image = Textures.load(this.current.image);
	};
	
	deskQ.click = function() {
		var dy = gInput.mouse.y - this.y;
		if (dy >= 75 && dy <= 99) {
			console.log("you picked A");
			lives.val += this.current.outcomes[0];
			deskQ.visible = false;
			customers.pop();
			deskQ.answered = true;
		}
		if (dy >= 100 && dy <= 124) {
			console.log("you picked B");
			lives.val += this.current.outcomes[1];
			deskQ.visible = false;
			customers.pop();
			deskQ.answered = true;
		}
		if (dy >= 125 && dy <= 150) {
			console.log("you picked C");
			lives.val += this.current.outcomes[2];
			deskQ.visible = false;
			customers.pop();
			deskQ.answered = true;
		}
	};

	return deskQ;
}