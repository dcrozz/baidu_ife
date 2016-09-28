function addEventHandler(element,event,listener){
	if(element.addEventListener){
		element.addEventListener(event,listener,false);//false is waiting for comment
	}
	else if (element.attachEvent){
		element.attachEvent("on" + event,listener);
	}
	else{
		element["on" + event] = listener;
	}
};
array = [];
function textToArray(){
	var text = document.getElementById("text").value.trim();
	array = text.split(' ');
}
function render(){
	var container = document.getElementById("container");
	var str = '';
	array.forEach(function(x,index,array){
		str += "<div class='array'>" + x +"</div>";
	});
	container.innerHTML = str;
}

function initArray(){
	textToArray();
	render();
}
function initSearch(){
	var before = document.getElementById("container").innerHTML;
	var str = document.getElementById("search_text").value;
	document.getElementById("container").innerHTML = before.replace(new RegExp(str,"g"),"<span class='highlight'>" + str + "</span>");
}
var insert = document.getElementById("insert");
var search = document.getElementById("search");
addEventHandler(insert,'click',initArray);
addEventHandler(search,'click',initSearch);

