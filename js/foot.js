
//二级列表显示隐藏函数
function navMouseOver()
{
	var _a=$(".navUl-2 li .a-li");
	var _navList=$(".navUl-2 .navList");
	var idd=0;
	var targetAct;
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
		// _target.css({"backgroundImage":"none","backgroundColor":"#333","opacity":0.9});
		targetAct.parentNode.style.backgroundImage="none";
		targetAct.parentNode.style.backgroundColor="#333";
		targetAct.parentNode.style.opacity=0.9;
		targetAct.style.backgroundImage="url(images/head/liBg2.gif)";
		targetAct.style.color="#fff";
		_navList.css("display","block");
	}
	function myLeave()
	{
		// _target.css({"backgroundImage":"url(../images/head/navBg-3.jpg)","backgroundColor":"","opacity":1});
		targetAct.parentNode.style.backgroundImage="url(images/head/navBg-3.jpg)";
		targetAct.parentNode.style.backgroundColor="";
		targetAct.parentNode.style.opacity=1;
		targetAct.style.backgroundImage="url(images/head/liBg.jpg)";
		targetAct.style.color="#666";
		_navList.css("display","none");
	}
}
