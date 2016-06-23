window.onload=function () {
	//ÏÂÀ­²Ëµ¥
	$('.member').hover(function () {
		$(this).css('background','url(images/arrow2.png) no-repeat 55px center');
		$('ul').show();
	},function () {
		$(this).css('background','url(images/arrow.png) no-repeat 55px center');
		$('.ul').hide();		
	});
	//µÇÂ¼¿ò
	var login=$('#login');
	var screen=$('#screen');
	login.center(350,250).resize(function () {
			if(login.css('display') == 'block') {
				screen.lock();
			};			
	});
	$('.login').click(function () {
		login.css('display','block');
		screen.lock();
	});
	$('.close').click(function () {
		login.css('display','none');
		screen.unlock();
	});
	
	login.drag([$('h2').getElement(0)]);
	

	
	

	
	
	
};



	
	
	
	
	
	
	
	
	
	
	

	
























































































































































	
	
	
	
