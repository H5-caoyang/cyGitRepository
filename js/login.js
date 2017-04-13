//登录开始函数
function loginStart()
{
	var cookieData=decodeURIComponent(document.cookie);
	var setLoginUser="";//用于记录登录成功的用户
	var setLoginPass="";
	//所有文本框状态调整
	$(".contentBox  .input-in ").focus(function()
		{
			$(this).parent().css({"border":"1px solid green"});
		});
	$(".contentBox  .input-in ").blur(function()
		{
			$(this).parent().css({"border":"1px solid #ccc"});
		});
		
	//切换登录类型
	$(".loginBox  .loginTitle ").click(function()
	{
		if($(this).index(".loginTitle")==0)
		{
			$(this).css({"border-color":"#ccc","border-bottom-color":"#fff","background-color":"#fff"});
			$(this).siblings(".loginTitle").css({"border-color":"#eee","border-bottom-color":"#ccc","background-color":"#f5f5f5"});
			$(".loginBox  .nameLoginText ").show();
			$(".loginBox  .phoneLoginText ").hide();
		}else
		{
			$(this).css({"border-color":"#ccc","border-bottom-color":"#fff","background-color":"#fff"});
			$(this).siblings(".loginTitle").css({"border-color":"#eee","border-bottom-color":"#ccc","background-color":"#f5f5f5"});
			$(".loginBox  .nameLoginText ").hide();
			$(".loginBox  .phoneLoginText ").show();
		}
	});
	
	//检测电话号码
	function checkPhoneNum(_phoneNum)
	{
		var reg=/^1(3|5|6|7|8|9)\d{9}$/;
		if(reg.test(_phoneNum))
		{
			return true;
		}else
		{
			return false;
		}
	}
	
	$(".loginBox .loginBt").click(function()
	{
		//每次点击登录刷新
		setLoginUser="";
		setLoginPass="";
		if($(this).index(".loginBt")==0)
		{
			if($(".nameLoginText #userNameText").val()=="")
			{
				$(".loginBox .text .inputTips")[0].innerHTML="用户名或电话号码不能为空";
				return;
			}else
			{
				$(".loginBox .text .inputTips")[0].innerHTML="";
				if($(".nameLoginText #passWordText").val()=="")
				{
					$(".loginBox .text .inputTips")[1].innerHTML="密码不能为空";
					return;
				}else if($(".nameLoginText #passWordText").val().length<6)
				{
					$(".loginBox .text .inputTips")[1].innerHTML="密码长度不能少于6位";
					return;
				}else
				{
					$(".loginBox .text .inputTips")[1].innerHTML="";
					//做用户cookie检测
					var cookieStr=cookieData.split("; ");
					var everyObject;
					var keyKind;//cookie键的类型
					for(var i=0;i<cookieStr.length;i++)
					{
						keyKind=cookieStr[i].split("=")[0];
						if(keyKind.substring(0,keyKind.length-2)=="userMsg")
						{
							everyObject=eval("("+cookieStr[i].split("=")[1]+")");
							for(var key in everyObject)
							{
								if(key=="userName")
								{
									//如果输入的用户名正确
									if(everyObject[key]==$(".nameLoginText #userNameText").val())
									{
										setLoginUser=everyObject[key];
									}
								}
								if(key=="passWord")
								{
									//如果输入的密码正确
									if(everyObject[key]==$(".nameLoginText #passWordText").val())
									{
										setLoginPass=everyObject[key];
									}
								}
							}
						}
					}
					console.log(setLoginUser);
					console.log(setLoginPass);
					//对刚才匹配用户名和密码的结果进行判断
					if(setLoginUser!=""&&setLoginPass!="")
					{
						//登录成功后加入cookie
						var cValue,cDate;
						cValue=""+setLoginUser+"";
						cDate=addDate(10);
						setCookie("loginingUser",cValue,cDate);
						window.location="index.html";
					}else
					{
						alert("用户名或密码错误");
					}
				}
			}
		}else
		{
			if($(".phoneLoginText #phoneNumText").val()=="")
			{
				$(".loginBox .text .inputTips")[2].innerHTML="电话号码不能为空";
				return;
			}else if(checkPhoneNum($(".phoneLoginText #phoneNumText").val()))
			{
				//如果电话号码正确
				$(".loginBox .text .inputTips")[2].innerHTML="";
				//检测动态密码
				if($(".phoneLoginText #dPassWordText").val()=="")
				{
					$(".loginBox .text .inputTips")[3].innerHTML="请输入动态密码";
					return;
				}else
				{
					$(".loginBox .text .inputTips")[3].innerHTML="";
					//做用户手机检测
					
				}
			}else
			{
				//电话号码不正确
				$(".loginBox .text .inputTips")[2].innerHTML="电话号码不合法";
				return;
			}
		}
	});
	
	//动态密码获取函数
	function dPassWordGet()
	{
		
	}
}


//判断用户名记住或自动登录函数
function checkIsAutoLogin()
{
	
}