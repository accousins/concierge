//Sounds and stuff go here.
function loadSounds(){
	var sArray = new Array();
	var pRing = new Audio("http://people.ucsc.edu/~donalexa/phoneRing.wav");
	var roBeep = new Audio("http://people.ucsc.edu/~donalexa/roBeep.wav");
	sArray.push(pRing);
	sArray.push(roBeep);
	
	var peopleSpeech = new Array();
	var psOne = new Audio("http://people.ucsc.edu/~donalexa/gibberish1.wav");
	var psThree = new Audio("http://people.ucsc.edu/~donalexa/CBT.mp3");
	peopleSpeech.push(psOne);
	peopleSpeech.push(psThree);
	sArray.push(peopleSpeech);
	//sArray contents: 0 = phoneRing; 1 = robot Beep; 2 = people Array	
	return sArray;
}