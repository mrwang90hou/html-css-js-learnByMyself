define(function(require, exports,modules){

  var $ = require('../lib/jquery');  // jquery模块
  var bs = require('../lib/bootstrap-3.0.0-dist/dist/js/bootstrap');
	var _ = require('../main');  // main模块

  //ajax数据交互
  $.ajax({ 
    url: "../json/members.json",
    type: 'GET', 
  //data:{username:$("#username").val(), content:$("#content").val()}, 
    success: function(json){
        var admins_list=json.admins_list;
        var dropdown1=json.dropdown1;
        var dropdown2=json.dropdown2;
        var dropdown3=json.dropdown3;
        //遍历表格
        $.each(admins_list, function(commentIndex, comment){
            if(admins_list[commentIndex].id==2){
              $('#team_number').val(admins_list[commentIndex].user_number);
              $('#user_name').val(admins_list[commentIndex].user_name);
              $('#register_time').val(admins_list[commentIndex].register_time);
              $('#home').val(admins_list[commentIndex].home);
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
        //遍历第一个下拉框
        $.each(dropdown1, function(commentIndex, comment){
            var templates="<li><a>"+dropdown1[commentIndex].select+"</a></li>"
            $(".tools_bar .dropdown:eq(0) ul").append(templates);
         });
        $.each(dropdown2, function(commentIndex, comment){
            var templates="<li><a>"+dropdown2[commentIndex].select+"</a></li>"
            $(".tools_bar .dropdown:eq(1) ul").append(templates);
         });
        $.each(dropdown3, function(commentIndex, comment){
            var templates="<li><a>"+dropdown3[commentIndex].select+"</a></li>"
            $(".tools_bar .dropdown:eq(2) ul").append(templates);
         });
      }});
	$(".table_detail").show();

	$("#remark").keyup(function(){
   	if($("#remark").val().length > 255){
     	  $("#remark").val( $("#remark").val().substring(0,255));
       	confirm("提示","字数不能超过255个！");
    
 	  }
	});
  $(".btn_team").click(function(){
  confirm("提示","群组信息修改成功！");
})
});