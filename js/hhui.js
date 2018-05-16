/**
  一些常用的UI和方法
  tips: 使用前需要引用JQuery(后期去掉)
*/

//命名空间
let wSpace = {};

//相关属性
wSpace.attr = {
  version: '1.0',
};

//相关UI
wSpace.UI = {
  /**
   说明弹框
   title： 提示语的标题 （ 可为空 ）
   content： 提示语内容
   okFun： 点击确认后的后续方法 （ 可为空 ）
   */
  exexplainAlert: (content, title, okFun) => {
  let id = (new Date()).getTime().toString();
  if( title === undefined || title === "" ){
    title = "";
  }
  //防止滚动穿透
  $("body, html").css({'height': '100%', 'overflow': 'hidden'});
  document.body.classList.add('modal-open');
  let info = `<div class="explain_alert_bg" id="explain_alert_bg${id}">
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
  //预加载相关图片
  wSpace.function.preloadImg(['./images/explain_ok.png']);
  },

  /**
  hover时底部出现底条
  title @array
  element 父元素的id 没有时 bar添加在body下
  */
  hoverBar: (titles,element) => {
  let _thisBody;
  if( element === undefined ){
    _thisBody = document.getElementsByTagName('body')[0];
  }else {
    _thisBody = document.getElementById(element);
  }
  let ul = document.createElement('ul');
  ul.classList.add('navigation_bar');
  for( let title of titles ){
    let li = document.createElement('li');
    li.innerHTML = title;
    ul.appendChild(li);
  }
  _thisBody.appendChild(ul);
  },

  /**
  显示加载动画
  id 用于区分不同的加载
   content 自定义提示信息
   let id = (new Date()).getTime();
  */
  loading: (id, content) => {
  if (content === undefined || content === null || content === "") {
    content = "数据加载中..."
  }
  //添加对应的div
  let loadInfo =  `<div class="hh_loading_toast${id}">
        <div class="hh_loading_toast_icon"></div>
        <div class="hh_loading_toast_content">${content}</div>
      </div>`;
  $("body").append(loadInfo);
  },

  /**
  结束加载动画
  */
  loadingStop: (id) => {
  let $loadingToast = $('#loadingToast' + id);
  $loadingToast.fadeOut(100);
  $loadingToast.remove();
  },

  /**
  提示语的弹框
  title： 提示语的标题
  content： 提示语内容
  buttonMessage： 按钮话术 - 默认为：确认（ 可为空 ）
  okFun： 点击确认后的后续方法 （ 可为空 ）
  */
  popout: (title, content, buttonMessage, okFun) => {
  let id = (new Date()).getTime().toString();
  if( buttonMessage === undefined ){
    buttonMessage = '确认';
  }
  let popOutBox   =  `<div class="tip_alert_bg" id="tip_alert_bg${id}">
								<div class="tip_alert">
									<p class="tip_alert_title">${title}</p>
									<p class="tip_alert_sub_title">${content}</p>
									<div class="tip_alert_button_enter" id="tip_alert_button_enter${id}" >${buttonMessage}</div>
								</div>
							</div>`;
  $("body").append( popOutBox );
  $("#tip_alert_bg" + id).fadeIn(100);

  //点击确定后隐藏
  $("#tip_alert_button_enter" + id).click(function(){
    $("#tip_alert_bg" + id).fadeOut(100);
    window.setTimeout(function() {
    $("#tip_alert_bg" + id).remove();
    }, 100);
    //点击确定的后续操作
    if(okFun !== undefined){
    okFun();
    }
  });
  },
};

//相关方法
wSpace.function = {
  /**
   * 改变new Date() 、时间戳格式 返回的数据格式
   * date: 需要改变的时间
   * format： 返回的时间格式
   * 返回 // 2018-04-09 13:15:50
   */
  changeDate: (date, format) => {
    let thisDate;
    if(date === null || !date || date === '' ){
      thisDate = new Date();

    }else {
      thisDate = date;
      console.log(date);
    }
    let returnDate;
    let fillZero = (n) => {
      let result;
      result = (n).toString().length === 1 ? ('0' + n): n;
      return result;
    };
    let formatTime = (t = new Date(), format) => {
      let result;
      let d = new Date(t);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let date = d.getDate();
      let hours = d.getHours();
      let minutes = d.getMinutes();
      let seconds = d.getSeconds();
      switch(format) {
        case 'YYYY/MM/DD':
          result = `${year}/${fillZero(month)}/${fillZero(date)}`;
          break;
        case 'YYYY-MM-DD':
          result = `${year}-${fillZero(month)}-${fillZero(date)}`;
          break;
        case 'YYYYMMdd':
          result = `${year}${fillZero(month)}${fillZero(date)}`;
          break;
        default:
          result = `${year}-${fillZero(month)}-${fillZero(date)} ${fillZero(hours)}:${fillZero(minutes)}:${fillZero(seconds)}`;
      }
      return result;
    };
    returnDate = formatTime(new Date(thisDate), format);
    // 2018-04-09 13:15:50
    return returnDate;
  },

  /**
  数字自动转换成汉子
  money: input输入的数字(number)
  that: 该元素(object)
  例子：
  $('#RemittanceAmount').bind('input propertychange', function() {   //数字自动转换成汉子
    let writing = $("#RemittanceAmount").val();
    let a = changeMoneyToChinese(writing, this);
    $("#getCapital").html(a);
  });
  */
  changeMoneyToChinese: (money, that) => {
  let cnNums = ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"]; //汉字的数字
  let cnIntRadice = ["","拾","佰","仟"]; //基本单位
  let cnIntUnits = ["","万","亿","兆"]; //对应整数部分扩展单位
  let cnDecUnits = ["角","分","毫","厘"]; //对应小数部分单位
  let cnIntLast = "元"; //整型完以后的单位
  let maxNum = 999999999999.9999; //最大处理的数字
  let IntegerNum; //金额整数部分
  let DecimalNum; //金额小数部分
  let DecimalLength;
  let ChineseStr = ""; //输出的中文金额字符串
  let parts; //分离金额后用的数组，预定义
  if( money === "" || money === undefined || money === null ){
    return "";
  }
  money = parseFloat(money);
  if( money >= maxNum ){
    alert('超出最大处理数字');
    return "";
  }
  if( money === 0 ){
    ChineseStr = cnNums[0] + cnIntLast;
    return ChineseStr;
  }
  money = money.toString(); //转换为字符串
  if( money.indexOf(".") === -1 ){
    IntegerNum = money;
    DecimalNum = '';
  }else{
    parts = money.split(".");
    IntegerNum = parts[0];
    DecimalLength = parts[1].toString().length;
    DecimalNum = parts[1].substr(0,4);
  }
  if( DecimalLength > 4 ){
    money = money.toString();
    money = money.substr(0, money.length - 1);
    $(that).val( money );
    return sessionStorage.getItem('ChineseStr');
  }else{
    if( parseInt(IntegerNum,10) > 0 ){   //获取整型部分转换
    let zeroCount = 0;
    let IntLen = IntegerNum.length;
    for( let i = 0; i < IntLen; i++ ){
      let n = IntegerNum.substr(i,1);
      let p = IntLen - i - 1;
      let q = p / 4;
      let m = p % 4;
      if( n === "0" ){
      zeroCount++;
      }else{
      if( zeroCount > 0 ){
        ChineseStr += cnNums[0];
      }
      zeroCount = 0; //归零
      ChineseStr += cnNums[parseInt(n)]+cnIntRadice[m];
      }
      if( m === 0 && zeroCount < 4 ){
      ChineseStr += cnIntUnits[q];
      }
    }
    ChineseStr += cnIntLast;    //整型部分处理完毕
    }
    if( DecimalNum !== '' ){       //小数部分
    let decLen = DecimalNum.length;
    for( let i=0; i<decLen; i++ ){
      let n = DecimalNum.substr(i,1);
      if( n !== '0' ){
      ChineseStr += cnNums[Number(n)]+cnDecUnits[i];
      }
    }
    }
    if( ChineseStr === '' ){
    ChineseStr += cnNums[0] + cnIntLast;
    }
  }
  //存储转化后的汉字
  sessionStorage.setItem('ChineseStr', ChineseStr);
  return ChineseStr;
  },

  /**
   *  将20180322格式处理成2018-03-22的模式(string)
   */
  dateForm: (date) => {
    if( typeof date === 'number' ){
      date = date.toString();
    }
    return date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
  },

  /**
  动态加载CSS
  @param {string} url 样式地址
  方法调用： dynamicLoadCss('http://www.yimo.link/static/css/style.css')
  */
  dynamicLoadCss: (url) => {
  let head = document.getElementsByTagName('head')[0];
  let link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  head.appendChild(link);
  },

  /**
  动态加载JS
  @param {string} url 脚本地址
  @param {function} callback  回调函数
  例子：  dynamicLoadJs('../../common/js/resize.js',function(){console.log('加载成功')});
   */
  dynamicLoadJs: (url, callback) => {
  let head = document.getElementsByTagName('head')[0];
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  if(typeof(callback) === 'function'){
    script.onload = script.onreadystatechange = function () {
    if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete"){
      callback();
      script.onload = script.onreadystatechange = null;
    }
    };
  }
  head.appendChild(script);
  },

  /**
  保留小数位数
  num 原始数据
  isInt 是否保留为整数（isInt === 1 时四舍五入； === 2 时向上取整； === 3 时向下取整 ），不保留为整数补齐0（默认为0）
  point 小数点位数（默认为2）
  返回的值是一个string
  */
  getDecimal: (num, isInt, point) => {
  if(point === undefined || point === ""){
    point = 2;
  }
  if(isInt === undefined || isInt === ""){
    isInt = 0;
  }
  let num = parseFloat(num);
  if(num !== undefined && !isNaN(num)){
    if (isInt === 1) {
    return Math.round(num);
    }else if( isInt === 2 ) {
    return Math.ceil(num);
    }else if ( isInt === 3 ){
    return Math.floor(num);
    }
    let f = Math.round(num * 100) / 100; //防止浮点数精度不准
    let s = f.toString();
    let rs = s.indexOf('.');
    if( rs < 0 ) {
    s += '.00';
    }else{
    while (s.length <= rs + point) {
      s += '0';
    }
    }
    return s;
  }
  },

  /**
  获取url参数
  name 参数名 (string)
  defaultValue 默认值
  */
  getUrlParamer: (name, defaultValue) => {
  if(defaultValue === undefined){
    defaultValue = null;
  }
  try {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r !== null)
    return decodeURI(r[2]);
    return defaultValue;
  } catch (e) {
    return defaultValue;
  }
  },

  /**
  判断该终端是否为移动端
  true为移动端
  */
  isMobile: () => {
  const userAgentInfo = navigator.userAgent;
  const Agents = [ "Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod" ];
  let flag = false;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
    flag = true;
    break;
    }
  }
  return flag;
  },

  /**
  判断为IOS或者Android
  返回'Android' 或则 'IOS'
  */
  isIOSorAndroid: () => {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if( isAndroid === true ){
    return 'Android';
  }else if( isiOS === true ){
    return 'IOS';
  }
  },

  /**
   *  获取下一个兄弟元素
   */
  nextSibling: (ele) => {
    let nextNode = ele.nextSibling;
    while( nextNode.nodeType === 3 && nextNode.nodeType !== 1 ){
      nextNode = nextNode.nextSibling;
    }
    if( nextNode === null ){
      return
    }
    return nextNode
  },

  /**
  实现图片的预加载
  参数是一个url数组　(Array)
  例子:  preloadImg(['../../images/chipDistribution/stop.png']);
  */
  preloadImg: (srcArr) => {
  if(srcArr instanceof Array){
    for(let i = 0; i < srcArr.length; i++){
    let oImg = new Image();
    oImg.src = srcArr[i];
    }
  }
  },

  /**
  上拉刷新
  实例：<div class="update_time"></div>
  fun加载完需要加
  setTimeout(function(){$('.update_time').removeClass('update_time_loading').html('数据更新时间：' + updateTime);}, 600);
  */
  pullRefresh: (fun) => {
  window.onscroll = function(){
    // 滑动距离、视口高度、文档流高度
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    let documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    let updateTime = document.getElementsByClassName('pull_refresh_update_time')[0];
    if( scrollTop >= documentHeight - windowHeight ){
    updateTime.innerHTML = '';
    updateTime.classList.add("pull_refresh_update_time_loading");
    if( fun !== undefined ){
      fun();
    }
    let newDate = wSpace.function.changeDate();
    setTimeout(() => {
      updateTime.classList.remove("pull_refresh_update_time_loading");
      updateTime.innerHTML = `数据更新时间：${newDate}`;
    },100);
    }
  };
  //预加载需要的图片
  wSpace.function.preloadImg(['./images/loading.png']);
  },

  /**
  去掉接口返回数据的html标签
  */
  removeLabel: (data) => {
  return data.replace(/<.*?>/ig,"");
  },

  /**
   *  获取兄弟元素
   */

  siblings: (elm) => {
    let a = [];
    const p = elm.parentNode.children;
    for(let i =0,pl= p.length; i<pl; i++) {
      if(p[i] !== elm) a.push(p[i]);
    }
    return a;
  },


/**
  将字符串以指定长度显示，多余部分以省略号显示
  （len--显示长度  defaultStr--若字符串为空显示的字符串）
  */
  splitString: (len, defaultStr) => {
  let result = "";
  let str = this.toString();
  if (str){
    str = str.trim();  //去掉字符序列左边和右边的空格
    if (str.length > len){
    result = str.substring(0, len) + "...";
    }else{
    result = str;
    }
  }else{
    result = defaultStr;
  }
  return result;
  },

  /**
  千分位分割
  10000 -> 10,000 (number)
  1234564.34 -> 1,234,564.34
  */
  toThousands: (num) => {
  let num = (num || 0).toString(),
    result = '';
  let IntegerNum = num.split('.')[0];
  let DecimalNum = num.split('.')[1];
  while ( IntegerNum.length > 3 ) {
    result = ',' + IntegerNum.slice(-3) + result;
    IntegerNum = IntegerNum.slice(0, IntegerNum.length - 3);
  }
  if ( IntegerNum ) {
    result = IntegerNum + result;
  }
  if( DecimalNum === undefined ){
    return result
  }else{
    return result + '.' + DecimalNum;
  }
  },
};