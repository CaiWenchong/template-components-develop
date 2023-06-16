<template>

	<m-navBar title="Home" icon="bars" @leftIconClick="leftIconClick">

		<!-- 设置了icon属性所以不显示 -->
		<template #left>
			<text>test</text>
		</template>

		<!-- 设置了title属性所以不显示 -->
		<template #center>
			<text>首页</text>
		</template>



	</m-navBar>


	<!-- 头部tab切换 -->
	<u-tabs :list="list4" @change="tabchange" lineWidth="0" :current="tabCurrent" :activeStyle="{
		            color: '#303133',
		            transform: 'scale(1.05)',
					backgroundColor: '#FDED66',
					width:'90px',
					height: '40px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'row',
					borderRadius: '50px',
					fontSize:'24rpx'
		        }" :inactiveStyle="{
		            color: '#606266',
		            transform: 'scale(1.05)',
					backgroundColor: '#FFFFFF',
					width:'90px',
					height: '40px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'row',
					borderRadius: '50px',
					fontSize:'24rpx'
		        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 60px;">
	</u-tabs>



	<m-price price-num="1.023" color="red" fontWeight="400"></m-price>



</template>

<script>
	export default {
		data() {
			return {
				test: "测试文本",
				img: "",
				list4: [{
					icon: "icon-chengren",
					name: '成人'
				}, {
					icon: "icon-teenagers",
					name: '青少年',
				}],
			};
		},
		onLoad() {

		},
		mounted() {},
		methods: {
			testShare(e) {
				console.log("testShare", e);
			},

			// 顶部导航栏左侧按钮点击事件
			leftIconClick(e) {
				console.log("leftIconClick", e);
			},

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


</style>