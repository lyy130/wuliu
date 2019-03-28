$(function() {
	// 1.通过ajax获取数据
	// 2.根据数据动态渲染
	//  2.1 准备数据
	//  2.2 吧数据转换成html格式（模板引擎）
	//  2.3 渲染
	// $('body').on('click','.zc',function (e) {

	// e.preventDefault();
	// console.log("aaa")

	lyy.phoneBack(); //判断手机物理返回键

	var data = {
		//		'mobile': '13845201546'
	};
	var jsonObj = lyy.getAuth() //获取localstorage里面账号和密码
	var phone = jsonObj.mobile;
	data.mobile = phone;
	//      console.log(data.mobile)
	var data = JSON.stringify(data);

	function ajaxWuliu() {
		$.ajax({
			type: 'post',
			url: 'https://www.56-china.com:443/ychgovback/sj/waybillList',
			contentType: 'application/json',
			dataType: 'json',
			data: data,
			success: function(res) {
				console.log(res.data);
				if(res.success) { /*如果输入正确，弹出注册成功   跳转到登录界面*/
					// alert("未查询到相关运单")
					var wuliuHtml = template('wuliuTemplate', res.data);
					// 把字符串渲染到页面
					if(wuliuHtml == '') {
						$('.wuliuList').html(未查询到您的订单);
					} else {
						$('.wuliuList').html(wuliuHtml);
					}
					bindClick();
					// $('btn').html('注册');
				} else {
					alert('操作不成功');

				}
			}
		});
	}
	ajaxWuliu();
	//	var timerWuliu = setInterval(function(){
	//		ajaxWuliu();
	//	},10000);

	function bindClick() {
		$('.wuliuList>ul .jj>span').on('click', function(e) {
			var status = $(this).attr('status');
			if(status == '新建') {
				var no = $(this).attr('no');
				positionBtn(no);
				$(this).removeClass("span-active ");
				$(this).addClass("span-active2");
				$(this).html('新建');
			}
			return false;
		});

		$('.wuliuList>ul').on('click', function(e) {

			//		if(e.test == 1){
			//			console.log(e,'阻止big');
			//		}else{
			//			console.log(e,'不阻止big');
			//		}
			console.log('我是大盒子')
			var no = $(this).attr('no');
			lyy.go('/wuliu-info.html?no=' + no);
		});
	}

	//阻止滑动时触发点击事件
	function transformBox(obj, value, time) {
		var time = time ? time : 0;
		obj.css({
			'-webkit-transform': "translate(" + value + "px)",
			'-webkit-transition': time + 'ms linear'
		});
	}
	args = {
		iniAngle: 15,
		speed: 300,
		sCallback: function(tPoint) {
			//			$("#showT").html("touchStart");
		},
		mCallback: function(tPoint) {
			var _this = tPoint.self,
				_inner = _this.find(".wuliuList>ul"),
				innerW = _inner.width();
			var offset = tPoint.mX + tPoint.count * innerW / 4;
			if(Math.abs(tPoint.angle) < 15) {
				transformBox(_inner, offset, 0);
			}
			//$("#showT").html(tPoint.gStartDis+"  "+tPoint.gEndDis);
			//$("#showT").html(tPoint.rotation+"  "+tPoint.gStartAngle+"  "+tPoint.gEndAngle);
			//			$("#showT").html("角度:"+tPoint.angle+"  时间:"+tPoint.duration+"<br>X轴移动距离"+tPoint.mX+"  Y轴移动距离："+tPoint.mY);
		},
		eCallback: function(tPoint) {
			var _this = tPoint.self,
				_inner = _this.find(".wuliuList>ul"),
				innerW = _inner.width(),
				count = tPoint.count;

			function slide(d) {
				switch(d) {
					case "left":
						--count;
						break;
					case "right":
						++count;
				}
				count = (count == 1 || count == -tPoint.total) ? tPoint.count : count;
				var offset = count * innerW / tPoint.total;
				transformBox(_inner, offset, tPoint.speed);
			}
			slide(tPoint.direction);
			//			$("#showT").html("X-Y轴移动:"+tPoint.mX+"px | "+tPoint.mY+"px<br>X-Y轴限定:"+tPoint.iniL+" | "+tPoint.iniL+"<br>手势滑动方向："+tPoint.direction);
			tPoint.setAttr("count", count);
		}
	}
	$("body").Swipe(args);
	$(".left i").on('click', function() {
		lyy.go('/login.html')
	})
});
// });