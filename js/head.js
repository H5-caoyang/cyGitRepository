//函数看开始
function headStart()
{
	//对cookie进行查找是否有用户登录
	var loginCookie=decodeURIComponent(document.cookie);
	var cookieStr=loginCookie.split("; ");
	var everyObj;//储存分割后json对象
	var loginingUser="";//存储登录的用户名
	var loginingUserMsg;//存储登录的用户信息
	var keyKind;//cookie键的类型
	for(var i=0;i<cookieStr.length;i++)
	{
		if(cookieStr[i].split("=")[0]=="loginingUser")
		{
			loginingUser=cookieStr[i].split("=")[1];
			break;
		}
	}
	for(var i=0;i<cookieStr.length;i++)
	{
		keyKind=cookieStr[i].split("=")[0];
		if(keyKind.substring(0,keyKind.length-2)=="userMsg")
		{
			everyObj=eval("("+cookieStr[i].split("=")[1]+")");
			for(var key in everyObj)
			{
				if(key=="userName"&&everyObj[key]==loginingUser)
				{
					//得到登录的用户的所有信息
					loginingUserMsg=everyObj;
				}
			}
		}
	}
	//如果用户登入了则改变头部登录后的信息
	if(loginingUserMsg)
	{
		$(".headMsgBg .msgBox #welcome").hide();
		$(".headMsgBg .msgBox #welcomeAfterLogin").show();
		$(".headMsgBg .msgBox #welcomeAfterLogin #loginUser").html(loginingUserMsg["userName"]);
	}else
	{
		$(".headMsgBg .msgBox #welcome").show();
		$(".headMsgBg .msgBox #welcomeAfterLogin").hide();
	}

	navMouseOver();//函数调用


	//退出登录函数
	$(".headMsgBg .msgBox #welcomeAfterLogin #exitBt").click(function()
		{
			if(confirm("确定要退出登录么？"))
			{
				var cValue,cDate;
				cValue="";
				cDate=addDate(10);
				setCookie("loginingUser",cValue,cDate);
				window.location="index.html";
			}
		});
}

//搜索我的cookie公共函数
function searchMyCookie()
{

}
//二级列表显示隐藏函数
function navMouseOver()
{
	var myJson;
	var _a=$(".navUl-2 li .a-li");
	var _navList=$(".navUl-2 .navList");
	var idd=0;
	var targetAct;
	//请求商品json信息
	function getProJson()
	{
		ajaxRequest("get","../json/proMsg.json",true,null,function(data)
		{
			myJson=eval("("+data+")");

			setNavJson();
		});
	}
	getProJson();
	_a.mouseover(function()
		{
			targetAct=this;
			myEnter();
		});
	_a.mouseout(function()
		{
			myLeave();
		});
	_navList.mouseover(function()
		{
			myEnter();
		});
	_navList.mouseout(function()
		{
			myLeave();
		});
	function myEnter()
	{

		var navLeftRight=$(".navUl-2 .a-li").index($(targetAct))*50;
		if(navLeftRight>200)
		{
			
			navLeftRight=200;
		}
		$(targetAct).parent().css({"backgroundImage":"none","backgroundColor":"#333","opacity":0.9});
		targetAct.style.backgroundImage="url(../images/head/liBg2.gif)";
		targetAct.style.color="#fff";
		_navList.css({"display":"block","left":""+navLeftRight+"px"});
		
	}
	function myLeave()
	{
		$(targetAct).parent().css({"backgroundImage":"url(../images/head/navBg-3.jpg)","backgroundColor":"","opacity":1});
		targetAct.style.backgroundImage="url(../images/head/liBg.jpg)";
		targetAct.style.color="#666";
		_navList.css("display","none");
	}
	//动态设置二级导航html
	function setNavJson()
	{
		var htmls="";

		for(var i=0;i<myJson.data.length;i++)
		{
			htmls="";
			for(var j=0;j<myJson.data[i].data.length;j++)
			{
				htmls+="<dl><dt><a href='productsList.html?proNumber="+myJson.data[i].data[j].proNumber+"'>"+myJson.data[i].data[j].proName+"</a></dt><dd>";
				for(var k=0;k<myJson.data[i].data[j].data.length;k++)
				{
					htmls+="<a href='productsList.html?proNumber="+myJson.data[i].data[j].data[k].proNumber+"'>"+myJson.data[i].data[j].data[k].proName+"</a>";
				}
				htmls+="</dd></dl>";
			}
			$(".navUl-2 .navList .left")[i].innerHTML=htmls+"";
		}

		
	}
}
