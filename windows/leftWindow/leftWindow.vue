<template>
	<view class="wrap_leftWindows">
		<uni-collapse>
			<uni-collapse-item v-for="catolog_1 in catalog_list"
				:title="catolog_1?.meta?.title" :key="catolog_1?.index" :show-animation="true">
				<template v-for="catalog_2 in catolog_1?.catalog_list" :title="catolog_2?.meta?.title"
					:key="catalog_2?.index">
					<view class="aim_item" :style="current_index==catalog_2.index?'color:red;':''"
						@click="changeCatalogIndex(catalog_2)">
						{{catalog_2?.meta.title}}
					</view>
				</template>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from "vuex"
	export default {
		data() {
			return {};
		},
		computed: {
			...mapState("windows", ["catalog_list", "current_index"]),
		},
		onLoad() {

		},
		mounted() {
			console.log(this.catalog_list);
			this.$store.dispatch("windows/changeCatalogIndex")
		},
		methods: {
			changeCatalogIndex(item) {
				this.$store.dispatch("windows/changeCatalogIndex", {
					current_index: item.index
				})
			}
		}
	}
</script>

<style lang="scss">
	.wrap_leftWindows {
		display: flex;
		flex-direction: column;
		background-color: bisque;
		//position: absolute;
		width: $md_admin_leftwindow_w;
		overflow: auto;

		.uni-collapse {
			height: 100%;
			width: 100%;

			//background-color: rebeccapurple;
			.uni-collapse-item {

				//background-color: red;
				.aim_item {
					padding: 5rpx;
				}

				.aim_item:hover {
					background-color: antiquewhite;
				}
			}

		}
	}
</style>
