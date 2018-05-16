function openClose(_this){
  let nextNode = wSpace.function.nextSibling(_this);
  if( _this.children[1].innerHTML === '展开' ){
    _this.children[1].innerHTML = '收起';
    nextNode.style.height = 'auto';
  }else {
    _this.children[1].innerHTML = '展开';
    nextNode.style.height = '';
  }
}
