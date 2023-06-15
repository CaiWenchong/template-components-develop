<template>
	<view>
		<h1>当前路径</h1>
		<!-- 当前路径： -->
		<view>{{catalog_path?.meta?.title}}/{{catalog_path?.catalog_path?.meta?.title}}</view>
		<h1>表结构</h1>
		<!-- 表结构： -->
		<view>{{schema.properties}}</view>
		<h1>表数据</h1>
		<!-- 表数据： -->
		<view v-for="(key_list,index) in schema_data_list" :key="index">
			<view v-for="(item,key) in key_list" :key="key">{{key}}-{{item.label}}-{{item.key}}-{{item.value}}</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from "vuex"
	export default {
		data() {
			return {
				id: "1-1"
			};
		},
		computed: {
			catalog() {
				return this.$store.getters["windows/getCatalog"]();
			},
			catalog_path() {
				return this.$store.getters["windows/getCatalogPath"]();
			},
			schema() {
				return this.$store.getters["windows/getSchema"]();
			},
			schema_data() {
				return this.$store.getters["windows/getSchema_data"]();
			},
			schema_data_list() {
				return this.$store.getters["windows/getSchema_data_list"]();
			},
		}
	}
</script>

<style lang="less">

</style>
