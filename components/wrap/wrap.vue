<template>
	<view>
		<!--  #ifdef  VUE3 -->
		<!--  #ifdef  H5 -->
		<el-config-provider :locale="message_elementPlus">
			<slot></slot>

<!-- 			<button type="default" @click="changeLocale(locale=='en'?'zh-cn':'en')">切换语言</button>
			<el-table mb-1 :data="[]" />
			<el-pagination :total="100" /> -->
		</el-config-provider>
		<!--  #endif  -->
		<!--  #endif  -->
	</view>
</template>

<script>
	import {
		//固定返回当前语言列表
		localeList,

		// #ifdef H5
		// elementPlus语言
		messages_elementPlus
		// #endif
	} from "@/locale/index.js"
	import {
		mapGetters
	} from "vuex"
	export default {
		emits: ["onLocaleChange"],
		name: "wrap",
		data() {
			return {

			};
		},
		methods: {
			changeLocale(locale) {
				uni.setLocale(locale)
			}
		},
		computed: {
			//#ifdef VUE3
			locale: () => uni.getLocale(),
			localeList: () => localeList,
			//#ifdef H5
			message_elementPlus() {
				return messages_elementPlus[this.locale]
			},
			//#endif
			//#endif
		}
	}
</script>

<style lang="scss">

</style>
