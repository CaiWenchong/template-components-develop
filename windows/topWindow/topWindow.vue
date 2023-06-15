<template>
	<view class="wrap_topWindows">
		<!-- 左侧logo和后台名称 -->
		<view class="wrap_topWindows_left">
			<image src="../../static/logo.png" mode="aspectFit"></image>
			<text class="">标题名称</text>
		</view>

		<!-- 右侧主题颜色、多语言、用户管理元素 -->
		<view class="wrap_topWindows_right">
			<view class="wrap_topWindows_right_theme">
				主题切换
			</view>
			<view @click="test=true" class="wrap_topWindows_right_locale">多语言</view>
			<view class="wrap_topWindows_right_user">
				<view v-if="test" @click="test=true"
					style="height: var(--top-window-height);width: var(--top-window-height);background-color: aqua;position: fixed;z-index: 1999;transform: translateY(50%);">

				</view>
				<view v-if="test" @click="test=false" class="uni-mask" style="background-color:rgba(0, 0, 0, 0)">

				</view>
				<image src="../../static/logo.png" mode="aspectFit"></image>
				<text>用户名</text>
				<uni-icons type="right" size="20"></uni-icons>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				test: false
			}
		},
		computed: {

		},
		methods: {


		}
	}
</script>
<style lang="scss">
	.wrap_topWindows {
		width: 100%;
		height: $md_admin_topwindow_h;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: aliceblue;
		overflow: auto;

		.wrap_topWindows_left {
			background-color: red;
			width: $md_admin_leftwindow_w;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			&>image {
				flex: 2;
				box-sizing: border-box;
				height: $md_admin_topwindow_h;
			}

			&>text {
				flex: 3;
				height: $md_admin_topwindow_h;
				box-sizing: border-box;
				color: beige;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.wrap_topWindows_right {
			flex: 1;
			height: 100%;
			display: flex;
			justify-content: flex-end;

			.wrap_topWindows_right_theme {
				min-width: 70rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.wrap_topWindows_right_locale {
				min-width: 70rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.wrap_topWindows_right_user {
				min-width: 120rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				&>image {
					max-width: 60rpx;
					height: $md_admin_topwindow_h;
					box-sizing: border-box;
					padding: 5rpx;
				}

				&>text {
					color: red;
				}

				.uni-icons {
					//width: 120rpx;
				}
			}
		}
	}
</style>
