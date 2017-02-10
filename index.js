// 响应函数
fullWidth();
function fullWidth(){
	if ($(window).width()>=1440) {
		$("html").css("font-size",100);
	} else{
		$("html").css("font-size",$(window).width() / 1440 * 100);
	}	
}
$(window).resize(function(){
	fullWidth();
	navScroll();
})

// 轮播图
// 当前轮播图的索引
var index = 2

// 正常轮播
var timer = setInterval(changeIndex,5000);

// 改变索引
function changeIndex(){	
	index = index >= $("#banner .banner_img_a").length - 1? 0:index + 1;
	slideImg();
};

// 切换轮播图片
function slideImg(){
	$("#banner .banner_img_a").eq(index).css("display","inline").siblings(".banner_img_a").css("display","none");
	$("#banner .indicator span").eq(index).addClass("cur").siblings().removeClass("cur");	
};

// 鼠标放在/离开轮播图指示器上的函数
$("#banner .indicator span").hover(function(){
	clearInterval(timer);
	index = $(this).index();
	slideImg();
},function(){
	timer = setInterval(changeIndex,5000);
});


// 导航栏
var isMiss = true;
$("#nav .menu ul li").mouseenter(function(){
	
	$(this).addClass("active");
	
	if ($(this).index() > 6) {
		menuHide();
		return;
	}
	isMiss = false;
	
	$("#nav .drop_down ul li img").attr("src","");
	$(".pro_name").html("");
	$(".pro_price").html("");
	$("#nav .drop_down ul li").css("border","none");
	$(".drop_down").show();
	var obj = arr[$(this).index()].data;
	
	$("#nav .drop_down ul li").each(function(){
		
		var info = obj[$(this).index()]
		
		if (obj.length - 1 > $(this).index()) {
			$(this).css("border-right","0.02rem solid gainsboro");
		}
			
		if (!info) {
			return;
		}
			
		$(this).find("img").attr("src",info.imgsrc);
		$(this).find(".pro_name").html("<br />" + info.name + "<br />");
		$(this).find(".pro_price").html(info.price);
		
	});	
});

$("#nav .menu ul li").mouseleave(function(){
	$(this).removeClass("active");
	menuHide();
});

$("#nav .drop_down").mouseenter(function(){
	isMiss = false;
});

$("#nav .drop_down").mouseleave(function(){
	menuHide();
});

$("#login").click(function(){	
	$("#screen").width($("#container").width()).height($("#container").height());
	$("#screen").fadeIn();	
})

// 导航栏菜单隐藏
function menuHide(){
	isMiss = true;
	setTimeout(function(){
		if (isMiss) {
			$(".drop_down").hide();
		}
	},200);	
};

// 页面滚动时
$(document).scroll(function(){
	navScroll();
});

function navScroll(){
	if ($(document).scrollTop() > $("#banner").height()) {
		$("#nav").css({position: "fixed",top: 0})
	}else{
		$("#nav").css({position: "",top: ""})
	}
};



// 烟花定时
setInterval(function(){
	$("#container div.fire").css("display","block");
	$("#container div.fire").animate({
		left : Math.floor($("#container").width() - Math.random()*1000)
	},0).animate({
		bottom : Math.floor(Math.random()*1000 / 2) + 450
	},1000,function(){
		$("#container div.fire").css("height","2");
		$("#container div.fire").css("width","2");
		$("#container div.fire div").css("display","block");
		$("#container div.fire div").animate({
			opacity: 1
		},300,function(){
			fire_Hide();
		})
	});		
},3000);
	
function fire_Hide(){
	$("#container div.fire").css("height","5");
	$("#container div.fire").css("width","1");
	$("#container div.fire").css("bottom","0");
	$("#container div.fire").css("display","none");
	$("#container div.fire div").css("display","none");
	$("#container div.fire div").css("opacity","0");
};