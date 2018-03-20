// 这里把 index.js 也作为一个模块去定义并加载，这样才其他地方可以通过 require('./index') 来加载它，如果用 seajs.use 的话就不行
define(function(require, exports, module){

  var $ = require('../lib/jquery');  // jquery模块
  var bs = require('../lib/bootstrap-3.0.0-dist/dist/js/bootstrap');  // bootstrap模块
  var _ = require('../main');  // main模块

  //ajax数据交互
  $.ajax({ 
    url: "../json/system_index.json",
    type: 'GET', 
    success: function(json){
        var dropdown1=json.dropdown1;
        var dropdown2=json.dropdown2;
        //遍历第一个下拉框
        $.each(dropdown1, function(commentIndex, comment){
            var templates="<li><a>"+dropdown1[commentIndex].select+"</a></li>"
            $(".tools_bar .dropdown:eq(0) ul").append(templates);
         });
         //遍历第一个下拉框
        $.each(dropdown2, function(commentIndex, comment){
            var templates="<li><a>"+dropdown2[commentIndex].select+"</a></li>"
            $(".tools_bar .dropdown:eq(1) ul").append(templates);
         });
      }});
})