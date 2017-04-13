//cookie的创建，获取，删除函数
function setCookie(key,value,cDate)
{
	//var myCook=key+"="+encodeURIComponent(value);
	var myCook=key+"="+value;
	if(cDate)
	{
		myCook+=";expires="+cDate;
	}
	document.cookie=myCook;
}
//根据键名获得键值
function getCookie(key)
{
	var cookies=document.cookie.split("; ");
	for(var i=0;i<cookies.length;i++)
	{
		if(cookies[i].split("=")[0]==key)
		{
			return decodeURIComponent(cookies[i].split("=")[1]);
		}
	}
}
//根据key值来删除cookie
function delCookie(key)
{
	document.cookie=key+"="+getCookie(key)+";expires="+(new Date(0));
}
//设置cookie的有效时间
function addDate(num)
{
	var d=new Date();
	d.setDate(d.getDate()+num);
	return d;
}


