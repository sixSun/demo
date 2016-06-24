$( function () {
	//ÏÂÀ­²Ëµ¥
	$('#header .member').hover(function () {
		$(this).css('background','url(images/arrow2.png) no-repeat 55px center');
		$('#header ul').show();
	},function () {
		$(this).css('background','url(images/arrow.png) no-repeat 55px center');
		$('#header .ul').hide();		
	});
	//µÇÂ¼¿ò
	var login=$('#login');
	var screen=$('#screen');
	login.center(350,250).resize(function () {
			if(login.css('display') == 'block') {
				screen.lock();
			};			
	});
	$('#header .login').click(function () {
		login.css('display','block');
		screen.lock();
	});
	$('#login .close').click(function () {
		login.css('display','none');
		screen.unlock();  
	});
	//ÍÏ×§
	login.drag($('h2').first(),$('#login .other').first()); 

	


});



	
	
	
	
	
	
	
	
	

	
























































































































































	
	
	
	
