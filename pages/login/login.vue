<template>
	<view class="wrap_login">
		<view>
			{{test}}
		</view>

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				test: "测试文本",
				img: ""
			};
		},
		onLoad() {

		},
		mounted() {},
		methods: {
			getStore() {

			},
			changeImg() {
				uni.chooseImage({
					success: (res) => {
						console.log(res);
						let file = res.tempFiles[0]

						this.$store.dispatch("app/upload", {
							method: "uimage",
							file: {
								path: file.path
							}
						}).then(res => {
							this.img = res.downloadUrl
						})
					}
				})
			}
		},
		watch: {

		}
	}
</script>

<style lang="scss" scoped>
	.wrap_login {
		background: red;
		height: 100%;
	}
</style>