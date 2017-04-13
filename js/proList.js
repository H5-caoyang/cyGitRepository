//商品列表加载函数
function proListLoadJson()
{
	var proNumber=window.location.href.match(/proNumber=\d+/).toString().split("=")[1];
	var myJson;
	var kindAllName="";
	var proJsonArr=new Array();//存储所有匹配到的商品
	//请求商品json信息
	function getProJson()
	{
		ajaxRequest("get","../json/proMsg.json",true,null,function(data)
		{
			myJson=eval("("+data+")");
			loopFind(myJson);
		});
	}
	getProJson();
	//找到所有要匹配的商品
	function loopFind(_myJson)
	{
		var kindcount=proNumber.length/2;
		if(kindcount==1)
		{
			var kindNum=[],k=[];
			for(var i=0;i<kindcount;i++)
			{
				kindNum[i]=proNumber.charAt(i*2)+proNumber.charAt(i*2+1)+"";
				k[i]=parseInt(kindNum[i])-1;	
			}
			kindAllName=_myJson.data[k[0]].proName;
			for(var i=0;i<_myJson.data[k[0]].data.length;i++)
			{
				for(var j=0;j<_myJson.data[k[0]].data[i].data.length;j++)
				{
					for(var m=0;m<_myJson.data[k[0]].data[i].data[j].data.length;m++)
					{
						proJsonArr.push(_myJson.data[k[0]].data[i].data[j].data[m]);
					}
				}
			}
		}
		if(kindcount==2)
		{
			var kindNum=[],k=[];
			for(var i=0;i<kindcount;i++)
			{
				kindNum[i]=proNumber.charAt(i*2)+proNumber.charAt(i*2+1)+"";
				k[i]=parseInt(kindNum[i])-1;	
			}
			kindAllName=_myJson.data[k[0]].proName+" "+_myJson.data[k[0]].data[k[1]].proName;
			for(var i=0;i<_myJson.data[k[0]].data[k[1]].data.length;i++)
			{
				for(var j=0;j<_myJson.data[k[0]].data[k[1]].data[i].data.length;j++)
				{
					proJsonArr.push(_myJson.data[k[0]].data[k[1]].data[i].data[j]);
				}
			}
		}
		if(kindcount==3)
		{
			var kindNum=[],k=[];
			for(var i=0;i<kindcount;i++)
			{
				kindNum[i]=proNumber.charAt(i*2)+proNumber.charAt(i*2+1)+"";
				k[i]=parseInt(kindNum[i])-1;	
			}
			kindAllName=_myJson.data[k[0]].proName+" "+_myJson.data[k[0]].data[k[1]].proName+" "+_myJson.data[k[0]].data[k[1]].data[k[2]].proName;
			for(var i=0;i<_myJson.data[k[0]].data[k[1]].data[k[2]].data.length;i++)
			{
				proJsonArr.push(_myJson.data[k[0]].data[k[1]].data[k[2]].data[i]);
			}
		}
		createPro();
	}
	//将匹配的所有商品创建排序并添加到网页中
	function createPro()
	{
		var pageProCount=20;//每一页最多存放商品的个数
		var proCount=proJsonArr.length;
		//按照指定的要求排序
		function sortByWhat(_byWhat)
		{
			var afterConrProArr=new Array();//用于存储排序后的数组
			var sortNumArr=new Array();//用于存储商品排序数字的临时数组
			var simple;
			for(var i=0;i<proCount;i++)
			{
				sortNumArr[i]=parseFloat(proJsonArr[i][_byWhat]);
			}
			for(var i=0;i<sortNumArr.length-1;i++)
			{
				for(var j=0;j<sortNumArr.length-i;j++)
				{
					if(sortNumArr[j]<sortNumArr[j+1])
					{
						simple=sortNumArr[j];
						sortNumArr[j]=sortNumArr[j+1];
						sortNumArr[j+1]=simple;
					}
				}
			}

			for(var i=0;i<sortNumArr.length;i++)
			{
				for(var j=0;j<sortNumArr.length;j++)
				{
					if(proJsonArr[j][_byWhat]==sortNumArr[i])
					{
						afterConrProArr[i]=proJsonArr[j];
					}
				}
			}
			
			return afterConrProArr;

		}
		//将排好序的信息加入网页中
		function addHtml(_sortStyle)
		{
			var mySortArr=sortByWhat(_sortStyle);//设定排序的参数
			var pageBtHtml="";
			var PageHtml="";
			var proHtml="";
			var jqProList=$(".proList");
			var PageBtArrCount=6;//每一组切换页面按钮的最多数量
			var numInPage=[];//每一页给定的商品数量
			var pageIndexNow=1;//当前页的下标
			var numInPageBtArr;//每一组切换页面按钮的实际数量
			var idd=0;
			var loadedImgs;//第一页商品对象
			var imgLoadedNum=0;//图片加载完的数量
			(function(){
				//设置换页按钮
				if(Math.ceil(proCount/pageProCount)>6)
				{
					pageBtHtml+="<a class='btForArr'><<</a><a class='btFor'>上一页</a><span class='pageIndexBox'>";
					for(var i=0;i<Math.ceil(Math.ceil(proCount/pageProCount)/6);i++)
					{
						numInPageBtArr=(Math.ceil(proCount/pageProCount)-PageBtArrCount*i)>PageBtArrCount?PageBtArrCount:(Math.ceil(proCount/pageProCount)-PageBtArrCount*i);
						pageBtHtml+="<span class='pageIndex'>";
						for(var j=0;j<numInPageBtArr;j++)
						{
							pageBtHtml+="<a class='pageNum'>"+(j+(i*6)+1)+"</a>";
						}	
						pageBtHtml+="</span>";
					}
					pageBtHtml+="</span><a class='btNext'>下一页</a><a class='btNextArr'>>></a>";
				}else if(Math.ceil(proCount/pageProCount)>1)
				{
					pageBtHtml+="<a class='btFor'>上一页</a><span class='pageIndexBox'><span class='pageIndex'>";
					for(var j=0;j<Math.ceil(proCount/pageProCount);j++)
					{
						pageBtHtml+="<a class='pageNum'>"+(j+1)+"</a>";
					}	
					pageBtHtml+="</span></span><a class='btNext'>下一页</a>";
				}else if(Math.ceil(proCount/pageProCount)>0)
				{
					pageBtHtml+="<span class='pageIndexBox'><span class='pageIndex'><a class='pageNum'>1</a></span></span>";
				}
				$(".changePage .spBox .all b").html(proCount+"");
				$(".changePage .spBox .index b:first").html(1+"");
				$(".changePage .spBox .index b:last").html(Math.ceil(proCount/pageProCount)+"");
				$(".changePage .spBox .pageBts").html(pageBtHtml);
				$(".changePage .pageIndexBox .pageIndex").css("display","none");
				$(".changePage .pageIndexBox .pageIndex:first").css("display","block");
				$(".changePage .pageIndexBox .pageIndex .pageNum:first").css("background-color","#eee");
			})();
			(function(){
				//设置商品的html
				for(var i=0;i<Math.ceil(proCount/pageProCount);i++)
				{
					proHtml="";
					numInPage[i]=(proCount-pageProCount*i)>pageProCount?pageProCount:(proCount-pageProCount*i);
					for(var j=0;j<numInPage[i];j++)
					{
						proHtml+="<div class='pro'><a href='productsMsg.html?proNumber="+mySortArr[j].proNumber+"' class='pic'><img src='../jsonImages/productsList/"+mySortArr[j+i*20].proNumber+"_3.jpg' ></a><div class='text'><div class='div-1'><div>￥<span>"+mySortArr[j].proPrice+"</span></div><a href='#'></a></div><div class='div-2'>编号：<span>"+mySortArr[j].proNumber+"</span></div><div class='div-3'><a href='productsMsg.html?proNumber="+mySortArr[j].proNumber+"'>"+mySortArr[j].proName+"</a></div></div></div>";
					}
					PageHtml+="<div class='proListBox'>"+proHtml+"</div>";
				} 
				//判断商品图片是否加载完
				jqProList.html(PageHtml);
				loadedImgs=$(".contRight .proList .proListBox .pro img");
				idd=setInterval(function()
				{
					//判断图片是否加载完成方法一
					for(var j=0;j<numInPage[0];j++)
					{
						if(!loadedImgs[j].complete)
						{
							return;
						}
						var proListHeight=$($(".proList .proListBox")[0]).css("height");
						$(".proList").css({"height":proListHeight+""});
						
						clearInterval(idd);
					}
					/*//方法二
					imgLoadedNum=0;
					$(loadedImgs).each(function(){
	                    if(this.complete)
						{
							imgLoadedNum++;
						}
	                });
					if(imgLoadedNum==numInPage[0])
					{
						var proListHeight=$(".proList .proListBox").css("height");
						$(".proList").css({"height":proListHeight+""});
						clearInterval(idd);
					}*/
				},200);
				$($(".proList .proListBox")[0]).css("z-index","1");
			})();
			//切换页面函数（对页数大于6，小于6大于1和等于1三种情况分别判断）
			function changePage()
			{
				if(Math.ceil(proCount/pageProCount)>6)
				{
					$(".changePage .btForArr").click(function()
					{
						if(Math.ceil(pageIndexNow/6)>1)
						{
							$(".changePage .pageIndex")[Math.ceil(pageIndexNow/6)].style.display="none";
							$(".changePage .pageIndex")[Math.ceil(pageIndexNow/6)-1].style.display="block";
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#fff";
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="0";
							pageIndexNow=(Math.ceil(pageIndexNow/6)-1)*6;
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#eee";
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="1";
							//设置切换页面按钮组的容器宽度
							$(".changePage .pageIndexBox").css("width",$($(".changePage .pageIndex")[0]).css("width"));
							//设置当前页次
							$(".changePage .spBox .index b:first").html(pageIndexNow+"");
						}
					});
					$(".changePage .btFor").click(function()
					{
						if(pageIndexNow>1)
						{	
							if(pageIndexNow%6==1)
							{
								$(".changePage .pageIndex")[Math.ceil(pageIndexNow/6)].style.display="none";
								$(".changePage .pageIndex")[Math.ceil(pageIndexNow/6)-1].style.display="block";
							}
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#fff";
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="0";
							pageIndexNow--;
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#eee";
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="1";
							//设置当前页次
							$(".changePage .spBox .index b:first").html(pageIndexNow+"");
						}
					});
					$(".changePage .pageNum").click(function()
					{
						if(pageIndexNow!=parseInt($(this).html()))
						{
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#fff";
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="0";
							pageIndexNow=parseInt($(this).html());
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#eee";
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="1";
							//设置当前页次
							$(".changePage .spBox .index b:first").html(pageIndexNow+"");
						}
					});
					$(".changePage .btNext").click(function()
					{
						if(pageIndexNow<Math.ceil(proCount/pageProCount))
						{
							if(pageIndexNow%6==0)
							{
								$(".changePage .pageIndex")[Math.ceil(pageIndexNow/6)].style.display="none";
								$(".changePage .pageIndex")[Math.ceil(pageIndexNow/6)+1].style.display="block";

							}
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#fff";
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="0";
							pageIndexNow++;
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#eee";
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="1";
							//设置当前页次
							$(".changePage .spBox .index b:first").html(pageIndexNow+"");
						}
					});
					$(".changePage .btNextArr").click(function()
					{
						if(Math.ceil(pageIndexNow/6)<Math.ceil(Math.ceil(proCount/pageProCount)/6))
						{
							$(".changePage .pageIndex")[Math.ceil(pageIndexNow/6)].style.display="none";
							$(".changePage .pageIndex")[Math.ceil(pageIndexNow/6)+1].style.display="block";
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#fff";
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="0";
							pageIndexNow=(Math.ceil(pageIndexNow/6)-1)*6+1;
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#eee";
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="1";
							//设置切换页面按钮组的容器宽度
							$(".changePage .pageIndexBox").css("width",$($(".changePage .pageIndex")[0]).css("width"));
							//设置当前页次
							$(".changePage .spBox .index b:first").html(pageIndexNow+"");
						}
					});
				}else if(Math.ceil(proCount/pageProCount)>1)
				{
					$(".changePage .btFor").click(function()
					{
						if(pageIndexNow>1)
						{	
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#fff";
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="0";
							pageIndexNow--;
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#eee";
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="1";
							//设置当前页次
							$(".changePage .spBox .index b:first").html(pageIndexNow+"");
						}
					});
					$(".changePage .pageNum").click(function()
					{
						if(pageIndexNow!=parseInt($(this).html()))
						{
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#fff";
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="0";
							pageIndexNow=parseInt($(this).html());
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#eee";
							console.log($(".proList .proListBox")[pageIndexNow-1]);
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="1";
							//设置当前页次
							$(".changePage .spBox .index b:first").html(pageIndexNow+"");
						}
					});
					$(".changePage .btNext").click(function()
					{
						if(pageIndexNow<Math.ceil(proCount/pageProCount))
						{
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#fff";
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="0";
							pageIndexNow++;
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#eee";
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="1";
							//设置当前页次
							$(".changePage .spBox .index b:first").html(pageIndexNow+"");
						}
					});
				}else if(Math.ceil(proCount/pageProCount)>0)
				{
					$(".changePage .pageNum").click(function()
					{
						if(pageIndexNow!=parseInt($(this).html()))
						{
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#fff";
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="0";
							pageIndexNow=parseInt($(this).html());
							$(".changePage .pageNum")[pageIndexNow-1].style.backgroundColor="#eee";
							$(".proList .proListBox")[pageIndexNow-1].style.zIndex="1";
							//设置当前页次
							$(".changePage .spBox .index b:first").html(pageIndexNow+"");
						}
					});
				}
			}
			changePage();//切换页面调用函数
			/*var pageIndexWid=$(".changePage .pageIndex")[0];*/
			$(".changePage .pageIndexBox").css("width",$($(".changePage .pageIndex")[0]).css("width"));//设置切换页面按钮组的容器宽度
		}
		addHtml("proVolume");//动态添加商品和切换页面按钮的html调用函数

		//列表页操作函数
		function proListControl()
		{
			var sortIndex=0;//默认排列序号
			var sortBts=$(".contRight .chartBy div");
			sortBts.click(function()
				{
					if($(this).index()!=sortIndex)
					{
						sortIndex=$(this).index();
						for(var i=0;i<sortBts.length;i++)
						{
							$(sortBts[i]).css({"background-image":"url(../images/productsList/tabBg2.gif)"});
							$($(sortBts[i]).children("a")).css({"background":"none","color":"#666","font-weight":"500"});
						}
						switch(sortIndex)
						{
							case 0:
								addHtml("proVolume");
								break;
							case 1:
								addHtml("proPrice");
								break;
							case 2:
								addHtml("proUpLoadDate");
								break;
						}
						$(this).css({"background-image":"url(../images/productsList/tabBg.gif)"});
						$($(this).children("a")).css({"background":"url(../images/productsList/chaetByShoot.gif) no-repeat 5px center","color":"#fff","font-weight":"600"});
					}
				});
		}
		proListControl();
	}
}