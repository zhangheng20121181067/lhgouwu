/**
 * Created by zh on 2017/5/27.
 */



/*取窗口滚动条高度*/
function getScrollTop(){
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop) {
        scrollTop=document.documentElement.scrollTop;
    } else if(document.body) {
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}

var body=document.getElementsByTagName("body")[0];
var content;
function openToast(obj){
    var data={
      //  title:obj.title?obj.title:"title",
        intro:obj.intro?obj.intro:""
    };

     content=document.createElement("div");  //新添加

     content.innerHTML='<div class="modal"></div> ' +
         '<div class="pop"> ' +

         '<p>'+data.intro+'</p> ' +
         '<div class="sure">确认' +
         '</div> ' +
         '</div>';
    body.appendChild(content);


    var pop=content.getElementsByClassName("pop")[0];
    var modal=content.getElementsByClassName("modal")[0];
    modal.style.display="block";
    pop.style.display="block";
    popShow(pop,modal);
}



//弹出框打开时
function popShow(elm,modal){

    //窗口变化时
    window.onresize=function(){
        popShow(elm);
    };
    //定位
    var l=(document.documentElement.clientWidth-elm.offsetWidth)/2;
    var t=(document.documentElement.clientHeight-elm.offsetHeight)/2;
    elm.style.left=l+'px';
    elm.style.top=t+'px';  //定位高度等于滚轮高度加上可视窗高度


    var sure=elm.getElementsByClassName("sure")[0];
    //点击确认时 模态弹出均消失
    sure.onclick=function(e){
        e.stopPropagation();
        body.removeChild(content);
    };

    //阻止弹出框冒泡
   elm.onclick=function(event) {
        event = event ? event : window.event;
       // var obj = event.srcElement ? event.srcElement : event.target;
        if (event && event.stopPropagation) {
            // this code is for Mozilla and Opera
            event.stopPropagation();
        } else if (window.event) {
            // this code is for IE
            window.event.cancelBubble = true;
        }
   }
}
