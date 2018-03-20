define(function(require, exports,modules){

  	var $ = require('../lib/jquery');  // jquery模块
  	var bs = require('../lib/bootstrap-3.0.0-dist/dist/js/bootstrap');
	 var _ = require('../main');  // main模块

	$(".table_detail").show();

  //ajax数据交互
  $.ajax({ 
    url: "../json/parameters.json",
    type: 'GET', 
  //data:{username:$("#username").val(), content:$("#content").val()}, 
    success: function(json){
        var parameters=json.parameters;
        var dropdown1=json.dropdown1;
        var dropdown2=json.dropdown2;
        //遍历表格
        $.each(parameters, function(commentIndex, comment){
        	//动态展示表单
        	if(parameters[commentIndex].disabled==0)
        	{
           		var templates="<span>"+parameters[commentIndex].name+"：</span><span><input type='text' name='' class='form-control' value='"+parameters[commentIndex].value+"'></span>";
            }
            else{
            	var templates="<span>"+parameters[commentIndex].name+"：</span><span><input type='text' name='' disabled='disabled' class='form-control' value='"+parameters[commentIndex].value+" '></span>";
            }
            $(".box .table_detail .double_control").append(templates);
           
         });
        //遍历第一个下拉框
        $.each(dropdown1, function(commentIndex, comment){
            var templates="<li><a>"+dropdown1[commentIndex].select+"</a></li>"
            $(".tools_bar .dropdown:eq(0) ul").append(templates);
         });
        //遍历第二个下拉框
        $.each(dropdown2, function(commentIndex, comment){
            var templates="<li><a>"+dropdown2[commentIndex].select+"</a></li>"
            $(".tools_bar .dropdown:eq(1) ul").append(templates);
         });
      }});

    $(".btn_team").click(function(){
        confirm("提示","群组信息修改成功！");
    })
});