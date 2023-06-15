<template>
	<view class="wrap_index">
		<text>index测试页面{{$t("index.demo")}}</text>
		<button @click="changeLocale('en')">切换语言到en</button>
		<button @click="changeLocale('zh-cn')">切换语言到zh-cn</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'Hello',
			}
		},
		onLoad() {},
		onShow() {},
		mounted() {},
		methods: {
			changeLocale(locale) {
				uni.setLocale(locale)
			}
		},
		watch: {}
	}
</script>

<style lang="scss">
	.wrap_index {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		border: 10rpx solid gray;
		box-sizing: border-box;
		height: 100%;
		overflow-y: scroll;
	}
</style>
