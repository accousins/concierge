//this class will handle the people aproaching the desk with questions
function loadPeople() {
	var people = new Sprite();
	people.x = 700;
	people.y = 500;
	people.width = 100;
	people.height = 100;
	people.space = people.height + 40;
	people.image = Textures.load("Pre-customers.png");
	people.visible = false;
	people.active = false;
	people.time = 3 + Math.floor(Math.random() * 5);
	people.pauseTime = false;
	people.timeInterval = 10;

	people.update = function(d) {
		if (!people.pauseTime) {
			people.time -= (d * MSPF) / 1000;
			if (people.time <= 0) {
				var newCust = loadPeople();
				customers.push(newCust);
				people.time = 5 + Math.floor(Math.random() * people.timeInterval);

			}
		}
	};

	people.click = function() {
		character.moveTo(700, 500);
		console.log("I was chosen!");
		people.active = true;
	};
	
	people.newLevel = function(level){
		people.pauseTime = false;
		people.timeInterval = 10 - (2 * level);
		people.active = false;
		people.pausedTime = false;
	};

	return people;
}

