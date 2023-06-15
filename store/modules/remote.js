import {
	reqCommon,
	deepMerge
} from "../store_utils/reqCommon.js"
import request from "../store_utils/request.js"
import remote_getters from "@/store_config/remote_config/getters.js"
import remote_state from "@/store_config/remote_config/state.js"
import remote_actions from "@/store_config/remote_config/actions.js"
import remote_mutations from "@/store_config/remote_config/mutations.js"
export default {
	state: {
		...remote_state || {}
	},
	getters: {
		...remote_getters || {}
	},
	mutations: {
		...remote_mutations || {},
		// 设置模型数据
		setModelData(state, payload = {}) {
			let {
				model,
				affected_rows = false,
				returning = false,
				raw_data = false,
				data = false,
				data_list = false,
				count = false,
				isrefresh = true
			} = payload
			if (!state[model]?.model) {
				state[model] = {
					model,
					raw_data,
					data: {},
					data_list: [],
					count: 0,
					affected_rows: 0,
					returning: []
				}
			}
			affected_rows !== false && (state[model].affected_rows = affected_rows)
			returning !== false && (state[model].returning = returning)
			if (!isrefresh) {
				data !== false && (deepMerge(state[model].data, data))
			} else {
				data !== false && (state[model].data = data)
			}
			data_list !== false && (state[model].data_list = data_list)
			count !== false && (state[model].count = count)
			count !== false && (state[model].raw_data = raw_data)
		},
		setModel(state, payload = {}) {
			let {
				model,
				field_string = false,
				mutation_config = false,
				query_config = false,
				is_auto_refresh = false
			} = payload
			if (!state[model]?.model) {
				state[model] = {
					model,

					field_string: ``,
					mutation_config: {
						on_conflict: {},
					},
					query_config: {
						where: {},
						order_by: {},
						distinct_on: "",
						offset: 0,
						limit: 100,
					},
					is_auto_refresh: false,
				}
			}
			field_string !== false && (state[model].field_string = field_string)

			if (mutation_config !== false) {
				if (mutation_config?.on_conflict) {
					state[model].mutation_config.on_conflict = mutation_config.on_conflict
				}
			}

			if (query_config !== false) {
				if (query_config?.where) {
					state[model].query_config.where = query_config.where
				}
				if (query_config?.order_by) {
					state[model].query_config.order_by = query_config.order_by
				}
				if (query_config?.distinct_on) {
					state[model].query_config.distinct_on = query_config.distinct_on
				}
				if (query_config?.offset) {
					state[model].query_config.offset = query_config.offset
				}
				if (query_config?.limit) {
					state[model].query_config.limit = query_config.limit
				}
			}
		}
	},
	actions: {
		...remote_actions || {},
		callActionflow: async (context, payload = {}) => {
			return reqCommon("callActionflow", context, payload, async () => {
				let {
					response_key = "response",
						actionflow_name = "",
						payload: payload_data = {},
						url,
						isrefresh = true, //为true重置vuex
						authorization
				} = payload
				payload.response_key = response_key
				let todoRes = context.dispatch("app/runActionflowmain", {
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
					args: {
						actionflow_name,
						payload: payload_data
					}
				}, {
					root: true
				})
				if (!payload.isdeal) return todoRes
				return todoRes.then(result => {
					if (result?.status != "成功") {
						throw result?.msg || "remote/callActionflow请求结果有误";
					}
					let res = result.data;
					let res_data = {
						model: response_key,
						raw_data: result,
						isrefresh
					}
					if (Array.isArray(res)) {
						res_data.data = res?.[0]
						res_data.data_list = res
					} else {
						res_data.data = res
					}
					context.commit("setModelData", res_data)
					return res_data
				})
			})
		},
		request: async (context, payload = {}) => {
			return reqCommon("request", context, payload, async () => {
				let {
					isrefresh = true, //为true重置vuex
						response_key = "response",
						url,
						authorization
				} = payload
				payload.response_key = response_key

				let todoRes = request.request(payload, url, authorization);
				if (!payload.isdeal) return todoRes
				return todoRes.then(res => {
					let res_data = {
						model: response_key,
						raw_data: res,
						isrefresh
					}
					if (Array.isArray(res)) {
						res_data.data = res?.[0]
						res_data.data_list = res
					} else {
						res_data.data = res
					}
					context.commit("setModelData", res_data)
					return res_data
				})
			})
		},
		query: async (context, payload = {}) => {
			return reqCommon("query", context, payload, async () => {
				let {
					response_key,
					isModel = true, // 标准的数据表结构数据
					model = "",
					ismergeQuery = true, //是否合并条件
					isrefresh = true, //为true重置vuex,否则将新数据合并覆盖
					where = {},
					order_by = {},
					distinct_on = "",
					offset = false,
					limit = false,
					id,
					paginator,
					fz_body = {},
					params = {},
					url,
					authorization
				} = payload || {}
				payload.ismergeQuery = ismergeQuery
				payload.isrefresh = isrefresh
				if (!payload?.response_key) {
					response_key = model
					payload.response_key = response_key
				}
				let query_config = context.state[model]?.query_config || {};
				let field_string = payload?.field_string || context.state[model]?.field_string || "";
				if (isModel && ismergeQuery) {
					where = deepMerge(where, query_config?.where || {})
					order_by = deepMerge(order_by, query_config?.order_by || {})
					distinct_on = distinct_on || query_config?.distinct_on || "";
					if (offset === false) {
						offset = query_config?.offset || 0;
					}
					if (limit === false) {
						limit = query_config?.limit || 100;
					}
				}

				let query_list = [{
					response_key,
					field_string,
					model,
					where,
					order_by,
					distinct_on,
					offset,
					limit,
					id,
					paginator,
					fz_body,
					params
				}];

				if (isModel) {
					query_list.push({
						response_key: `${response_key}_aggregate`,
						model: model + "_aggregate",
						field_string: `aggregate{count}`,
						where,
						//order_by,
						distinct_on,
						limit: 0
					})
				}
				let todoRes = request.batch_query(query_list, url, authorization)
				if (!payload.isdeal) return todoRes
				return todoRes.then(res => {
					let response = res?.[response_key]
					let res_data = {
						model: response_key,
						raw_data: response,
					}
					// 如果是标准模型则会存在aggregate
					if (isModel) {
						let count = res?.[`${response_key}_aggregate`]?.aggregate?.count
						res_data = {
							...res_data,
							...{
								data: response?.[0],
								data_list: response,
								count,
								isrefresh,
								ismergeQuery
							}
						}
					} else {
						if (Array.isArray(response)) {
							res_data.data = response?.[0]
							res_data.data_list = response
							res_data.isrefresh = isrefresh
						} else {
							res_data.data = response
							res_data.isrefresh = isrefresh
						}
					}
					context.commit("setModelData", res_data)
					return res_data
				})
			})
		},

		mutation: async (context, payload = {}) => {
			return reqCommon("mutation", context, payload, async () => {
				let {
					response_key,
					operation = "",
					ismergeMutation = true, //是否合并修改条件

					objects = [],
					on_conflict = {},
					_set = {},
					_inc = {},
					where = {},

					isquery = false, //传值为true时，默认会根据当前条件再次进行查询

					ismergeQuery = true, //是否合并条件
					isrefresh = true, //重置vuex
					query_where = {}, // isquery为true时，如果传入query_where则使用query_where，否则使用where
					order_by = {},
					distinct_on = "",
					offset = false,
					limit = false,
					url,
					authorization
				} = payload || {}
				payload.isquery = isquery
				payload.ismergeMutation = ismergeMutation
				payload.ismergeQuery = ismergeQuery
				payload.isrefresh = isrefresh
				let model = operation.slice(7);
				if (!payload?.response_key) {
					response_key = model
					payload.response_key = response_key
				}

				let field_string = payload?.field_string || context.state[model]?.field_string || "";
				let mutation_config = context.state[model]?.mutation_config || {};
				if (ismergeMutation) {
					on_conflict = deepMerge(on_conflict, mutation_config?.on_conflict || {})
				}
				let todoRes = request.mutation({
					response_key,
					operation,
					objects,
					_set,
					_inc,
					where,
					on_conflict,
					field_string
				}, url, authorization)
				if (!payload.isdeal) return todoRes

				return todoRes.then(resMutation => {
					let {
						affected_rows,
						returning: [model_data]
					} = resMutation || {}
					context.commit("setModelData", {
						model: response_key,
						affected_rows,
						returning: resMutation?.returning || []
					})
					if (isquery && model_data?.id) {
						return context.dispatch("query", {
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
							response_key,
							model,
							ismergeQuery, //是否合并条件
							isrefresh, //重置vuex
							where: Object.keys(query_where).length > 0 ? query_where :
								where,
							order_by,
							distinct_on,
							offset,
							limit,
							field_string,
							url,
							authorization
						}).then(resQuery => {
							return {
								...resQuery,

								isquery,
								ismergeMutation,
								...resMutation
							}
						})
					} else {
						return {
							ismergeMutation,
							isquery,
							...resMutation
						}
					}
				})

			})
		},
	}
}