
window.addEventListener('load', function(){
  touchMove();
  deleteEle();
  //下拉刷新
  wSpace.function.pullRefresh();
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
        console.log('nomove');
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

