(function(globle , fun){
    globle.lyy = fun()
})(window,function () {
    'use strict';
    var _this = {
        name: 'lyy',
        version: '1.0.0',
//      baseUrl: 'file:///android_asset/apps/H5B95B5FF/www',
        baseUrl: 'http://127.0.0.1:8020/wuliu',
        timerDw: ''
    };
    
  
    
    
    _this.go = function(uri){
        _this.location(uri);
    };
    
    _this.location = function(uri){
        location.href = _this.baseUrl + uri;
    };

//将上一个页面的参数传给下一个页面，以？和&的方式
    _this.querys = function (attr){
        var url = location.search; //获取url中"?"符后的字串  
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            //截取&后循环
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);  //decodeURI()解决中文乱码
            }
        }
        if(attr){
            return theRequest[attr];
        }
        return theRequest;
    }
    
     _this.phoneBack = function() {
     	//		$(document).ready(function() {
     	//		
     	//		　　if (window.history && window.history.pushState) { 
     	//		
     	//		　　　　$(window).on('popstate', function () {
     	//		
     	//		　　　　　　 window.history.pushState('forward', null, '#'); 
     	//		
     	//		　　　　　　 window.history.forward(1); });
     	//		
     	//		　　　　 }
     	//		
     	//		　　　　　　 window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
     	//		
     	//		　　　　　　 window.history.forward(1);
     	//		
     	//		　　 });

     	document.addEventListener('plusready', function() {
     		var webview = plus.webview.currentWebview();
     		plus.key.addEventListener('backbutton', function() {
     			webview.canBack(function(e) {
     				if(e.canBack) {
     					webview.back();
     				} else {
     					//webview.close(); //hide,quit
     					//plus.runtime.quit();
     					mui.plusReady(function() {
     						//首页返回键处理
     						//处理逻辑：1秒内，连续两次按返回键，则退出应用；
     						var first = null;
     						plus.key.addEventListener('backbutton', function() {
     							//首次按键，提示‘再按一次退出应用’
     							if(!first) {
     								first = new Date().getTime();
     								mui.toast('再按一次退出应用');
     								setTimeout(function() {
     									first = null;
     								}, 1000);
     							} else {
     								if(new Date().getTime() - first < 1500) {
     									plus.runtime.quit();
     								}
     							}
     						}, false);
     					});
     				}
     			})
     		});
     	});

     }

   
   

    _this.saveAuth = function(authStr){
    	window.localStorage.setItem('auth', authStr); 
    	console.log(window.localStorage.auth);
    };

    _this.getAuth = function(){
    	var json = window.localStorage.getItem('auth');
		var jsonObj = JSON.parse(json);
		console.log(jsonObj);
		return jsonObj;
    };

    return  _this;
});
