<template>
	<!-- 撑开下面的距离 -->
	<view class="m-navBar" :style="{marginBottom: `${navHeight + 5}px`}">

		<!-- 自定义导航栏 -->
		<view class='header-container'>
			<view class='header-content' :style="[
			{marginTop: `${navTop}px`},
			{height: `${navHeight - navTop}px`},
		]">
				<view class="left-icon-contriner" >
					<view class="foldBox"  v-if="icon"  @tap="leftIconClick">
						<uni-icons :type="icon" size="22" class="foldIcon"></uni-icons>
					</view>
					<!-- 插槽左侧内容自定义，如果设置了icon,插槽不显示 -->
					<slot name="left" v-else></slot>
				</view>

				<view class="title-container">
					<text class="text" style="font-weight: bold;" v-if="title">{{title}}</text>
					<!-- 插槽中间内容自定义，如果设置了icon,插槽不显示 -->
					<slot name="center" v-else></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 此组件需要搭配vuex:bar.js使用
	 * vuex文件在\template-components-develop\store\modules\bar.js
	 */
	export default {
		name: "navBar",
		// emits: ['leftIconClick'], //也可以用对象的形式，里面可以对事件进行验证，同props
		props: {
			// 字体颜色
			title: {
				type: String,
				default: ''
			},
			icon: {
				type: String,
				default: ''
			}

		},
		data() {
			return {

			};
		},
		created() {
			const info = JSON.parse(JSON.stringify(this.$store.state.bar.customNavBarInfo))
			this.navTop = info.nav
			this.navHeight = info.navHeight
			this.windowHeight = info.windowHeight

		},
		methods: {
			leftIconClick(e) {
				let temp = {
					title: this.title
				}
				e = {
					...e,
					...temp
				}
				this.$emit('leftIconClick', e);
			}
		}


	}
</script>

<style lang="scss" scoped>
	//-------------自定义顶部导航栏start-------------------
	.foldBox {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50px;
		display: flex;
		/**/
		justify-content: center;
		/*水平居中*/
		align-items: center;
		/*垂直居中*/
		margin-left: 20rpx;
		border: 3rpx solid #f2f2f2;
	}

	.titleBox {
		text-align: center;
		line-height: 80px;
		font-size: 20px;
	}

	//顶部导航栏
	.header-container {
		background-color: #fff;
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
	}

	//顶部导航栏
	.header-content {
		width: 100%;
		// background-color: red;
		box-sizing: border-box;
		padding-left: 10px;
		padding-right: 5px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
	}

	//顶部导航栏标题
	.title-container {
		position: absolute;
		display: inline-block;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%, -50%, 0);
	}

	//-------------自定义顶部导航栏end-------------------
</style>