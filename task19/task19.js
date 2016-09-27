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
array = [10,20,30,40,50];
var queue = {
	leftin:function(){
		var num = +document.getElementById("num").value;
		if( num<10 && num > 100){
			alert('please input a number between 10 to 100');
		}
		array.unshift(num);
		render();
	},
	rightin:function(){
		var num = document.getElementById("num").value;
		if( num<10 && num > 100){
			alert('please input a number between 10 to 100');
		}
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

function bubble_sort(){
	var i = array.length;
	timer = setInterval(function(){
			// if(i==array.length-1){
			//     clearInterval(timer);
			// }
			for(var j=0;j<i;j++){
				if(array[j]<array[j+1]){
					tmp = array[j];
					array[j] = array[j+1];
					array[j+1] = tmp;
				}
			}
			render();
			i--;
		},1000);
	return timer;
}
function render(){
	var container = document.getElementById("container");
	var str = '';
	array.forEach(function(x,index,array){
		str += "<div class='array' style='height:" + x +"px'></div>";
	});
	container.innerHTML = str;
}
var left_in = document.getElementById("left_in");
var right_in = document.getElementById("right_in");
var left_out = document.getElementById("left_out");
var right_out = document.getElementById("right_out");
var sort_btn = document.getElementById("sort");
addEventHandler(left_in,'click',queue.leftin);
addEventHandler(right_in,'click',queue.rightin);
addEventHandler(left_out,'click',queue.leftout);
addEventHandler(right_out,'click',queue.rightout);
addEventHandler(sort_btn,'click',bubble_sort);
