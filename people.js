//this class will handle the people aproaching the desk with questions
function loadPeople(){
	var people = new Sprite();
	people.x = 700;
	people.y = 500;
	people.width = 100;
	people.height = 100;
	people.space = people.height+40;
	people.image = Textures.load("Pre-customers.png");
	world.addChild(people);
	return people;
}
