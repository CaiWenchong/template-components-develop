export default {
	state: {
		customNavBarInfo: uni.getStorageSync('customNavBarInfo') || {},
	},
	getters: {
		getSystemInfo: state => {
			return state.systemInfo
		}
	},

	mutations: {
		setCustomNavBarInfo(state, customNavBarInfo) {
			if (customNavBarInfo) {
				state.customNavBarInfo = customNavBarInfo;
				uni.setStorageSync("customNavBarInfo", customNavBarInfo);
			} else {
				if (uni.getStorageSync('customNavBarInfo')) {
					state.customNavBarInfo = uni.getStorageSync('customNavBarInfo');
				}
			}
		}
	},
	actions: {
		getCustomNavBarInfo(context) {
			let info = uni.getStorageSync('customNavBarInfo');
			let stateInfo = JSON.stringify(context.state.customNavBarInfo)
			if (stateInfo == "{}") {
				if (info) {
					context.commit("setCustomNavBarInfo", info)
				} else {
					context.dispatch("WXCustomNavBarInfoApi")
				}
			}
			return context.state.customNavBarInfo;
		},



		// 获取手机宽高，计算navBar
		WXCustomNavBarInfoApi(context) {
			let menuButtonObject = uni.getMenuButtonBoundingClientRect()
			uni.getSystemInfo({
				success: res => {
					// 整个导航栏的高度
					let navHeight = menuButtonObject.top + menuButtonObject.height + (menuButtonObject
						.top - res
						.statusBarHeight) * 2
					// 导航栏的高度
					let nav = navHeight - res.statusBarHeight
					// // 挂载到全区变量 globalData 上
					// this.globalData.navHeight = navHeight
					// this.globalData.nav = nav
					// // 胶囊与左边的距离
					// this.globalData.menuLeft = menuButtonObject.left
					// // 胶囊的高度
					// this.globalData.menuHeight = menuButtonObject.height
					// // 胶囊距离顶部的高度
					// this.globalData.menuBottom = menuButtonObject.top - res.statusBarHeight
					// // 整个设备的宽度
					// this.globalData.windowWidth = res.windowWidth
					// console.log(this.globalData)

					const info = {
						navHeight: navHeight,
						nav: nav,
						left: menuButtonObject.left, // // 胶囊与左边的距离
						height: menuButtonObject.height, // // 胶囊的高度
						statusBarHeight: res.statusBarHeight, // // 胶囊距离顶部的高度
						windowWidth: res.windowWidth, // // 整个设备的宽度
						windowHeight: res.windowHeight, // // 整个设备的高度
					}


					context.commit("setCustomNavBarInfo", info)


				}
			})
		}







	},








}