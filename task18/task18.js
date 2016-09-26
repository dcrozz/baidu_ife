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
function queueOperate(){
	num = document.getElementById("num").value;
	leftin:function(num){
		array.shift(num);
		render();
	}
	rightin:function(num){
		array.push(num);
		render();
	}
	leftout: function(){
		if(array.length<=0){
			alert('please input a number');
		}else{
			array.unshift(0);
		}
		render();
	}
	rightout:function(){
		if(arrya.length<=0){
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
	array.forEach(function(x,index,a){
		str += "<div style='height:20px;width:60px;background:#fc625d;'>" + x +"</div>";


	});
}
