$( function () {
	//�����˵�
	$('#header .member').hover(function () {
		$(this).css('background','url(images/arrow2.png) no-repeat 55px center');
		$('#header ul').show().animate({
			t :30,
			step:10,
			mul :{
				o :100,
				h:120
			}
		});
	},function () {
		$(this).css('background','url(images/arrow.png) no-repeat 55px center');
		$('#header .ul').animate({
			t :30,
			step :10,
			mul :{
				o:0,
				h:0
			},
			fn : function () {
				$('#header .ul').hide();
			}
		});
		});		

	//��¼��
	var login=$('#login');
	var screen=$('#screen');
	login.center(350,250).resize(function () {
			if(login.css('display') == 'block') {
				screen.lock();
			};			
	});
	$('#header .login').click(function () {		
		login.center(350,250).css('display','block');
		screen.lock().animate({
			attr : 'o',
			target : 30,
			t:30,
			step:10
		});
	});
	$('#login .close').click(function () {
		login.css('display','none');
		screen.animate({
			attr : 'o',
			target : 0,
			t:30,
			step:10,
			fn : function () {
				screen.unlock();
			}
		});  
	});
	//��ק
	login.drag($('h2').first()); 
	
	//�ٶȷ����ʼ��λ��
	$('#share').css('top',getScroll().top +(getInner().height - parseInt(getStyle($('#share').first(),'height'))) / 2 +'px');
	
	addEvent(window,'scroll',function(){
		$('#share').animate({
			attr : 'y',
			target : getScroll().top +(getInner().height - parseInt(getStyle($('#share').first(),'height'))) / 2
		});
	});
	
	//�ٶȷ�������Ч��
	$('#share').hover(function(){
		$(this).animate({
			attr : 'x',
			target : 0
		});
	},function (){
		$(this).animate({
			attr : 'x',
			target : -211
		});
	});
	
	
});



	
	
	
	
	
	
	
	
	

	
























































































































































	
	
	
	
