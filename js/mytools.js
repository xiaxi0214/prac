function $(selector,parent,tagName){
   parent=parent||document;
   if(selector.charAt(0)=="#"){
	   return document.getElementById(selector.substring(1));
   }else if(selector.charAt(0)=="."){
	   tagName=tagName||"*";
	   var allEles=parent.getElementsByTagName(tagName);
	   var arr=[];
	   for(var i=0;i<allEles.length;i++){
		   var arrClassNames=allEles[i].className.split(" ");
		   for(var j=0;j<arrClassNames.length;j++){
			   if(arrClassNames[j]==selector.slice(1)){
				   arr.push(allEles[i]);
				   break;
			   }
		   };
	   };
	   return arr;
   }else{
	   return parent.getElementsByTagName(selector);
   }
}
function next(obj){
	var next=obj.nextElementSibling||obj.nextSibling;
	if(!next||next.nodeType!=1){
		return null;
	}else{
		return next;
	}
}
function prev(obj){
	var prev=obj.previousElementSibling||obj.previousSibling;
	if(!prev||prev.nodeType!=1){
		return null;
	}else{
		return prev;
	}
}
function first(obj){
	var firstElement=obj.firstElementChild||obj.firstChild;
	if(!firstElement||firstElement.nodeType!=1){
		return null;
	}else{
		return firstElement;
	}
}
function last(obj){
	var lastElement=obj.lastElementChild||obj.lastChild;
	if(!lastElement||lastElement.nodeType!=1){
		return null;
	}else{
		return lastElement;
	}
}
function move ( obj, attr, rate, target, callback ) {
	rate = parseInt(getStyle( obj, attr )) < target ? rate : -rate;
	clearInterval( obj.timer );
	obj.timer = setInterval(function () {
		var speed = parseInt(getStyle( obj, attr )) + rate;			// 步长
		if ( speed > target && rate > 0 ||  speed < target && rate < 0  ) {
			speed = target;
		}
		obj.style[attr] = speed + 'px';
		if ( speed == target ) {
			clearInterval( obj.timer );
			callback && callback();
		}
	}, 30);
}
function getStyle ( obj, attr ) {
	return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr];
}
function startMove(obj, json,rate,fn) {
	clearInterval(obj.iTimer);
	obj.iTimer=null;
	var iCur = 0;
	var iSpeed = 0;
	obj.iTimer = setInterval(function() {
		var iBtn = true;
		for ( var attr in json ) {
			var iTarget = json[attr];
			if (attr == 'opacity') {
				iCur = Math.round(getStyle( obj, 'opacity' ) * 100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}
			iSpeed = ( iTarget - iCur ) / rate;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if (iCur != iTarget) {
				iBtn = false;
				if (attr == 'opacity') {
					obj.style.opacity = (iCur + iSpeed) / 100;
					obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
				} else {
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
		}
		if (iBtn) {
			clearInterval(obj.iTimer);
			obj.iTimer=null;
			fn && fn.call(obj);
		}
	}, 30);
}
function parabola(obj,target,speed,callback){	
	obj.timer=null;
	var a=0.001;
	var objPos={
		"left":parseInt(getStyle(obj,"left")),
		"top":parseInt(getStyle(obj,"top"))
	}
	var coord={
		"x":target.left-objPos.left,
		"y":target.top-objPos.top
	}
	var b=(coord.y-a*coord.x*coord.x)/coord.x;
	var num=0;
	obj.timer=setInterval(function(){
		num+=speed;
		obj.style.left=objPos.left+  num  +"px";
		obj.style.top=objPos.top+ a*num*num+b*num  +"px";
		if(num>=coord.x){
			clearInterval(obj.timer);
			obj.timer=null;
			obj.style.left=target.left+"px";
			obj.style.top=target.top+"px";
			callback&&callback();
		}
	},30)
}
function getPos(obj) {
	var iTop = obj.offsetTop;
	var iLeft = obj.offsetLeft;
	while (obj.offsetParent)
	{
		iTop += obj.offsetParent.offsetTop;
		iLeft += obj.offsetParent.offsetLeft;
		obj = obj.offsetParent;
	}
	return {top:iTop, left:iLeft}
}
