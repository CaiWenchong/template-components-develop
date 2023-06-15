<template>
	<view class="wrap_show">
		<view>用户信息{{data}}</view>
		<button type="default" @click='$store.dispatch("user/logout")'>退出登录</button>

		<view>zion单条数据：{{systemData}}</view>
		<view>zion批量数据：{{systemDataList}}</view>

		<button type="default" @click="reqZion">操作zion体系的所有动作</button>
		<view>动作结果数据：{{pagesZionData}}</view>


		<button type="default" @click="remoteMutation">操作zion数据表</button>
		<view>操作数据表结果数据：{{systemReturning}}</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState
	} from "vuex"
	export default {
		// 自定义的页面静态数据
		data() {
			return {
				pagesZionData: null

			};
		},
		// 生命周期进入页面
		onLoad() {
		},
		// 获取页面需要的全局数据
		computed: {
			...mapState("user", ["data"]),
			...mapState({
				systemData: state => state.remote?.system?.data || {},
				systemDataList: state => state.remote?.system?.data_list || [],
				systemReturning: state => state.remote?.system?.returning || [],
			}),
		},
		// 行为
		methods: {
			// 操作zion体系的所有动作
			reqZion() {
				this.$store.dispatch("app/reqZion", {
					method: "mutation",
					data: {
						operation: "insert_user",
						objects: [{
							mobile: "1778164xxxx"
						}, {
							mobile: "1778136xxxx"
						}],
						on_conflict: {
							constraint: "user_mobile_key",
							update_columns: "[mobile]"
						},
						//model: "user",
						//limit: 2,
						field_string: `mobile`
					}
				}).then(res => {
					//console.log(res)
					this.pagesZionData = res
				})
			},
			// 对zion数据表进行查询
			remoteQuery(option = {}) {
				this.$store.dispatch("remote/query", option)
			},
			// 对zion数据表进行增删改
			remoteMutation() {
				this.$store.dispatch("remote/mutation", {
					operation: "insert_system",
					field_string: `name`,
					objects: [{
						name: "insert_test_name"
					}]
				}).then(res => {
					//console.log(res);
					//console.log(this.$store)
				})
			}
		}

	}
</script>

<style lang="scss">

</style>
