// 这里把 index.js 也作为一个模块去定义并加载，这样才其他地方可以通过 require('./index') 来加载它，如果用 seajs.use 的话就不行
define(function(require, exports, module){

  var $ = require('../lib/jquery');  // jquery模块
  var bs = require('../lib/bootstrap-3.0.0-dist/dist/js/bootstrap');  // bootstrap模块
  var _ = require('../main');  // main模块

  //ajax数据交互
  $.ajax({ 
    url: "../json/system_admins.json",
    type: 'GET', 
    data:{username:1111}, 
    success: function(json){
        var admins_list=json.admins_list;
        var dropdown1=json.dropdown1;
        var dropdown2=json.dropdown2;
        //遍历表格
        $.each(admins_list, function(commentIndex, comment){
            var templates="<tr><td>"+admins_list[commentIndex].id+"</td><td>"+admins_list[commentIndex].user_number+"</td><td>"+admins_list[commentIndex].user_name+"</td><td>"+admins_list[commentIndex].register_time+"</td></tr>"
            $(".form_table table").append(templates);
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

  //点击单个表格出现下面的表单信息
  $(".form_table table").on("click","tr",function(){
  	_.slideDown($(".table_detail"));
  	_.addActive($(this),$(this).siblings());
    //拿到这一行的信息在表单展示
    var user_number=$(this).find("td").eq(1).html();
    var user_name=$(this).find("td").eq(2).html();
    var register_time=$(this).find("td").eq(3).html();
    $("#user_number").val(user_number);
    $("#user_name").val(user_name);
    $("#register_time").val(register_time);
  });

  //点击新增用户，弹出modal
  $(".add").on("click",function(){
  	 $("#nowTime").val(_.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'));
  });

  //点击保存用户
  $(".save").on("click",function(){
    var remark=$("#remark").val();
    $.ajax({ 
    url: "../json/system_admins.json",
    type: 'GET', 
    data:{remark:remark}, 
    success: function(json){
        confirm("提示","保存成功");
      }});
  })

  //保存新建用户里面的数据
  $(".addSave").on("click",function(){
    var addRemark=$("#addRemark").val();
    var addUsername=$("#addUsername").val();
    var nowTime=$("#nowTime").val();
    $.ajax({ 
    url: "../json/system_admins.json",
    type: 'GET', 
    data:{addRemark:addRemark,addUsername:addUsername,nowTime:nowTime}, 
    success: function(json){
        if(json.save==1){
          confirm("提示","新建成功");
          $('#myModal').modal('hide');
        }
      }});
  })
})