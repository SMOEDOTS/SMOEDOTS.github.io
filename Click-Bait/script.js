
var baitCount = 0;
var bait2 = false;

function baited(){

	//main click
	document.getElementById("mainButton").src = "baited.png";
	console.log("Baited!");
	window.setTimeout(switchButtonBack,250);
	baitCount++;
	
	if(baitCount == 1){
		document.getElementById("topText").innerHTML = "You have been baited!";
	}
	
	if(baitCount == 2){
		document.getElementById("topText").innerHTML = "Why would you click this?"
	}
	if(baitCount == 3){
		document.getElementById("topText").innerHTML = "Oh well... go have fun."
	}
	
	if(baitCount > 3){
		document.getElementById("topText").innerHTML = "You have been baited " + baitCount + " times.";
	}
	
	if(baitCount >= 20 && baitCount <= 25){
		document.getElementById("topText").innerHTML = "I can't watch! Please, have some better bait!"
		bait2 = true;
	}
	
}

function switchButtonBack(){
	
	document.getElementById("mainButton").src = "thisisbait.png";
	
}