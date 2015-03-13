//this class will handle the people aproaching the desk with questions
function loadPeople() {
	var people = new Sprite();
	people.x = 700;
	people.y = 400;
	people.width = 100;
	people.height = 200;
	people.space = people.height + 40;
	people.image = Textures.load("Customer0.png");
	people.visible = false;
	people.active = false;
	people.time = 2 + Math.floor(Math.random() * 2);
	people.pauseTime = false;
	people.timeInterval = 10;

	people.happy = 3;
	people.alarm = false;

	var questions = [{
		question : "Does your robot take\naway someone's job?",
		answers : "Yes.\n\n\nNo.\n\n\nMaybe?",
		outcomes : [-1, 0, -1],
		helptext : "Service Robots do not take away people's jobs,\nthey just make workers more efficient!"
	}, {
		question : "Will the robot really\ndeliver things to my \nroom?",
		answers : "Yes.\n\n\nNo.\n\n\nMaybe?",
		outcomes : [0, -1, -1],
		helptext : "This robot will autonomously bring small objects\nstraight to resident's rooms!"
	}, {
		question : "How does the robot\nuse the elevators?",
		answers : "Magic.\n\n\nSomeone presses the button.\n\n\nIt is WiFi Equipped.",
		outcomes : [-1, -1, 0],
		helptext : "The robot uses telepathy to talk to the\nbuilding, in other words WiFi!"
	}, {
		question : "Can the robot talk?",
		answers : "Only in Japanese\n\n\nWith Beeps and Whistles.\n\n\nOf course not.",
		outcomes : [-1, 0, -1],
		helptext : "The robot uses beeps and whistles,\nalong with text on the screen to talk!"
	}, {
		question : "Will the robot displace\ncleaning people?",
		answers : "No.\n\n\nThe robot is part roomba.\n\n\nIt even makes beds.",
		outcomes : [0, -1, -1],
		helptext : "The robot cannot clean, since it has no arms\nor cleaning supplies."
	}, {
		question : "How does the robot\nknock on the door?",
		answers : "An Arm reaches out.\n\n\nIt just rings the doorbell.\n\n\nIt calls the phone in the room.",
		outcomes : [-1, -1, 0],
		helptext : "The robot calls the phone in a room\nwhen it arrives, letting the residents\nknow it is outside with a message!"
	}, {
		question : "Does the robot need\nsomeone to start it?",
		answers : "Yes.\n\n\nNope, 100% autonomous.\n\n\nWho really knows?",
		outcomes : [0, -1, -1],
		helptext : "The robot only acts a relay from a\nhotel employee to a guest, it needs someone\nto load it and give it a destination!"
	}, {
		question : "Can the robot bring\nme a drink?",
		answers : "The robot can bring you anything.\n\n\nSealed and non-alcoholic.\n\n\nI like the way you think.",
		outcomes : [-1, 0, -1],
		helptext : "The robot can bring drinks to guests\nas long as they are sealed(no one\nlikes spills) and non-alchoholic\n(it isn't qualified to check IDs)!"
	}, {
		question : "What happens if I tell\nthe robot to go in the\nswimming pool?",
		answers : "Why would you do that?\n\n\nIt can swim of course.\n\n\nIt won't go near the pool.",
		outcomes : [-1, -1, 0],
		helptext : "The robot is allergic to water, and\nuses it's maps to make sure it stays well\naway from any pools!"
	}, {
		question : "Can the robot\ngo outside?",
		answers : "It's an indoor robot.\n\n\nNo one has ever tried it.\n\n\nIt's an ATV-bot.",
		outcomes : [0, -1, -1],
		helptext : "The robot is only designed to be used\nindoors, and outside of the hotel it must be\nmanually driven."
	}, {
		question : "What is the\nrobot's capacity?",
		answers : "How dare you.\n\n\nUp to 10 pounds.\n\n\nUp to 200 pounds.",
		outcomes : [-1, 0, -1],
		helptext : "The robot has a 2 cu. ft. bin that can\nhold up to 10 pounds. It doesn't do metric"
	}, {
		question : "Do I need to tip\nthe robot after a\ndelivery?",
		answers : "10~20% based on how well it did.\n\n\nNot if you're cheap.\n\n\nNo - but it likes tweets.",
		outcomes : [-1, -1, 0],
		helptext : "The robot doesn't accept any tips,\nbut it does like tweets!"
	}, {
		question : "How long does the\nrobot's battery last?",
		answers : "3-4 hours driving.\n\n\nIt has to stay plugged in.\n\n\nNo batteries, just solar panals.",
		outcomes : [0, -1, -1],
		helptext : "The robot's battery lasts 3-4 hours driving,\n8 hours resting, but it waits in a charging dock\nso it can do multiple deliveries an hour 24/7!"
	}, {
		question : "Will the robot wash\nmy laundry?",
		answers : "Yup, built in washer/dryer.\n\n\nIt can pick it up to be washed.\n\n\nNo, but it likes to play with socks.",
		outcomes : [-1, 0, -1],
		helptext : "The robot cannot wash any laundry itself,\nbut can pick up dirty laundry, bring it to be washed,\nand then deliver the now clean laundry!"
	}, {
		question : "How does the robot\nhelp you work?",
		answers : "Frankly, it doesn't.\n\n\nIt does all my work for me.\n\n\nIt delivers, so I can do more.",
		outcomes : [-1, -1, 0],
		helptext : "The robot lets a concierge help more people at once:\nit only takes a few seconds to send on a delivery,\nso you can quickly get back to helping people\nat the front desk!"
	}, {
		question : "Does the robot mean\nthe hotel needs less\nworkers?",
		answers : "No, it helps the staff work.\n\n\nI'm still here for now.\n\n\nYup, we fired half our staff.",
		outcomes : [0, -1, -1],
		helptext : "The robot lets hotel staff increase service level\nand reduces their stress at peak times. It doesn't\nreplace any workers!"
	}, {
		question : "Is the robot smarter\nthan a person?",
		answers : "Yeah it's pretty smart.\n\n\nNo, it just runs deliveries.\n\n\nSmarter than you! HAHA!.",
		outcomes : [-1, 0, -1],
		helptext : 'The robot is not smarter than a person.\nHave you ever met someone who lists "Can ride elevators\nall by myself" on their resume?'
	}];

	people.update = function(d) {
		if (!people.pauseTime) {
			if (!deskQ.visible) {
				for (var i = 0; i < customers.length; i++) {
					customers.getAt(i).time -= (d * MSPF) / 1000;
					if (customers.getAt(i).time < 0) {
						customers.remove(customers.getAt(i));
						lives--;
					}
				}
			}
			people.time -= (d * MSPF) / 1000;
			if (people.time <= 0) {
				sArray[2].play();
				var newCust = people.newPerson();
				customers.push(newCust);
				people.time = (12 - (currLevel * 2)) + Math.floor(Math.random() * people.timeInterval);
			}
		}
	};

	//creates a new customer
	people.newPerson = function() {
		var cust = new Object;
		cust.q = questions[Math.floor(Math.random() * questions.length)];
		cust.time = 30 - (currLevel * 2);
		return cust;
	};

	people.click = function() {
		character.moveTo(700, 500);
		console.log("I was chosen!");
		people.active = true;
	};

	people.change = function() {
		//var num = 2;
		var num = Math.floor(Math.random() * 3);
		this.image = Textures.load("Customer" + num + ".png");
	};

	people.newLevel = function(level) {
		people.pauseTime = false;
		people.timeInterval = 15 - (2 * level);
		people.active = false;
		people.pausedTime = false;
		deskQ.hideQuestion();
	};

	people.change();

	return people;
}