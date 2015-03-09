//Sounds and stuff go here.
function loadSounds(){
	var sArray = new Array();
	var pRing = new Audio("http://people.ucsc.edu/~donalexa/phoneRing.wav");
	var roBeep = new Audio("http://people.ucsc.edu/~donalexa/roBeep.wav");
	var bellRing = new Audio("http://people.ucsc.edu/~donalexa/bellRing.wav");
	sArray.push(pRing);
	sArray.push(roBeep);
	sArray.push(bellRing);
	//sArray contents: 0 = phoneRing; 1 = robot Beep;	
	return sArray;
}

function loadSpeech(){
	var peopleSpeech = new Array();
	var psOne = new Audio("http://people.ucsc.edu/~donalexa/gibberish1.wav");
	psOne.on = false;
	var psThree = new Audio("http://people.ucsc.edu/~donalexa/CBT.mp3");
	psThree.on = false;
	peopleSpeech.push(psOne);
	peopleSpeech.push(psThree);	
	return peopleSpeech;
}
