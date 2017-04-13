// JavaScript Document
//设置日期
function addDate(num){
	var d = new Date();
	d.setDate(d.getDate() + num);
	return d;
}

//创建cookie(写入)
function setCookie(key,value,expires){
	var cVal = key + "=" + value;
	if(expires){
		cVal += ";expires=" + expires;
	}
	//console.log(cVal);
	
	document.cookie = cVal;
	//console.log(document.cookie);
}

//获取指定的cookie(读取)
function getCookie(key){
	var result = "";
	var cookies = document.cookie.split("; ");  //a1=王召; a2=班长; a3=黄龙杰
	//console.log(cookies);  //cookies[0]:a1=王召
	for(var i = 0;i < cookies.length;i++){
		var cookie = cookies[i].split("=");	  //cookie[0]:存放key   cookie[1]存放:值
		if(cookie[0] == key){
			result = cookie[1];
			break;
		}
	}
	return result;
}

//删除指定的cookie
function delCookie(key){
	document.cookie = key + "=;expires=" + new Date(0);
}

//获取当前元素的样式值的兼容性
function getStyle(obj,att){
	if(obj.currentStyle){ //IE样式
		return obj.currentStyle[att];
	}else{ //非IE样式
		return getComputedStyle(obj,null)[att];
	}
}

//获取随机数  [1,10)   
function getRandom(_min,_max){
	return Math.random() * (_max - _min) + _min;
}

//随机获取颜色值
function getColor(){
	return "rgb("+parseInt(getRandom(0,256))+","+parseInt(getRandom(0,256))+","+parseInt(getRandom(0,256))+")";	
}
//随机获取颜色值(在某个区间的颜色值)
function getColorFromTo(_min,_max,alpha){
	return "rgba("+parseInt(getRandom(_min,_max))+","+parseInt(getRandom(_min,_max))+","+parseInt(getRandom(_min,_max))+","+alpha+")";	
}

//元素运动（left,right,width,height）变化函数
function getRemove(obj,json,fn)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function()
		{
			for(var sty in json)
			{
				var whNum=parseInt(getStyle(obj,sty));
				var speedX=(parseInt(json[sty])-whNum)/10;
				speedX=speedX>0?Math.ceil(speedX):Math.floor(speedX);
				if(whNum==parseInt(json[sty]))
				{
					clearInterval(obj.timer);
					if(fn)
					{
						fn();
					}
				}else
				{
					obj.style[sty]=whNum+speedX+"px";
				}
			}
			
		},30);
	
}
//创建ajax请求的兼容函数
function createHttpRequest()
{
	try{
            return new window.XMLHttpRequest();
        }catch (e)
        {
            try{
                	return new ActiveXObject("MSXML2.XMLHTTP.6.0");
            	}catch (e)
            	{
                	try{
	                    	return new ActiveXObject("MSXML2.XMLHTTP.3.0");
	                	}catch (e)
	                		{
		                    	try{
		                        		return new ActiveXObject("MSXML2.XMLHTTP");
		                    		}catch (e)
		                    		{
		                        		throw Error("this browser is not supported");
		                        		return;
		                    		}
                			}
            	}
        }

}
//ajax发送和接受函数
function ajaxRequest(_method,_url,_async,_parameter,_fn)
{
    var _ajax=createHttpRequest();
    if(_ajax)
    {
        _ajax.onreadystatechange=function()
        {
            if(_ajax.readyState==4 && _ajax.status==200)
            {
            	if(_fn)
            	{	//_ajax.responseText 接收服务器响应请求的数据，
            		 _fn(_ajax.responseText);
            	}
            }
        }
        _ajax.open(_method,_url,_async);
        _ajax.setRequestHeader("content-type","application/x-www-form-urlencoded;charset=utf-8");
        _ajax.send(_parameter);//向服务器发送数据
    }
}
