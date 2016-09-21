function changeText(){
	n = document.getElementsByClassName("js_message_plain ng-binding").length;
	if(	document.getElementsByClassName("js_message_plain ng-binding")[n-1].innerText == 'バカ')
	{
		document.getElementsByClassName("js_message_plain ng-binding")[n-1].innerText = '喜欢你❤️';
	}
}
setInterval(changeText,1000);
