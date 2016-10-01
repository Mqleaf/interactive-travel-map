/**
 * Created by dell on 2016/9/23.
 */
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
})