<template>
	<view class="wrap_zion_debug">
		<button type="default" @click="upload()"> 上传文件到zion项目：app/upload </button>
		<image :src="fileUrl" mode="scaleToFill"></image>
		<view style="margin: 60rpx;border: 1rpx solid saddlebrown;display: flex;flex-direction: column;">
			<view style="height: 100rpx;">
				<text>actionflowName:</text> <input style="color: brown;" type="text" v-model="actionflow_name"
					placeholder="输入要操作的自定义行为名称">
			</view>
			<view style="height: 100rpx;">
				<text>actionflowDir:</text><input style="color: brown;" type="text" v-model="actionflow_dir"
					placeholder="输入要操作的自定义行为目录">
			</view>
			<view style="min-height: 100rpx;">
				<text>payload:</text>
				<textarea :auto-height="true" style="color: #ff9a42;" v-model="payload" />
			</view>
		</view>
		<button type="default" @click="runActionflow()"> 原生自定义行为调试请求：app/runActionflow </button>
		<button type="default" @click="runActionflowmain()">调试环境请求actionflow表自定义行为：app/runActionflowmain </button>
		<button type="default" @click="callActionflow()"> 正式环境请求actionflow表自定义行为：remote/callActionflow </button>
		<button type="default" @click="updateActionflowmain()"> 更新自定义行为到actionflow表：app/updateActionflowmain </button>
		<button type="default" @click="insertActionflowmain()"> 添加自定义行为到actionflow表：app/insertActionflowmain </button>
		<textarea :auto-height="true" v-model="actionflowRes" />
		<button type="default" @click="reqZion">发送zion相关统一请求：app/reqZion</button>
		<button type="default" @click="romoteQuery">发送zion数据表查询请求：remote/query</button>
		<button type="default" @click="romoteMutation">发送zion数据表增删改请求：remote/mutation</button>
		<text>{{reqZionRes}}</text>
		<button type="default" @click="test">请求</button>
	</view>
</template>

<script>
	import request from "@/store/store_utils/request_outer.js"
	export default {
		data() {
			return {
				fileUrl: "",
				actionflowRes: "",
				reqZionRes: "",
				actionflow_name: "test",
				actionflow_dir: "",
				payload: ""

			}
		},
		onLoad() {},
		methods: {
			async test() {
				request.mutation({
					operation:"insert_errlog",
					objects:[{
						title:"1111"
					}]
				}).then(res => {
					console.log(res);
				})
			},
			async romoteMutation() {
				await this.$store.dispatch("remote/mutation", {
					operation: "insert_errlog",
					objects: [{
						title: "请求测试",
						content: "请求测试内容"
					}],
				}).then(res => {
					this.reqZionRes = res
				})
			},

			async romoteQuery() {
				await this.$store.dispatch("remote/query", {
					limit: 10,
					model: "user",
					field_string: `id username nickname`,
				})
			},
			
			// 请求zion相关
			async reqZion() {
				let res = await this.$store.dispatch("app/reqZion", {
					method: "query",
					data: {
						model: "user",
						field_string: `id username mobile avatar{id url}`,
					}
				})
				this.reqZionRes = res
			},
			// 测试执行自定义行为代码
			async runActionflow() {
				let payload = this.payload;
				try {
					payload = JSON.parse(payload || "{}")
				} catch (e) {
					console.warn("JSON.parse(payload),失败，不是标准json字符串");
					payload = {};
				}
				await this.$store.dispatch("app/runActionflow", {
					actionflowName: this
						.actionflow_name, // login为要指定的代码的文件名,默认会传入login，路径在：unicloud/zion_debug/actionflow/
					args: payload,
					//actionflowId: ""
				}).then(res => {
					this.actionflowRes = JSON.stringify(res, null, "    ")
				})
			},
			// 测试调用自定义行为
			async runActionflowmain() {
				let payload = this.payload;
				try {
					payload = JSON.parse(payload || "{}")
				} catch (e) {
					console.warn("JSON.parse(payload),失败，不是标准json字符串");
					payload = {};
				}
				await this.$store.dispatch("app/runActionflowmain", {
					actionflowName: this.actionflow_name, //那个自定义行为
					actionflowDir: this.actionflow_dir, //示例值："user/"
					attach_data: {}, //调试时模拟的attach_data
					args: {
						payload
					},
				}).then(res => {
					// 成功时打印结果
					this.actionflowRes = JSON.stringify(res, null, "    ")
				})
			},
			
			// 测试正式环境执行自定义行为代码
			async callActionflow() {
				let payload = this.payload;
				try {
					payload = JSON.parse(payload || "{}")
				} catch (e) {
					console.warn("JSON.parse(payload),失败，不是标准json字符串");
					payload = {};
				}
				await this.$store.dispatch("remote/callActionflow", {
					actionflow_name: this.actionflow_name,
					payload
				}).then(res => {
					this.actionflowRes = JSON.stringify(res, null, "    ")
				})
			},
			
			// 修改自定义行为
			async updateActionflowmain() {
				await this.$store.dispatch("app/updateActionflowmain", {
					actionflowName: this
						.actionflow_name, // login为要指定的代码的文件名,默认会传入login，路径在：unicloud/zion_debug/actionflow/
					actionflowDir: this.actionflow_dir,
					name: this.actionflow_name
				}).then(res => {
					this.actionflowRes = JSON.stringify(res, null, "    ")
				})
			},
			// 新增自定义行为
			async insertActionflowmain() {
				await this.$store.dispatch("app/insertActionflowmain", {
					actionflowName: this
						.actionflow_name, // login为要指定的代码的文件名,默认会传入login，路径在：unicloud/zion_debug/actionflow/
					actionflowDir: this.actionflow_dir,
					name: this.actionflow_name,
					describe: this.actionflow_name
				}).then(res => {
					this.actionflowRes = JSON.stringify(res, null, "    ")
				})
			},

			// 上传文件
			async upload() {
				uni.chooseImage({
					success: async (res) => {
						request.local_uimage(res.tempFiles[0]).then(res=>{
							this.fileUrl = res.downloadUrl
						})
						return
						await this.$store.dispatch("app/upload", {
							method: "uimage", // 可选值：1.uimage（上传图片） 2.ufile（上传文件）
							file: res.tempFiles[0]
						}).then(res => {
							this.fileUrl = res.downloadUrl
						})
						return;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.wrap_zion_debug {
		width: 100%;
	}
</style>