
//前台调用
var $=function (args) {
	return new Base(args);
};
//基础库 
function Base (args) {
	this.elements=[];
	if (typeof args == 'string') {
		if (args.indexOf(' ') != -1 ) {
			var elements = args.split(' ');
			var childElements = [];        		//存放临时节点对象的数组，解决覆盖问题
			var node = [];							//存放父节点
			for (var i = 0;i < elements.length;i++) {
				if (node.length == 0) node.push(document);
				switch (elements[i].charAt(0)) {
					case '#' :
						childElements =[];				//清理临时节点，令父节点失效
						childElements.push(this.getId(elements[i].substring(1)));
						node = childElements;					//保存父节点，因为childElements清理了，所以创建了node；
						break;
					case '.' :
						childElements = [];
						for (var j = 0;j < node.length;j++) {
							var temps =this.getClass(elements[i].substring(1),node[j]);
							for (var k=0;k<temps.length;k++) {
								childElements.push(temps[k]);
							}
						}
						node =childElements;
						break;
					default :
						childElements = [];
						for (var j =0;j<node.length;j++) {
							var temps = this.getTag(elements[i],node[j]);
							for (var k =0;k<temps.length;k++) {
								childElements.push(temps[k]);
							}
						}
						node =childElements;
					}
			}
			this.elements = childElements;
		} else {
			//find模拟
			switch (args.charAt(0))  {
				case '#' :
					this.elements.push(this.getId(args.substring(1)));
					break;
				case '.' :
					this.elements=this.getClass(args.substring(1));
					break;
				default :
					this.elements = this.getTag(args);
			}
		}
	} else if (typeof args == 'object') {
		if (args != undefined) {
			this.elements[0]=args;
		}
	} else if (typeof args == 'function') {
		this.ready(args);
	}
};
//addDomLoaded
Base.prototype.ready = function (fn) {
	addDomLoaded(fn);
};
//获取id节点数组	
Base.prototype.getId=function (id) {
		 return document.getElementById(id);
	};
	
Base.prototype.getName= function (name) {
		var names=document.getElementsByName(name);
		for(var i=0;i<names.length;i++){
				this.elements.push(names[i]);
		}
		return this;
	};
//获取元素节点数组		
Base.prototype.getTag=function (tag,parentNode) {
	var node = null;
	var temps = [];
	if (parentNode != undefined) {
		node = parentNode;
	} else {
		node = document;
	}
		var tags=node.getElementsByTagName(tag);
		for(var i=0;i<tags.length;i++){
			temps.push(tags[i]);			
		}
		return temps;
	};	
//获取class节点数组
Base.prototype.getClass=function(className,parentNode) {
	var node=null;
	var temps = [];
	if (parentNode != undefined) {
		node = parentNode;
	} else {
		node = document;
	}
	var all=node.getElementsByTagName('*');
	for(var i=0;i<all.length;i++) {
		if(all[i].className == className) {
			temps.push(all[i]);
		}
	}
	return temps;
}
//设置css选择器子节点
Base.prototype.find = function (str) {
	var childElements = [];
	for (var i = 0;i < this.elements.length; i++) {
		switch (str.charAt(0)) {
			case '#' :
				childElements.push(this.getId(str.substring(1)));
				break;
			case '.' :
				var temps = this.getClass(str.substring(1),this.elements[i]);
				for (var j =0;j <temps.length; j++) {
					childElements.push(temps[j]);
				}
				break;
			default :
				var temps = this.getTag(str,this.elements[i]);
				for (var j =0;j <temps.length; j++) {
					childElements.push(temps[j]);
				}
		}
	}
	this.elements = childElements;
	return this;
}
	
//获取某一个节点,返回这个节点对象
Base.prototype.ge = function (num) {
	return this.elements[num];
};
//获取首个节点，并返回这个节点对象
Base.prototype.first =function () {
	return this.elements[0];
};
//获取末尾节点，并返回这个节点对象
Base.prototype.last =function () {
	return this.elements[this.elements.length - 1];
};
//获取某一个节点,返回Base对象
Base.prototype.eq=function(num) {
	var element=this.elements[num];
	this.elements=[];
	this.elements[0]=(element);
	return this;
	}
//设置鼠标的移入移出
Base.prototype.hover=function (over,out) {
	for(var i=0;i<this.elements.length;i++) {
		addEvent(this.elements[i],'mouseover',over);
		addEvent(this.elements[i],'mouseout',out);
	}
	return this;
}
//设置显示
Base.prototype.show=function () {
	for(var i=0;i<this.elements.length;i++) {
		this.elements[i].style.display='block';
	}
	return this;
}
//设置隐藏
Base.prototype.hide=function () {
	for(var i=0;i<this.elements.length;i++) {
		this.elements[i].style.display='none';
	}
	return this;
}
//添加CLASS	
Base.prototype.addClass=function(className) {
	for(var i=0;i<this.elements.length;i++){
		if(! this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
			this.elements[i].className+=' '+className;
		}		
	}
	return this;
}
//移除CLASS
Base.prototype.removeClass=function(className) {
		for(var i=0;i<this.elements.length;i++){
		if(this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
			this.elements[i].className=this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),' ');
		}		
	}
	return this;
}
//设置link或style中的css规则
Base.prototype.addRule=function(num,selector,cssText,position){
	var sheet=document.styleSheets[num];
	if(typeof sheet.insertRule !='undefined') {
		sheet.insertRule(selector+'{'+cssText+'}',position);
	}else if(typeof sheet.addRule !='undefined') {
		sheet.addRule(selector,cssText,position);
	}
	return this;
};
//移除link或style中的css规则
Base.prototype.removeRule=function(num,index){
	var sheet=document.styleSheets[num];
	if(typeof sheet.deleteRule !='undefined') {
		sheet.deleteRule(index);
	}else if(typeof sheet.removeRule !='undefined') {
		sheet.removeRule(index);
	}
	return this;
};
//设置css	
Base.prototype.css=function (attr,value) {
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==1) {
		return getStyle(this.elements[i],attr)+'px';
		}else {
		this.elements[i].style[attr]=value;
		}
	}
	return this;
}
//设置innerHTML
Base.prototype.html=function (str) {
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0) {
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML=str;
	}
	return this;
}
//设置物体水平垂直居中
Base.prototype.center=function (width,height) {
	var top=(getInner().height-height)/2;
	var left=(getInner().width-width)/2;
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.top=top+'px';
		this.elements[i].style.left=left+'px';
	}
	return this;
}
//设置浏览器变动事件
Base.prototype.resize=function (fn) {
	for (var i=0;i<this.elements.length;i++) {	
		var element = this.elements[i];
		addEvent(window,'resize',function () {
			fn();
			if (element.offsetLeft > getInner().width - element.offsetWidth) {
				element.style.left = getInner().width - element.offsetWidth +'px';
			};
			if (element.offsetTop > getInner().height - element.offsetHeight) {
				element.style.top = getInner().height - element.offsetHeight +'px';
			}
		});	
		}
	return this;	
}
//锁屏功能
Base.prototype.lock=function () {
	for(var i=0;i<this.elements.length;i++) {
		this.elements[i].style.width=getInner().width+'px';
		this.elements[i].style.height=getInner().height+'px';
		this.elements[i].style.display='block';
		document.documentElement.style.overflow='hidden';
		addEvent(window,'scroll',scrollTop);
	}
	return this;
}
//解锁功能
Base.prototype.unlock=function () {
	for (var i=0;i<this.elements.length;i++) {
		this.elements[i].style.display='none';
		document.documentElement.style.overflow='auto';
		removeEvent(window,'scroll',scrollTop);
	}
	return this;
}
//设置click事件
Base.prototype.click=function (fn) {
		for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick=fn;
	}
	return this;
}
//设置动画
Base.prototype.animate = function (obj) {
	for (var i=0;i<this.elements.length;i++) {
		var element = this.elements[i];
		var attr = obj['attr'] == 'x' ? 'left' :obj['attr'] == 'y' ? 'top' :
						obj['attr'] == 'w' ? 'width' :obj['attr'] == 'h' ? 'height' : 'left';
		var start = obj['start'] != undefined ?obj['start'] :getStyle(element,attr);
		var t =obj['t'] != undefined ? obj['t']  : 30;
		var step = obj['step'] !=undefined ? obj['step'] : 10;
		var alter = obj['alter'];
		var target = obj['target'];
		var speed = obj['speed'] != undefined ? obj['speed'] : 6;
		var type = obj['type'] ==0 ? 'constant' :obj['type'] ==1 ? 'buffer' : 'buffer';
		
		if(alter != undefined && target == undefined) {
			target = alter +start;
		} else if (alter == undefined && target == undefined) {
			throw new Error('alter增量或target目标量必须有一个');
		}
		
		if (start >target) step = -step;
		element.style[attr] =start +'px';
		clearInterval(window.timer);
		timer = setInterval(function () {
			if (type == 'buffer') {
				step = (target - getStyle(element,attr)) / speed;
				step = step >0 ? Math.ceil(step) : Math.floor(step);
			}
			if (step == 0 ) {
				setTarget();
			} else if (step > 0 && Math.abs(getStyle(element,attr) - target) <= step) {
				setTarget();
			} else if (step < 0 && (getStyle(element,attr) - target )<= Math.abs(step)) {
				setTarget();
			} else {
					element.style[attr] = getStyle(element,attr) + step +'px';
			}
		},t);	
		function setTarget(){
			element.style[attr] = target +'px';
			clearInterval(timer);
		}
	}
	return this;
}

//设置插件入口
Base.prototype.extend = function (name,fn) {
	Base.prototype[name] = fn;
}







