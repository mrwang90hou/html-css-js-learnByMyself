define(function(require, exports,modules){

  var $ = require('../lib/jquery');  // jquery模块
  var bs = require('../lib/bootstrap-3.0.0-dist/dist/js/bootstrap');
	var _ = require('../main');  // main模块

  //调用main.js的方法
  //_.addCurrent(x,y);
  
  //约束输入字数
  $("#user_name").keyup(function(){
	  if($("#user_name").val().length > 20){
      $("#user_name").val( $("#user_name").val().substring(0,20));
      confirm("提示","字数不能超过20个！");
    }
	});
  $("#home").keyup(function(){
    if($("#home").val().length > 40){
      $("#home").val( $("#home").val().substring(0,40));
      confirm("提示","字数不能超过40个！");
    }
  });

  $("#remark").keyup(function(){
     if($("#remark").val().length > 255){
        $("#remark").val( $("#remark").val().substring(0,255));
        confirm("提示","字数不能超过255个！");
     }
  });

  //ajax数据交互
  $.ajax({ 
    url: "../json/members.json",
    type: 'GET', 
  //data:{username:$("#username").val(), content:$("#content").val()}, 
    success: function(json){
        var admins_list=json.admins_list;
        var dropdown1=json.dropdown1;
        var dropdown2=json.dropdown2;
        //遍历表格
        $.each(admins_list, function(commentIndex, comment){
            var templates="<tr><td>"+admins_list[commentIndex].id+"</td><td>"+admins_list[commentIndex].user_number+"</td><td>"+admins_list[commentIndex].user_name+"</td><td>"+admins_list[commentIndex].register_time+"</td><td>"+admins_list[commentIndex].home+"</td></tr>"
            $(".form_table table").append(templates);
            $(".form_table table").on("click","tr",function(){
              _.slideDown($(".table_detail"));
              _.addActive($(this),$(this).siblings());
              //拿到这一行的信息在表单展示
              //var user=$(this).find("td").eq(1).html();
              if($(this).find("td").eq(0).html()==admins_list[commentIndex].id){
                $("#user_number").val(admins_list[commentIndex].user_number);
                $("#user_name").val(admins_list[commentIndex].user_name);
                $("#register_time").val(admins_list[commentIndex].register_time);
                $("#home").val(admins_list[commentIndex].home);
                if(admins_list[commentIndex].write_share=="是"){
                  $("#write_share").attr("checked",true);
                }else{
                  $("#write_share").attr("checked",false);
                }
                if(admins_list[commentIndex].read_share=="是"){
                  $("#read_share").attr("checked",true);
                }else{
                  $("#read_share").attr("checked",false);
                }
                $("#remark").val(admins_list[commentIndex].remark);
              }
            });
         });
        //遍历第一个下拉框
        $.each(dropdown1, function(commentIndex, comment){
            var templates="<li><a>"+dropdown1[commentIndex].select+"</a></li>"
            $(".tools_bar .dropdown:eq(0) ul").append(templates);
         });
        $.each(dropdown2, function(commentIndex, comment){
            var templates="<li><a>"+dropdown2[commentIndex].select+"</a></li>"
            $(".tools_bar .dropdown:eq(1) ul").append(templates);
         });
          //点击单个表格出现下面的表单信息
  
      }});

  //信息显示与隐藏
  // $(".table_detail").hide();
  // $(".table-striped").click(function(){
  //   $(".table_detail").show();
  // });
  // //点击单个表格出现下面的表单信息
  // $(".form_table table").on("click","tr",function(){
  //   _.slideDown($(".table_detail"));
  //   _.addActive($(this),$(this).siblings());
  //   //拿到这一行的信息在表单展示
  //   var user=$(this).find("td").eq(1).html();
  //   $("#user_number").val(user);
  //   user=$(this).find("td").eq(2).html();
  //   $("#user_name").val(user);
  //   user=$(this).find("td").eq(3).html();
  //   $("#register_time").val(user);
  //   user=$(this).find("td").eq(4).html();
  //   $("#home").val(user);
  // });

  //点击新增用户，弹出modal
  $(".btn_add").on("click",function(){
      $(".dialog_form input").val("");
     $("#nowTime").val(_.getNowFormatDate());
     $(".dialog_form .share input").attr("checked",false);
  });

  $(".btn_team").click(function(){
    confirm("提示","群成员信息修改成功！");
  });
   //侧边栏效果
  //$("#nav .nav_child>div a").addClass("current");
  // $("#nav .nav_child>div a").on("click",function(){
  //   $("this").removeClass("current");
    //$("this").addClass("current").siblings().removeClass("current");
  // });
})