
//前台调用
var $=function (_this) {
	return new Base(_this);
};
//基础库 
function Base (_this) {
	this.elements=[];
	if(_this != undefined) {
		this.elements[0]=_this;
	}
};
//获取id节点数组	
Base.prototype.getId=function (id) {
		 this.elements.push(document.getElementById(id));
		 return this;
	};
	
Base.prototype.getName= function (name) {
		var names=document.getElementsByName(name);
		for(var i=0;i<names.length;i++){
				this.elements.push(names[i]);
		}
		return this;
	};
//获取元素节点数组		
Base.prototype.getTag=function (tag) {
		var tags=document.getElementsByTagName(tag);
		for(var i=0;i<tags.length;i++){
			this.elements.push(tags[i]);			
		}
		return this;
	};	
//获取class节点数组
Base.prototype.getClass=function(className,idName) {
	var node=null;
	if (arguments.length==2) {
		node=document.getElementById(idName);
	}else {
		node=document;
	}
	var all=node.getElementsByTagName('*');
	for(var i=0;i<all.length;i++) {
		if(all[i].className==className) {
			this.elements.push(all[i]);
		}
	}
	return this;
}
//获取某一个节点,返回这个节点对象
Base.prototype.getElement = function (num) {
	return this.elements[num];
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
			if(typeof window.getComputedStyle != 'undefined') {
				return window.getComputedStyle(this.elements[i],null)[attr];
			}else if (typeof this.elements[i].currentStyle != 'undefined'){
				return this.elements[i].currentStyle[attr];
			}
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
//设置插件入口
Base.prototype.extend = function (name,fn) {
	Base.prototype[name] = fn;
}






