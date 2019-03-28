$(function () {
   // var data={
   //     "scheduleWaybillCode":"ZC1903170001",
   //     "waybillCode":"190012209107"
   // };
  
    var data={
    	"corpCode":'belong'
    };
    data.scheduleWaybillCode =  lyy.querys('nz');
    data.waybillCode =  lyy.querys('no');
    data.companyName =  lyy.querys('com');                   /* lyy.querys()获取上一个页面锁传的值*/
    console.log(data.companyName);
    data.deliveryCompany =  lyy.querys('comd'); 
    console.log(data.deliveryCompany);
    data.waybillDeliveryAddress =  lyy.querys('coma'); 
    console.log(data.waybillDeliveryAddress);
    window.yk = data.yk =  lyy.querys('yk');
//  console.log(lyy.querys('yk'))
//  $('.lu').attr('yk',lyy.querys('yk'));
 
    
// 	$('.center').html(data.waybillCode);
// 	$('.com').html(data.companyName);
// 	$('.comd').html(data.deliveryCompany);
// 	$('.coma').html(data.waybillDeliveryAddress);
 	
               console.log(lyy.querys('nz'))
// 	$('.danhao').html('托运单号'+data.waybillCode);
 	
   var data1 = JSON.stringify(data);
   $.ajax({
       type:'post',
       url:'https://www.56-china.com:443/ychgovback/sj/waybillInfo',
       contentType:'application/json',
       dataType:'json',
       data:data1,
       success:function (res) {
           console.log(res.data);
           // console.log(res);
           if(res.success) {
              console.log(data.scheduleWaybillCode)
               positionBtn(data.scheduleWaybillCode);

               console.log(data1);
               res.data.yk = data.yk;            //给模板对象添加属性
               var wuliuHtml1 = template('wuliuTemplate',res.data);    
               $('.mainInfo').html(wuliuHtml1);
               $('.center').html(data.waybillCode);
			 	$('.com').html(data.companyName);
			 	$('.comd').html('<i class="iconfont">&#xe618;</i>'+data.deliveryCompany);
			 	$('.coma').html('<i class="iconfont">&#xe602;</i>'+data.waybillDeliveryAddress);
 		
               var feiyongHtml = template('feiyongTemplate',res.data);               
               $('.feiyong').html(feiyongHtml);
               $('.lu').attr('yk', lyy.querys('yk'));
//             var huoHtml = template('mingXiTemplate',res.data);
//             $('.mingxi').html(huoHtml);
//             console.log(huoHtml);
           }
       }
   });


 //确认签收
        $("body").on('click',"#queqian",function (){
//      	console.log(123)
//      	alert("哈哈哈")
        	sign = {
        		'waybillCode':data.waybillCode,
        		'signer':$('.name').html(),
        		'signerIdcard':$('.nameId').html()
        	}
        	var sign = JSON.stringify(sign);
            var formData = new FormData($('#uploadForm')[0]);
            $.ajax({
                type: 'post',
                url: "https://www.56-china.com:443/ychgovback/sj/confirmSign",
                data: sign,
                cache: false,
                processData: false,
                contentType:'application/json',
       			dataType:'json',
                success:function (data) {
					if(data.success) {
						alert('签收成功');
						$('#queqian').attr('disabled','true');
						positionClear();                    //签收运单后，停止对手机的定位
					}else{
	            		alert("失败");
	            	}
				},
	            error:function () {
//	                alert("服务器崩溃");
	            }
	          
        });
	});



//上传图片
        $("#upload").on('click',function(){
        	  var formData = new FormData($('#uploadForm')[0]);
            $.ajax({
                type: 'post',
                url: "https://www.56-china.com:443/ychgovback/upload/uploadPic", //上传文件的请求路径必须是绝对路劲
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                success:function (data) {
//                  alert('确认上传');
                    console.log(data.data)
                    $('.tuPian img').attr("src",data.data);
                    $('.close').css('display','block');
                    $('.close').on('click',function () {
                        $(".tuPian img").attr('src','');
                        $(this).css('display','none');
                    });

            },
                error:function () {
                    alert("上传失败");
                }
            })
        })
          
     

        

	
		
		 $(".left i").on('click',function (){
		 	window.history.go(-1) /*是返回上一页*/
			window.location.go(-1) /*是刷新上一页*/ 
//		 	 var no = data.scheduleWaybillCode;
//           var nz = $(this).attr('nz');
//  	 	lyy.go('/wuliu-info.html?no='+no+'&nz='+nz);
    	})
		 
//		 lyy.phoneBack();   //判断手机物理返回键

});

// console.log( $('.lu').attr('yk'));