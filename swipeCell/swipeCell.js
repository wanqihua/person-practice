
window.addEventListener('load', function(){
  touchMove();
  deleteEle();
  window.addEventListener('scroll',throttle(pullRefresh,200,200));
},false);

function touchMove(){
  let expansion = null;      // 是否存在展开项
  let doc = document.querySelectorAll('.single_info_box .single_info');
  for( let i = 0; i < doc.length; i++ ){
    let initX;                 // 触摸位置X
    let initY;                 // 触摸位置Y
    let moveX;                 // 滑动时的位置X
    let moveY;                 // 滑动时的位置Y
    let X;                     // 移动距离
    let Y;                     // 移动距离
    let objX = 0;              // 目标对象位置
    let touchFlag = false;     // 判断是点击还是滑动
    let swipeX;
    let swipeY;
    doc[i].addEventListener('touchstart', function(event) {
      event.stopPropagation();    // 阻止冒泡
      // event.preventDefault();     // 阻止浏览器默认事件
      touchFlag = false;
      swipeX = true;
      swipeY = true;
      let obj = event.target.parentNode;
      initX = event.targetTouches[0].pageX;
      initY = event.targetTouches[0].pageY;
      objX = (obj.style.transform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
      if( expansion && expansion !== this.parentNode ){   //判断是否有展开，如果有展开则收起
        expansion.style.transform = "translateX(0px)";
      }
    },false);

    doc[i].addEventListener('touchmove', function(event) {
      let obj = event.target.parentNode;
      moveX = event.targetTouches[0].pageX;
      moveY = event.targetTouches[0].pageY;
      X = moveX - initX;
      Y = moveY - initY;
      if( swipeX && Math.abs(X) > Math.abs(Y) ){
        event.stopPropagation();   // 阻止冒泡
        swipeY = false;
        touchFlag = true;
        if( objX === 0 ){       // 收起的状态
          if(X >= 0){
            obj.style.transform = "translateX(" + 0 + "px)";
          }else if (X < 0){
            if (X < -80) {
              X = -80;
            }
            obj.style.transform = "translateX(" + X + "px)";
          }
        }else if( objX < 0 ){   // 展开的状态
          if(X >= 0){
            if( (X - 80) > 0 ){
              X = 80;
            }
            obj.style.transform = "translateX(" + (X - 80) + "px)";
          }else{                // 保持展开状态
            obj.style.transform = "translateX(-80px)";
          }
        }
      }else if(swipeY && Math.abs(X) - Math.abs(Y) < 0){  //上下滑动
        touchFlag = true;
        swipeX = false;
        //上下滑动，使用浏览器默认的上下滑动
      }

    },false);

    doc[i].addEventListener('touchend', function(event) {
      event.stopPropagation();   // 阻止冒泡
      if( touchFlag === false ){
        // code for noMove
      }else{
        let obj = event.target.parentNode;
        objX = (obj.style.transform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
        if (objX > -40) {
          obj.style.transform = "translateX(" + 0 + "px)";
        } else {
          expansion = obj;
          obj.style.transform = "translateX(" + -80 + "px)";
        }
      }
    },false)
  }
}

function deleteEle(){
  let deleteEle = document.querySelectorAll('.single_info_box .delete_btn');
  deleteEle.forEach(function(item){
    item.addEventListener('touchstart', function(event){
      event.preventDefault();
      event.target.parentNode.className = 'disappear';
      // code
    },false)
  })
}

function pullRefresh(){
    // 滑动距离、视口高度、文档流高度
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    let documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    let infoList = document.getElementsByClassName('info_list')[0];
    if( windowHeight*2 >= documentHeight - scrollTop ){
      let fragment = document.createDocumentFragment();
      for (let i = 0; i < 10; i++){
        let item = document.createElement("div");
        item.classList.add('single_info_box');
        item.innerHTML = `<div class="single_info borBot">陈独秀同志你坐下</div>
                          <div class="delete_btn">删 除</div>`;
        fragment.appendChild(item);
      }
      infoList.appendChild(fragment);
      //添加滑动删除事件，后期使用代理优化，减少dom操作
      touchMove();
      deleteEle();
    }
}

// 防抖动函数
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// 绑定监听
// window.addEventListener('scroll', myEfficientFn);


// 简单的节流函数
function throttle(func, wait, mustRun) {
  let timeout,
    startTime = new Date();
  return function() {
    let context = this,
      args = arguments,
      curTime = new Date();

    clearTimeout(timeout);
    // 如果达到了规定的触发时间间隔，触发 handler
    if(curTime - startTime >= mustRun){
      func.apply(context,args);
      startTime = curTime;
      // 没达到触发间隔，重新设定定时器
    }else{
      timeout = setTimeout(func, wait);
    }
  };
};

