
if(jQuery(document).height() > jQuery(window).height() + 100) {
	jQuery(".byg_scrolltop").addClass("scrolltop_show");
	jQuery(".scrolltop_top").css("display","none");
}

jQuery(window).scroll(function() {
	if(jQuery(window).scrollTop() < 500) {
		jQuery(".scrolltop_top").css("display","none");
	} else {
		jQuery(".scrolltop_top").removeAttr("style","");
	}
});

var new2_scroll_position = 0;
var last2_scroll_position;
var scroll_scroll_d = 0, scroll_scroll_t = 0;
window.addEventListener('scroll', function(e) {
	last2_scroll_position = window.scrollY;
	// 向下滚动
	if (new2_scroll_position < last2_scroll_position) {
		scroll_scroll_d = last2_scroll_position;
		if (scroll_scroll_d > scroll_scroll_t + 50) {
			jQuery(".byg_scrolltop").removeClass("scrolltop_show");
		}
	// 向上滚动
	} else if (new2_scroll_position > last2_scroll_position) {
		scroll_scroll_t = last2_scroll_position;
		if (scroll_scroll_d > scroll_scroll_t + 50) {
			jQuery(".byg_scrolltop").addClass("scrolltop_show");
		}
	}
	new2_scroll_position = last2_scroll_position;
});

function topFunction() {
	jQuery("html, body").animate({scrollTop: 0}, 500);
}
