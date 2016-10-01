/**
 * Created by dell on 2016/9/23.
 */
$(document).ready(function(){
    function routeSlide(){
        var timeoutid;
        $(".pos-img").mouseover(function(){
            var that = this;
            timeoutid = setTimeout(function(){
                $(that).next().slideDown(200);
            },300);
        }).mouseout(function(){
            $(this).next().slideUp(200);
            clearTimeout(timeoutid);
        });
    }
    routeSlide();
})