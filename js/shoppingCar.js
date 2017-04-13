//购物车函数
function shoppingCarStart()
{
	var myJson;
	var cookieData;//cookie
	var cookieSplits=[];//分割cookie的数组
	var loginingUser="";//登录的用户名
	var loginingPass="";//登录的密码
	var keyKind="";//登录的用户在cookie中的键
	var hasBuyProCount;
	var shoppingCarProArr=[];//cookie中购物车信息数组
	var thisPros=[];//匹配的商品
	var totalPay=0;//商品总金额

	//请求商品json信息
	function getProJson()
	{
		ajaxRequest("post","../json/proMsg.json",true,null,function(data)
		{
			myJson=eval("("+data+")");
			getMsgFromCookie();
		});

	}
	getProJson();  //调用函数

	//从cookie中获得信息
	function getMsgFromCookie()
	{
		cookieData=decodeURIComponent(document.cookie);
		cookieSplits=cookieData.split("; ");

		for(var i=0;i<cookieSplits.length;i++)
		{
			if(cookieSplits[i].split("=")[0]=="loginingUser")
			{
				loginingUser=cookieSplits[i].split("=")[1];
				break;
			}
		}
		//如果已经登录
		if(loginingUser.length>0)
		{
			for(var i=0;i<cookieSplits.length;i++)
			{
				keyKind=cookieSplits[i].split("=")[0];
				if(keyKind.substring(0,keyKind.length-2)=="userMsg")
				{
					if(eval("("+cookieSplits[i].split("=")[1]+")").userName==loginingUser)
					{
						shoppingCarProArr=eval("("+cookieSplits[i].split("=")[1]+")").shoppingCarPro;
						loginingPass=eval("("+cookieSplits[i].split("=")[1]+")").passWord;
						break;
					}
				}
			}
		}else
		{
			for(var i=0;i<cookieSplits.length;i++)
			{
				if(cookieSplits[i].split("=")[0]=="shoppingCar_who")
				{
					shoppingCarProArr=eval(cookieSplits[i].split("=")[1]);
					break;
				}
			}
		}
		//找到所有要匹配的商品
		loopFind();
	}
	//找到所有要匹配的商品
	function loopFind()
	{
		var kindNum=[],k=[];
		var thisProParent;//匹配的商品父元素
		for(var i=0;i<shoppingCarProArr.length;i++)
		{
			for(var j=0;j<4;j++)
			{
				if(j<3)
				{
					kindNum[j]=shoppingCarProArr[i].proNumber.charAt(j*2)+shoppingCarProArr[i].proNumber.charAt(j*2+1)+"";
					k[j]=parseInt(kindNum[j])-1;
				}	
			}
			
			thisProParent=myJson.data[k[0]].data[k[1]].data[k[2]].data;
			for(var j=0;j<thisProParent.length;j++)
			{
				if(thisProParent[j].proNumber==shoppingCarProArr[i].proNumber)
				{
					thisPros.push(thisProParent[j]);
				}
			}
		}
		setMsgToCar();//函数调用
	}
	//设置信息到购物车
	function setMsgToCar()
	{
		var proHtml="";
		if(thisPros.length>0)
		{
			for(var i=0;i<thisPros.length;i++)
			{
				proHtml+="<div class='pro'><p class='p1 p-1'><a href='productsMsg.html?proNumber="+thisPros[i].proNumber+"'><img src='../jsonImages/productsMsg/"+thisPros[i].proNumber+"_4.jpg'></a></p><p class='p1 p-2'><a href='productsMsg.html?proNumber="+thisPros[i].proNumber+"'>"+thisPros[i].proName+"</a></p><p class='p2 p-3'><span class='conBt sub'></span><input type='text' value='"+shoppingCarProArr[i].buyCount+"' id='buyProNum'><span class='conBt add'></span></p><p class='p2 p-4'>￥<span>"+thisPros[i].proPrice+"</span></p><p class='p2 p-5'>￥<span>0.00</span></p><p class='p2 p-6'><a class='deleteBt'>删除</a></p></div>";
				totalPay+=parseInt(shoppingCarProArr[i].buyCount)*parseFloat(thisPros[i].proPrice);
			}
			$(".gwc_center .proListBox .listPro .proBox").html(proHtml);
			$(".gwc_cart .gwc_js #totalPay").html(totalPay+"");
			$(".gwc_center .proListBox .listPro .noPro").css("display","none");	
			$(".gwc_center .proListBox .listPro .proBox").css("display","block");
			$(".gwc_cart").css("display","block");

		}else
		{
			$(".gwc_center .proListBox .listPro .noPro").css("display","block");	
			$(".gwc_center .proListBox .listPro .proBox").css("display","none");
			$(".gwc_cart").css("display","none");
		}
		carControl();
	}
	//购物车操作函数
	function carControl()
	{
		//购买产品数量的对象
		var proNumValue=$(".gwc_center .proListBox .listPro .proBox .p-3 #buyProNum");

		$(".gwc_center .proListBox .listPro .proBox .p-3 .conBt").click(function()
			{
				var index=parseInt($(this).index(".conBt")/2);
				totalPay=0;//将总金额至0
				if(this.className=="conBt add")
				{
					$(proNumValue[index]).val((parseInt($(proNumValue[index]).val())+1)+"");
					shoppingCarProArr[index].buyCount=$(proNumValue[index]).val();
					changeCookie(shoppingCarProArr);

				}else if(parseInt(proNumValue.val())>1)
				{
					$(proNumValue[index]).val((parseInt($(proNumValue[index]).val())-1)+"");
					shoppingCarProArr[index].buyCount=$(proNumValue[index]).val();
					changeCookie(shoppingCarProArr);
				}
				//计算总金额调用
				caculateTotalPay();
			});
		$(".gwc_center .proListBox .listPro .proBox .p-6 a").click(function()
			{
				var index=$(this).index();
				var dePro=$(".gwc_center .proListBox .listPro .proBox .pro");
				if(confirm("确定要删除么？"))
				{
					totalPay=0;
					$(dePro[index]).remove();
					if($(".gwc_center .proListBox .listPro .proBox .pro").length==0)
					{
						$(".gwc_center .proListBox .listPro .noPro").css("display","block");	
						$(".gwc_center .proListBox .listPro .proBox").css("display","none");
						$(".gwc_cart").css("display","none");
					}
					for(var i=index;i<shoppingCarProArr.length;i++)
					{
						shoppingCarProArr[index]=shoppingCarProArr[index+1];
						thisPros[index]=thisPros[index+1];
					}
					shoppingCarProArr.length=shoppingCarProArr.length-1;
					thisPros.length=thisPros.length-1;
					changeCookie(shoppingCarProArr);
					//计算总金额调用
					caculateTotalPay();
				}
			});
		$(".gwc_cart .gwc_js .clearAll").click(function()
			{
				if(confirm("确定要全部删除么？"))
				{
					totalPay=0;
					$(".gwc_center .proListBox .listPro .proBox .pro").remove();
					$(".gwc_center .proListBox .listPro .noPro").css("display","block");	
					$(".gwc_center .proListBox .listPro .proBox").css("display","none");
					$(".gwc_cart").css("display","none");
					shoppingCarProArr.length=0;
					thisPros.length=0;
					changeCookie(shoppingCarProArr);
					//计算总金额调用
					caculateTotalPay();
				}
			});
		//计算总金额
		function caculateTotalPay()
		{
			for(var i=0;i<shoppingCarProArr.length;i++)
			{
				totalPay+=parseInt(shoppingCarProArr[i].buyCount)*parseFloat(thisPros[i].proPrice);
			}
			$(".gwc_cart .gwc_js #totalPay").html(totalPay+"");
		}
		//将改变的数据存入cookie中
		function changeCookie(_carProArr)
		{
			var cValue,cDate;
			var shoppingCarProStrArr=[];
			for(var i=0;i<shoppingCarProArr.length;i++)
			{
				shoppingCarProStrArr[i]=JSON.stringify(shoppingCarProArr[i]);
			}
			//如果已经登录
			if(loginingUser.length>0)
			{
				cValue="{'userName':'"+loginingUser+"','passWord':'"+loginingPass+"','shoppingCarPro':["+shoppingCarProStrArr+"]}";
			}else
			{
				cValue="["+shoppingCarProStrArr+"]";
			}
			cDate=addDate(10);
			setCookie("shoppingCar_who",cValue,cDate);
		}//cookie操作END
	}//购物车操作END
}