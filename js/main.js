//重写confirm
function confirm(title, msg) {
  show_(title, msg);
}

function show_(title, msg){
	var _html = "";
	_html += '<div class="black"><div id="mb_con" class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close" id="mb_ico"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">'+title+'</h4></div><div class="modal-body">'+msg+'</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" id="mb_btn_no">关闭</button><button type="button" class="btn btn-primary" id="mb_btn_ok" style="margin-left:10px">确定</button></div></div></div></div>'
	//必须先将_html添加到body，再设置Css样式
	$("body").append(_html); 
	GenerateCss();
}
//生成Css
function GenerateCss(){
 	$(".black").css({position:"fixed",background:"rgba(0,0,0,0.6)",left:"0",right:"0",bottom:"0",top:"0","z-index":"9999"});
    $("#mb_con").css({ position: 'fixed'});
 
    var _widht = document.documentElement.clientWidth; //屏幕宽
    var _height = document.documentElement.clientHeight; //屏幕高
 
    var boxWidth = $("#mb_con").width();
    var boxHeight = $("#mb_con").height();
 
    //让提示框居中
    $("#mb_con").css({ top: (_height - boxHeight) / 2 + "px", left: (_widht - boxWidth) / 2 + "px" });
}

define(function(require, exports, module){
	var main={
		//点击增加current事件
	    slideDown:function(ele){
	      ele.slideDown();
	    },
	    //增加active
	    addActive:function(ele1,ele2){
	    	ele1.addClass("active");
	    	ele2.removeClass("active");
	    },
	    //获取当前时间
	    formatDate:function(date, fmt){
		   date = date == undefined ? new Date() : date;
		    date = typeof date == 'number' ? new Date(date) : date;
		    fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
		    var obj =
		    {
		        'y': date.getFullYear(), // 年份，注意必须用getFullYear
		        'M': date.getMonth() + 1, // 月份，注意是从0-11
		        'd': date.getDate(), // 日期
		        'q': Math.floor((date.getMonth() + 3) / 3), // 季度
		        'w': date.getDay(), // 星期，注意是0-6
		        'H': date.getHours(), // 24小时制
		        'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
		        'm': date.getMinutes(), // 分钟
		        's': date.getSeconds(), // 秒
		        'S': date.getMilliseconds() // 毫秒
		    };
		    var week = ['天', '一', '二', '三', '四', '五', '六'];
		    for(var i in obj)
		    {
		        fmt = fmt.replace(new RegExp(i+'+', 'g'), function(m)
		        {
		            var val = obj[i] + '';
		            if(i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
		            for(var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
		            return m.length == 1 ? val : val.substring(val.length - m.length);
		        });
		    }
		    return fmt;
		 }
	}

	//点击confirm取消和确定按钮
	$("body").on("click","#mb_btn_no,#mb_ico,#mb_btn_ok",function () {
	  	$(".black").remove();
	});

	//模块导出
	module.exports=main;
});