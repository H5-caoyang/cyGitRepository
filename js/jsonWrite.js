function jsonWriteText()
{
	var strKind01=["服装配饰","珠宝饰品","美容用品","厨房用品","厨房电器","家庭生活","数码家电","礼品收藏","食品酒水"];
	var strKind02=[["配饰","内衣","服装"],
					["手表","流行饰品","高档珠宝"],
					["化妆品","美容工具","护肤品"],
					["厨房用具","厨房摆饰","炊具"],
					["厨房电器用品","电子烹饪工具"],
					["床上用品","家居用品","装饰配件","汽车","健身器材","户外","儿童玩偶"],
					["大型家电","手机数码","生活电器","电脑产品"],
					["摆设收藏","收藏品","金制品","银制品"],
					["食品","酒水"]
				  ];
	var strKind03=[
				    [
						["箱包","精选女用包","实用功能包","太阳镜","女鞋","男鞋","其他"],
						["保暖内衣","内衣裤","文胸"],
						["男士服装","女士服装","其他"]
					],
					[
						["机械表","电子表"],
						["饰品套组","其他"],
						["金银首饰","宝石（红宝、蓝宝、半宝石、其他宝石）","玉石","珍珠","水晶","玛瑙","其他"]
					],
					[
						["隔离遮瑕","粉底粉饼","唇彩","芳香类","其他"],
						["美发器具","电动牙刷","剃须刀","洗浴用品","洗护发用品","其他清洁保养","其他"],
						["面部清洁","美白","保湿","滋润保养","抗衰老","面膜","原液","面部综合护理","身体综合护理","眼膜","防晒","手足呵护","其他"]
					],
					[
						["厨具","碗盘","其他"],
						["杯具","餐具","1000元以下的茶具","酒具"],
						["保鲜器具","保鲜盒/密封罐"],
						["压力锅","炒锅","汤锅","蒸锅","煎锅","奶锅"]
					],
					[
						["榨汁机","豆浆机","搅拌机","净水器","抽油烟机","灶具","咖啡机","电子消毒柜","其他"],
						["电饭煲","电锅","微波炉","电烤箱","微波炉","电压力锅","制面包机","电磁炉","蒸锅"]
					],
					[
						["套装床品","被子","枕头","席类","其他"],
						["清洁用品","收纳用品","衣架","购物车","其他"],
						["椅子","柜子","其他"],
						["地毯","钟表"],
						["洗车机","汽车坐垫","车用电器","汽车保养"],
						["按摩","健身","车用电器","血压计","血糖计","其他"],
						["自行车","电动车"],
						["毛绒玩具","益智玩具"]
					],
					[
						["洗衣机","热水器"],
						["智能手机","非智能手机","手机配件及周边","相机","摄像机","导航仪","行车记录仪","数码设备配件及周边"],
						["足浴盆","电熨斗","电暖器","吸尘器","电动拖把","清洁机","净水机","电风扇","电动扫地机","空气净化器","两季电器","家用坐便","挂烫机","电热毯","其他"],
						["一体机","笔记本","平板电脑","电脑配件及其他相关"]
					],
					[
						["木制品","雕刻","陶器","瓷器","玉石摆件","钱币","景泰蓝","千元以上茶具及配件","其他"],
						["字画","票证","其他杂项"],
						["投资金","其他"],
						["投资银","银餐具","银装饰品","银纪念币","其他"]
					],
					[
						["米","茶叶","食用油","调料","农产品","糕饼、糖果","套装","干货","炒货","保健性食品","其他"],
						["红酒","白酒","葡萄酒"]
					]
				  ];
	var ssBrand01="娇韵诗 GUCCI 娇诗婷 马踏飞燕 仙子宜岱 米兰春天 马克芬迪 SUNQUEEN 富威格 Rothania 澳牧绒 梦莱雅 C&C 步非凡 其他品牌 爱恋伊 诗尔莉 瓦萨瓦旗 CYDNEY AIRBAK 雅鹿 自由自在 阙兰绢 黛莱美 欧尔佳 尚贵人 芭比 朵漫 VIONIC 南极人 欧典梵高 馨蒂 帝奥恺撒 芬维雅 N.L 木棉道 MEYOE Nina 阿诗玛 S.T 玛缇花 老爷车 凯莎 浪莎 POLOTEX Julia 棉博士 马踏飞 恒源祥 瑞士军刀 LANARAES A度 艾诺兰蒂卡 高杉 维克斯 玛伊莎 诗柔 依媚娇人 J.K Airbak 纳博万 梦萝莎 雅鹿 伊俪坊 Genie 金蝎子 D&H Tiana 慕尔美 雅鹿自由自在 米丝缇娜 威登保罗 英皇狼 Chenke 碧姬 杉杉 心上人 爱柔仕 路易华菲 RELAX LYDIA 摩登狐";
	var strBrand01=ssBrand01.split(" ");
	var lastKindCount=[[[3,1,4,5,2,1,3],[5,0,0],[120,0,0]]];
	var imageUrls=[];
	//获取一个随机日期
	function getUpLoadDate()
	{
		var da=addDate(getRandom(10,100));
		var month=da.getMonth()<10?"0"+da.getMonth():da.getMonth();
		var day=da.getDate()<10?"0"+da.getDate():da.getDate();
		var _upLoadDate=da.getFullYear()+""+month+""+day;
		return _upLoadDate;
	}
	//计算各级菜单下的商品数量
	function getProCount()
	{
		var kind1Count,kind2Count=[],kind3Count=[],kind4Count=[];
		var k1=0,k2=0,k3=0;
		for(var i=0;i<lastKindCount.length;i++)
		{
			k2=0;
			kind4Count=[];
			for(var j=0;j<lastKindCount[i].length;j++)
			{
				k3=0;
				for(var k=0;k<lastKindCount[i][j].length;k++)
				{
					k3+=lastKindCount[i][j][k];
				}
				kind4Count[j]=k3;
				k2+=k3;
			}
			kind2Count[i]=k2;
			kind3Count[i]=kind4Count;
			k1+=k2;
		}
		kind1Count=k1;
		return [kind1Count,kind2Count,kind3Count];
	}
	var kindCount=getProCount();
	function myJsonWrite()
	{	
		var proIndex=0;
		var myJson={"title":"商品信息","proCount":kindCount[0],"data":[]};
		for(var n=0;n<lastKindCount.length;n++)//第一层品类
		{
			myJson.data[n]={"proName":strKind01[n],"proNumber":0+""+(n+1),"proCount":kindCount[1][n],"data":[]};
		
			for(var i=0;i<lastKindCount[n].length;i++)//第二层品类
			{
				myJson.data[n].data[i]={"proName":strKind02[n][i],"proNumber":myJson.data[n].proNumber+"0"+(i+1),"proCount":kindCount[2][n][i],"data":[]};
				for(var j=0;j<lastKindCount[n][i].length;j++)//第三层品类
				{
					myJson.data[n].data[i].data[j]={"proName":strKind03[n][i][j],"proNumber":myJson.data[n].proNumber+"0"+(i+1)+"0"+(j+1),"proCount":lastKindCount[n][i][j],"data":[]};
					for(var k=0;k<lastKindCount[n][i][j];k++)//第四层商品
					{
						proIndex++;
						myJson.data[n].data[i].data[j].data[k]={"proName":"迪梦思偏光太阳镜3+2超值组","proNumber":myJson.data[n].proNumber+"0"+(i+1)+"0"+(j+1)+(Array(4).join(0) + proIndex).slice(-4),"proCount":parseInt(getRandom(10,100))+"","proUpLoadDate":getUpLoadDate()+"","proTvShowNum":parseInt(getRandom(1,100))+"","proPrice":getRandom(100,5000).toFixed(2)+"","proBrand":strBrand01[parseInt(getRandom(0,strBrand01.length))]+"","proVolume":parseInt(getRandom(10,1000))+"","imageUrls":imageUrls};
					}
				}
			}
		}
		//打印json数据
		console.log(JSON.stringify(myJson));
	}
	myJsonWrite();
	//console.log(kindCount);
}
//匹配字符串
function ww()
{
	var ss='';
	var chis=ss.split(";");
	var str="";
	var preg=/[\u4e00-\u9fa5]+|[A-Z]+[a-z]*/;
	for(var i=0;i<chis.length;i++)
	{
		str+=preg.exec(chis[i])+" ";
	}
	console.log(str);
}