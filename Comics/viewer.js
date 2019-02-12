var seriesInfo = [
		{"sNum":0,"last":53,"vids":[18,24],"title":"Of Taxes and Crabs","sTitle":"OTaC","wip":false,"folder":"OTAC/"},
		{"sNum":1,"last":25,"vids":[],"title":"War [of the] Kraft","sTitle":"WotK","wip":false,"folder":"WotK/"},
		{"sNum":2,"last":30,"vids":[],"title":"Consider: Supreme Duck","sTitle":"C:SD","wip":false,"folder":"CSD/"},
		{"sNum":3,"last":19,"vids":[14,16],"title":"The Evasion of Yosh","sTitle":"TEoY","wip":true,"folder":"TEoY/"},
		{"sNum":4,"last":88,"vids":[7,19,38,57,59],"title":"The Year of the Lemon","sTitle":"TYotL","wip":true,"folder":"TYotL/"}
	];
var index = 1;
var seriesJSON;
var imgs = [];
function changeImage(action){
	index += action;
	
	if (index <= 1){
		index = 1;
		document.getElementById("pButtonB").disabled = true;
		document.getElementById("pButtonT").disabled = true;
		preload(2);
	}
	else{
		document.getElementById("pButtonB").disabled = false;
		document.getElementById("pButtonT").disabled = false;
	}
	
	if (index > seriesJSON.last){
		index = seriesJSON.last + 1;
		document.getElementById("nButtonB").disabled = true;
		document.getElementById("nButtonT").disabled = true;
		if(!seriesJSON.wip){
			document.getElementById("idImgDiv").innerHTML = '<img src="end.png" width="900">';
		}
		else{
			document.getElementById("idImgDiv").innerHTML = '<img src="tbc.png" width="900">';
		}
		preload(last);
		return;
	}
	else{
		document.getElementById("nButtonB").disabled = false;
		document.getElementById("nButtonT").disabled = false;
	}
	
	if(index > 1 && index < seriesJSON.last){
		var load1 = index - 1;
		var load2 = index + 1;
		preload(load1,load2);
	}
	
	if(index >= 1 && index <= seriesJSON.last){
		document.getElementById("idSub").innerHTML = index + "/" + seriesJSON.last;
	}
	
	var isVid = false;
	for(i=0;i<seriesJSON.vids.length;i++){
		if(index == seriesJSON.vids[i]){
			document.getElementById("idImgDiv").innerHTML = '<video autoplay src="'+ seriesJSON.folder + index + '.mov" width="900" controls></video>';
			isVid = true;
			break;
		}
	}
	if(!isVid){
		document.getElementById("idImgDiv").innerHTML = '<img src="'+ seriesJSON.folder + index + '.png" width="900">';
	}
	
	scroll(0,0);
	updateUrl();
}

function setImage(inputIndex){
	if (!inputIndex) inputIndex = document.getElementById("idIndex").value;
	inputIndex = parseFloat(inputIndex);
	if(!isNaN(inputIndex) && inputIndex >= 1 && inputIndex <= seriesJSON.last){
		index = inputIndex;
		changeImage(0);
	}
	document.getElementById("idIndex").value = "";
}

function setSeries(){
	seriesJSON = seriesInfo[parseInt(document.getElementById("idSelector").value)];
	index = 1;
	updateUrl();
	init();
}

function updateUrl(){
	if (history.pushState) {
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?series=' + seriesJSON.sNum + '&num=' + index;
    window.history.pushState({path:newurl},'',newurl);
	}
}

function preload(){
	for(i=0;i<arguments.length;i++){
		var isVid = false;
		for(h=0;h<seriesJSON.vids.length;h++){
			if(arguments[i] == seriesJSON.vids[h]){
				isVid = true;
				break;
			}
		}
		if(!isVid){
			imgs.push((new Image()).src = (seriesJSON.folder + arguments[i] + '.png'));
		}
		console.log("loaded " + arguments[i]);
	}
	imgs.push((new Image()).src = "end.png");
	imgs.push((new Image()).src = "tbc.png");
	
	if(imgs.length > 4){
		for(i=0;i < (imgs.length - 4);i++){
			imgs.shift();
		}
	}
}

function init(){
	console.log("initializing...")
	seriesJSON = seriesInfo[parseInt(getParameterByName("series"))];
	document.title = seriesJSON.sTitle;
	document.getElementById("idHeader").innerHTML = seriesJSON.title;
	document.getElementById("idSub").innerHTML = "1/" + seriesJSON.last;
	document.getElementById("idSelector").value = seriesJSON.sNum;
	setImage(parseFloat(getParameterByName("num")));
}

function getParameterByName(name) {
    url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
