var is_loading = false;
var dealLoading_times = 0;
const changeloading = (dealLoading = true, title = "加载中...") => {
	// 避免阻塞，异步的消息提示
	if (dealLoading) {
		dealLoading_times += 1;
	}
	if (!dealLoading) {
		dealLoading_times -= 1;
	}

	if (dealLoading && !is_loading) {
		process.env.NODE_ENV !== 'production' && console.log(`\n\n%c======>loading_start.............>`,
			"color: #0055ff");
		is_loading = true;
		uni.showLoading({
			title,
			mask: true
		});
	} else if (!dealLoading && is_loading && dealLoading_times === 0) {
		process.env.NODE_ENV !== 'production' && console.log(`%c======<loading_end================<\n\n`,
			"color: #0055ff");
		is_loading = false;
		uni.hideLoading();
	}
	return is_loading;
}

const log = (title, data = "") => {
	//只有在开发环境才使用调试
	if (process.env.NODE_ENV !== 'production') {
		console.log(`%c${title}`, "color: #c785c8", data);
	} else {
		//console.log(data);
	}
}


const toast = (tips = "出错啦", icon = "none") => {
	// 避免阻塞，异步的消息提示
	uni.showToast({
		title: tips,
		icon: icon
	})
}

function endReqStop(reqName, context) {
	context.commit("MreqStop", {
		reqName
	})
}

// 自动更新请求阻止，把vuex的context传入
function isReqStop(reqName, context, payload = {}) {
	// 获取当前时间戳
	let timestamp = new Date().getTime()

	if (!payload.limit_time) {
		payload.limit_time = 0
	}
	let toTime = timestamp + parseInt(payload.limit_time)
	let stopToTime = context.state.reqStop && context.state.reqStop[reqName]
	// 如果当前时间还在阻止，则阻止请求
	if (timestamp < stopToTime) {
		let err = "请求频繁，请" + (stopToTime - timestamp) / 1000 + "s后再试"
		return err
	} else {
		context.commit("MreqStop", {
			reqName,
			toTime
		})
		return false
	}
}

async function reqCommon(actionName, context, payload = {}, callback = "") {
	let loadingTitle = payload.loadingTitle || "加载中..."
	payload.loadingTitle = loadingTitle
	let isloading = payload.isloading === false ? false : true //只有指定了不显示加载动画才不会显示
	payload.isloading = isloading
	let isdeal = payload.isdeal === false ? false : true //只有指定了不处理结果才不会进行处理
	payload.isdeal = isdeal
	let istoast = payload.istoast === false ? false : true //传入该值true时，错误会自动提示
	payload.istoast = istoast
	let isthrow = payload.isthrow === false ? false : true //只有指定了不抛出错误才不会抛出，区别是：throw需要前端自行捕获
	payload.isthrow = isthrow

	let callbackRes = {
		errCode: "reqCommon",
		errMsg: ""
	}
	let err = false
	err = isReqStop(actionName, context, payload) || false
	if (err === false) {
		isloading && changeloading(true, loadingTitle) //执行loading动画
		log('reqCommon请求：【' + actionName + '】开始：', payload);
		try {
			callbackRes = await callback()
		} catch (e) {
			err = e
		}

		err !== false && (callbackRes.errMsg = err)
		// 执行action后,处理公共操作
		endReqStop(actionName, context)
		log('reqCommon执行：【' + actionName + '】结束：', callbackRes);
		isloading && changeloading(false);
	}

	if (err !== false) {
		callbackRes.errMsg = err
		istoast && toast(typeof err == "object" ? JSON.stringify(err) : err)
		if (isthrow) {
			throw err
		}
	}
	return callbackRes
}
// obj2合并到obj1，对象深度合并,isTips是否打印合并提示
function deepMerge(obj1, obj2, isTips = true) {
	let key;
	for (key in obj2) {
		// 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
		// 如果obj2[key]没有值或者值不是对象，此时直接替换obj1[key]
		obj1[key] = obj1[key] && obj1[key].toString() === "[object Object]" && (obj2[key] && obj2[key].toString() ===
			"[object Object]") ? deepMerge(obj1[key], obj2[key], isTips) : (obj1[key] = obj2[key]);
		isTips && process.env.NODE_ENV !== 'production' && console.log("deepMerge更新【" + key + "】：", obj1[key]);
	}
	return obj1;
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
			log(`toUrl跳转路径：${aim}, 跳转method：${method}`)
			clearTimeout(timer)
		}, 20)
	}
}
/**
 * 里面封装了在vuex中常用的工具函数
 */
export {
	isReqStop,
	endReqStop,
	changeloading,
	toast,
	log,
	deepMerge,
	reqCommon,
	toUrl
}