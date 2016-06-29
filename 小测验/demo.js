
$(function() {	

var count = 0;
$(".temp_inner").spectrum({
    color: "#f60",
	change : function (color) {		
            $('li.myLi:last').before('<div  class ="nc"> <li class="myLi new-color"  style =" background-color :  '+$(".temp_inner").spectrum("get").toHexString()+' ; "><span class="delColor">x</span></li> </div>');            			
			
			var str = $('.nc').get(count).innerHTML;
			count +=1;
			var key = "nli_"+localStorage.length; 
			localStorage.setItem(key,str);

			$('.delColor').click(function(){
                $(this).parent('.new-color').remove();
            });
		}
});
})
window.onload = function () {
	var myColor = document.getElementsByTagName("ul")[0];
	var addcolor = document.getElementById("addcolor");
	var nc = document.createElement("div");
	for (var i=0;i <localStorage.length;i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		nc.innerHTML += value;		
	}	
	addcolor.parentNode.insertBefore(nc,addcolor);		
	}