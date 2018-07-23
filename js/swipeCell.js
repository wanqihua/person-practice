$(function(){
  touchMove()
});

function touchMove(){
  let doc = document.querySelectorAll('.single_info_box .single_info');
  let openFlag = false;  //不存在展开项
  for( let i = 0; i < doc.length; i++ ){
    let initX; //触摸位置
    let moveX; //滑动时的位置
    let X = 0; //移动距离
    let objX = 0; //目标对象位置
    let touchFlag = false;
    doc[i].addEventListener('touchstart', function(event) {
      event.preventDefault();
      touchFlag = false;
      let obj = event.target.parentNode;
      if (obj.className === "scheme") {
        initX = event.targetTouches[0].pageX;
        objX = (obj.style.transform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
      }
      console.log(objX);
      if (objX === 0) {
        doc[i].addEventListener('touchmove', function(event) {
          event.preventDefault();
          let obj = event.target.parentNode;
          if (obj.className === "scheme") {
            moveX = event.targetTouches[0].pageX;
            X = moveX - initX;
            if (X >= 0) {
              obj.style.transform = "translateX(" + 0 + "px)";
            } else if (X < 0) {
              touchFlag = true;
              let l = Math.abs(X);
              obj.style.transform = "translateX(" + -l + "px)";
              if (l > 80) {
                l = 80;
                obj.style.transform = "translateX(" + -l + "px)";
              }
            }
          }
        },false);
      } else if (objX < 0) {
        doc[i].addEventListener('touchmove', function(event) {
          event.preventDefault();
          let obj = event.target.parentNode;
          if (obj.className === "scheme") {
            moveX = event.targetTouches[0].pageX;
            X = moveX - initX;
            if (X >= 0) {
              touchFlag = true;
              let r = -80 + Math.abs(X);
              obj.style.transform = "translateX(" + r + "px)";
              if (r > 0) {
                r = 0;
                obj.style.transform = "translateX(" + r + "px)";
              }
            } else { //向左滑动
              obj.style.transform = "translateX(" + -80 + "px)";
            }
          }
        },false);
      }

    },false);
    doc[i].addEventListener('touchend', function(event) {
      event.preventDefault();
      console.log(this);
      let obj = event.target.parentNode;
      if (obj.className === "scheme") {
        objX = (obj.style.transform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
        if (objX > -40) {
          obj.style.transform = "translateX(" + 0 + "px)";
          objX = 0;
        } else {
          obj.style.transform = "translateX(" + -80 + "px)";
          objX = -80;
        }
      }
      if( touchFlag === false ){
        let conditionCode = $(this).attr("id");
        location.href = 'pickingResult.html?openid='+accountId + "&conditionCode=" + conditionCode;
      }
    },false)
  }

  console.log(doc);
  // window.addEventListener('load', function(){

  // },false)
};



//侧滑显示删除按钮
var expansion = null; //是否存在展开的list
var container = document.querySelectorAll('.list li a');
for(var i = 0; i < container.length; i++){
  var x, y, X, Y, swipeX, swipeY;
  container[i].addEventListener('touchstart', function(event) {
    x = event.changedTouches[0].pageX;
    y = event.changedTouches[0].pageY;
    swipeX = true;
    swipeY = true;
    if(expansion){   //判断是否展开，如果展开则收起
      expansion.className = "";
    }
  });
  container[i].addEventListener('touchmove', function(event){

    X = event.changedTouches[0].pageX;
    Y = event.changedTouches[0].pageY;
    // 左右滑动
    if(swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0){
      // 阻止事件冒泡
      event.stopPropagation();
      if(X - x > 10){   //右滑
        event.preventDefault();
        this.className = "";    //右滑收起
      }
      if(x - X > 10){   //左滑
        event.preventDefault();
        this.className = "swipeleft";   //左滑展开
        expansion = this;
      }
      swipeY = false;
    }
    // 上下滑动
    if(swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
      swipeX = false;
    }
  });
}