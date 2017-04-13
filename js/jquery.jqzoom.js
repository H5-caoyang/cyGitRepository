//**************************************************************
// jQZoom allows you to realize a small magnifier window,close
// to the image or images on your web page easily.
//
// jqZoom version 2.1
// Author Doc. Ing. Renzi Marco(www.mind-projects.it)
// First Release on Dec 05 2007
// i'm searching for a job,pick me up!!!
// mail: renzi.mrc@gmail.com
//**************************************************************

(function($){

		$.fn.jqueryzoom = function(options){
		var settings = {
				xzoom: 100,//zoomed width default width
				yzoom: 100,//zoomed div default width
				offset: 10,	//zoomed div default offset
				position: "right",//zoomed div default position,offset position is to the right of the image
				lens:1, //zooming lens over the image,by default is 1;
				preload: 1
			};

			if(options) {
				$.extend(settings, options);
			}

		    var noalt='';
		    //鼠标移动到大图上面
		    $(this).hover(function(){

		    var imageLeft = this.offsetLeft;
		    var imageRight = this.offsetRight;
		    var imageTop =  $(this).get(0).offsetTop;
		    var imageWidth = $(this).children('img').get(0).offsetWidth;
		    var imageHeight = $(this).children('img').get(0).offsetHeight;
			var thisSrc=$(this).children("img").attr("src");
			var scalePic=$("div.scalePic")[0];
			var thisEvent=this;

            noalt= $(this).children("img").attr("alt");
            scalePic.style.backgroundImage="url("+thisSrc+")";
		    var bigimage = $(this).children("img").attr("src");
            $(this).children("img").attr("alt",'');
		   
            $("div.scalePic").show();
            $("div.scaleGlass").show();
            if(!settings.lens){
              $(this).css('cursor','crosshair');
			}

				   $(document.body).mousemove(function(e){



                   mouse = new MouseEvent(e);

                   /*$("div.scaleGlass").hide();*/


				    var bigwidth = $(thisEvent).get(0).offsetWidth;

				    var bigheight = $(thisEvent).get(0).offsetHeight;

				    var scaley =2;

				    var scalex=2;

				    $("div.scaleGlass").width((settings.xzoom)/scalex );
		    		$("div.scaleGlass").height((settings.yzoom)/scaley);
                    if(settings.lens)
                    {
                   		$("div.scaleGlass").css('visibility','visible');
					}

                    xpos = mouse.x - $("div.scaleGlass").width()/2 - imageLeft;

                    ypos = mouse.y - $("div.scaleGlass").height()/2 - imageTop ;

                    if(settings.lens){

                    xpos = (mouse.x - $("div.scaleGlass").width()/2 < imageLeft ) ? 0 : (mouse.x + $("div.scaleGlass").width()/2 > imageWidth + imageLeft ) ?  (imageWidth -$("div.scaleGlass").width() -2)  : xpos;

					ypos = (mouse.y - $("div.scaleGlass").height()/2 < imageTop ) ? 0 : (mouse.y + $("div.scaleGlass").height()/2  > imageHeight + imageTop ) ?  (imageHeight - $("div.scaleGlass").height() -2 ) : ypos;

                    }


                    if(settings.lens){

                    $("div.scaleGlass").css({ top: ypos,left: xpos });
                    }



					scrolly = ypos;
					scrollx = xpos;
					var bigBackgroundLeft=-(scrollx) * scalex;
					var bigBackgroundTop=-(scrolly) * scalex;
	
					$("div.scalePic")[0].style.backgroundPosition =bigBackgroundLeft+"px "+bigBackgroundTop+"px";

				    });
		    },function(){
		    	$("div.scalePic").hide();
		    	$("div.scaleGlass").hide();
		    });

        count = 0;

		if(settings.preload){

		$('body').append("<div style='display:none;' class='jqPreload"+count+"'>sdsdssdsd</div>");

		$(this).each(function(){

        var imagetopreload= $(this).children("img").attr("jqimg");

        var content = jQuery('div.jqPreload'+count+'').html();

        jQuery('div.jqPreload'+count+'').html(content+'<img src=\"'+imagetopreload+'\">');

		});

		}

		}

})(jQuery);

function MouseEvent(e) {
this.x = e.pageX
this.y = e.pageY


}


