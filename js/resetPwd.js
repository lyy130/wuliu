
$(function () {
	lyy.phoneBack();   //判断手机物理返回键
    var timerCode;

    var intervalCode = function () {
        var time=5;
        // var that=$(this);//习惯
        timerCode=setInterval(function(){
            console.log(time);
            if(time<=0){
                clearInterval(timerCode);
                fs.attr('disable','false');
                fs.html('点击重新发送');
                fs.css('background','#4876E6');
            }else {
                fs.html(time+"秒");                 //如果过了时间，还原
                fs.css('background','#ccc');
                time--;
            }
        },1000);
    };

    $('body').on('click','.btn',function (e) {
        e.preventDefault();
        var data = {
            username:$.trim($('[name="mobile"]').val()),
            password:$.trim($('[name="pass"]').val()),
            rePass:$.trim($('[name="rePass"]').val()),
            num:$.trim($('[name="num"]').val()),

        };
//      var check = function () {
            if(!data.username) {
                alert('请输入手机号');
                return false;
            }

            if(!/^1[34578]\d{9}$/.test(data.username)) {
                alert('请输入合法手机号');
                return false;
            }

            if(!data.num){
                alert('请输入验证码');
                return false;
            }
            if(!/^\d{6}$/.test(data.num)){
                alert('请输入合法验证码');
                return false;
            }
            if(!data.password) {
                alert('请输入密码');
                return false;
            }
            if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/.test(data.password)) {
                alert('密码必须8-18位以字母和数字的组成');
                return false;
            }

            if (!data.rePass) {
                alert('请再次输入密码');
                return false;
            }
            if(data.password != data.rePass) {
                alert('密码需要一致');
                $('[name = "rePass"]').val('');
                $('[name = "rePass"]').focus();
                return false;
            }
//      };    //验证函数
//      check();
        data.mobile = data.username;   //用户名就是手机号
        var data1 = JSON.stringify(data);

        $.ajax({
            type:'POST',
            url:'https://www.56-china.com:443/ychgovback/sj/resetPassword',
            contentType: 'application/json',
            dataType:'json',
            data:data1,
            success:function (data) {
                console.log(data);
                if(data.success) {               /*如果输入正确，弹出注册成功   跳转到登录界面*/
                    alert('密码重置成功！');
                    lyy.go('/login.html');
                } else{
                    alert('您填的信息有误');
                    // $('btn').html('注册');
                }
            }
        });
    });
    var fs = $('.fs');        //获取验证码按钮
    $('body').on('click','.fs',function () {
        fs.attr('disable','true');
        var data = {
            'mobile': $.trim($("[name = 'mobile']").val())
        };
        var data = JSON.stringify(data);
        console.log(data);
        console.log(typeof data);


        $.ajax({
            async:false,
            type: 'POST',
            url:'https://www.56-china.com:443/ychgovback/sj/messageIdentify',
            contentType: 'application/json',
            data: data/*JSON.stringify(data)*/,
            dataType: 'json',
            beforeSend: function () {
                fs.html('正在发送...');            /*点击之后就应该禁止，防止网路很慢，重复发起请求*/
            },
            success:function (res) {
                console.log(res);
                console.log(res.success);
                if(res.success) {
                    intervalCode();                    //定时器函数
                } else {
                    fs.html('点击重新发送');
                    clearInterval(timerCode);
                    fs.attr('disable','false');
                }
            },
            error: function () {
                $(this);
                fs.html('点击重新发送');
                clearInterval(timerCode);
            }
        });
    });
    $(".left i").on('click',function (){
    	 lyy.go('/login.html')
    })
});

