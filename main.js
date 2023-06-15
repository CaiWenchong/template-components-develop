import App from './App'
import store from './store'

//=====================================================================================【下方是vue2,除非特殊项目，一般不用vue2，有坑】
// #ifdef VUE2
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	//使用vuex3
	store,
	...App
})
app.$mount()
// #endif

//=====================================================================================【下方是vue3】
// #ifdef VUE3
import uviewPlus from '@/uni_modules/uview-plus' //默认载入uview_plus

// #ifdef H5 
import {
	locale,
	messages,
	messages_elementPlus,
} from './locale'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import {
	createI18n
} from 'vue-i18n'

const i18n = createI18n({
	locale,
	messages
})
// #endif

import {
	createSSRApp
} from 'vue'

export function createApp() {
	const app = createSSRApp(App);
	// 使用vuex4
	app.use(store);
	app.use(uviewPlus);

	// #ifdef H5 
	app.use(i18n);
	// 全局注册elment-plus组件并默认设置语言）
	app.use(ElementPlus, {
		locale: messages_elementPlus[locale],
	});
	// 全局注册elementPlus的icon
	for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
		app.component(key, component);
	}
	// #endif

	return {
		app
	}
}
// #endif