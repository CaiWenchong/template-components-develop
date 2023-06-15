import self_modules from "../store_config/modules/index.js"
let modulesFiles, modules, store;
// #ifndef VUE3
modulesFiles = require.context('./modules', true, /\.js$/);
modules = modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	modules[moduleName] = modulesFiles(modulePath).default

	// 默认设置为分模块
	modules[moduleName].namespaced = true
	// 所有模块下面都放入一个reqStop state
	modules[moduleName].state = modules[moduleName].state || {}
	modules[moduleName].state.reqStop = {}

	// 所有模块下面都载入一个MreqStop mutation
	modules[moduleName].mutations = modules[moduleName].mutations || {}
	modules[moduleName].mutations.MreqStop = (state, {
		reqName,
		toTime = ""
	}) => {
		state.reqStop[reqName] = toTime
	}
	return modules
}, {})
// #endif

// #ifdef VUE3
modulesFiles =
	import.meta.globEager('./modules/*.js');
modules = {}
for (let mudulePath in modulesFiles) {
	let moduleName = mudulePath.slice(10, -3)
	modules[moduleName] = modulesFiles[mudulePath].default

	// 默认设置为分模块
	modules[moduleName].namespaced = true
	// 所有模块下面都放入一个reqStop state
	modules[moduleName].state = modules[moduleName].state || {}
	modules[moduleName].state.reqStop = {}
	// 所有模块下面都载入一个MreqStop mutation
	modules[moduleName].mutations = modules[moduleName].mutations || {}
	modules[moduleName].mutations.MreqStop = (state, {
		reqName,
		toTime = ""
	}) => {
		state.reqStop[reqName] = toTime
	}
}
// #endif


// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
store = new Vuex.Store({
	modules: {
		...self_modules,
		...modules
	},
	strict: process.env.NODE_ENV !== 'production'
})
// #endif

// #ifdef VUE3
import {
	createStore
} from 'vuex'
store = createStore({
	modules: {
		...self_modules,
		...modules
	},
	strict: process.env.NODE_ENV !== 'production'
})
// #endif
process.env.NODE_ENV !== 'production' && console.log(store);
export default store