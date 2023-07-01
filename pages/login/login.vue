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

	<!-- 价格 -->
	<m-price price-num="1.023" color="red" fontWeight="400"></m-price>



	<!-- <h-input :dtoInputText="test"></h-input> -->

	<!-- <button @click="testInput">测试</button> -->

	<!-- 底部导航栏(待开发) -->
	<view class="m-tabBar">

		<view class="m-tabBar-box">

			<view class="">

			</view>


		</view>

	</view>


	<!-- <h-HoverOverCards></h-HoverOverCards> -->


	<!-- <h-darkOrLight></h-darkOrLight> -->



	<!-- 动态卡片(待完善) -->
	<h-responsiveCard></h-responsiveCard>
	
	
	<!-- <h-codepenchallenge></h-codepenchallenge> -->

	<!-- <input type="file" id="excel" @input="testChooseFile" /> -->



</template>

<script>
	import cc, {
		debounce,
		throttle
	} from '@/utils/cc_util.js'

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
			testChooseFile(e) {
				console.log(e);


			},





			testInput() {
				let dto = [{
					"id": "111wqeqw",
					"classifierName": "秋装11",
					"level": "3",
					"orderNumber": "1",
					"parentId": "1qaz",
					"custId": "f888ede2-edd2-487d-9760-e82a78aaea8e",
					"path": "/root/1qaz/111wqeqw",
					"productCount": 0,
					"classifierCount": 0
				}, {
					"id": "123wqeqw",
					"classifierName": "秋装",
					"level": "3",
					"orderNumber": "1",
					"parentId": "1qaz",
					"custId": "f888ede2-edd2-487d-9760-e82a78aaea8e",
					"path": "/root/1qaz/123wqeqw",
					"productCount": 0,
					"classifierCount": 0
				}, {
					"id": "1qaz",
					"classifierName": "二级分类（1）",
					"level": "2",
					"orderNumber": "1",
					"parentId": "3edc",
					"custId": null,
					"path": "/root/1qaz",
					"productCount": 0,
					"classifierCount": 0
				}, {
					"id": "2wsx",
					"classifierName": "二级分类（2）",
					"level": "2",
					"orderNumber": "2",
					"parentId": "3edc",
					"custId": null,
					"path": "/root/2wsx",
					"productCount": 0,
					"classifierCount": 0
				}, {
					"id": "3edc",
					"classifierName": "一级分类",
					"level": "1",
					"orderNumber": "1",
					"parentId": "root",
					"custId": "",
					"path": "/root",
					"productCount": 0,
					"classifierCount": 0
				}, {
					"id": "root",
					"classifierName": "root",
					"level": "0",
					"orderNumber": "1",
					"parentId": "-1",
					"custId": null,
					"path": "/",
					"productCount": 0,
					"classifierCount": 0
				}]

				console.log(cc.getTreeData(dto));
				
				let option = {
					header: ['测试', '哈哈', '呵呵', '好'],
					hbody: [{f: "a",s: "b",t: "c",fo: "d"}]
				}
				console.log(cc.exportExcel(option, "测试"));

				console.log(cc.formatRemainTime("2023-6-26 12:00:00"));

				console.log(cc.formatPassTime("2023-6-25 08:55:00"));

				console.log(cc.base64Encode("test"));

				console.log(cc.base64Decode("dGVzdA=="))

				console.log(cc.phoneToStar("15251534991"))

				console.log(cc.identityToStar("320830199910081813"))

				console.log(cc.nameToStar("蔡文冲"), cc.nameToStar("洪涛"), cc.nameToStar("端木洪涛"))

				console.log(cc.handleCurBrowser())

				console.log(cc.typeOf("11"),123);
				
				// console.log(cc.ksort(a))

				console.log(cc.copyProperties({id: 1,name: "test",age: 19,test: {a: 12}}, {id: 2,name: "t",test: {b: 13}}))

				console.log(cc.md5("test", 32))



			},



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