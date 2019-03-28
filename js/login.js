$(function() {
	lyy.phoneBack(); //判断手机物理返回键
	$('body').on('click', '.btn', function(e) {
		e.preventDefault();
		var parmas = {
			mobile: $.trim($('[name="mobile"]').val()),
			password: $.trim($('[name="pass"]').val()),
		};
		//      var check = function () {
		if(!parmas.mobile || !parmas.password) {
			alert('请输入正确的账号或密码');
			return false;
		}
		//      };
		//      check();
		var parmas1 = JSON.stringify(parmas);
		$.ajax({
			type: 'POST',
			url: 'https://www.56-china.com:443/ychgovback/sj/login',
			contentType: 'application/json',
			dataType: 'json',
			data: parmas1,
			success: function(data) {
				console.log(data);
				if(data.success) {
					lyy.saveAuth(parmas1); 
					lyy.go('/wuliu.html');
				} else {
					alert('登录失败,请检查账号或密码!');
				}
			}
		});
	});

	var jsonObj = lyy.getAuth() //获取账号密码对象
	var phone = jsonObj.mobile;
	$('[name="mobile"]').val(phone);
});