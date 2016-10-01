/**
 * Created by dell on 2016/7/29.
 */
(function(){
    var points = document.querySelectorAll(".point");
    var em = document.getElementById("point-tooltip");
    var bgElements = document.querySelectorAll(".background__element");
    var contents = document.querySelectorAll(".point-content");
    var svg =document.getElementById("points");
    function throttle(fn, delay) {
        var allowSample = true;
        return function(e) {
            if (allowSample) {
                allowSample = false;
                setTimeout(function() { allowSample = true; }, delay);
                fn(e);
            }
        };
    }
    function getPositionRatio(){
        var dw = document.documentElement.clientWidth||document.body.clientWidth;
        var ratio = [];
        if(dw>768){
            var u = dw*0.8/913;
            ratio = [u,u] ;
        }else{
            var v = 440/913;
            ratio = [v,v];//已经不需要该数据，移动端不显示提示框
        }
        return ratio;
    }
    function pointReactCp(){
        for (var i=0;i<points.length;i++){
            //当鼠标移动到point上，显示提示框，增加背景图的class
            points[i].onmouseover=function(e){
                em.innerHTML = this.getAttribute("data-title");
                var bbox = this.getBBox();
                var rect = this.getBoundingClientRect();
                var ratio=getPositionRatio();
                var x = bbox.x*ratio[0];
                var y = bbox.y*ratio[1]-rect.height/ratio[1];
                em.style.position = "absolute";
                em.style.top = y +"px";
                em.style.left = x + "px";
                em.style.opacity="1";
                em.style.padding="0.3rem";
                console.log(em);
                var index = this.getAttribute("data-index");
                lunar.addClass(bgElements[index],"background__element-hover");
            };
            //当鼠标离开point，隐藏提示框，移除背景图class
            points[i].onmouseleave=function(){
                em.style.opacity="0";
                var index = this.getAttribute("data-index");
                lunar.removeClass(bgElements[index],"background__element-hover");
            };
            //点击point，显示背景图和内容
            points[i].onclick=function(){
                var index = this.getAttribute("data-index");
                lunar.addClass(bgElements[index],"background__element-click");
                lunar.addClass(contents[index],"point-content--current");
            };
            //点击背景图，关闭背景图和内容
            bgElements[i].onclick=function(){
                var index = this.getAttribute("data-index");
                lunar.removeClass(this,"background__element-click");
                lunar.removeClass(contents[index],"point-content--current");
            }
        }
    }
    function pointReactMobile(){
        for (var i=0;i<points.length;i++){
            //点击point，显示背景图和内容
            points[i].ontouchstart=function(){
                var index = this.getAttribute("data-index");
                lunar.addClass(bgElements[index],"background__element-click");
                lunar.addClass(contents[index],"point-content--current");
            };
            //点击背景图，关闭背景图和内容
            bgElements[i].ontouchend=function(){
                var index = this.getAttribute("data-index");
                lunar.removeClass(this,"background__element-click");
                lunar.removeClass(contents[index],"point-content--current");
            }
        }
    }
    function pointReact(){
        var dw = document.documentElement.clientWidth||document.body.clientWidth;
        if(dw>768){
            pointReactCp();
        }else{
            pointReactMobile();
        }
    }
    function init(){
        FastClick.attach(document.body);
        var dw = document.documentElement.clientWidth||document.body.clientWidth;
        if(dw>768){
            svg.setAttribute("viewBox","0 0 913 540");
        }else{
            svg.setAttribute("viewBox","60 90 500 360");
        }
        pointReact();
    }
    init();
    window.onresize=throttle(init,20);
})();