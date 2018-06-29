/**
 *  工具类模块
 *  Tips: 加载前请引用jQuery 
 */
//初始化字体大小
$(function(){
	// document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
	// document.documentElement.style.height = document.documentElement.clientHeight + 'px';
});

var invest = {

}

//属性值
invest.attr = {
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
			'</div>',
		//屏幕分辨率宽
		screenWidth: window.screen.width,
		//屏幕分辨率高
		screenHeight:  window.screen.height,
		//网页可见宽
		bodyWidth: document.body.clientWidth,
		//网页可见高
		bodyHeight: document.body.clientHeight,
		//暂无数据项（图片版本 - 2017.10.26）
		noData: '<div style="width:100%; height:200px;">' +
				'<div style="width:50px; margin: 0 auto; padding-top:15%; font-size: 12px; color: #999999; text-align: center;">' +
				'<img alt="暂无数据" src="../../common/images/picNoData.png" width="50px" height="50px">' +
				'<span>暂无数据</span>' +
				'</div>' +
		'</div>',
		
}

invest.func = {
		/**
		 * 保留小数
		 * num 原始数据
		 * isInt 是否保留为整数，不保留为整数补齐0（默认为0）
		 * point 小数点位数（默认为2）
		 */
		getDecimal: function(num, isInt, point){
			if(point == undefined || point == ""){
				point = 2;
			}
			if(isInt == undefined || isInt == ""){
				isInt = 0;
			}
			if(num != undefined){
				var f = parseFloat(num);
				if(isNaN(f)){
					return null;
				}
				var f = Math.round(num * 100) / 100;
				var s = f.toString();
				var rs = s.indexOf('.');
				if (rs < 0) {
					rs = s.length;
					s += '.';
				}
				while (s.length <= rs + point) {
					s += '0';
				}
				if (isInt != undefined && isInt == 1) {
					return parseFloat(s);
				}
				return s;
			}
		},

        /*
          千分位分割
        */
    	toThousands: function(num) {
			var num = (num || 0).toString(), result = '';
            var IntegerNum = num.split('.')[0];
            var DecimalNum = num.split('.')[1];
			while (IntegerNum.length > 3) {
				result = ',' + IntegerNum.slice(-3) + result;
                IntegerNum = IntegerNum.slice(0, IntegerNum.length - 3);
			}
			if (IntegerNum) { result = IntegerNum + result; }
			if( DecimalNum === undefined ){
                return result
			}else{
                return result + '.' + DecimalNum;
            }
		},
		/**
		 * 获取浏览器信息
		 */
		getUserAgent: function(){
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
		/**
		 * 是否为移动端访问
		 */
		isMobile: function(){
			var flag = this.getUserAgent();
			if(!flag){
				return true;
			}else {
				return false;
			}
		},
		/**
		 * 加载 css 样式
		 */
		loadCss: function(src){
			$('head').append('<link text="text/css" href="' + src + '" rel="Stylesheet" />');
		},
		/**
		 * 加载 js 文件
		 */
		loadJs: function(src){
			$('head').append('<script text="text/javascript" language="JavaScript" src="' + src + '?v=' + (new Date()).getTime() + '"></script>');
		},
		/**
		 * //判断字符是否为空，如果为空，则默认返回 "-",也可指定特殊字符
		 * @param str	原始字符
		 * @param fix	字符后缀
		 * @param rep	指定特殊字符用于替换-
		 * @returns {String}
		 */
		isEmpty: function(str, fix, rep){
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
		/**
		 * 对ajax的返回数据进行判断是否存在
		 */
		isExistArr: function(arr){
			if (arr != undefined && arr != null && arr != "" && arr.length != 0) {
				return true;
			} else {
				return false;
			}
		},
		/**
		 * 获取url参数
		 * @param name 参数名
		 * @param defaultValue 默认值
		 * @returns 
		 */
		getUrlParamer: function(name, defaultValue){
			if(defaultValue == undefined){
				defaultValue = null;
			}
			try {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if (r != null)
					return unescape(r[2]);
				return defaultValue;
			} catch (e) {
				return defaultValue;
			}
		},
		/**
		 * 获取 Heade 中的Title元素
		 */
		getTitleEle: function(){
			return document.getElementsByName("title");
		},
		/**
		 * 设置title
		 */
		setTitle: function(title){
			document.title = title;
		},
		/**
		 * 获取 Cookie
		 */
		getCookie: function(name){
			var arr,
			reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			if (arr = document.cookie.match(reg))
				return unescape(arr[2]);
			else
				return null;
		},
		/**
		 * Base64位 解密
		 */
		decodeBase64: function(str){
			var base = new Base64();
			if (str != "" && str != null) {
				return base.decode(str);
			} else {
				return "";
			}
		},
		/**
		 * JSON 字符串转发为 Object对象
		 */
		json2Obj: function(json){
			try {
				var obj = JSON.parse(json);
				return obj
			} catch (e) {
				return json;
			}
		},
		/**
		 * 判断浏览器是否支持本地存储
		 */
		isSupportLoaclStorage: function(){
			if (window.localStorage) {
				return true;
			} else {
				console.log("浏览器不支持本地存储.");
				return false;
			}
		},
		/**
		 * 获取本地存储的key-value
		 */
		getStorageItem: function(name){
			if(isSupportLoaclStorage){
				return window.localStorage.getItem(name);
			}else{
				return null;
			}
		},
		/**
		 * 设置本地存储的key-value
		 */
		setStorageItem: function(name, value){
			if(isSupportLoaclStorage){
				window.localStorage.setItem(name, value);
			}
		},
		/**
		 * 移除本地存储的key-value
		 */
		removeStorageItem : function(name) {
			if(isSupportLoaclStorage){
				window.localStorage.removeItem(name);
			}
		},
		/**
		 * 清空本地存储的key-value(慎用)
		 */
		clearStorageItem : function() {
			if(isSupportLoaclStorage){
				window.localStorage.clear();
			}
		},
		/**
		 * 显示加载动画
		 * ---使用前，请导入WEUI
		 * id 用于区分不同的加载 
		 * tips 自定义提示信息
		 */
		loading: function(id, content){
			if (content == undefined || content == null || content == "") {
				content = "数据加载中..."
			}
			//添加对应的div
			var loadInfo = ' <div id="loadingToast' + id + '">' +
											'<div class="weui-mask_transparent"></div>' +
											'<div class="weui-toast">' +
											'<i class="weui-loading weui-icon_toast"></i>' +
											'<p class="weui-toast__content">' + content + '</p>' +
											' </div>' +
										' </div>';
			$("body").append(loadInfo);
		},
		/**
		 * 结束加载动画
		 */
		loadingStop: function(id){
			var $loadingToast = $('#loadingToast' + id);
			$loadingToast.fadeOut(100);
			$loadingToast.remove();
		},
		/**
		 * 时间字符串转换
		 * str 待转换的时间格式
		 * orignal 原始字符串时间格式
		 * newStr 新转换的时间格式
		 * 默认格式 yyyy-MM-dd HH:mm:ss 转换为 yyyy-MM-dd
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
		 * 弹出框  
		 * -- 使用前请导入WEUI
		 * title 弹出框标题
		 * content 弹出框内容
		 * okFun 点击ok回调方法
		 * cancelFun 点击取消方法
		 * okMessage 确认文字，默认确定
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
		/**
		 * 弹出框
		 * ---最大宽度为300px
		 */
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

		/*
		   说明弹框
		   title： 提示语的标题 （ 可为空 ）
		   content： 提示语内容
		   okFun： 点击确认后的后续方法 （ 可为空 ）
		 */
		exexplainAlert: function(content, title, okFun){

			var id = (new Date()).getTime().toString();
			if( title === undefined || title === "" ){
				title = "";
			}
			//防止滚动穿透
			$("body, html").css({'height': '100%', 'overflow': 'hidden'});
			document.body.classList.add('modal-open');
			 info = `<div class="explain_alert_bg" id="explain_alert_bg${id}">
								<div class="explain_alert">
									<div class="explain_alert_title">${title}</div>
									<div class="explain_alert_content_box">
										<div class="explain_alert_content">${content}</div>
									</div>
									<a class="ok_bottom" id="ok_bottom${id}"></a>
								</div>
							</div>`;
			$("body").append(info);
			$("#explain_alert_bg" + id).fadeIn(100);
			//点击取消后隐藏
			$("#ok_bottom" + id).on('click', function(){
				//对应滚动穿透设置
				$("body, html").css({'height': '100%', 'overflow': 'auto'});
				document.body.classList.remove('modal-open');
				$("#explain_alert_bg" + id).fadeOut(100);
				window.setTimeout(function() {
					$("#explain_alert_bg" + id).remove();
				}, 100);
				if(okFun !== undefined){
					okFun();
				}
			});
		},
		/**
		 * actionSheet -- 使用前请导入WEUI
		 * option 选项,参考格式["短期0-1", "中期1-3", "长期3年以上"]
		 * value 选项对应的value值
		 * okFun 选中值的回调方法
		 * cancelMessage 取消按钮问题，默认取消
		 * hideMask 是否隐藏蒙层
		 */
		actionsheet: function(option, value, okFun, cancelMessage,hideMask){
			if(!hideMask){
				hideMask = false;
			}
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
			var divInfo = "";
			if (!hideMask){
				divInfo = '<div class="weui-mask" id="weui-mask-' + id +'" style="display: none"></div>';
			}
			var divInfo = '<div class="weui-actionsheet" id="weui-actionsheet-' + id +'">'+
								        '<div class="weui-actionsheet__menu">'+
								        	optionStr +
								        '</div>'+
								        '<div class="weui-actionsheet__action">'+
								            '<div class="weui-actionsheet__cell actionsheet_cancel" id="weui-actionsheet-cancel-' + id +'">' + cancelMessage +'</div>'+
								        '</div>'+
								    '</div>';
			$("body").append(divInfo);
			$("#weui-actionsheet-" + id).addClass("weui-animate-slide-up");
			$("#weui-mask-" + id).fadeIn(200);
			//定义隐藏方法
			function hideActionSheet(){
				$("#weui-actionsheet-" + id).addClass("weui-animate-slide-down");
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
		},
		//手机滑动事件 begin
		/**
		 * 返回角度
		 */
		getSlideAngle: function(dx, dy) {
			return Math.atan2(dy, dx) * 180 / Math.PI;
		},
		/**
		 * 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动 
		 */
		getSlideDirection: function(startX, startY, endX, endY){
			var dy = startY - endY;
			var dx = endX - startX;
			var result = 0;
			//如果滑动距离太短  
			if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
				return result;
			}
			var angle = this.getSlideAngle(dx, dy);
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
		},
		/**
		 * 对数据进行上（红），下（绿），0（灰）
		 * num 原始数值
		 * suffix后缀
		 * isMoney 是否货币
		 * point 小数精度
		 * 是否需要正负号
		 * colors 颜色值数组
		 */
		positiveNum: function(num, suffix, isMoney, point, isPos, colors){
			var info = "";
			try {
				if(colors == undefined){
					//红、绿、灰
					colors = ["#EF5351", "#49B745", "#999"];
				}
				if(suffix == undefined){
					suffix = "";
				}
				if(point == undefined){
					point = 2;
				}
				if(isMoney == undefined){
					isMoney = 0;
				}
				if(isPos == undefined){
					isPos = 1;
				}
				var n = parseFloat(num);
				//数值
				var resultValue = "";
				if(isMoney == 1){
					resultValue = n.formatMoney(point);
				}else{
					resultValue = this.getDecimal(n, 0, point);
				}
				
				if(n > 0){
					if(isPos == 1){
						resultValue = "+" + resultValue;
					}
					info = '<t style="color:' + colors[0] +'">' + resultValue + suffix + '</t>';
				}else if(n < 0){
					info = '<t style="color:' + colors[1] +'">' + resultValue + suffix + '</t>';
				}else if(n == 0){
					info = '<t style="color:' + colors[2] +'">' + resultValue + suffix + '</t>';
				}
			} catch (e) {
				console.log(e);
				info = "<t>" + num + "</t>";
			}
			return info;
		}
		
		
}

/**
 * 和业务对接的函数
 */
invest.cust = {
		
}

invest.cust.func = {
		/**
		 * 处理明星分析师荐股的重复数据
		 */
		handleStarStockByTitle: function(data){
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
		 * 将字符串转换为Obj对象并统一添加tkn字段
		 */
		addTkn2Param: function(param){
			var obj = this.json2Obj(param);
			obj.tkn = this.getUrlParamer("tkn");
			return obj;
		},
		/**
		 * 给链接添加通用参数
		 */
		addParaURL: function(url){
			var link = "";
			if (url.indexOf("?") != -1) {
				//含有?
				link = url + "&UA=" + this.getUrlParamer("UA") + "&tkn=" + this.getUrlParamer("tkn");
			} else {
				link = url + "?UA=" + this.getUrlParamer("UA") + "&tkn=" + this.getUrlParamer("tkn");
			}
			return link;
		},
		addParaUA: function(url){
			var link = "";
			if (url.indexOf("?") != -1) {
				//含有?
				link = url + "&UA=" + this.getUrlParamer("UA");
			} else {
				link = url + "?UA=" + this.getUrlParamer("UA");
			}
			return link;
		},
		//过滤链接，去掉页面的参数部分
		filterUrl: function(url){
			if(url.indexOf("?") != -1){
				return url.split("?")[0];
			}else{
				return url;
			}
		}
	
}


/**
 *  异步加载模块
 *  配置信息
 */
invest.ajax = {
		
}

invest.ajax.options = {
		//同、异步方式
		async : true,
		//发送前回调函数
		beforeSend: function (){
			
		},
		//缓存页面，默认值为true,dataType为script和jsonp时默认为false
		cache: false,
		//请求完成后回调函数(请求成功或失败之后均调用)。
		complete: function(){
			
		},
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型。
		contentType: "application/x-www-form-urlencoded",
		/**
		 * 这个对象用于设置 Ajax 相关回调函数的上下文。也就是说，让回调函数内 this 指向这个对象（如果不设定这个参数，那么 this 就指向调用本次 AJAX 请求时传递的 options 参数）。比如指定一个 DOM 元素作为 context 参数，这样就设置了 success 回调函数的上下文为这个 DOM 元素。
		 */
		context: document.body,
		/**
		 * 发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。查看 processData 选项说明以禁止此自动转换。必须为 Key/Value 格式。如果为数组，jQuery 将自动为不同值对应同一个名称。如 {foo:["bar1", "bar2"]} 转换为 '&foo=bar1&foo=bar2'。
		 */
		data: {},
		/**
		 * 给 Ajax 返回的原始数据的进行预处理的函数。提供 data 和 type 两个参数：data 是 Ajax 返回的原始数据，type 是调用 jQuery.ajax 时提供的 dataType 参数。函数返回的值将由 jQuery 进一步处理。
		 */
		dataFilter: function(data, type){
			
		},
		/**
		 * 预期服务器返回的数据类型
		 */
		dataType: "",
		/**
		 * 自动判断 (xml 或 html)。请求失败时调用此函数。
		 * 有以下三个参数：XMLHttpRequest 对象、错误信息、（可选）捕获的异常对象。
		 */
		error: function(XMLHttpRequest, message, errorThrown){
			
		},
		/**
		 * 请求成功后的回调函数。
		 */
		success: function(data){
			
		},
		/**
		 * 请求方式
		 */
		type: "GET",
		url: ""
}

/**
 * 请求数据
 */
invest.ajax.request = function (option){
	var opt = option;
	if(opt == undefined || opt == null || opt == ""){
		console.log("请检查请求配置.");
		return;
	}
	$.ajax({
		async: opt.async,
		beforeSend: function(){
			opt.beforeSend();
		},
		cache: opt.cache,
		complete: function(){
			opt.complete();
		},
		contentType: opt.contentType,
		context: opt.context,
		data: JSON.stringify(
            opt.data
        ),
		dataFilter: function(data, type){
			opt.dataFilter(data, type);
		},
		dataType: opt.dataType,
		error: function(XMLHttpRequest, message, errorThrown){
			console.log("ERROR:" +  message);
			opt.error(XMLHttpRequest, message, errorThrown);
		},
		success: function(data, status){
			opt.success(data, status);
		},
		type: opt.type,
		url: opt.url
	});
	
}


/**
 * 初始加载及替换
 */
extraFunc();

function extraFunc() {

	/**
	 * 数字转换为货币格式
	 * Default usage and custom precision/symbol :
	 *  var revenue = 12345678; alert(revenue.formatMoney()); // $12,345,678.00 alert(revenue.formatMoney(0, "HK$ ")); // HK$ 12,345,678
	 *  // European formatting:
	 * var price = 4999.99;alert(price.formatMoney(2, "€", ".", ",")); // €4.999,99
	 *  // It works for negative values, too:
	 * alert((-500000).formatMoney(0, "£ ")); // £ -500,000
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
	 * 清除字符串两边的空格，相当于Java 的trim
	 */
	String.prototype.trim = function() {
		return this.replace(/(^\s*)|(\s*$)/g, '');
	};
	
}

/**
 * 日志统计，如需使用，请在业务代码中调用
 */
function logStattistics(){
	//md5
	invest.func.loadJs("../../common/js/security/jQuery.md5.min.js");
	//浏览器判断
	invest.func.loadJs("../../common/js/browser.js");
	
	//页面进入
	window.onload = function(){
		sendAccess();
	}
	
	//综合参数
	var synObj = {};
	
	//行动
	var action = "";
	//ua唯一标识
	synObj.ua = invest.func.getUrlParamer("ua", "");
	//来源
	synObj.source = "investoday";
	//行动代码
	synObj.accessKey = $.md5(location.href + (new Date()).getTime());
	//页面行动子标识(仅限诊断面在同一个页面进行tab切换时使用)
	synObj.subKey =$.md5((new Date()).getTime() + "");
	
	//发送日志到LogTail
	function sendLogTail(data){
		$.ajax({
			url: "/log/send",
			async : false,
			data : data,
			dataType : "json",
			success : function(data, status){
					
			}
		})
	}
	
	//页面进入事件日志
	function sendAccess(){
		var sendObj = {};
		sendObj.ua = synObj.ua;
		sendObj.accessKey = synObj.accessKey;
		sendObj.source = synObj.source;
		//行动
		sendObj.action = "page_access";
		//上游页面
		sendObj.lastURL = invest.cust.func.filterUrl(document.referrer);
		//当前页面
		sendObj.accessURL = invest.cust.func.filterUrl(location.href);
		
		sendLogTail(sendObj);
	}
	
	/**
	 * 离开页面
	 */
	function sendLeave(){
		var sendObj = {};
		sendObj.ua = synObj.ua;
		sendObj.accessKey = synObj.accessKey;
		sendObj.source = synObj.source;
		//行动
		sendObj.action = "page_leave";
		
		sendLogTail(sendObj);
	}
	
	/**
	 * 切换行业、股票
	 */
	function sendCover(type){
		var sendObj = {};
		sendObj.ua = synObj.ua;
		sendObj.accessKey = synObj.accessKey;
		sendObj.source = synObj.source;
		//行动
		sendObj.action = 'sicode_cover';
		if(type == "1001"){
			sendObj.stock = stockCode;
			sendObj.industry = "";
		}else if(type == "1002"){
			sendObj.stock = "";
			sendObj.industry = industryCode;
		}
		
		sendLogTail(sendObj);
	}
	
	/**
	 * 诊断面切换
	 */
	function sendDiagnoseCut(sort, sisSurface, sisAct, isFirst){
		var sendObj = {};
		sendObj.ua = synObj.ua;
		sendObj.accessKey = synObj.accessKey;
		sendObj.source = synObj.source;
		//行动
		sendObj.action = "sis_cut";
		
		//如果行动为重新进入的话并且不是首次进入，则重新生成关键代码
		if(isFirst == 0 && sisAct == "access"){
			synObj.subKey = $.md5((new Date()).getTime());
		}
		sendObj.subKey = synObj.subKey;
		
		//类别 STOCK/INDUSTRY
		sendObj.sort = sort;
		//切换的股票
		sendObj.stockCut = "";
		//切换的行业
		sendObj.industryCut = "";
		//切换的诊断面
		sendObj.sisSurface = sisSurface;
		//切换动作 access/leave
		sendObj.sisAct = sisAct;
		
		if(sort == "STOCK" || sort == "SMART"){
			sendObj.stockCut = stockCode;
		}else if(sort == "INDUSTRY"){
			sendObj.industryCut = industryCode;
		}
		
		sendLogTail(sendObj);
	}
	
	/**
	 * PV记录
	 */
	function sendAllAction(pvAct, pvObj){
		var sendObj = {};
		sendObj.ua = synObj.ua;
		sendObj.accessKey = synObj.accessKey;
		sendObj.source = synObj.source;
		//行动
		sendObj.action = "page_view";
		//行动类型
		sendObj.pvAct = pvAct;
		//行动目标
		sendObj.pvObj = pvObj;
		
		sendLogTail(sendObj);
	}
	
	/**
	 * 股票搜索切换
	 * sort normal/B/new
	 */
	function searchStock(code, matchType){
		var sendObj = {};
		sendObj.ua = synObj.ua;
		sendObj.accessKey = synObj.accessKey;
		sendObj.source = synObj.source;
		//行动
		sendObj.action = "search_stock";
		//股票代码
		sendObj.stock = stockCode;
		//类型
		sendObj.matchType = matchType;
		
		sendLogTail(sendObj);
	}
	
}


/**
 *---------------------- 时间格式化 ----------------------------
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
// ->时间格式化 end

//实现图片的预加载
function preloadImg(srcArr){
    if(srcArr instanceof Array){
        for(var i=0; i<srcArr.length; i++){
            var oImg = new Image();
            oImg.src = srcArr[i];
        }
    }
}

//加载全局变量
// invest.func.loadJs("/app.js");