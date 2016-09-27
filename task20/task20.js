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
function textToArray(){
	var text = document.getElementById("text").value;
	var array = text.split(' ');
	return array
}
function render(array){
	var container = document.getElementById("container");
	var str = '';
	array.forEach(function(x,index,array){
		str += "<div class='array'>" + x +"</div>";
	});
	container.innerHTML = str;
}
function initArray(){
	var array = textToArray();
	render(array);
}
// function initSearch(){
//     var searchText = document.getElementById("search_text").value;
// }
var insert = document.getElementById("insert");
var search = document.getElementById("search");
addEventHandler(insert,'click',initArray);

