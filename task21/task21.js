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
	var text = document.getElementById("fav").value.trim();
	array = text.split(' ');
}
function render(){
	var container = document.getElementById("container2");
	var str = '';
	array.forEach(function(x,index,array){
		str += "<div class='array'>" + x +"</div>";
	})
	container.innerHTML = str;
}

function initArray(){
	textToArray();
	render();
}
var addFav = document.getElementById("add");
addEventHandler(addFav,'click',initArray);

