//Sounds and stuff go here.
function loadSounds(){
	var sArray = new Array();
	var pRing = new Audio("http://people.ucsc.edu/~donalexa/phoneRing.wav");
	pRing.volume = 0.4;
	var roBeep = new Audio("http://people.ucsc.edu/~donalexa/roBeep.wav");
	roBeep.volume = 0.3;
	var bellRing = new Audio("http://people.ucsc.edu/~donalexa/bellRing.wav");
	var bgMusic = new Audio("bgMusic.mp3");
	bgMusic.volume = 0.15;
	bgMusic.loop = true;
	bgMusic.preload = "auto";
	sArray.push(pRing);
	sArray.push(roBeep);
	sArray.push(bellRing);
	//sArray.push(bgMusic);
	//sArray contents: 0 = phoneRing; 1 = robot Beep; 2 = desk bell; 3 = background music
	return sArray;
}

function loadMusic(){
	var bgMusic = new Audio("bgMusic.mp3");
	bgMusic.volume = 0.15;
	bgMusic.loop = true;
	bgMusic.preload = "auto";
	return bgMusic;
}

function loadSpeech(){
	var peopleSpeech = new Array();
	var psOne = new Audio("http://people.ucsc.edu/~donalexa/gibberish1.wav");
	var psThree = new Audio("http://people.ucsc.edu/~donalexa/CBT.mp3");
	psThree.volume = 0.4;
	peopleSpeech.push(psOne);
	peopleSpeech.push(psThree);	
	return peopleSpeech;
}