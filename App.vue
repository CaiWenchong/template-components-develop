<script>
	import init from "@/store/init/index.js"
	export default {
		onLaunch: async function(e) {
			console.log('App Launch')
			await init.call(this, e)

			uni.$on("on_system_init", (system = {}) => {
				// 系统初始化完成，可以去执行相关全局业务,如微信静默登录
				console.log(system, "------系统初始化完成时会触发，可以选择是否在此执行相关逻辑")
			})
			uni.$on("on_userTokenDataRefresh", (tokenUser = {}) => {
				// 自定义跳转引导 请不要在此处执行登录相关逻辑【register_login】,否则会造成死循环
				console.log(tokenUser, "------token信息变化时会触发，可以选择是否在此执行相关逻辑");
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {},
	}
</script>

<style lang="scss">
	// uview-plus基础样式
	@import "@/uni_modules/uview-plus/index.scss";

	// uni-ui.scss 还提供了一批辅助样式 ，目的是供用户完成快速布局。 需要用户决定是否使用 ，如果使用的话css会增大 27kb 左右
	@import '@/uni_modules/uni-scss/index.scss';



	@import '@/static/iconfont/iconfont.css';
	@import '@/static/iconfont/iconfont2/iconfont.css';
	/*每个页面公共css */
</style>