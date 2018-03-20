// 这里把 index.js 也作为一个模块去定义并加载，这样才其他地方可以通过 require('./index') 来加载它，如果用 seajs.use 的话就不行
define(function(require, exports, module){

  var $ = require('../lib/jquery');  // jquery模块
  var bs = require('../lib/bootstrap-3.0.0-dist/dist/js/bootstrap');  // bootstrap模块
  var _ = require('../main');  // main模块

  //点击登录按钮，弹出提示框
  $(".login_btn").click(function(){
  	var username=$("#username").val();
  	var password=$("#password").val();
  	var ret = /^[a-zA-Z0-9]{5,20}$/;
  	if(ret.test(username)&&ret.test(password)){
      $.ajax({
        url:"../json/login.json",
        type:'GET',
        data: {"username":username,"password":password}, 
        success:function(data){
          if(data[0].login==1){
              //当后台返回值为1的时候
              location.href="system_index.html";
          }
        }
      })
  	}else{
  		$('#warning').modal();
  	}
  })
})
