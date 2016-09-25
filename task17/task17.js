/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
              '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
	nowSelectCity: "北京",
	nowGraTime: "day"
}

//跨浏览器事件绑定
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}

var formGraTime = document.getElementById("form-gra-time");
var citySelect = document.getElementById("city-select");
var aqiChartWrap = document.getElementsByClassName("aqi-chart-wrap")[0];
/**
 * 渲染图表
 */
function renderChart() {
	text = '';
	for (var item in chartData[pageState.nowSelectCity]){
		text += "<div title='"+item+"' style='height:" + chartData[pageState.nowSelectCity][item] +"px;background:"+colors[Math.floor(Math.random()*11)]+";width:30px;'></div>"
	}
	aqiChartWrap.innerHTML = text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
	if(pageState.nowGraTime == this.value){
		return;
	}
	else{
		pageState.nowGraTime = this.value;
	}
  // 设置对应数据
	initAqiChartData();
  // 调用图表渲染函数
	renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
	if(pageState.nowSelectCity == this.value){
		return;
	}else{
		pageState.nowSelectCity = this.value;
	}
  // 设置对应数据
	initAqiChartData();
  // 调用图表渲染函数
	renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var pageRadio = document.getElementsByTagName("input");
	for( var i = 0; i< pageRadio.length; i++ ){
		addEventHandler(pageRadio[i],'click',graTimeChange);
	}
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	var cityList = '';
	for (var item in aqiSourceData){
		cityList += "<option>" + item + "</option>";
	}
	citySelect.innerHTML = cityList;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
	addEventHandler(citySelect,'change',citySelectChange);

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
	if(pageState.nowGraTime == 'day') { chartData = aqiSourceData;}
	else if (pageState.nowGraTime == 'week'){
		new_data = {};
		for (var item in aqiSourceData){
			//all_count用来确保最后不到7天那周不会丢失
			//要算周平均 否则会height值会过大
			weeks = {};
			count = 0;
			sum = 0;
			i = 0;
			all_count = 0;
			for (var day in aqiSourceData[item]){
				count++;
				all_count++;
				sum += aqiSourceData[item][day];
				if(count==7){
					weeks[i] = Math.floor(sum/count);
					count = 0;
					sum = 0;
					i++;
				}
				if(all_count == aqiSourceData[item].length){
					weeks[i+1]= Math.floor(sum/count);
				}
			}
			new_data[item] = weeks;
		}
		chartData =  new_data;
	}
	else if (pageState.nowGraTime == 'month'){
		new_data = {};
		for (var item in aqiSourceData){
			month={};
			count={};
			for ( var day in aqiSourceData[item] ){
				now_month = day.split('-')[1];
				if( month[now_month]!=undefined )
				{
					month[now_month] += aqiSourceData[item][day];
					count[now_month] ++;
				}
				else{
					month[now_month] = 0;
					count[now_month] = 0;
				}
			}
			for (var itm in month){
				month[itm] = Math.floor(month[itm]/count[itm]);
			}
			new_data[item] = month;
		}
		chartData =  new_data;
	}
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();
