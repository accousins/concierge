//this class will handle the people aproaching the desk with questions
function loadPeople(){
	var people = new Sprite();
	people.x = 700;
	people.y = 500;
	people.width = 100;
	people.height = 100;
	people.space = people.height+40;
	people.image = Textures.load("Pre-customers.png");
	people.active = false;
	
	people.update = function(d){
		var rand = Math.random().toFixed(1);
		if(rand == 0.5 && customers.length < 20){
		var newCust = loadPeople();
		customers.push(newCust);
		}
	};
	
	people.click = function(){
		character.moveTo(700, 500);
		console.log("I was chosen!");
		people.active = true;
	};
	
	return people;
}

