//商品详情信息加载函数
function proMsgStart()
{
	var proNumber=window.location.href.match(/proNumber=\d+/).toString().split("=")[1];
	var spMsgBox=$(".spMsgBox");
	var myJson;
	var cookieData;//cookie
	//请求商品json信息
	function getProJson()
	{
		ajaxRequest("post","../json/proMsg.json",true,null,function(data)
		{
			myJson=eval("("+data+")");
			loopFind(myJson);
		});

	}
	getProJson();  //调用函数

	//找到所有要匹配的商品
	function loopFind(_myJson)
	{
		var kindNum=[],k=[];
		var thisProParent;//匹配的商品父元素
		var thisPro;//匹配的商品
		for(var i=0;i<4;i++)
		{
			if(i<3)
			{
				kindNum[i]=proNumber.charAt(i*2)+proNumber.charAt(i*2+1)+"";
				k[i]=parseInt(kindNum[i])-1;
			}	
		}
		
		thisProParent=_myJson.data[k[0]].data[k[1]].data[k[2]].data;
		for(var i=0;i<thisProParent.length;i++)
		{
			if(thisProParent[i].proNumber==proNumber)
			{
				thisPro=thisProParent[i];
			}
		}
		setMsgToHtml(thisPro);//函数调用
	}

}
//设置商品属性
function setMsgToHtml(_thisPro)
{
	var proUrlsArr="";//每个商品的其余图片地址
	var smallPicsHtml="";
	$(".contRight .spTitle .right").html("商品编号："+_thisPro.proNumber);
	$(".spMsgBox .spPic .bigPic img").attr("src","../jsonImages/productsMsg/"+_thisPro.proNumber+"_0.jpg");
	$(".spMsgBox .spMsg .title").html(_thisPro.proName);
	$(".spMsgBox .spMsg .title").html(_thisPro.proBland);
	$(".spMsgBox .spMsg .brand a").html(_thisPro.proBrand);
	$(".spMsgBox .spMsg .priceBox .price b").html(_thisPro.proPrice);
	proUrlsArr=_thisPro.imageUrls;
	smallPicsHtml+="<div><img src='../jsonImages/productsMsg/"+_thisPro.proNumber+"_0.jpg'></div>";
	for(var i=0;i<proUrlsArr.length;i++)
	{
		smallPicsHtml+="<div><img src='../jsonImages/productsMsg/"+_thisPro.proNumber+"_0_"+proUrlsArr[i]+".jpg'></div>";
	}
	$(".spMsgBox .smallPics .picsBox .pics").html(smallPicsHtml);
	proPicShow();//动态加载信息后调用查看商品图片
	buyProControl(_thisPro);//买商品控制函数
}
//检测图片是否有效
function CheckImgExists(imgurl) 
{ 
   var ImgObj = new Image(); //判断图片是否存在  
   ImgObj.src = imgurl;  
   //没有图片，则返回-1  
   if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {  
     return true;  
   }else 
   {  
       return false;
   }  
}
//查看商品图片
function proPicShow()
{
	//鼠标经过预览图片函数
	var smallPics=$(".spMsgBox .smallPics .picsBox .pics img");
	smallPics.hover(function (){
		var smallBoxs=$(".spMsgBox .smallPics .pics div");
		$(".spMsgBox .bigPic img").attr("src",$(this).attr("src"));
		$(".spMsgBox .bigPic img").attr("jqimg",$(this).attr("src"));
		for(var i=0;i<smallBoxs.length;i++)
		{
			$(smallBoxs[i]).css("border","1px solid #ccc");
		}
		$(this).parent().css("border","1px solid #efa900");
	},function()
	{
		$(this).parent().css("border","1px solid #ccc");
	});

	//图片放大镜效果
	$(function(){
		$(".bigPic").jqueryzoom({xzoom:350,yzoom:350});
	});

	//图片预览小图移动效果,页面加载时触发
	$(function(){
		var tempLength = 0; //临时变量,当前移动的长度
		var viewNum = 5; //设置每次显示图片的个数量
		var moveNum = 2; //每次移动的数量
		var moveTime = 300; //移动速度,毫秒
		var scrollDiv = $(".spMsgBox .smallPics .picsBox .pics"); //进行移动动画的容器  cy修改
		var scrollItems = $(".spMsgBox .smallPics .picsBox .pics div"); //移动容器里的集合  cy修改
		var moveLength = scrollItems.eq(0).width() * moveNum; //计算每次移动的长度
		var countLength = (scrollItems.length - viewNum) * scrollItems.eq(0).width(); //计算总长度,总个数*单个长度
		  
		//下一张
		$(".spMsgBox .smallPics .rightScroll").bind("click",function(){
			if(tempLength < countLength){
				if((countLength - tempLength) > moveLength){
					scrollDiv.animate({left:"-=" + moveLength + "px"}, moveTime);
					tempLength += moveLength;
				}else{
					scrollDiv.animate({left:"-=" + (countLength - tempLength) + "px"}, moveTime);
					tempLength += (countLength - tempLength);
				}
			}
		});
		//上一张
		$(".spMsgBox .smallPics .leftScroll").bind("click",function(){
			if(tempLength > 0){
				if(tempLength > moveLength){
					scrollDiv.animate({left: "+=" + moveLength + "px"}, moveTime);
					tempLength -= moveLength;
				}else{
					scrollDiv.animate({left: "+=" + tempLength + "px"}, moveTime);
					tempLength = 0;
				}
			}
		});
	});
}
//买商品控制函数
function buyProControl(_thisPro2)
{
	//购买产品数量的对象
	var proNumValue=$(".spMsgBox .setNum #buyProNum");
	var cookieSplits;
	var hasBuyProCount;//已经购买的商品的数量
	var hasBuyProObjStr;//已经购买的商品的对象的字符串
	var hasBuyProObj;//已经购买的商品的对象
	$(".spMsgBox .setNum .conBt").click(function()
		{
			if(this.className=="conBt add")
			{
				proNumValue.val((parseInt(proNumValue.val())+1)+"");
			}else if(parseInt(proNumValue.val())>1)
			{
				proNumValue.val((parseInt(proNumValue.val())-1)+"");
			}
		});
	$(".spMsgBox .buyNow #buyNowBt").click(function()
		{
			writeIntoCookie(_thisPro2.proNumber,proNumValue.val());
		});
	$(".spMsgBox .buyNow #addToCarBt").click(function()
		{
			writeIntoCookie(_thisPro2.proNumber,proNumValue.val());
			cookieData=decodeURIComponent(document.cookie);
			cookieSplits=cookieData.split("; ");
			var loginingUser="";
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
						hasBuyProCount=0;
						hasBuyProObjStr=cookieSplits[i].split("=")[1];	
						hasBuyProObj=eval("("+hasBuyProObjStr+")").shoppingCarPro;
						for(var j=0;j<hasBuyProObj.length;j++)
						{
							hasBuyProCount+=parseInt(hasBuyProObj[j].buyCount);
						}
						break;
					}
				}
			}else
			{
				for(var i=0;i<cookieSplits.length;i++)
				{
					if(cookieSplits[i].split("=")[0]=="shoppingCar_who")
					{
						hasBuyProCount=0;
						hasBuyProObjStr=cookieSplits[i].split("=")[1];	
						hasBuyProObj=eval(hasBuyProObjStr);
						for(var j=0;j<hasBuyProObj.length;j++)
						{
							hasBuyProCount+=parseInt(hasBuyProObj[j].buyCount);
						}
						break;
					}
				}
			}
			$(".spMsgBox .buyNow #jrgwc #jrgwc_char_allNum").html(hasBuyProCount+"");
			$(".spMsgBox .buyNow #jrgwc").show();
		});
}
//写入cookie
function writeIntoCookie(_proNumber,_buyCount)
{	
	var cValue,cDate;
	var thisProArr={};
	var cookieSplits;//cookie分割存储数组
	//var shoppingCarProStr;//cookie中已经购买的商品的json字符串
	var shoppingCarProArr=[];//cookie中已经购买的商品的json数组
	var shoppingCarProStrArr=[];//cookie中已购买的商品的json转化的字符串数组
	var keyKind,loginingUser="",passWord="",keyLogin="";
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
					keyLogin=keyKind;
					passWord=eval("("+cookieSplits[i].split("=")[1]+")").passWord;
					shoppingCarProArr=eval("("+cookieSplits[i].split("=")[1]+")").shoppingCarPro;
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
	//将商品的数量改变到cookie中
	if(shoppingCarProArr.length>0)
	{
		for(var j=0;j<shoppingCarProArr.length;j++)
		{
			if(shoppingCarProArr[j].proNumber==_proNumber)
			{
				shoppingCarProArr[j].buyCount=(parseInt(shoppingCarProArr[j].buyCount)+parseInt(_buyCount))+"";
				break;
			}
			if(j==shoppingCarProArr.length-1)
			{
				thisProArr.proNumber=_proNumber;
				thisProArr.buyCount=_buyCount;
				shoppingCarProArr[j+1]=thisProArr;
				break;//必须加break,否则会死循环
			}
		}
	}else
	{
		thisProArr.proNumber=_proNumber;
		thisProArr.buyCount=_buyCount;
		shoppingCarProArr[0]=thisProArr;
	}
	//将所有嵌套的json进行字符串转化
	for(var i=0;i<shoppingCarProArr.length;i++)
	{
		shoppingCarProStrArr[i]=JSON.stringify(shoppingCarProArr[i]);
	}
	//再次判断是否已经登录
	if(loginingUser.length>0)
	{
		cValue="{'userName':'"+loginingUser+"','passWord':'"+passWord+"',\"shoppingCarPro\":["+shoppingCarProStrArr+"]}";
		cDate=addDate(10);
		setCookie(keyLogin,cValue,cDate);
	}else
	{
		cValue="["+shoppingCarProStrArr+"]";
		cDate=addDate(10);
		setCookie("shoppingCar_who",cValue,cDate);
	}
}