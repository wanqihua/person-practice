/*
  this css file for test.html
  date: 2018-04-09
  author: Andy
*/

//纯css导航
wSpace.UI.hoverBar(['CSS','HTML','VUE'], 'nav_bar');

//下拉刷新
wSpace.function.pullRefresh();

//带三角的进度条进度输入
(function inputPro(){
  let input = document.getElementsByClassName('input_progress_num')[0];
  ['input','change'].forEach(function(item){
    input.addEventListener(item, function(){
      let barNum = document.getElementsByClassName('progress_bar')[0];
      if( input.value === '' ){
        input.value = 0;
      }
      barNum.style.width = input.value + '%';
    })
  })
})();

//搜索框
(function searchInput(){
  let topComboBoxIndex = -1;
  let searchInput = document.getElementById('searchInput');
  let searchReason = document.getElementsByClassName('search_reason')[0];
  let inputVuale = '';
  //全局回车，输入框聚焦
  document.onkeydown = function(event){
    if(event.which === 13){
      searchInput.focus();
    }
    const length = searchReason.children.length;
    if ( event.which === 38 ) {  //上
      topComboBoxIndex--;
      if( topComboBoxIndex === -2 ){
        topComboBoxIndex = length;
      }
      chooseValue(topComboBoxIndex);
    }
    if ( event.which === 40 ){   //下
      topComboBoxIndex++;
      if( topComboBoxIndex === length ){
        topComboBoxIndex = -1;
      }
      chooseValue(topComboBoxIndex);
    }
  };

  //输入框输入事件
  searchInput.addEventListener('input', function() {
    const value = this.value;
    inputVuale = value;
    if(value !== "" ){
      //调用搜索接口
      searchReason.style.display = 'block';
    }else{
      // searchReason.innerHTML = '';
      searchReason.style.display = 'none';
    }
  });

  //选中数据写入输入框
  function chooseValue(index){
    console.log(index);
    let length = searchReason.children.length;
    for( let i = 0; i < length; i++ ){
      if( i === index){
        searchReason.children[i].className = 'hover_bgColor';
        searchInput.value = searchReason.children[i].innerText;
      }else{
        searchReason.children[i].className = '';
      }
    }
    if( index < 0 ){
      searchInput.value = inputVuale;
    }
  }
})();

(function(){
  let inputContent = {values:'123'};
  let input = document.getElementById('bindInput');
  let showData = document.getElementsByClassName('show_data')[0];
  input.addEventListener('input', function(){
    let value = input.value;
    Object.defineProperty(inputContent, 'values',{
      value: value,
    });
    showData.innerHTML = inputContent.values;
  });
})();

//验证码
wSpace.function.createCode('myCanvas',4);
(function(){
  let change = document.getElementsByClassName('change_one')[0];
  change.addEventListener('click', function(){
    wSpace.function.createCode('myCanvas',4);
  })
})();

//随机选彩票
function randomChoose(){
  $('.num_box').html();
  const numList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
  let info = '';
  for( let i = 0; i < 7; i++ ){
    let index = Math.floor(Math.random()*numList.length);
    let num = numList[index];
    numList.splice(index,1);
    info += `<p>${num}</p>`;
  }
  $('.num_box').html(info);
};
randomChoose();

(function(){
  const randomSelectionBottom = document.getElementsByClassName('random_selection_bottom')[0];
  randomSelectionBottom.addEventListener('click', function(){
    randomChoose();
  })
})();

/*
(function(){
  function observe(data){
    if(!data || typeof data !== 'object'){
      return
    }
    //取所有属性遍历
    Object.key(data).forEach(function(key){
      defineReactive(data, key, data[key]);
    })
  }
  //设置为访问器属性，并在其getter和setter函数中，使用订阅发布模式。互相监听。
  function defineReactive(data, key, val){
    let dep = new Dep();   //实例化一个主题对象，对象中有空的观察者列表
    observe(val);          //监听子属性
    Object.defineProperty(data, key, {
      enumerable: true,    // 可枚举
      configurable: false, // 不能再delete
      get: function(){
        // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
        Dep.target && dep.addDep(Dep.target);
        return val;

      },
      set: function(newVal){
        if (val === newVal) return;
        val = newVal;
        dep.notify(); // 通知所有订阅者
      }
    });
  }

  function Dep() {
    this.subs = [];
  }

  Dep.prototype = {
    addSub: function(sub) {
      this.subs.push(sub);
    },
    notify: function() {
      this.subs.forEach(function(sub) {
        sub.update();
      });
    }
  };

  //Watcher.js
  Watcher.prototype = {
    get: function(key){
      Dep.target = this;
      this.value = data[key];  // 这里会触发属性的getter，从而添加订阅者
      Dep.target = null;
    }
  }
})();*/
