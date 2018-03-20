// 这里把 index.js 也作为一个模块去定义并加载，这样才其他地方可以通过 require('./index') 来加载它，如果用 seajs.use 的话就不行
define(function(require, exports, module){
  var $ = require('../lib/jquery');  // jquery模块
  var bs = require('../lib/bootstrap-3.0.0-dist/dist/js/bootstrap');
  var _ = require('../main');  // main模块
  var bsm = require('../lib/bootstrap-treeview.min');
  var jqc = require('../lib/jquery.contextify.min');

  //约束输入字数
  $("#group_name").keyup(function(){
    if($("#group_name").val().length > 20){
      $("#group_name").val( $("#group_name").val().substring(0,20));
      confirm("提示","字数不能超过20个！");
    }
  });
  $("#group_adm_name").keyup(function(){
    if($("#group_adm_name").val().length > 20){
      $("#group_adm_name").val( $("#group_adm_name").val().substring(0,20));
      confirm("提示","字数不能超过20个！");
    }
  });

  $("#remark").keyup(function(){
     if($("#remark").val().length > 255){
        $("#remark").val( $("#remark").val().substring(0,255));
        confirm("提示","字数不能超过255个！");
     }
  });


    $.ajax({ 
    url: "../json/teams.json",
    type: 'GET', 
  //data:{username:$("#username").val(), content:$("#content").val()}, 
    success: function(json){
        var admins_list=json.admins_list;
        var dropdown1=json.dropdown1;
        var dropdown2=json.dropdown2;
        //遍历表格
        $.each(admins_list, function(commentIndex, comment){
            var templates="<tr><td>"+admins_list[commentIndex].id+"</td><td>"+admins_list[commentIndex].group_number+"</td><td>"+admins_list[commentIndex].group_name+"</td><td>"+admins_list[commentIndex].group_adm_name+"</td><td>"+admins_list[commentIndex].group_time+"</td><td>"+admins_list[commentIndex].group_root_name+"</td></tr>"
            $(".left_table table").append(templates);
            $(".left_table table").on("click","tr",function(){
              _.slideDown($(".table_detail"));
              _.addActive($(this),$(this).siblings());
              //拿到这一行的信息在表单展示
              //var user=$(this).find("td").eq(1).html();
              if($(this).find("td").eq(0).html()==admins_list[commentIndex].id){
                $("#group_number").val(admins_list[commentIndex].group_number);
                $("#group_name").val(admins_list[commentIndex].group_name);
                $("#group_adm_name").val(admins_list[commentIndex].group_adm_name);
                $("#group_time").val(admins_list[commentIndex].group_time);
                $("#group_root_name").val(admins_list[commentIndex].group_root_name);
                $("#remark").val(admins_list[commentIndex].remark);
              }
            });
         });
        var tree=json.tree;
        //创建文件树
         $('#tree').treeview({
      backColor: "#FFFFFF",
          color: "#428bca",
          enableLinks: true,
          data: tree
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

  //点击新增用户，弹出modal
  $(".btn_add").on("click",function(){
     $("#nowTime").val(_.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'));
  });
  $(".addSave").on("click",function(){
    var addRemark=$("#addRemark").val();
    var addRootName=$("#addRootName").val();
    var addGroupNane=$("#addGroupNane").val();
    var addAdmNane=$("#addAdmNane").val();
    var nowTime=$("#nowTime").val();
    $.ajax({ 
    url: "../json/teams.json",
    type: 'GET', 
    data:{addRemark:addRemark,addRootName:addRootName,nowTime:nowTime,addGroupNane:addGroupNane,addAdmNane:addAdmNane}, 
    success: function(json){
        if(json.save==1){
          confirm("提示","新建成功");
          $('#myModal').modal('hide');
        }
      }});
  })

 //点击保存用户
  $(".save").on("click",function(){
    var remark=$("#remark").val();
    $.ajax({ 
    url: "../json/teams.json",
    type: 'GET', 
    data:{remark:remark}, 
    success: function(json){
        confirm("提示","保存成功");
      }});
  })

    /*右键菜单*/
    var options = {items:[
    {header: '菜单'},
    {text: '新增', href: '#'},
    {text: '删除', onclick: function(e) {
      alert('删除 ');
    }}

  ]}
  $('#tree').contextify(options);

});
  