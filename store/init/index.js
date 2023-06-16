import storeConfig from "@/store_config/config_app.js"
let interTimer;
export default async function(e) {
	
	

	// 获取用户手机尺寸大小，设置到本地
	this.$store.dispatch("bar/getCustomNavBarInfo", {})



	// 设置全局system_id
	this.$store.dispatch("app/reqSystem", {
		system_id: e?.query?.system_id || null
	}).then(res => {
		// 尝试去同步用户本地数据到vuex
		let timer = setTimeout(() => {
			clearTimeout(timer);
			this.$store.dispatch("user/getLocalTokenDataRefresh");
			let timer_tmp = setTimeout(() => {
				uni.$emit("on_system_init", res);
				clearTimeout(timer_tmp);
			}, 1);
		}, 1);

	})





	// 监听vuex数据变化,必须要先监听,用作登录跳转
	uni.$on("on_userTokenDataRefresh", (tokenUser = {}) => {
		if (!tokenUser?.id) {
			this.$store.dispatch("user/logout")
		}
		// 如果之前的定时器存在先进行销毁
		interTimer && (clearInterval(interTimer));
		interTimer = setInterval(() => {
			let pages = getCurrentPages();
			let current_page = "/" + pages?.[pages.length - 1]?.route;
			let user_id = tokenUser.id || false;
			if (user_id) {
				// 登录成功后如何存在账户token,直接把管理员token换成用户token
				if (tokenUser?.account_token) {
					storeConfig.gql_authorization = tokenUser?.account_token;
				}
				this.$store.dispatch("user/getUserByToken")
			} else if (!user_id && storeConfig?.isForceLogin && current_page != storeConfig
				.login_page) {
				uni.redirectTo({
					url: storeConfig.login_page
				})
			}
		}, 500);
	})

	// #ifdef VUE3
	// 监听多语言切换
	uni.onLocaleChange(res => {
		let locale = res.locale
		this.$i18n && (this.$i18n.locale = locale)
	})
	// #endif

}