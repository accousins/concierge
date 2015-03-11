//this class will handle the people aproaching the desk with questions
function loadPeople() {
	var people = new Sprite();
	people.x = 700;
	people.y = 400;
	people.width = 100;
	people.height = 200;
	people.space = people.height + 40;
	people.image = Textures.load("customers.png");
	people.visible = false;
	people.active = false;
	people.time = 3 + Math.floor(Math.random() * 5);
	people.pauseTime = false;
	people.timeInterval = 10;

	people.happy = 3;
	people.alarm = false;

	var questions = [{
		question: "Does your robot take\naway someone's job?",
		answers: "Yes.\n\n\nNo.\n\n\nMaybe?",
		outcomes : [-1, 0, -1],
		helptext: "Service Robots do not take away people's jobs,\nthey just make workers more efficient!"
	},
	{
		question: "Will the robot really\ndeliver things to my \nroom?",
		answers: "Yes.\n\n\nNo.\n\n\nMaybe?",
		outcomes: [0,-1,-1],
		helptext: "This robot will autonomously bring small objects\nstraight to resident's rooms!"
	},
	{
		question: "How does the robot\nuse the elevators?",
		answers: "Magic.\n\n\nSomeone presses the button.\n\n\nIt is WiFi Equipped.",
		outcomes: [-1,-1,0],
		helptext: "The robot uses telepathy to talk to the\nbuilding, in other words WiFi!"
	}];

	people.update = function(d) {
		if (!people.pauseTime) {
			people.time -= (d * MSPF) / 1000;
			if (people.time <= 0) {
                sArray[2].play(); 
				var newCust = people.newPerson();
				customers.push(newCust);
				people.time = 5 + Math.floor(Math.random() * people.timeInterval);
			}
		}
	};

	//creates a new customer
	people.newPerson = function() {
		var cust = new Object;
		cust.q = questions[Math.floor(Math.random() * questions.length)];
		return cust;
	};

	people.click = function() {
		character.moveTo(700, 500);
		console.log("I was chosen!");
		people.active = true;
	};

	people.newLevel = function(level) {
		people.pauseTime = false;
		people.timeInterval = 10 - (2 * level);
		people.active = false;
		people.pausedTime = false;
		deskQ.hideQuestion();
	};

	return people;
}