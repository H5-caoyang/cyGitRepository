//主页函数开始
function indexStart(_winWidth)
{
	offPrice();
	hotScroll();
	newArrival();
	promotionAct();
	memberCenter();
	flagStore();
	bannerScroll(_winWidth);
}
//轮播图
function bannerScroll(_winWidth)
{
	var _leftBig=-parseInt((2112-_winWidth)/2)+"px";
	var _leftSmall=-parseInt((1920-_winWidth)/2)+"px";
	var pics=$(".bannerPic a");
	var picBts=$(".picNumBt span");
	var index=0;
	var isMouseOn=false,isPicStop=false;
	var idd=0;
	function scalePic()
	{
		$(pics).css("display","none");
		$(picBts).css("backgroundImage","url(../images/index/banNumBt-1.png)");
		$(picBts[index]).css("backgroundImage","url(../images/index/banNumBt-2.png)");
		$(pics[index]).css({"display":"block","width":"2112px","height":"420px","top":"-19px","left":_leftBig});
		if(!isMouseOn)
		{
			isPicStop=false;
			$(pics[index]).animate({"width":"1920px","height":"382px","top":"0","left":_leftSmall},4000,function()
			{
				if(!isMouseOn)
				{
					scalePic();
				}else
				{
					isPicStop=true;
				}
			});
		}
		index++;
		if(index>4)
		{
			index=0;
		}
	}
	
	scalePic();
	 $(".bannerBox").mouseover(function()
	  	{
	 		isMouseOn=true;
	 		clearTimeout(idd);
	  	});
	 $(".bannerBox").mouseout(function()
	  	{
	 		isMouseOn=false;
			if(isPicStop)
			{
				idd=setTimeout(scalePic,2000);
			}
	  	});
	$(picBts).click(function()
	{
		$(pics).stop();
		 index=$(this).index();
		 scalePic();
	});
}
//今日特惠设置
function offPrice()
{
	var isOff=true;
	var urlOff="url(../images/index/teHui-logo.jpg)";
	var urlOff2="url(../images/index/teHui-pic.jpg)";
	setInterval(function()
	{
		isOff=!isOff;
		if(isOff)
		{
			$(".tvLiveInBanner .part-2 .linkPic").css("backgroundImage",urlOff);
		}else
		{
			$(".tvLiveInBanner .part-2 .linkPic").css("backgroundImage",urlOff2);
		}
		
	},3000);	
}
//热卖滚动
function hotScroll()
{
	var hotTitles=$(".hotKindBox .hotSell");
	//热类型卖切换
	$(".hotKindBox .hotSell").mouseover(function()
	{
		$(".hotKindBox .hotSell").css({"color":"#666","backgroundImage":"none","fontWeight":500});
		$(this).css({"color":"#fff","backgroundImage":"url(../images/index/hotSpanBg.gif)","backgroundRepeat":"no-repeat","fontWeight":600});
	});
	//上下一组图片切换
	$(".hotScroll .scrForward").click(function()
	{
		if($(".hotScroll .pics").css("left")=="-390px")
		{
			$(".hotScroll .pics").animate({"left":"0px"},1000);
		}
	});
	$(".hotScroll .scrNext").click(function()
	{
		if($(".hotScroll .pics").css("left")=="0px")
		{
			$(".hotScroll .pics").animate({"left":"-390px"},1000);
		}
	});
}
//新品上市
function newArrival()
{
	var liBigs=$(".newArrival .liBig");
	var liSmalls=$(".newArrival .liSmall");
	var thisCount;
	$(liSmalls).mouseover(function()
	{
		for(var i=0;i<liSmalls.length;i++)
		{
			$(liBigs[i]).css("display","none");
			$(liSmalls[i]).css("display","block");
			if(liSmalls[i]==this)
			{
				thisCount=i;
			}
		}
		$(this).css("display","none");
		$(liBigs[thisCount]).css("display","block");
	});
}
//优惠活动
function promotionAct()
{
	var picScroll=$(".promotionAct .picScroll");
	var btHovers=$(".promotionAct .btHover span");
	var idd=0;
	var picPosNum=0;
	btHovers[0].style.backgroundColor="#c00";
	$(".promotionAct .picShowBox .for").click(function()
	{
		clearInterval(idd);
		picPosNum--;
		setChange();
		setTimeScoll();
	});
	$(".promotionAct .picShowBox .next").click(function()
	{
		clearInterval(idd);
		picPosNum++;
		setChange();
		setTimeScoll();
	});
	$(".promotionAct .btHover span").click(function()
	{
		clearInterval(idd);
		setChange(this);
		setTimeScoll();
	});
	function setTimeScoll()
	{
		idd=setInterval(function()
		{
			picPosNum++;
			setChange();
		},7000);
	}
	setTimeScoll();
	function setChange(_btHover)
	{
		for(var i=0;i<btHovers.length;i++)
		{
			btHovers[i].style.backgroundColor="#ccc";
			if(_btHover&&_btHover==btHovers[i])
			{
				picPosNum=i;
			}
		}
		if(picPosNum>2)
		{
			picPosNum=0;
		}
		if(picPosNum<0)
		{
			picPosNum=2;
		}
		btHovers[picPosNum].style.backgroundColor="#c00";
		picScroll[0].style.left=(-picPosNum*235)+"px";
	}
}
//会员中心
function memberCenter()
{
	var picList=$(".contPart-2 .picList div");
	var comments=$(".contPart-2 .comment");
	var thisNum=0;
	$(picList).click(function()
	{
		for(var i=0;i<picList.length;i++)
		{
			picList[i].style.backgroundColor="#f8f4f2";	
			comments[i].style.display="none";
			if(picList[i]==this)
			{
				thisNum=i;
			}
		}
		picList[thisNum].style.backgroundColor="#ed4552";	
		comments[thisNum].style.display="block";
	});
}
//品牌旗舰店
function flagStore()
{
	var picScroll=$(".flagStore .picScroll");
	var liBigs=$(".flagStore li.big");
	var liSmalls=$(".flagStore li.small");
	var flagProducts=$(".flagProduct .product");
	var masks=$(".flagProduct .mask");
	var thisCount;//计算鼠标在小按钮上的下标
	$(liSmalls).mouseover(function()
	{
		for(var i=0;i<liSmalls.length;i++)
		{
			liBigs[i].style.display="none";
			liSmalls[i].style.display="block";
			if(liSmalls[i]==this)
			{
				thisCount=i;
			}
		}
		this.style.display="none";
		liBigs[thisCount].style.display="block";
		picScroll[0].style.top=-thisCount*240+"px";
	});
	$(flagProducts).mouseover(function()
	{
		for(var i=0;i<flagProducts.length;i++)
		{
			masks[i].style.display="block";
		}
		$(this).find(".mask")[0].style.display="none";
	});
	$(flagProducts).mouseout(function()
	{
		for(var i=0;i<flagProducts.length;i++)
		{
			masks[i].style.display="none";
		}
	});
}