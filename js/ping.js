 var pageSize = 10;

 function getmyHtml(page, pageSize) {
     $.ajax({
         //  url: "http://192.168.0.222:8080/car-management/carmaintain/screen.action",
         url: "http://localhost/car/defcar/json/screen.json",
         //  url: "https://wangyifannn.github.io/defcar1/json/screen.json",
         type: "get",
         data: {
             page: page,
             size: pageSize
         },
         success: function(res) {
             console.log(res);
             var pageCount = res.pageBean.rows;
             console.log(pageCount);
             var pagenum = pageCount.length / pageSize;
             var pageBox = "";
             var pageBox_ul = "";
             var pageBox_li = "";
             console.log(pagenum);
             for (var i = 0; i < pageCount.length; i++) {
                 var a = "";
                 if (pageCount[i].status == null) {
                     a = '';
                 } else if (pageCount[i].status == "排队中") {
                     a = '<span style="color:#dd1431;width:100%;weight:bold;">排队中</span>';
                 } else if (pageCount[i].status == "维修中") {
                     a = '<span style="color:#1bcbac;width:100%;weight:bold;">维修中</span>';
                 } else if (pageCount[i].status == "已完成") {
                     a = '<span style="color:#eb7a00;width:100%;weight:bold;">已完成</span>';
                 }
                 pageBox_li += '<li style="margin-top:0px;"><span class="list1">' + pageCount[i].vsn +
                     '</span><span class="list2">' + pageCount[i].applyPeople + '</span><span class="list3">' + pageCount[i].applyTime +
                     '</span><span class="list4">' + pageCount[i].operator +
                     '</span><span class="list5">' + a + '</span>' +
                     '</span><span class="list6">' + pageCount[i].fin_park + '</span></li>';
             }
             for (var page = 0; page < pagenum; page++) {
                 if (page == 0) {
                     pageBox_ul = '<div class="item active">' + pageBox_li + '</div>';
                     var page_ol = '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>';
                 } else {
                     pageBox_ul += '<div class="item">' + pageBox_li + '</div>';
                     page_ol += '<li data-target="#myCarousel" data-slide-to="' + page + '"></li>';
                 }
             }
             $(".carousel-indicators").html(page_ol);
             $(".carousel-inner").html(pageBox_ul);

             if (isFF() || isChrome()) {
                 $("head").append("<script type='text/javascript' src='../assets/js/circleChart.js'>" + '<' + "/script>");
                 //  console.log($(document.body).width());
                 //  if ($(document.body).width() >= 3800) {
                 //  console.log($(document.body).width());
                 //  $("ul.line li span").css("fontSize", "40px");
                 //  $("ul.title li span").css("fontSize", "48px");
                 //  $("ul.title").css("margin-bottom", "7px");
                 //  $("ul.line li").css({
                 //      "border-bottom-width": "5px",
                 //      "border-bottom-width": "5px"
                 //  });
                 $(".circleChart#0").circleChart({
                     size: 70,
                     color: "#E41937",
                     backgroundColor: "#eee",
                     value: res.queuepercentage,
                     text: 0,
                     onDraw: function(el, circle) {
                         circle.text(Math.round(circle.value) + "%");
                     }
                 });
                 $(".circleChart#1").circleChart({
                     size: 70,
                     color: "#2ff1cf",
                     backgroundColor: "#eee",
                     value: res.currentpercentage,
                     text: 0,
                     top: 50,
                     onDraw: function(el, circle) {
                         circle.text(Math.round(circle.value) + "%");
                     }
                 });
                 $(".circleChart#2").circleChart({
                     size: 70,
                     color: "#eb7a00",
                     backgroundColor: "#eee",
                     value: res.completepercentage,
                     text: 0,
                     onDraw: function(el, circle) {
                         circle.text(Math.round(circle.value) + "%");
                     }
                 });
                 //  }
             }
         }
     })
 }

 function getmyData(page, pageSize) {
     $.ajax({
         //  url: "http://192.168.0.222:8080/car-management/carmaintain/screen.action",
         url: "http://localhost/car/defcar/json/screen.json",
         //  url: "https://wangyifannn.github.io/defcar1/json/screen.json",
         data: {
             page: page,
             size: pageSize
         },
         success: function(res) {
             console.log(res);
             var pageCount = res.pageBean.rows;
             console.log(pageCount);
             var pageBox_li = "";
             for (var i = 0; i < pageCount.length; i++) {
                 var a = "";
                 if (pageCount[i].status == null) {
                     a = '';
                 } else if (pageCount[i].status == "排队中") {
                     a = '<span style="color:#dd1431;width:100%;weight:bold;">排队中</span>';
                 } else if (pageCount[i].status == "维修中") {
                     a = '<span style="color:#1bcbac;width:100%;weight:bold;">维修中</span>';
                 } else if (pageCount[i].status == "已完成") {
                     a = '<span style="color:#eb7a00;width:100%;weight:bold;">已完成</span>';
                 }
                 pageBox_li += '<li style="margin-top:0px;"><span class="list1">' + pageCount[i].vsn +
                     '</span><span class="list2">' + pageCount[i].applyPeople + '</span><span class="list3">' + pageCount[i].applyTime +
                     '</span><span class="list4">' + pageCount[i].operator +
                     '</span><span class="list5">' + a + '</span>' +
                     '</span><span class="list6">' + pageCount[i].fin_park + '</span></li>';
             }
             $(".carousel-inner item").eq(page).html(pageBox_li);
         }
     })
 }
 getmyHtml(1, pageSize);
 setInterval(function() {
     getmyHtml(1, pageSize);
 }, 8000)

 $('#myCarousel').on('slide.bs.carousel', function(event) {
     var $hoder = $('#myCarousel').find('.item'),
         $items = $(event.relatedTarget);
     //getIndex就是轮播到当前位置的索引
     var getIndex = $hoder.index($items);
     console.log(getIndex);
     getmyData(getIndex, pageSize);
 })

 // 天气
 $.ajax({
     url: 'https://restapi.amap.com/v3/weather/weatherInfo',
     type: "post",
     data: {
         key: "dfb9a576fbcb2c9a13a65ab736e47004",
         city: "上海市",
         extensions: "all"
     },
     success: function(res) {
         console.log(res.forecasts[0]);
         var obj = res.forecasts[0].casts;
         console.log(obj);
         var weathericon = "";
         if (obj[0].dayweather == "多云") {
             weathericon = '<i class="iconfont icon-duoyun"></i>';
         } else if (obj[0].dayweather == "晴") {
             weathericon = '<i class="iconfont icon-qing"></i>';
         } else if (obj[0].dayweather == "阴天") {
             weathericon = '<i class="iconfont icon-yintian"></i>';
         } else {
             weathericon = '<i class="iconfont icon-yu"></i>';
         }
         var cast = '<div><span>' + weathericon + '</span><span>' + obj[0].daytemp + '℃</span>' +
             '</div><div class="font_smalll"><span class="dayweather">' + obj[0].dayweather + '</span><span>风级' + obj[0].daypower + '</span></div > '
         $(".weather_group").html(cast);
     }
 })

 function isFF() {
     return navigator.userAgent.indexOf("Firefox") != -1;
 }

 function isChrome() {
     return navigator.userAgent.indexOf("Chrome") > -1;
 }

 function formatterDate() {
     var date = new Date();
     var month = date.getMonth() + 1;
     var datetime = date.getFullYear() +
         "/" // "年"
         +
         (month >= 10 ? month : "0" + month) +
         "/" // "月"
         +
         (date.getDate() < 10 ? "0" + date.getDate() : date
             .getDate()) +
         "";
     return datetime;
 }


 function formatterDateTime() {
     var date = new Date()
     var month = date.getMonth() + 1;
     var datetimehour = (date.getHours() < 10 ? "0" + date.getHours() : date
             .getHours()) +
         ":" +
         (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
             .getMinutes()) +
         ":" +
         (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
             .getSeconds());
     return datetimehour;
 }

 function formatterDay() {
     var mydate = new Date();
     var myday = mydate.getDay() //注:0-6对应为星期日到星期六 
     if (myday == 0) {
         return "星期日";
     } else if (myday == 1) {
         return "星期一";
     } else if (myday == 2) {
         return "星期二";
     } else if (myday == 3) {
         return "星期三";
     } else if (myday == 4) {
         return "星期四";
     } else if (myday == 5) {
         return "星期五";
     } else if (myday == 6) {
         return "星期六";
     }
 }

 setInterval(function() {
     $(".data").html(formatterDate());
     $(".datatime").html(formatterDateTime());
     $(".day").html(formatterDay());
 }, 1000);
 // 早上刷新一次，下午刷新一次？
 // 字体大小变化
 if ($(document.body).width() >= 3800) {
     console.log($(document.body).width());
     $("ul.line li span").css("fontSize", "40px");
     $("ul.title li span").css("fontSize", "48px");
     $("ul.title").css("margin-bottom", "7px");
     $("ul.line li").css({
         "border-bottom-width": "5px",
         "border-bottom-width": "5px"
     });
 }
 var viewFullScreen = document.getElementById("btn");
 if (viewFullScreen) {
     viewFullScreen.addEventListener("click", function() {
         var docElm = document.documentElement;
         if (docElm.requestFullscreen) {
             docElm.requestFullscreen();
         } else if (docElm.msRequestFullscreen) {
             docElm = document.body; //overwrite the element (for IE) 
             docElm.msRequestFullscreen();
         } else if (docElm.mozRequestFullScreen) {
             docElm.mozRequestFullScreen();
         } else if (docElm.webkitRequestFullScreen) {
             docElm.webkitRequestFullScreen();
         }
     }, false);
 }