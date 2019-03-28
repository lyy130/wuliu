	//点击接单进行定位
	var timerDw;
	var positionBtn = function(no) {
//		$('.wuliuList .jj>span').on('click', function(event) {
//			var no = $(this).attr('no');
//			event.preventDefault(); //阻止默认事件
//			event.stopPropagation(); //阻止冒泡事件
			//      	alert('hahahhaa')
			getLocation(); /*初始的时候定位*/
			
			//			$(this).attr("class", "span-active2 ");
			//				$(this).css(' background','white');
			//				$(this).css(' color','orangered');
			//				$(this).css('border','none');
			 timerDw = setInterval(function() { /*每隔10s定位一次*/
				getLocation();
			}, 10000)

			function getLocation() {
				console.log('pistioning');
				console.log(no);
				if(navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(showPosition, showError);
				} else {
					alert("您的设备不支持地理定位。");
				}
			}

			//我们先来看一下函数showError(),它规定获取用户地理位置失败时的一些错误代码处理方式：
			function showError(error) {
				switch(error.code) {
					case error.PERMISSION_DENIED:
						// alert("定位失败,用户拒绝请求地理定位");
						break;
					case error.POSITION_UNAVAILABLE:
						// alert("定位失败,位置信息是不可用");
						break;
					case error.TIMEOUT:
						// alert("定位失败,请求获取用户位置超时");
						break;
					case error.UNKNOWN_ERROR:
						// alert("定位失败,定位系统失效");
						break;
				}
				console.log('PositionError');
			}

			//　我们再来看函数showPosition(),调用coords的latitude和longitude即可获取到用户的纬度和经度

			// function showPosition(position){
			// //     // var lat = position.coords.latitude; //纬度
			// //     // var lag = position.coords.longitude; //经度
			// //     // alert('纬度:'+lat+',经度:'+lag);
			// // }
			function showPosition(position) {
				var latlon = position.coords.latitude + ',' + position.coords.longitude;
				var lat = position.coords.latitude; //纬度
				var lag = position.coords.longitude; //经度
				console.log('纬度:' + lat + ',经度:' + lag);
				dataDw = {
					"longitude": lat,
					"latitude": lag,
					'scheduleWaybillCode':no
				};
				var jsonObj = lyy.getAuth()  //获取localstorage里面账号和密码
				var phone = jsonObj.mobile; 
				dataDw.mobile = phone;
//				console.log(dataDw.mobile)
				dataDw = JSON.stringify(dataDw);
				// var url = "<a href=" http ://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location="+latlon+"&output=json&pois=0">http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location="+latlon+"&output=json&pois=0</a>";
				var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location=" + latlon + "&output=json&pois=0";
				$.ajax({
					type: "GET",
					dataType: "jsonp",
					url: url,
					beforeSend: function() {
						$("#baidu_geo").html('正在定位...');
					},
					success: function(json) {
						if(json.status == 0) {
							$("#baidu_geo").html(json.result.formatted_address);
							console.log(json.result.formatted_address)
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						$("#baidu_geo").html(latlon + "地址位置获取失败");
					}
				});
				ajaxPosition(dataDw);
			};

			function ajaxPosition(dataDw) {
				console.log('我通过ajax传positionDw');
				$.ajax({
					type: 'post',
					url: 'https://www.56-china.com:443/ychgovback/sj/mobilePosition',
					contentType: 'application/json',
					dataType: 'json',
					data: dataDw,
					success: function(res) {
//						console.log(res.data);
						if(res.success) {
							console.log("定位成功")
						} else {
							console.log("定位失败")
						}
					},
					// error:function() {
					//
					// }
				});
			}
//		})
	}
	
	var positionClear = function() {        //清除定位
		clearInterval(timerDw);
	}
