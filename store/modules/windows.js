import windows_state from "@/store_config/windows_config/state.js"
import windows_getters from "@/store_config/windows_config/getters.js"
import windows_mutations from "@/store_config/windows_config/mutations.js"
import windows_actions from "@/store_config/windows_config/actions.js"
import {
	reqCommon,
	toUrl
} from "../store_utils/reqCommon.js"
export default {
	state: {
		current_index: windows_state?.current_index,
		catalog_list: windows_state?.catalog_list,
	},
	getters: {
		...windows_getters || {},
		// 获取当前目录
		getCatalog: (state) => (current_index = false) => {
			if (current_index === false) {
				current_index = state.current_index
			}


			return getCurrentCatalog(current_index, state?.catalog_list) || {}

			function getCurrentCatalog(init_index, catalog_list, current_index = false, current_catalog = false) {
				if (current_index === false) {
					current_index = init_index
				}

				catalog_list.some(catalog => {
					if (init_index.startsWith(catalog?.index)) {
						if (init_index == catalog?.index) {
							current_catalog = catalog
						} else {
							let new_current_index = current_index.slice(2)
							let new_catalog_list = catalog?.catalog_list;
							current_catalog = getCurrentCatalog(init_index, new_catalog_list,
								new_current_index,
								current_catalog)
						}
						return true
					}
				})
				return current_catalog;
			}
		},

		// 获取当前目录的路径结构
		getCatalogPath: (state) => (current_index = false) => {
			if (current_index === false) {
				current_index = state.current_index
			}
			return getCurrentCatalogPath(current_index, state?.catalog_list)

			function getCurrentCatalogPath(init_index, catalog_list, current_index = false, current_catalog = false,
				catalog_path = {}) {
				if (current_index === false) {
					current_index = init_index
				}
				catalog_list.some(catalog => {
					if (init_index.startsWith(catalog?.index)) {
						catalog_path.catalog_path = {
							...catalog
						}
						if (init_index == catalog?.index) {
							current_catalog = catalog
						} else {
							let new_current_index = current_index.slice(2)
							let new_catalog_list = catalog?.catalog_list;
							current_catalog = getCurrentCatalogPath(init_index, new_catalog_list,
								new_current_index,
								current_catalog, catalog_path.catalog_path)
						}
						return true
					}
				})
				return catalog_path.catalog_path;
			}
		},

		// 获取当前目录数据源
		getSourse: (state, getters) => (current_index = false) => {
			if (current_index === false) {
				current_index = state.current_index
			}
			let catalog = getters["getCatalog"](current_index) || {};
			// 查询并返回当前项
			return catalog?.model_sourse || {}
		},
		// 获取当前目录的数据源数据结构
		getSchema: (state, getters) => (current_index = false) => {
			if (current_index === false) {
				current_index = state.current_index
			}
			let catalog = getters["getCatalog"](current_index) || {}
			// 查询并返回当前项
			return catalog?.data_schema || {}
		},
		// 获取schema后的data
		getSchema_filter: (state, getters) => (data = {}, data_list = [], current_index = false) => {
			if (current_index === false) {
				current_index = state.current_index
			}
			let model_sourse = getters["getSourse"](current_index) || {};
			let data_schama = getters["getSchema"](current_index) || {};
			// 查询并返回当前项

			let res_data = {};
			for (let key in data_schama?.properties) {
				res_data[key] = {
					key,
					value: data[key],
					...data_schama.properties[key]
				}
			}

			let res_data_list = [];
			data_list.forEach(item => {
				let schema_data = {}
				for (let key in data_schama?.properties) {
					schema_data[key] = {
						key,
						value: item[key],
						...data_schama.properties[key]
					}
				}
				res_data_list.push(schema_data)
			})

			return {
				data: res_data,
				data_list: res_data_list
			}
		},
		// 获取当前数据源schema后的数据
		getSchema_data: (state, getters) => (current_index = false) => {
			if (current_index === false) {
				current_index = state.current_index
			}
			let model_sourse = getters["getSourse"](current_index) || {};
			// 查询并返回当前项
			return getters["getSchema_filter"](model_sourse?.data, [], current_index).data || {};
		},
		// 获取当前数据源schema后的数据列表
		getSchema_data_list: (state, getters) => (current_index = false) => {
			if (current_index === false) {
				current_index = state.current_index
			}
			let model_sourse = getters["getSourse"](current_index) || {};
			// 查询并返回当前项
			return getters["getSchema_filter"](model_sourse?.data, model_sourse?.data_list, current_index)
				.data_list || [];
		},

	},
	mutations: {
		...windows_mutations || {},
		// 设置当前目录索引
		setCurrentIndex(state, payload = {}) {
			let {
				current_index
			} = payload

			if (current_index) {
				state.current_index = current_index
			}
		},
		// 设置目录的数据源
		setModelSourse(state, payload = {}) {
			let {
				current_index,
				model_sourse = false,
				rootState = false
			} = payload

			if (!current_index) {
				current_index = state.current_index
			}
			if (!rootState) {
				return
			}
			// 获取当前目录的state
			let current_catalog = getCurrentCatalog(current_index, state?.catalog_list);
			let model = current_catalog?.model_sourse?.model
			if (!model) {
				return
			}
			if (model_sourse === false) {
				let remote_model = rootState?.remote?.[model] || {}
				let remote_model_sourse = {
					model: remote_model?.model,
					data: remote_model?.data || {},
					data_list: remote_model?.data_list || [],
					count: remote_model?.count, //该表的默认查询数据的总条数
					affected_rows: remote_model?.affected_rows || 0,
					returning: remote_model?.returning || []
				};
				// 展开运算符将对象深度赋值
				model_sourse = {
					...current_catalog?.model_sourse || {},
					...remote_model_sourse
				}
			}

			if (model_sourse?.model) {
				current_catalog.model_sourse = model_sourse;
			}

			function getCurrentCatalog(init_index, catalog_list, current_index = false, current_catalog = false) {
				if (current_index === false) {
					current_index = init_index;
				}
				catalog_list.some(catalog => {
					if (init_index.startsWith(catalog?.index)) {
						if (init_index == catalog?.index) {
							current_catalog = catalog;
						} else {
							let new_catalog_list = catalog?.catalog_list;
							let new_current_index = current_index.slice(2);
							current_catalog = getCurrentCatalog(init_index, new_catalog_list, new_current_index,
								current_catalog);
						}
						return true;
					}
				})
				return current_catalog;
			}
		}
	},
	actions: {
		...windows_actions || {},
		// 切换目录
		changeCatalogIndex: async (context, payload = {}) => {
			return reqCommon("changeCatalogIndex", context, payload, async () => {
				let {
					current_index,
					isQuery = true,
					model_sourse = false,
					isToUrl = true,
					url,
					authorization,
				} = payload

				let catalog = context.getters["getCatalog"](
					current_index);
				if (!catalog.index) {
					throw "catalog.index无效目录"
				}
				if (!catalog?.path) {
					throw "目录未配置path,不支持切换"
				}
				let catalog_model_sourse = model_sourse ? model_sourse : catalog?.model_sourse;

				let query_config = catalog_model_sourse?.query_config;
				let model = catalog_model_sourse?.model;


				if (isQuery && model) {
					// 请求model
					await context.dispatch("remote/query", {
						...{
							isdeal: payload?.isdeal,
							isloading: payload?.isloading,
							isthrow: payload?.isthrow,
							istoast: payload?.istoast,
							limit_time: payload?.limit_time,
							loadingTitle: payload?.loadingTitle
						},
						url,
						authorization,
						model,
						field_string: catalog_model_sourse?.field_string,
						...query_config
					}, {
						root: true
					})
				}

				if (model) {
					context.commit("setModelSourse", {
						current_index,
						model_sourse,
						rootState: context?.rootState
					})
				}

				// 如果存在跳转路径并且要求默认跳转，则进行跳转
				if (isToUrl && catalog?.path) {
					context.commit("setCurrentIndex", {
						current_index
					})
					toUrl(catalog?.path)
				}
				return context.getters["getCatalog"](current_index)
			})
		},
	}
}