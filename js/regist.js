//登录开始函数
function registStart()
{
	var cookieData=decodeURIComponent(document.cookie);
	var isRegistOK=[0,0,0,0,0];//用于存放各个输入有效的数组
	$(".contentBox  .input-in ").focus(function()
		{
			$(this).parent().css({"border":"1px solid green"});
			if(this.value=="手机号码"||this.value=="请输入验证码"||this.value=="短信验证码"||$(this).siblings(".passAbsolut").html()=="密码"||$(this).siblings(".passAbsolut").html()=="请确认密码")
			{
				if($(this).index(".input-in")==3||$(this).index(".input-in")==4)
				{
					$(this).siblings(".passAbsolut").html("");
				}	
				this.value="";
			}
		});
	$(".contentBox  .input-in ").blur(function()
		{
			$(this).parent().css({"border":"1px solid #ccc"});
			if(this.value=="")
			{
				switch($(this).index(".input-in"))
				{
					case 0:
						this.value="手机号码";
						isRegistOK[0]=0;
						$(".registBox form .inputTips")[0].innerHTML="账号不能为空";
						break;
					case 1:
						this.value="请输入验证码";
						isRegistOK[1]=0;
						$(".registBox form .inputTips")[1].innerHTML="验证码不能为空";
						break;
					case 2:
						this.value="短信验证码";
						isRegistOK[2]=0;
						$(".registBox form .inputTips")[2].innerHTML="验证码不能为空";
						break;
					case 3:
						$(this).siblings(".passAbsolut").html("密码");
						isRegistOK[3]=0;
						$(".registBox form .inputTips")[3].innerHTML="密码不能为空";
						break;
					case 4:
						$(this).siblings(".passAbsolut").html("请确认密码");
						isRegistOK[4]=0;
						$(".registBox form .inputTips")[4].innerHTML="确认密码不能为空";
						break;
				}
			}else
			{
				switch($(this).index(".input-in"))
				{
					case 0:
						if(checkPhoneNum($(".contentBox .input-in ")[0].value))
						{
							isRegistOK[0]=1;
							$(".registBox form .inputTips")[0].innerHTML="";
						}else
						{
							isRegistOK[0]=0;
							$(".registBox form .inputTips")[0].innerHTML="请输入正确的手机号";
						}
						break;
					case 1:
						if($(".contentBox .input-in ")[1].value==$(".registBox form .yzCode").html())
						{
							isRegistOK[1]=1;
							$(".registBox form .inputTips")[1].innerHTML="";
						}else
						{
							isRegistOK[1]=0;
							$(".registBox form .inputTips")[1].innerHTML="验证码错误";
						}
						break;
					case 2:
						if($(".contentBox .input-in ")[2].value=="123")
						{
							isRegistOK[2]=1;
							$(".registBox form .inputTips")[2].innerHTML="";
						}else
						{
							isRegistOK[2]=0;
							$(".registBox form .inputTips")[2].innerHTML="验证码错误";
						}
						break;
					case 3:
						if($(".contentBox .input-in ")[3].value.length>=6)
						{	//此时密码正确
							isRegistOK[3]=1;
							if($(".contentBox .input-in ")[4].value!="")
							{
								if($(".contentBox .input-in ")[3].value!=$(".contentBox .input-in ")[4].value)
								{
									isRegistOK[4]=0;
									$(".registBox form .inputTips")[4].innerHTML="两次密码输入不一致";
								}
								$(".registBox form .inputTips")[3].innerHTML="";
							}else
							{
								//此时密码正确
								$(".registBox form .inputTips")[3].innerHTML="";
							}
						}else
						{
							isRegistOK[3]=0;
							$(".registBox form .inputTips")[3].innerHTML="密码长度不能少于6位";
						}
						break;
					case 4:
						if($(".contentBox .input-in ")[4].value==$(".contentBox .input-in ")[3].value)
						{
							isRegistOK[4]=1;
							$(".registBox form .inputTips")[4].innerHTML="";
						}else
						{
							isRegistOK[4]=0;
							$(".registBox form .inputTips")[4].innerHTML="两次密码输入不一致";
						}
						break;
				}
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
	
	//提交注册
	$(".registBox form .registBt").click(function()
	{
		for(var i=0;i<isRegistOK.length;i++)
		{
			if(isRegistOK[i]==0)
			{
				return;
			}
		}
		//写入cookie并跳转页面
		var cValue,cDate;
		cValue="{'userName':'"+$(".contentBox .input-in ")[0].value+"','passWord':'"+$(".contentBox .input-in ")[3].value+"','shoppingCarPro':[]}";
		cDate=addDate(10);
		var cookies=cookieData.split("; ");
		var keyKind,keyKindNum=0;
		for(var i=0;i<cookieData.length;i++)
		{
			keyKind=cookieData[i].split("=")[0];
			if(keyKind.substring(0,keyKind.length-2)=="userMsg")
			{
				keyKindNum+=1;
			}
		}
		setCookie("userMsg_"+keyKindNum,cValue,cDate);
		window.location="login.html";
		
	});
}