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


function openToast(obj){
     var data={
        title:obj.title?obj.title:"",
        intro:obj.intro?obj.intro:""
     };
    var content='<div class="modal"></div> ' +
        '<div class="pop"> ' +
        '<p>'+data.intro+'</p> ' +
        '<div class="sure">确认' +
        '</div> ' +
        '</div>';
    $("body").append(content);

    var pop=document.getElementsByClassName("pop")[0];
    var modal=document.getElementsByClassName("modal")[0];

    popShow(pop,modal)
}



//打开模态框
function openModal(modal){
    modal.style.display="block";
}
//关闭模态框
function closeModal(modal){
    modal.style.display="none";
}

//弹出框打开时
function popShow(elm,modal){

    //打开模态框
    openModal(modal);

    //窗口变化时
    window.onresize=function(){
        popShow(elm);
    };
    //定位
    elm.style.display="block";
    var l=(document.documentElement.clientWidth-elm.offsetWidth)/2;
    var t=(document.documentElement.clientHeight-elm.offsetHeight)/2;
    elm.style.left=l+'px';
    elm.style.top=t+'px';  //定位高度等于滚轮高度加上可视窗高度

    //投递和取消事件
    //var send=elm.getElementsByTagName("a")[0];
    var sure=elm.getElementsByClassName("sure")[0];
    //点击确认时 模态弹出均消失
    sure.onclick=function(e){
        e.stopPropagation();
        elm.style.display="none";
        closeModal(modal);
    };

  /* //除弹出框外文档的任意位置点击时弹出框消失
   document.onclick=function(){
        elm.style.display="none";
        closeModal(modal);
   };*/

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
