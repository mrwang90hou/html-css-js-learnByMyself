// 这里把 index.js 也作为一个模块去定义并加载，这样才其他地方可以通过 require('./index') 来加载它，如果用 seajs.use 的话就不行
define(function(require, exports, module){

  var $ = require('../lib/jquery');  // jquery模块
  var bs = require('../lib/bootstrap-3.0.0-dist/dist/js/bootstrap');  // bootstrap模块
  var _ = require('../main');  // main模块

   //点击确定按钮，弹出提示框
  $(".login .sure").click(function(){
  	var username=$("#username").val();
  	var password=$("#password").val();
  	var repassword=$("#repassword").val();
  	var groupname=$("#groupname").val();
  	var rootname=$("#rootname").val();
  	var remark=$("#remark").val();
  	var retMore = /^[a-zA-Z0-9_]{1,20}$/;
  	var retGroupname = /^[a-zA-Z0-9_]{1,40}$/;
  	var retRemark = /^[a-zA-Z0-9_]{0,255}$/;
  	if(retMore.test(username)==false){
  		
  		$("#warning .modal-body").html("管理员名称格式有误！");
  	}
  	else if(retMore.test(password)==false){
  		$("#warning .modal-body").html("管理员密码格式有误！");
  	}
  	else if(retGroupname.test(groupname)==false){
  		$("#warning .modal-body").html("群组名称格式有误！");
  	}
  	else if(retMore.test(rootname)==false){
  		$("#warning .modal-body").html("根目录名称格式有误！");
  	}
  	else if(retRemark.test(remark)==false){
  		$("#warning .modal-body").html("备注已超出长度！");
  	}
  	else if((password!=repassword)){
  		$("#warning .modal-body").html("您两次输入的密码不一致！");
  	}
  	else{
      $.ajax({
        url:"../json/team_create.json",
        type:'GET',
        data: {"username":username,"password":password,"groupname":groupname,"rootname":rootname,"remark":remark}, 
        success:function(data){
          if(data[0].register==1){
              //当后台返回值为1的时候
              $("#warning .modal-body").html("注册成功！2秒后跳转到群组信息页面");
              setTimeout('location.href="team_info.html"',2000);
          }
        }
      })
  		
  	}
  	$('#warning').modal();
  })

})