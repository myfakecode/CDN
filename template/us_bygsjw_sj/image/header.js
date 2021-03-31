
//如果需要头部导航栏固定，把下面代码全部删除即可。

var new_scroll_position = 0;
var last_scroll_position;
var byg_header_nav = document.getElementById("byg_header");
var header_scroll_d = 0, header_scroll_t = 0;

window.addEventListener('scroll', function(e) {
	last_scroll_position = window.scrollY;
	if (last_scroll_position > 150) {
		// 向下滚动
		if (new_scroll_position < last_scroll_position) {
			header_scroll_d = last_scroll_position;
			if (header_scroll_d > header_scroll_t + 50) {
				byg_header_nav.classList.remove("slideDown");
				byg_header_nav.classList.add("slideUp");
			}
		// 向上滚动
		} else if (new_scroll_position > last_scroll_position) {
			header_scroll_t = last_scroll_position;
			if (header_scroll_d > header_scroll_t + 50) {
				byg_header_nav.classList.remove("slideUp");
				byg_header_nav.classList.add("slideDown");
			}
		}
		new_scroll_position = last_scroll_position;
	} else {
		byg_header_nav.classList.remove("slideUp");
		byg_header_nav.classList.add("slideDown");
	}
});
