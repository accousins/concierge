function loadDeskQ() {
	var deskQ = new Sprite();
	deskQ.x = 640;
	deskQ.y = 250;
	deskQ.width = 155;
	deskQ.height = 150;
	deskQ.answered = false;
	deskQ.visible = false;
	deskQ.image = Textures.load("deskQ.png");

	//var questions = [{image: "deskQ1.png", outcomes: [-1, 0, -1]}, {image: "deskQ2.png", outcomes: [0, -1, -1]}];
	// deskQ.current;

	// deskQ.pickQuestion = function(){
	// deskQ.current = questions[Math.floor(Math.random() * 2)];
	// deskQ.image = Textures.load(this.current.image);
	// };

	var peopleQ = new TextBox();
	peopleQ.x = 10;
	peopleQ.y = 10;
	peopleQ.fontSize = 14;
	peopleQ.text = "test question?";
	//peopleQ.visible = false;

	//text of answers to the customer's questions
	var peopleA = new TextBox();
	peopleA.x = 2;
	peopleA.y = 75;
	peopleA.fontSize = 10;
	peopleA.text = "test\n\nwith\n\nnewlines";
	//peopleA.visible = false;
	
	deskQ.addChild(peopleQ);
	deskQ.addChild(peopleA);

	deskQ.showQuestion = function() {
		console.log("display the question!");
		deskQ.visible = true;

		peopleQ.text = customers.getAt(0).q.question;
		peopleA.text = customers.getAt(0).q.answers;

		//peopleQ.visible = true;
		//peopleA.visible = true;

		//update the help text
		computer.setHelp(customers.getAt(0).q.helptext);
	};

	deskQ.hideQuestion = function() {
		deskQ.visible = false;
		//peopleQ.visible = false;
		//peopleA.visible = false;
	};

	deskQ.click = function() {
		var dy = gInput.mouse.y - this.y;
		if (dy >= 75 && dy <= 99 && deskQ.visible) {
			console.log("you picked A");
			lives += customers.getAt(0).q.outcomes[0];
			if(customers.getAt(0).q.outcomes[0] == 0){
				score += 5;
			}
			deskQ.hideQuestion();
			deskQ.answered = true;
			customers.getAt(0).voice.pause();
			customers.getAt(0).voice.currentTime = 0;
			customers.pop();
			people.change();
		}
		if (dy >= 100 && dy <= 124 && deskQ.visible) {
			console.log("you picked B");
			lives += customers.getAt(0).q.outcomes[1];
			if(customers.getAt(0).q.outcomes[1] == 0){
				score += 5;
			}
			deskQ.hideQuestion();
			deskQ.answered = true;
			customers.getAt(0).voice.pause();
			customers.getAt(0).voice.currentTime = 0;
			customers.pop();
			people.change();
		}
		if (dy >= 125 && dy <= 150 && deskQ.visible) {
			console.log("you picked C");
			lives += customers.getAt(0).q.outcomes[2];
			if(customers.getAt(0).q.outcomes[2] == 0){
				score += 5;
			}
			deskQ.hideQuestion();
			deskQ.answered = true;
			customers.getAt(0).voice.pause();
			customers.getAt(0).voice.currentTime = 0;
			customers.pop();
			people.change();
		}
	};

	deskQ.newLevel = function(level) {
		deskQ.visible = false;
		deskQ.answered = false;
	};

	return deskQ;
}