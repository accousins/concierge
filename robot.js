//this class will handle the robot object
function loadRobot() {
	var robot = new Sprite();
	robot.x = 15;
	robot.y = 500;
	robot.width = 50;
	robot.height = 100;
	robot.image = Textures.load("Pre-Robot.png");
	world.addChild(robot);
	return robot;
}
