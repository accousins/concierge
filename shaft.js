function loadElevator() {
	var elevator = new Sprite();
	elevator.x = 300;
	elevator.y = 300;
	elevator.width = 20;
	elevator.height = 80;
	elevator.xoffset = -elevator.width / 2;
	elevator.yoffset = -elevator.height / 2;
	elevator.image = Textures.load("ElevatorShaft.png");
	return elevator;
}
