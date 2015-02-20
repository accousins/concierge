function loadRooms() {
	// Creates an array of rooms from left to right, bottom to top and returns the array.
	var rooms = new Array();

	var room = new Sprite();
	room.x = 340;
	room.y = 320;
	room.width = 60;
	room.height = 40;
	room.xoffset = -room.width / 2;
	room.yoffset = -room.height / 2;
	room.image = Textures.load("RoomBase.png");

	var room2 = new Sprite();
	room2.x = 400;
	room2.y = 320;
	room2.width = 60;
	room2.height = 40;
	room2.xoffset = -room2.width / 2;
	room2.yoffset = -room2.height / 2;
	room2.image = Textures.load("RoomBase.png");

	var room3 = new Sprite();
	room3.x = 340;
	room3.y = 280;
	room3.width = 60;
	room3.height = 40;
	room3.xoffset = -room3.width / 2;
	room3.yoffset = -room3.height / 2;
	room3.image = Textures.load("RoomBase.png");

	var room4 = new Sprite();
	room4.x = 400;
	room4.y = 280;
	room4.width = 60;
	room4.height = 40;
	room4.xoffset = -room4.width / 2;
	room4.yoffset = -room4.height / 2;
	room4.image = Textures.load("RoomBase.png");

	// world.addChild(room);
	// world.addChild(room2);
	// world.addChild(room3);
	// world.addChild(room4);

	rooms.push(room);
	rooms.push(room2);
	rooms.push(room3);
	rooms.push(room4);

	return rooms;
}