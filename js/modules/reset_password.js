define(function(require, exports,modules){

  var $ = require('../lib/jquery');  // jquery模块
  var bs = require('../lib/bootstrap-3.0.0-dist/dist/js/bootstrap');  // bootstrap模块
	var _ = require('../main');  // main模块

  //调用main.js的方法
  //_.addCurrent(x,y);
   $(".login-footer .btn_password").click(function(){
    var old_password=$("#old_password").val();
    var password=$("#password").val();
    var repassword=$("#repassword").val();

    if(old_password==""){
      confirm("提示","原始密码不正确或为空！");
    }
    else if(password==""){
       confirm("提示","请输入新密码！");
    }
    else if(repassword==""){
      confirm("提示","请输入确认密码！");
    }
    else if((password!=repassword)){
      confirm("提示","您两次输入的密码不一致！");
    }
    else{
      confirm("提示","密码修改成功！");
      //location.href="reset_password.html";
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
        //遍历第一个下拉框
        $.each(dropdown1, function(commentIndex, comment){
            var templates="<li><a>"+dropdown1[commentIndex].select+"</a></li>"
            $(".tools_bar .dropdown:eq(0) ul").append(templates);
         });
        $.each(dropdown2, function(commentIndex, comment){
            var templates="<li><a>"+dropdown2[commentIndex].select+"</a></li>"
            $(".tools_bar .dropdown:eq(1) ul").append(templates);
         });
  }});
})