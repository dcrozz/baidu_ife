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
array = new Array();
var queue = {
	leftin:function(){
		var num = document.getElementById("num").value;
		array.unshift(num);
		render();
	},
	rightin:function(){
		var num = document.getElementById("num").value;
		array.push(num);
		render();
	},
	leftout: function(){
		if(array.length<=0){
			alert('please input a number');
		}else{
			array.shift();
		}
		render();
	},
	rightout:function(){
		if(array.length<=0){
			alert('please input a number');
		}else{
			array.pop();
		}
		render();
	}
}

function render(){
	var container = document.getElementById("container");
	var str = '';
	array.forEach(function(x,index,array){
		str += "<div class='array'>" + x +"</div>";
	});
	container.innerHTML = str;
}
var left_in = document.getElementById("left_in");
var right_in = document.getElementById("right_in");
var left_out = document.getElementById("left_out");
var right_out = document.getElementById("right_out");
addEventHandler(left_in,'click',queue.leftin);
addEventHandler(right_in,'click',queue.rightin);
addEventHandler(left_out,'click',queue.leftout);
addEventHandler(right_out,'click',queue.rightout);
