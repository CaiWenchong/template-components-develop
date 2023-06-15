// 登录成功后跳转页面
function loginToPage(data = {}) {
	let {
		login_page = "", redirect_page = "", index_page = ""
	} = data;

	let isNeed = true
	// 有跳转页则直接跳转跳转
	isNeed && (isNeed = toUrl(data?.redirect_page));

	// 判断路由页面是否还有除了登录页以外的页面，如果有则进行路由返回
	if (isNeed) {
		let delta = 0;
		let pages = getCurrentPages();
		pages.forEach((page, index) => {
			let route_page = pages[pages.length - index - 1].route;
			let route_page_arr = route_page.split("/");
			let login_page_arr = login_page.split("/");
			// 如果存在页面路由的倒数第二个路径参数与登录页面的倒数第二个路径参数相同，则说明可能还是登录页面的内容，需要继续返回
			if (route_page_arr[route_page_arr.length - 2] == login_page_arr[login_page_arr.length - 2]) {
				delta += 1
			} else {
				isNeed = toUrl(delta, "navigateBack", "delta");
				return;
			}
		})
	}

	// 如果还需要跳转，则直接跳转首页
	isNeed && (isNeed = toUrl(data?.index_page));
}

function toUrl(aim, method = "redirectTo", key = "url") {
	if (aim) {
		let navi_to
		switch (method) {
			case "redirectTo":
				navi_to = uni.redirectTo
				break;
			case "navigateTo":
				navi_to = uni.navigateTo
				break;
			case "reLaunch":
				navi_to = uni.reLaunch
				break;
			case "switchTab":
				navi_to = uni.switchTab
				break;
			case "navigateBack":
				navi_to = uni.navigateBack
				break;
			default:
				navi_to = uni[method]
				break;
		}
		let timer = setTimeout(() => {
			navi_to && navi_to({
				[key]: aim
			})
			clearTimeout(timer)
		}, 30)
		return false
	}
	return true
}
export default loginToPage