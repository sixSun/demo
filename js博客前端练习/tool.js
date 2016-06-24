//浏览器检测
(function () {
	window.sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;	 
	(s = ua.match(/opr\/([\d.]+)/)) ? sys.opera = s[1] :
	(s =ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
	(s =ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
	(s =ua.match(/chrome\/([\d.]+)/)) ? sys.chrome =s[1] :	
	(s =ua.match(/version\/([\d.]+).*safari/)) ? sys.safari =s[1] : 0; 
})();	
//浏览器DOM加载
function addDomLoaded (fn) {
	var isReady = false;
	var timer = null;
	function doReady () {
		if(isReady) return;
		isReady = true;
		if (timer) clearInterval(timer);
		fn();
	}
	if (document.addEventListener) {
		addEvent(document,'DOMContentLoaded',function() {
			doReady();
			removeEvent(document,'DOMContentLoaded',arguments.callee);
		});
	} else if (sys.ie && sys.ie < 9) {
		timer =setInterval(function () {
			try {
				document.documentElement.doScroll('left');
				doReady();
			} catch (ex) {};
		});
	}
}
//跨浏览器获取视口大小
function getInner () {
	if (typeof window.innerWidth != 'undefined') {
		return {
			width : window.innerWidth,
			height:window.innerHeight
		}
	}else {
		return {
			width: document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
}
//跨浏览器获取style
function getStyle(element,attr) {
	var value;
	if(typeof window.getComputedStyle != 'undefined') {
		value =parseInt( window.getComputedStyle(element,null)[attr]);
	}else if (typeof element.currentStyle != 'undefined'){
		value =parseInt( element.currentStyle[attr]);
	}
	return value;
}
//IE常用的event对象配对到w3c中
addEvent.fixEvent = function (event) {
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation ;
	event.target = event.srcElement;
	return event;
}

//IE阻止默认行为
addEvent.fixEvent.preventDefault = function () {
	this.returnValue = false;
};
//IE取消冒泡
addEvent.fixEvent.stopPropagation =function () {
	this.cancelBubble = true;
};
//跨浏览器添加事件绑定
function addEvent(obj,type,fn) {
	if (typeof obj.addEventListener != 'undefined') {
		obj.addEventListener(type,fn,false);
	} else {
		//创建一个存放事件的哈希表(散列表)
		if (!obj.events) obj.events = {};
		//第一次执行
		if (!obj.events[type]) {
			//创建一个存放事件处理函数的数组
			obj.events[type] = [];
			//把第一个事件处理函数先存储到第一个位置上
			if (obj['on'+type]) {
				obj.events[type][0] = fn;
			} 
		} else {
			//同一个注册函数进行屏蔽，不添加到计数器中
			if (addEvent.equal(obj.events[type],fn)) return false;
		}
		//从第二次开始用事件计数器来存储
		obj.events[type][addEvent.ID++] = fn ;
		//执行事件处理函数
		obj['on'+type] =addEvent.exec; 
	}	
}
//为每个事件分配一个计数器
addEvent.ID=1;

//执行事件处理函数
addEvent.exec = function (event) {
	var e= event || window.event;
	var es=this.events[e.type];
	for (var i in es) {
		es[i].call(this,e);
	}
};

//同一个注册函数进行屏蔽
addEvent.equal = function (es,fn) {
	for (var i in es) {
		if (es[i] == fn) return true;
	}
	return false;
}

//跨浏览器删除事件
function removeEvent(obj,type,fn) {
	if (typeof obj.removeEventListener != 'undefined') {
		obj.removeEventListener(type,fn,false);
	} else {
		if (obj.events) {
			for (var i in obj.events[type]) {
				if (obj.events[type] == fn ) {
					delete obj.events[type][i];
				}
			}
		}
	}
}
//删除左右空格
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g,'');
}

//滚动条清零
function scrollTop () {
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
}





