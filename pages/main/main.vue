<template>
	<view class="wrap_test">
		<navigator url="/pages_demo/login/login">去登录</navigator>
		<navigator url="/pages_demo/show/show">show</navigator>
		<navigator url="/pages_demo/zion_debug/zion_debug">zion_debug</navigator>
		<view class="noname">11111</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {},
		onShow() {},
		mounted() {},
		methods: {},
		computed: {},
		watch: {}
	}
</script>

<style lang="scss">
	.wrap_test {
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
