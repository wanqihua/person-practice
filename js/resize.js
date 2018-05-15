/*
  放在body标签之前，在body加载前初始化成功，以防屏幕出现短暂闪烁的情况发生
  注： 闪烁是因为重新定义了html的font-soize
  初始化字体大小： iphone6时100px为1rem， 屏幕大小变化时重新初始化字体大小
  防止webview被默认HTML的fontSize改写
*/
function htmlFontSize(){
  let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  let width = w > h ? h : w;
  let fz = ~~width/3.75;
  document.getElementsByTagName("html")[0].style.cssText = 'font-size: ' + fz + "px";
  let realfz = ~~(+window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize.replace('px','')*10000)/10000;
  if ( fz !== realfz ) {
    document.getElementsByTagName("html")[0].style.cssText = 'font-size: ' + fz * (fz / realfz) + "px";
  }
  document.documentElement.style.height = document.documentElement.clientHeight + 'px';
} htmlFontSize();

window.onresize = function(){
  htmlFontSize();
};