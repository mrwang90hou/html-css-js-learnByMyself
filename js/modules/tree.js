 define(function(require, exports,modules){

  var $ = require('../lib/jquery');  // jquery模块
  var bs = require('../lib/bootstrap-3.0.0-dist/dist/js/bootstrap');
  var _ = require('../main');  // main模块
  var bsm = require('../lib/bootstrap-treeview.min');
  var jqc = require('../lib/jquery.contextify.min');

  //ajax数据交互
  $.ajax({ 
    url: "../json/trees.json",
    type: 'GET', 
  //data:{username:$("#username").val(), content:$("#content").val()}, 
    success: function(json){
  		var tree=json.tree;
        var dropdown1=json.dropdown1;
        var dropdown2=json.dropdown2;
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
        //遍历第二个下拉框
        $.each(dropdown2, function(commentIndex, comment){
            var templates="<li><a>"+dropdown2[commentIndex].select+"</a></li>"
            $(".tools_bar .dropdown:eq(1) ul").append(templates);
         });
      }});
    /*右键菜单*/
	  var options = {items:[
	  {header: '菜单'},
	  {text: '新增', href: '#'},
	  {text: '删除', onclick: function(e) {
	    alert('删除 ');
	  }},
	  {divider: true},//下划线
	  {text: '播放', onclick:function(e){
	  	    var arr = $('#tree').treeview('getSelected');
            for (var key in arr) {
                if(arr[key].id=="00001"){
                	$("#video").attr("src","../video/09.mp4");
                }
                 if(arr[key].id=="00002"){
                	$("#video").attr("src","../video/08.mp4");
                }
            }

	  	}
	  } 
	]}
	$('#tree').contextify(options);
/*右键菜单*/
});


