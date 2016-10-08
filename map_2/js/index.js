/**
 * Created by dell on 2016/9/23.
 */
(function(){
    var map = [];
    var mapSrc = ["img/map/map.jpg","img/map/map_min.jpg"];
    var mapLen = mapSrc.length;
    for(var i=0;i<mapLen;i++){
        map[i] = new Image();
        map[i].src = mapSrc[i];
    }
})();
$(document).ready(function(){
    $("#realcontent").load("map.html");
    $("#tab li").each(function(index){
        $(this).click(function(){
            $("#tab li.tabin").removeClass("tabin");
            $(this).addClass("tabin");
            if(index==0){
                $("#realcontent").load("map.html");
            }else if(index==1){
                $("#realcontent").load("route.html");
            }else if(index==2){
                $("#realcontent").load("note.html");
            }
        });
    });
    FastClick.attach(document.body);
    (function(){
        var preloadImage = [];
        var preloadSrc = ["img/route_press/caodian.jpg","img/route_press/chamagudao.jpeg","img/route_press/changjiangdiyiwan.jpg","img/route_press/heilongtan.jpeg","img/route_press/lanyuegu.jpg",
            "img/route_press/mufu.jpeg","img/route_press/shanghutiao.jpg","img/route_press/shigu1.jpg","img/route_press/shigujie.jpg","img/route_press/sifangjie1.jpeg",
            "img/route_press/xueshan.jpg","img/route_press/yuchuan.jpg","img/1.svg","img/3.svg"];
        var len = preloadSrc.length;
        for(var i=0;i<len;i++){
            preloadImage[i] = new Image();
            preloadImage[i].src = preloadSrc[i];
        }
    })();

})
