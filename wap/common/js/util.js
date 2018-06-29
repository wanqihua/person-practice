
/**
 * PC版通用Util类
 * 使用前加载jQuery插件
 */

$(function(){
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
	document.documentElement.style.height = document.documentElement.clientHeight + 'px';
});
 
var goldP = {

}

goldP.attr = {
	userAgent : "",
	STOCK : new Object(),
	loadMethod : "aliyunAPI.jsp",
	localMethod : "data_provider.jsp",
	mPicNoData : '<div style="width:100%; height:250px;">' +
		'<div style="width:50px; margin: 0 auto; padding-top:94px; font-size: 12px; color: #999999; text-align: center;">' +
		'<img alt="暂无数据" src="../../common/images/picNoData.png" width="50px" height="50px">' +
		'<span>暂无数据</span>' +
		'</div>' +
		'</div>',
	mWordNoData : '<div style="height:50px; line-height:50px; text-align:center; color: #999999;">暂无数据<div>',
	pPicNoData : '<div style="margin:0 auto; width: 100px; margin-top: 86.5px;">' +
		'<img alt="暂无数据" src="../../common/images/picNoData.png" style="width: 80px; height: 80px;">' +
		'<div style="width:80px; text-align:center">暂无数据</div>' +
		'</div>'
}

goldP.utils = {
	STOCK : function() {
		//股票列表
		$.ajax({
			url : "../../../data/" + this.loadMethod,
			async : false,
			data : {
				"page" : "stock_data",
				"sd" : "sd"
			},
			dataType : "text",
			success : function(data, status) {
				STOCK = eval(data);
				this.STOCK = STOCK;
			}
		});
	},
	getDecimal : function(x, isInt) {
		//精确2位小数点,不够位自动补0
		var f = parseFloat(x);
		if (isNaN(f)) {
			return null;
		}
		var f = Math.round(x * 100) / 100;
		var s = f.toString();
		var rs = s.indexOf('.');
		if (rs < 0) {
			rs = s.length;
			s += '.';
		}
		while (s.length <= rs + 2) {
			s += '0';
		}
		if (isInt != undefined && isInt == 0) {
			return parseFloat(s);
		}
		return s;
	},
	getUserAgent : function() {
		//浏览器信息
		var userAgentInfo = navigator.userAgent;
		this.userAgent = userAgentInfo;
		var Agents = [ "Android", "iPhone",
			"SymbianOS", "Windows Phone",
			"iPad", "iPod" ];
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	},
	loadCSS : function(url) {
		$('head').append('<link text="text/css" href="' + url + '" rel="Stylesheet" />');
	},
	loadJS : function(url) {
		$('head').append('<script text="text/javascript" language="JavaScript" src="' + url + '?' + (new Date()).getTime() + '"></script>');
	},
	/**
	 * 
	 * @param str	原始字符
	 * @param fix	字符后缀
	 * @param rep	指定特殊字符用于替换-
	 * @returns {String}
	 */
	isEmpty : function(str, fix, rep) {
		//判断字符是否为空，如果为空，则默认返回 "-",也可指定特殊字符
		if (rep == undefined) {
			rep = "-";
		}
		if (fix == undefined) {
			fix = "";
		}
		if (str != undefined && str != null && str.trim() != "") {
			return str + fix;
		} else {
			return rep;
		}
	},
	//判断数组是否为null或者为undefined或者长度为0
	isExistArr : function(arr) {
		if (arr != undefined && arr != null && arr != "" && arr.length != 0) {
			return true;
		} else {
			return false;
		}
	},
	//处理明星分析师荐股的重复数据
	handleStarRepeatByTitle : function(data) {
		if (this.isExistArr(data)) {
			var titles = new Array();
			var handleData = new Array();
			var isExist = false;

			for (var i = 0; i < data.length; i++) {
				var title = data[i].Title
				for (var j = 0; j < titles.length; j++) {
					if (titles[j] == title) {
						isExist = true;
					}
				}
				//添加
				if (!isExist) {
					handleData.push(data[i]);
					titles.push(title);
				}
			}
			return handleData;

		} else {
			return new Array();
		}
	},
	/**
	 * 获取url参数
	 * @param name	参数名
	 * @returns
	 */
	getUrlParamer : function(name) {
		try {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)
				return unescape(r[2]);
			return null;
		} catch (e) {
			return null;
		}
	},
	/**
	 * 获取 Head中的Title元素
	 */
	getEleForTitle : function() {
		return document.getElementsByName("title");
	},
	getCookie : function(name) {
		var arr,
			reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	},
	//Base64解密
	decodeBase64 : function(str) {
		var base = new Base64();
		if (str != "" && str != null) {
			return base.decode(str);
		} else {
			return "";
		}
	},
	//JSON字符串转换为JSON对象
	json2Obj : function(json) {
		try {
			var obj = JSON.parse(json);
			return obj
		} catch (e) {
			return json;
		}
	},
	//将字符串转换为Obj对象并添加TKN字段
	addTKN2Param : function(param) {
		var obj = goldP.utils.json2Obj(param);
		obj.tkn = goldP.utils.getUrlParamer("tkn");
		return obj;
	},
	//自带window.open在很多情况下会被浏览器阻止
	windowOpen : function(url) {
		var a = document.createElement("a");
		a.setAttribute("href", url);
		a.setAttribute("target", "_blank");
		a.setAttribute("id", "WO" + (new Date()).getTime());
		document.body.appendChild(a);
		a.click();
	},
	//给链接添加通用参数
	addParaURL : function(url) {
		var link = "";
		if (url.indexOf("?") != -1) {
			//含有?
			link = url + "&UA=" + goldP.utils.getUrlParamer("UA") + "&tkn=" + goldP.attr.tkn;
		} else {
			link = url + "?UA=" + goldP.utils.getUrlParamer("UA") + "&tkn=" + goldP.attr.tkn;
		}
		return link;
	},
	//账户类的链接添加UA通用参数
	addParaURLA : function(url) {
		var link = "";
		if (url.indexOf("?") != -1) {
			//含有?
			link = url + "&UA=" + goldP.utils.getUrlParamer("UA");
		} else {
			link = url + "?UA=" + goldP.utils.getUrlParamer("UA");
		}
		return link;
	},
	//分析诊断的面切换事件
	handleStockCut : function(lastId, curId) {
		var link = location.href;
		var type = "";
		if (link.indexOf("stockDiagnose") != -1) {
			type = "STOCK";
		} else if (link.indexOf("industryDiagnose") != -1) {
			type = "INDUSTRY";
		}
		//原则，先记录出，再记录进，因为Key会改变
		sendDiagnoseCut(type, lastId, "leave", 0);
		sendDiagnoseCut(type, curId, "access", 0);
	},
	//分析智能换股切换事件
	handleSmartStockCut : function(lastId, curId) {
		var type = "SMART";
		sendDiagnoseCut(type, lastId, "leave", 0);
		sendDiagnoseCut(type, curId, "access", 0);
	},
	//设置title
	setTitle : function(title) {
		document.title = title;
	},
	//过滤页面链接
	filterURL : function(url) {
		if (url.indexOf("?") != -1) {
			return url.split("?")[0];
		} else {
			return url;
		}
	},
	//是否为手机页面
	isMobile : function() {
		var userAgentInfo = navigator.userAgent;
		var Agents = [ "Android", "iPhone",
			"SymbianOS", "Windows Phone",
			"iPad", "iPod" ];
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		if (!flag) {
			return true;
		} else {
			return false;
		}
	},
	mPicNoData : function(word, width, left) {
		var extra = "";
		if (word != undefined) {
			extra = 'display: block; margin-bottom: 15px;';
		}

		word = word == undefined ? "暂无数据" : word;
		width = width == undefined ? 50 : width;
		left = left == undefined ? 0 : left;

		var info = '<div style="width:100%; height:250px;">' +
			'<div style="width:' + width + 'px; margin: 0 auto; padding-top:94px; font-size: 12px; color: #999999; text-align: center;">' +
			'<img alt="暂无数据" src="../../images/picNoData.png" width="50px" height="50px" style="' + extra + ' margin-left:' + left + 'px">' +
			'<span>' + word + '</span>' +
			'</div>' +
			'</div>';
		return info;
	},
	//判断是否支持本地存储
	isSupportLocalStorage : function() {
		if (window.localStorage) {
			return true;
		} else {
			return false;
		}
	},
	//获取键值 -JQ
	getStorageItem : function(name) {
		return window.localStorage.getItem(name);
	},
	setStorageItem : function(name, value) {
		window.localStorage.setItem(name, value);
	},
	removeStorageItem : function(name) {
		window.localStorage.removeItem(name);
	},
	//清除所有（慎用）
	clearStorageItem : function() {
		window.localStorage.clear();
	},
	/**
	 * 数据加载提示 -- 使用前请导入WEUI
	 * id 用于区分不同的加载 
	 * tips 自定义提示信息
	 */
	loading : function(id, tips) {
		if (tips == undefined || tips == null || tips == "") {
			tips = "数据加载中..."
		}
		//添加对应的div
		var loadInfo = ' <div id="loadingToast' + id + '">' +
			'<div class="weui-mask_transparent"></div>' +
			'<div class="weui-toast">' +
			'<i class="weui-loading weui-icon_toast"></i>' +
			'<p class="weui-toast__content">' + tips + '</p>' +
			' </div>' +
			' </div>';
		$("body").append(loadInfo);
	},
	loadingStop : function(id) {
		var $loadingToast = $('#loadingToast' + id);
		$loadingToast.fadeOut(100);
		$loadingToast.remove();
	},
	/**
	 * 时间字符串转换
	 * str 待转换的时间格式
	 * orignal 原始字符串时间格式
	 * newStr 新转换的时间格式
	 */
	timeToDate : function(str, orignal, newStr) {
		if (orignal == null || orignal == "") {
			orignal = "yyyy-MM-dd HH:mm:ss";
		}
		if (newStr == null || newStr == "") {
			newStr = "yyyy-MM-dd";
		}
		if (str != undefined && str != null && str != "") {
			var sdf = new DateFormat(orignal);
			var d1 = sdf.parse(str);
			sdf = new DateFormat(newStr);
			str = sdf.format(d1);
			return str;
		} else {
			return str;
		}
	},
	/**
	 * 弹出框  -- 使用前请导入WEUI
	 * title 弹出框标题
	 * content 弹出框内容
	 * okFun 点击ok回调方法
	 * cancelFun 点击取消方法
	 * okMessage 确认文字，默认确定
	 * cancelMessage 取消文字，默认取消
	 */
	alert: function(title, content,okFun,okMessage){
		var id = (new Date()).getTime().toString();
		if(okMessage == undefined){
			okMessage = "确认";
		}
		var divInfo = '<div class="js_dialog" id="weui-alert-' + id +'" style="display: none;">'+
									'<div class="weui-mask"></div>'+
									'<div class="weui-dialog">'+
										'<div class="weui-dialog__hd"><strong class="weui-dialog__title">' + title +'</strong></div>'+
										'<div class="weui-dialog__bd">'+
											content +
										'</div>'+
										'<div class="weui-dialog__ft weui-alert-cancle weui-alert-cancle-' + id +'">'+
											'<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">' + okMessage +'</a>'+
										'</div>'+
									'</div>'+
								'</div>';
		$("body").append(divInfo);
		$("#weui-alert-" + id).fadeIn(500);
		//点击取消后隐藏
		$(".weui-alert-cancle-" + id).click(function(){
			$("#weui-alert-" + id).fadeOut(500);
			window.setTimeout(function() {
				$("#weui-alert-" + id).remove();
			}, 600)
			if(okFun != undefined){
				okFun();
			}
		})
	},

	//最大宽度为300px
	alert2: function(title, content,okFun,okMessage){
		var id = (new Date()).getTime().toString();
		if(okMessage == undefined){
			okMessage = "确认";
		}
		var divInfo = '<div class="js_dialog" id="weui-alert2-' + id +'" style="display: none;">'+
									'<div class="weui-mask"></div>'+
									'<div class="weui-dialog weui-alert2-dialog">'+
										'<div class="weui-dialog__hd"><strong class="weui-dialog__title">' + title +'</strong></div>'+
										'<div class="weui-dialog__bd" style="text-align:center;">'+
											content +
										'</div>'+
										'<div class="weui-dialog__ft weui-alert2-ok weui-alert2-ok-' + id +'">'+
											'<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary weui-alert2-ok-btn">' + okMessage +'</a>'+
										'</div>'+
									'</div>'+
								'</div>';
		$("body").append(divInfo);
		$("#weui-alert2-" + id).fadeIn(500);
		//点击取消后隐藏
		$(".weui-alert2-ok-" + id).click(function(){
			$("#weui-alert2-" + id).fadeOut(500);
			window.setTimeout(function() {
				$("#weui-alert2-" + id).remove();
			}, 600);
			if(okFun != undefined){
				okFun();
			}
		})
	},
	/**
	 * 弹出确认框  -- 使用前请导入WEUI
	 * title 弹出框标题
	 * content 弹出框内容
	 * okFun 点击ok方法
	 * okMessage 确认文字，默认确定
	 * cancelMessage 取消文字，默认取消
	 */
	confirm: function(title, content, okFun,okMessage, cancelMessage){
		var id = (new Date()).getTime().toString();
		if(okMessage == undefined){
			okMessage = "确认";
		}
		if(cancelMessage == undefined){
			cancelMessage = "取消";
		}
		var divInfo = '<div class="js_dialog weui-confirm" id="weui-confirm-' + id +'" style="display: none;">'+
										'<div class="weui-mask"></div>'+
										'<div class="weui-dialog weui-confirm-dialog">'+
											'<div class="weui-dialog__hd weui-confirm-dialog_hd">'+
												'<strong class="weui-dialog__title">' + title +'</strong>'+
											'</div>'+
											'<div class="weui-dialog__bd"  style="text-align:center;">' + content +'</div>'+
											'<div class="weui-dialog__ft weui-confirm-btn">'+
												'<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary weui-confirm-cancel" id="weui-confirm-cancel-' + id +'">' + cancelMessage +'</a>'+
												'<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default  weui-confirm-ok" id="weui-confirm-ok-' + id +'">'+ okMessage +'</a>'+
											'</div>'+
										'</div>'+
									'</div>';
		$("body").append(divInfo);
		$("#weui-confirm-" + id).fadeIn(500);
		//隐藏方法
		function hideConfirm(){
			$("#weui-confirm-" + id).fadeOut(500);
			window.setTimeout(function() {
				$("#weui-confirm-" + id).remove();
			}, 600)
		}
		//点击取消后隐藏
		$("#weui-confirm-cancel-" + id).click(function(){
			hideConfirm();
		});
		//点击确认后
		$("#weui-confirm-ok-" + id).click(function(){
			hideConfirm();
			if(okFun != undefined){
				okFun("weui-confirm-" + id);
			}else{
				//不传递方法，则隐藏
				hideConfirm();
			}
		})
	},
	/**
	 * actionSheet -- 使用前请导入WEUI
	 * option 选项,参考格式["短期0-1", "中期1-3", "长期3年以上"]
	 * value 选项对应的value值
	 * okFun 选中值的回调方法
	 * cancelMessage 取消按钮问题，默认取消
	 * 
	 */
	actionsheet: function(option, value, okFun, cancelMessage){
		var id = (new Date()).getTime().toString();
		if(cancelMessage == undefined){
			cancelMessage = "取消";
		}
		//选项
		try {
			var optionStr = "";
			for(var i=0; i < option.length; i++){
				var val = "";
				if(value != undefined){
					val = value[i];
				}
				optionStr += '<div class="weui-actionsheet__cell iv_action_sheet_option" iv-data = "' + val +'">' + option[i] +'</div>';
			}
		} catch (e) {
			console.log(e);
		}
		var divInfo = '<div class="weui-mask" id="weui-mask-' + id +'" style="display: none"></div>'+
							    '<div class="weui-actionsheet" id="weui-actionsheet-' + id +'">'+
							        '<div class="weui-actionsheet__menu">'+
							        	optionStr +
							        '</div>'+
							        '<div class="weui-actionsheet__action">'+
							            '<div class="weui-actionsheet__cell actionsheet_cancel" id="weui-actionsheet-cancel-' + id +'">' + cancelMessage +'</div>'+
							        '</div>'+
							    '</div>';
		$("body").append(divInfo);
		$("#weui-actionsheet-" + id).addClass("weui-actionsheet_toggle");
		$("#weui-mask-" + id).fadeIn(200);
		//定义隐藏方法
		function hideActionSheet(){
			$("#weui-actionsheet-" + id).removeClass("weui-actionsheet_toggle");
			$("#weui-mask-" + id).fadeOut(500);
			window.setTimeout(function() {
				$("#weui-actionsheet-" + id).remove();
				$("#weui-mask-" + id).remove();
			}, 600);
		}
		//点击取消后隐藏
		$("#weui-actionsheet-cancel-" + id).click(function(){
			hideActionSheet();
		});
		//点击遮罩后隐藏
		$("#weui-mask-" + id).click(function(){
			hideActionSheet()
		});
		//点击选项后
		$("#weui-actionsheet-" + id + " .weui-actionsheet__menu .weui-actionsheet__cell").click(function(){
			var index = $(this).index();
			var text = $(this).text();
			var val = $(this).attr("iv-data");
			if(okFun != undefined){
				hideActionSheet();
				okFun(text, val, index);
			}else{
				hideActionSheet();
			}
		})
	}
	
}


/**
 * 将数字转换为货币格式
 *  Default usage and custom precision/symbol :
    var revenue = 12345678; alert(revenue.formatMoney()); // $12,345,678.00 alert(revenue.formatMoney(0, "HK$ ")); // HK$ 12,345,678
    // European formatting:
    var price = 4999.99;alert(price.formatMoney(2, "€", ".", ",")); // €4.999,99
    // It works for negative values, too:
    alert((-500000).formatMoney(0, "£ ")); // £ -500,000
 */
Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var number = this,
		negative = number < 0 ? "-" : "",
		i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
		j = (j = i.length) > 3 ? j % 3 : 0;
	return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};

/**
 * 字符串操作
 */
//清除两边的空格
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, '');
};


/**
 * 判断访问设备是否为PC
 * @returns {Boolean}
 */
function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = [ "Android", "iPhone",
		"SymbianOS", "Windows Phone",
		"iPad", "iPod" ];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

/* 手机滑动事件*/
//返回角度
function GetSlideAngle(dx, dy) {
	return Math.atan2(dy, dx) * 180 / Math.PI;
}
//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动 
function GetSlideDirection(startX, startY, endX, endY) {
	var dy = startY - endY;
	var dx = endX - startX;
	var result = 0;
	//如果滑动距离太短  
	if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
		return result;
	}
	var angle = GetSlideAngle(dx, dy);
	if (angle >= -45 && angle < 45) {
		result = 4;
	} else if (angle >= 45 && angle < 135) {
		result = 1;
	} else if (angle >= -135 && angle < -45) {
		result = 2;
	} else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
		result = 3;
	}
	return result;
}


/**
 *--------------------------------------------------------
patterns
y : Year         ex. "yyyy" -> "2007", "yy" -> "07"
M : Month        ex. "MM" -> "05" "12", "M" -> "5" "12"
d : Day          ex. "dd" -> "09" "30", "d" -> "9" "30"
H : Hour (0-23)  ex. "HH" -> "00" "23", "H" -> "0" "23"
m : Minute       ex. "mm" -> "01" "59", "m" -> "1" "59"
s : Second       ex. "ss" -> "00" "59", "H" -> "0" "59"
S : Millisecond  ex. "SSS" -> "000" "012" "999", 
                     "SS" -> "00" "12" "999", "S" -> "0" "12" "999"
Text can be quoted using single quotes (') to avoid interpretation.
"''" represents a single quote. 
Using..
 var fmt = new DateFormat("yyyy/MM/dd HH:mm:ss SSS");
 var str = fmt.format(new Date()); // "2007/05/10 12:21:19 002"
 var date = fmt.parse("2007/05/10 12:21:19 002"); // return Date object
 */
var DateFormat = function(pattern) {
	this._init(pattern);
};
DateFormat.prototype = {
	_init : function(pattern) {
		this.pattern = pattern;
		this._patterns = [];
		for (var i = 0; i < pattern.length; i++) {
			var ch = pattern.charAt(i);
			if (this._patterns.length == 0) {
				this._patterns[0] = ch;
			} else {
				var index = this._patterns.length - 1;
				if (this._patterns[index].charAt(0) == "'") {
					if (this._patterns[index].length == 1
						|| this._patterns[index].charAt(this._patterns[index].length - 1) != "'") {
						this._patterns[index] += ch;
					} else {
						this._patterns[index + 1] = ch;
					}
				} else if (this._patterns[index].charAt(0) == ch) {
					this._patterns[index] += ch;
				} else {
					this._patterns[index + 1] = ch;
				}
			}
		}
	},
	format : function(date) {
		var result = [];
		for (var i = 0; i < this._patterns.length; i++) {
			result[i] = this._formatWord(date, this._patterns[i]);
		}
		return result.join('');
	},
	_formatWord : function(date, pattern) {
		var formatter = this._formatter[pattern.charAt(0)];
		if (formatter) {
			return formatter.apply(this, [ date, pattern ]);
		} else {
			return pattern;
		}
	},
	_formatter : {
		"y" : function(date, pattern) {
			// Year
			var year = String(date.getFullYear());
			if (pattern.length <= 2) {
				year = year.substring(2, 4);
			} else {
				year = this._zeroPadding(year, pattern.length);
			}
			return year;
		},
		"M" : function(date, pattern) {
			// Month in year
			return this._zeroPadding(String(date.getMonth() + 1), pattern.length);
		},
		"d" : function(date, pattern) {
			// Day in month
			return this._zeroPadding(String(date.getDate()), pattern.length);
		},
		"H" : function(date, pattern) {
			// Hour in day (0-23)
			return this._zeroPadding(String(date.getHours()), pattern.length);
		},
		"m" : function(date, pattern) {
			// Minute in hour
			return this._zeroPadding(String(date.getMinutes()), pattern.length);
		},
		"s" : function(date, pattern) {
			// Second in minute
			return this._zeroPadding(String(date.getSeconds()), pattern.length);
		},
		"S" : function(date, pattern) {
			// Millisecond
			return this._zeroPadding(String(date.getMilliseconds()), pattern.length);
		},
		"'" : function(date, pattern) {
			// escape
			if (pattern == "''") {
				return "'";
			} else {
				return pattern.replace(/'/g, '');
			}
		}
	},
	_zeroPadding : function(str, length) {
		if (str.length >= length) {
			return str;
		}
		return new Array(length - str.length + 1).join("0") + str;
	},
	/// Parser ///
	parse : function(text) {
		if (typeof text != 'string' || text == '') return null;
		var result = {
			year : 1970,
			month : 1,
			day : 1,
			hour : 0,
			min : 0,
			sec : 0,
			msec : 0
		};

		for (var i = 0; i < this._patterns.length; i++) {
			if (text == '') return null; // parse error!!
			text = this._parseWord(text, this._patterns[i], result);
			if (text === null) return null; // parse error!!
		}
		if (text != '') return null; // parse error!!

		return new Date(
			result.year,
			result.month - 1,
			result.day,
			result.hour,
			result.min,
			result.sec,
			result.msec);
	},
	_parseWord : function(text, pattern, result) {

		var parser = this._parser[pattern.charAt(0)];
		if (parser) {
			return parser.apply(this, [ text, pattern, result ]);
		} else {
			if (text.indexOf(pattern) != 0) {
				return null;
			} else {
				return text.substring(pattern.length);
			}
		}
	},
	_parser : {
		"y" : function(text, pattern, result) {
			// Year
			var year;
			if (pattern.length <= 2) {
				year = text.substring(0, 2);
				year = year < 70 ? '20' + year : '19' + year;
				text = text.substring(2);
			} else {
				var length = (pattern.length == 3) ? 4 : pattern.length;
				year = text.substring(0, length);
				text = text.substring(length);
			}
			if (!this._isNumber(year)) return null; // error
			result.year = parseInt(year, 10);
			return text;
		},
		"M" : function(text, pattern, result) {
			// Month in year
			var month;
			if (pattern.length == 1 && text.length > 1
				&& text.substring(0, 2).match(/1[0-2]/) != null) {
				month = text.substring(0, 2);
				text = text.substring(2);
			} else {
				month = text.substring(0, pattern.length);
				text = text.substring(pattern.length);
			}
			if (!this._isNumber(month)) return null; // error
			result.month = parseInt(month, 10);
			return text;
		},
		"d" : function(text, pattern, result) {
			// Day in month
			var day;
			if (pattern.length == 1 && text.length > 1
				&& text.substring(0, 2).match(/1[0-9]|2[0-9]|3[0-1]/) != null) {
				day = text.substring(0, 2);
				text = text.substring(2);
			} else {
				day = text.substring(0, pattern.length);
				text = text.substring(pattern.length);
			}
			if (!this._isNumber(day)) return null; // error
			result.day = parseInt(day, 10);
			return text;
		},
		"H" : function(text, pattern, result) {
			// Hour in day (0-23)
			var hour;
			if (pattern.length == 1 && text.length > 1
				&& text.substring(0, 2).match(/1[0-9]|2[0-3]/) != null) {
				hour = text.substring(0, 2);
				text = text.substring(2);
			} else {
				hour = text.substring(0, pattern.length);
				text = text.substring(pattern.length);
			}
			if (!this._isNumber(hour)) return null; // error
			result.hour = parseInt(hour, 10);
			return text;
		},
		"m" : function(text, pattern, result) {
			// Minute in hour
			var min;
			if (pattern.length == 1 && text.length > 1
				&& text.substring(0, 2).match(/[1-5][0-9]/) != null) {
				min = text.substring(0, 2);
				text = text.substring(2);
			} else {
				min = text.substring(0, pattern.length);
				text = text.substring(pattern.length);
			}
			if (!this._isNumber(min)) return null; // error
			result.min = parseInt(min, 10);
			return text;
		},
		"s" : function(text, pattern, result) {
			// Second in minute
			var sec;
			if (pattern.length == 1 && text.length > 1
				&& text.substring(0, 2).match(/[1-5][0-9]/) != null) {
				sec = text.substring(0, 2);
				text = text.substring(2);
			} else {
				sec = text.substring(0, pattern.length);
				text = text.substring(pattern.length);
			}
			if (!this._isNumber(sec)) return null; // error
			result.sec = parseInt(sec, 10);
			return text;
		},
		"S" : function(text, pattern, result) {
			// Millimsecond
			var msec;
			if (pattern.length == 1 || pattern.length == 2) {
				if (text.length > 2 && text.substring(0, 3).match(/[1-9][0-9][0-9]/) != null) {
					msec = text.substring(0, 3);
					text = text.substring(3);
				} else if (text.length > 1 && text.substring(0, 2).match(/[1-9][0-9]/) != null) {
					msec = text.substring(0, 2);
					text = text.substring(2);
				} else {
					msec = text.substring(0, pattern.length);
					text = text.substring(pattern.length);
				}
			} else {
				msec = text.substring(0, pattern.length);
				text = text.substring(pattern.length);
			}
			if (!this._isNumber(msec)) return null; // error
			result.msec = parseInt(msec, 10);
			return text;
		},
		"'" : function(text, pattern, result) {
			// escape
			if (pattern == "''") {
				pattern = "'";
			} else {
				pattern = pattern.replace(/'/g, '');
			}
			if (text.indexOf(pattern) != 0) {
				return null; // error
			} else {
				return text.substring(pattern.length);
			}
		}
	},
	_isNumber : function(str) {
		return /^[0-9]*$/.test(str);
	}
}