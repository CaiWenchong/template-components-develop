import {
	reqCommon,
	deepMerge
} from "../store_utils/reqCommon.js"
import request from "../store_utils/request.js"
import storeConfig from "@/store_config/config_app.js"

// 脉动阿里云函数
const mdGetcode = uniCloud.importObject('md_getcode', {
	customUI: true
})
const sysInfo = uni.getSystemInfoSync()
export default {
	state: {
		// 系统id,仅使用于多应用
		system_system: null,
		system: {}
	},
	getters: {
		...storeConfig?.getters || {}
	},
	mutations: {
		setSystem(state, payload = {}) {
			let default_system_id = payload?.system_id;
			if (default_system_id) {
				uni.setStorageSync("default_system_id", default_system_id)
			}
			let default_system_system = payload?.system_system;
			if (default_system_system) {
				state.system_system = default_system_system
				storeConfig.default_system_system = default_system_system
			}
		},
		setState(state, payload = {}) {
			deepMerge(state, payload, false)
		},
	},
	actions: {
		// 请求zion的当前system表
		reqSystem: async (context, payload = {}) => {
			return reqCommon("reqSystem", context, payload, async () => {
				let default_system_id = payload?.system_id || storeConfig?.default_system_id || uni
					.getStorageSync("default_system_id") || null;
				payload.system_id = default_system_id
				let todoRes = request.query({
					model: "system",
					field_string: storeConfig?.system_field_string,
					where: {
						system_id: {
							_eq: default_system_id
						}
					},
					limit: 1
				})
				return todoRes.then(res => {
					let [system] = res
					if (system) {
						context.commit("setSystem", {
							system_system: system.id,
							system_id: system?.system_id
						})
						context.commit("setState", {
							system
						})
						return system
					} else {
						uni.setStorageSync("default_system_id", "")
						throw "system_id有误，请重新打开尝试或联系管理员确认客户端是否有误"
					}
				})

			})
		},
		// 操作zion相关接口
		reqZion: async (context, payload = {}) => {
			return reqCommon("reqZion", context, payload, async () => {
				let {
					method,
					url,
					authorization,
					data = {}
				} = payload

				// 过滤掉不支持的method
				switch (method) {
					case "query":
					case "mutation":
					case "batch_query":
					case "batch_mutation":
					case "request":
					case "gql_debug":
					case "local_uimage":
					case "local_ufile":
					case "local_uvideo":
					case "local_umedia":
						break;
					default:
						throw "method未传或传值有误，仅支持1.query 2.mutation 3.batch_query 4.batch_mutation 5.request 6.gql_debug 7.local_uimage 8.local_ufile 9.local_uvideo 10.local_umedia"
						break;
				}

				let todoRes = request[method](data, url, authorization)

				// 如果页面直接要求拿到原始结果，则直接返回即可
				if (!payload.isdeal) return todoRes

				// 由vuex统一处理状态
				return todoRes.then(res => {
					// 这里做一些mutation处理逻辑后再返回给界面上
					return res
				})
			})
		},
		// zion体系查询
		query: async (context, payload = {}) => {
			return reqCommon("query", context, payload, async () => {
				let {
					url,
					authorization,
					data = {}
				} = payload
				let todoRes = request.query(data, url, authorization)

				// 如果页面直接要求拿到原始结果，则直接返回即可
				if (!payload.isdeal) return todoRes

				// 由vuex统一处理状态
				return todoRes.then(res => {
					// 这里做一些mutation处理逻辑后再返回给界面上
					return res
				})
			})
		},
		// zion体系增删改
		mutation: async (context, payload = {}) => {
			return reqCommon("mutation", context, payload, async () => {
				let {
					url,
					authorization,
					data = {}
				} = payload
				let todoRes = request.mutation(data, url, authorization)

				// 如果页面直接要求拿到原始结果，则直接返回即可
				if (!payload.isdeal) return todoRes

				// 由vuex统一处理状态
				return todoRes.then(res => {
					// 这里做一些mutation处理逻辑后再返回给界面上
					return res
				})
			})
		},
		// 批量query，list为mutation对象
		batch_query: async (context, payload = {}) => {
			return reqCommon("batch_query", context, payload, async () => {
				let {
					url,
					authorization,
					list = []
				} = payload
				let todoRes = request.batch_query(list, url, authorization)

				// 如果页面直接要求拿到原始结果，则直接返回即可
				if (!payload.isdeal) return todoRes

				// 由vuex统一处理状态
				return todoRes.then(res => {
					// 这里做一些batch_query处理逻辑后再返回给界面上
					return res
				})
			})
		},
		// 批量mutation,list为query对象
		batch_mutation: async (context, payload = {}) => {
			return reqCommon("batch_mutation", context, payload, async () => {
				let {
					url,
					authorization,
					list = []
				} = payload
				let todoRes = request.batch_mutation(list, url, authorization)

				// 如果页面直接要求拿到原始结果，则直接返回即可
				if (!payload.isdeal) return todoRes

				// 由vuex统一处理状态
				return todoRes.then(res => {
					// 这里做一些batch_mutation处理逻辑后再返回给界面上
					return res
				})
			})
		},
		// 封住的uni.请求，所有请求统一使用该action，传入options和request一样
		request: async (context, payload = {}) => {
			return reqCommon("request", context, payload, async () => {
				let {
					url,
					authorization
				} = payload
				let todoRes = request.request(payload, url, authorization)

				// 如果页面直接要求拿到原始结果，则直接返回即可
				if (!payload.isdeal) return todoRes

				// 由vuex统一处理状态
				return todoRes.then(res => {
					// 这里做一些mutation处理逻辑后再返回给界面上
					return res
				})
			})
		},
		// 上传图片或上传文件或上传视频到zion
		upload: async (context, payload = {}) => {
			return reqCommon("upload", context, payload, async () => {
				let {
					method,
					url,
					authorization,
					file,
					media_url
				} = payload
				if (method !== "uimage" && method !== "ufile" && method !== "uvideo") {
					throw "method未传或传值有误，仅支持uimage、ufile、uvideo"
				}
				let todoRes;
				if (media_url) {
					todoRes = request.local_umedia(media_url, url, authorization)
				} else {
					todoRes = request['local_' + method](file, url, authorization)
				}

				// 如果页面直接要求拿到原始结果，则直接返回即可
				if (!payload.isdeal) return todoRes

				// 由vuex统一处理状态
				return todoRes.then(res => {
					// 这里做一些mutation处理逻辑后再返回给界面上
					return res
				})
			})
		},
		// 执行zion原生自定义行为
		runActionflow: async (context, payload = {}) => {
			return reqCommon("runActionflow", context, payload, async () => {
				let {
					actionflowName = "",
						actionflowDir = "",
						actionflowId = "",
						args = {},
						url, authorization
				} = payload

				let todoRes
				if (!actionflowId) {
					let {
						jsCode
					} = await mdGetcode.getActionflowCode({
						actionflowName,
						actionflowDir
					})
					todoRes = request.gql_debug({
						jsCode,
						args
					}, url, authorization || storeConfig?.gql_authorization)
				} else {
					todoRes = request.mutation({
						operation: `action_${actionflowId}`,
						args
					}, url, authorization || storeConfig?.gql_authorization).then(res => res
						?.action_result)
				}

				// 如果页面直接要求拿到原始结果，则直接返回即可
				if (!payload.isdeal) return todoRes

				// 由vuex统一处理状态
				return todoRes.then(res => {
					// 这里做一些mutation处理逻辑后再返回给界面上
					return res
				})
			})
		},
		// 执行zion中actionflow表编写的自定义行为
		runActionflowmain: async (context, payload = {}) => {
			return reqCommon("runActionflowmain", context, payload, async () => {
				let {
					actionflowName = "",
						actionflowDir = "",
						actionflowId = false,
						attach_data,
						args = {},
						url, authorization
				} = payload
				// 将token追加到每个actionflow
				if (typeof args?.payload !== "object") {
					args.payload = {};
				}
				args.payload.token = context.rootState?.user?.token || args.payload?.token ||
					storeConfig?.token;

				actionflowId = actionflowId || storeConfig?.actionflowmain_id || context.state?.system
					?.actionflow_config?.actionflow_id;

				let todoRes
				if (actionflowName && (!actionflowId || !args?.actionflow_name)) {
					// 测试环境
					let {
						jsCode
					} = await mdGetcode.getActionflowmainCode({
						actionflowName,
						actionflowDir,
						attach_data
					})
					todoRes = request.gql_debug({
						jsCode,
						args
					}, url, authorization || storeConfig?.gql_authorization)
				} else if (!actionflowName && actionflowId) {
					// 正式执行环境
					todoRes = request.mutation({
						operation: `action_${actionflowId}`,
						args
					}, url, authorization || storeConfig?.gql_authorization).then(res => res
						?.action_result)
				} else {
					// 环境参数缺失
					throw {
						msg: "运行环境参数缺失或初始化未完成",
						data: {
							actionflowId,
							actionflowName,
							args,
							attach_data
						}
					}
				}

				// 如果页面直接要求拿到原始结果，则直接返回即可
				if (!payload.isdeal) return todoRes

				// 由vuex统一处理状态
				return todoRes.then(res => {
					// 这里做一些mutation处理逻辑后再返回给界面上
					return res
				})
			})
		},
		// 更新actionflow表自定义行为代码
		updateActionflowmain: async (context, payload = {}) => {
			return reqCommon("uploadActionflowmain", context, payload, async () => {
				let {
					actionflowName = "",
						actionflowDir = "",
						describe = "",
						name = "",
						url, authorization
				} = payload
				if (!actionflowName || !name) {
					throw "请传入actionflowName和要修改的自定义行为name"
				}

				let todoRes
				let {
					jsCode
				} = await mdGetcode.getActionflowmainRawcode({
					actionflowName,
					actionflowDir
				})

				todoRes = request.mutation({
					operation: `update_actionflow`,
					where: {
						name: {
							_eq: name
						}
					},
					_set: {
						jscode: jsCode,
						...actionflowDir ? {
							actionflow_dir: actionflowDir
						} : {},
						...describe ? {
							describe
						} : {}
					},
					field_string: "id name jscode describe",
				}, url, authorization)


				// 如果页面直接要求拿到原始结果，则直接返回即可
				if (!payload.isdeal) return todoRes

				// 由vuex统一处理状态
				return todoRes.then(res => {
					// 这里做一些mutation处理逻辑后再返回给界面上
					return res
				})
			})
		},
		// 添加actionflow表自定义行为代码
		insertActionflowmain: async (context, payload = {}) => {
			return reqCommon("insertActionflowmain", context, payload, async () => {
				let {
					actionflowName = "",
						actionflowDir = "",
						name = "",
						describe = "",
						url, authorization
				} = payload
				if (!actionflowName || !name || !describe) {
					throw "请传入actionflowName和要添加的自定义行为name和describe"
				}

				let todoRes
				let {
					jsCode
				} = await mdGetcode.getActionflowmainRawcode({
					actionflowName,
					actionflowDir
				})
				// 先查询是否存在
				let [actionflow] = await request.query({
					model: "actionflow",
					where: {
						name: {
							_eq: name
						}
					},
					limit: 1
				})
				if (actionflow) {
					throw {
						msg: "已存在该actionflow",
						actionflow
					}
				}

				// 上传自定义行为
				todoRes = request.mutation({
					operation: `insert_actionflow`,
					objects: [{
						name,
						describe,
						actionflow_dir: actionflowDir,
						jscode: jsCode
					}],
					field_string: "id name jscode describe",
				}, url, authorization)

				// 如果页面直接要求拿到原始结果，则直接返回即可
				if (!payload.isdeal) return todoRes

				// 由vuex统一处理状态
				return todoRes.then(res => {
					// 这里做一些mutation处理逻辑后再返回给界面上
					return res
				})
			})
		},
	}
}