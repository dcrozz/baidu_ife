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

var formGraTime = document.getElementById("form-gra-time");
var citySelect = document.getElementById("city-select");
var aqiChartWrap = document.getElementsByClassName("aqi-chart-wrap")[0];
/**
 * 渲染图表
 */
function renderChart() {
	text = '';
	for (var item in aqiSourceData){
		text += "<div title='"+aqiSourceData[pageState.nowSelectCity]+"' style={height:" + aqiSourceData[nowSelectCity][item] +";color:{"+colors[Math.random()*11]+"}"}
	aqiChartWrap.innerHTML = text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
	if(pageState.nowGratime == 'day') {return aqiSourceData;}
	else if (pageState.nowGratime == 'week'){
		new_data = {};
		for (var item in aqiSourceData){
			//all_count用来确保最后不到7天那周不会丢失
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
					weeks[i] = sum;
					count = 0;
					sum = 0;
					i++;
				}
				if(all_count == aqiSourceData[item].length){
					weeks[i+1]= sum;
				}
			}
			new_data[item] = weeks;
		}
		return new_data;
	}
	else if (pageState.nowGratime == 'month'){
		new_data = {};
		for (var item in aqiSourceData){
			month={};
			for ( var day in aqiSourceData[item] ){
				now_month = day.split('-')[1];
				if( month[now_month]!=undefined )
				{
					month[now_month] += aqiSourceData[item][day];
				}
				else{
					month[now_month] = 0;
				}
			}
			new_data[item] = month;
		}
		return new_data;
	}
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  chartData = initAqiChartData();
  renderChart();
}

init();
