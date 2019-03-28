$(function () {
//	lyy.phoneBack();   //判断手机物理返回键
    var data={
    	"corpCode":'belong'
    }
   data.scheduleWaybillCode =  lyy.querys('no');
    $('.center').html(data.scheduleWaybillCode);
     $('.wuUl').attr('nz',data.scheduleWaybillCode);
    var data = JSON.stringify(data);
    $.ajax({
        type:'post',
        url:'https://www.56-china.com:443/ychgovback/sj/scheduleWaybill',
        contentType:'application/json',
        dataType:'json',
        data:data,
        success:function (data) {
            console.log(data.data);
            if(data.success) {
                var wuliuInfoHtml = template('wuliuInfoTemplate',data.data);
                var feiyongHtml = template('feiyongTemplate',data.data);
               
                // console.log(wuliuInfoHtml);
                // console.log(feiyongHtml);
                $('.wuliuList').html(wuliuInfoHtml);
                $('.feiyong').html(feiyongHtml);
                $('.wuliuList>ul').on('click',function () {
                    // location.href = 'wuliu-infoMore.html';
                    var no = $(this).attr('no');
                    var nz =  lyy.querys('no');
                    var com = $('.com-phone').text();
                    var comd = $('.comd').text();
                    var coma = $('.comA').text();
                    var yk = $('.yk').attr('yk');
//                  console.log(com+comd+coma+nz);
                    lyy.go('/wuliu-infoMore.html?no='+no+'&nz='+nz+'&com='+com+'&comd='+comd+'&coma='+coma+'&yk='+yk);
//                  lyy.go('/wuliu-infoMore.html?no='+no+'&nz='+nz);
                    
                })
                 positionBtn(lyy.querys('no'));
            }
        }
    });
    
     $(".left i").on('click',function (){
    	 lyy.go('/wuliu.html')
    })
});

