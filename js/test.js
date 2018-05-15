/*
  this css file for test.html
  date: 2018-04-09
  author: Andy
*/


//纯css导航
wSpace.UI.hoverBar(['CSS','HTML','VUE'], 'nav_bar');

//下拉刷新
wSpace.function.pullRefresh();

//搜索框
function searchInput(){
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
}

searchInput();