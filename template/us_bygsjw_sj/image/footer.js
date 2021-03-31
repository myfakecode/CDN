
//如果需要尾部导航栏固定，把下面代码全部删除即可。

var new1_scroll_position = 0;
var last1_scroll_position;
var byg_footer_nav = document.getElementById("footer_nav");
var footer_scroll_d = 0, footer_scroll_t = 0;

window.addEventListener('scroll', function (e) {
	last1_scroll_position = window.scrollY;
	if (last1_scroll_position > 150) {
		// 向下滚动
		if (new1_scroll_position < last1_scroll_position) {
			footer_scroll_d = last1_scroll_position;
			if (footer_scroll_d > footer_scroll_t + 50) {
				byg_footer_nav.classList.remove("slideDown");
				byg_footer_nav.classList.add("slideUp1");
			}
		// 向上滚动
		} else if (new1_scroll_position > last1_scroll_position) {
			footer_scroll_t = last1_scroll_position;
			if (footer_scroll_d > footer_scroll_t + 50) {
				byg_footer_nav.classList.remove("slideUp1");
				byg_footer_nav.classList.add("slideDown");
			}
		}
		new1_scroll_position = last1_scroll_position;
	} else {
		byg_footer_nav.classList.remove("slideUp1");
		byg_footer_nav.classList.add("slideDown");
	}
});
