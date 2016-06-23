window.onload=function () {
	//ÏÂÀ­²Ëµ¥
	$().getClass('member').hover(function () {
		$(this).css('background','url(images/arrow2.png) no-repeat 55px center');
		$().getClass('ul').show();
	},function () {
		$(this).css('background','url(images/arrow.png) no-repeat 55px center');
		$().getClass('ul').hide();		
	});
	//µÇÂ¼¿ò
	var login=$().getId('login');
	var screen=$().getId('screen');
	login.center(350,250).resize(function () {
			if(login.css('display') == 'block') {
				screen.lock();
			};			
	});
	$().getClass('login','header').click(function () {
		login.css('display','block');
		screen.lock();
	});
	$().getClass('close').click(function () {
		login.css('display','none');
		screen.unlock();
	});
	
	login.drag([$().getTag('h2').getElement(0)]);
	
	
	
	

	
	
	
};



	
	
	
	
	
	
	
	
	
	
	

	
























































































































































	
	
	
	
