(function resize() {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
    document.documentElement.style.height = document.documentElement.clientHeight + 'px';
})();

window.onresize = function(){
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
    document.documentElement.style.height = document.documentElement.clientHeight + 'px';
};