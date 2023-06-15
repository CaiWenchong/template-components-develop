import {
	reqCommon,
	deepMerge
} from "../store_utils/reqCommon.js"
import loginToPage from "../common_utils/loginToPage.js"
import storeConfig from "@/store_config/config_app.js"
import CryptoJS from "../common_utils/CryptoJS.js"
import userConfigDefault from "@/store_config/config_user.js"
import request from "../store_utils/request.js"
const userConfig = {
	...userConfigDefault
}

let tokenData = {};
try {
	let {
		expires_in = 0,
			token = "",
			tokenUser = {}
	} = uni.getStorageSync("md_user_token_data") || {};
	let now_time = new Date().getTime();
	if (now_time >= expires_in || !token || !tokenUser?.id) {
		expires_in = 0;
		token = "";
		tokenUser = {};
	} else {
		tokenData = {
			expires_in,
			token,
			tokenUser
		}
	}
} catch (e) {
	//TODO handle the exception
}

export default {
	state: {
		// zion模型，user表的id
		model: userConfig?.model || "user",
		field_string: userConfig?.field_string || `id`,

		isLogin: false, //记录登录状态，如果data.id有数据，说明已经登录没有则说明未登录
		expires_in: tokenData?.expires_in || 0, //token过期时间
		token: tokenData?.token || "", //token信息
		tokenUser: tokenData?.tokenUser || {},
		data: {},
	},
	getters: {
		...userConfig?.getters || {}
	},
	mutations: {
		// 设置登录状态
		setLogin(state, payload = {}) {
			let {
				isLogin = false
			} = payload;
			state.isLogin = isLogin;
		},
		// 用户token数据刷新
		userTokenDataRefresh(state, payload = {}) {
			let {
				mode = "success_emit", //1.all_emit，2.no_emit 3.logout
					expires_in,
					token,
					tokenUser = {},
			} = payload

			// 登录成功数据
			if (mode == "logout" || mode == "all_emit" || (mode = "success_emit" && token && tokenUser?.id &&
					expires_in)) {
				state.expires_in = expires_in
				state.token = token;
				state.tokenUser = tokenUser;
				uni.setStorageSync("md_user_token_data", {
					expires_in,
					token,
					tokenUser
				})
				if (mode != "logout") {
					let timer = setTimeout(() => {
						clearTimeout(timer);
						uni.$emit("on_userTokenDataRefresh", tokenUser);
					}, 1);
				}
			}
		},
		// 用户数据刷新
		userDataRefresh(state, payload = {}) {
			let {
				data = {},
			} = payload
			if (typeof data === "object") {
				state.data = data
			}
		},

	},
	actions: {
		// 本地token数据同步到vuex
		getLocalTokenDataRefresh: (context, payload = {}) => {
			return reqCommon("getLocalTokenDataRefresh", context, payload, async () => {
				let {
					mode = "all_emit"
				} = payload
				let {
					expires_in,
					token,
					tokenUser
				} = uni.getStorageSync("md_user_token_data") || {};
				let now_time = new Date().getTime();
				if (now_time >= expires_in || !token || !tokenUser?.id) {
					expires_in = 0;
					token = "";
					tokenUser = {};
				}
				context.commit("userTokenDataRefresh", {
					mode,
					expires_in,
					token,
					tokenUser
				})
				return {
					expires_in,
					token,
					tokenUser
				};
			})
		},
		// 通过token获取用户信息
		getUserByToken: async (context, payload = {}) => {
			return reqCommon("getUserByToken", context, payload, async () => {
				let {
					field_string,
					url,
					authorization,
				} = context?.state || {};

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
						actionflow_name: "用户_获取用户信息",
						payload: {
							field_string
						}
					}
				}, {
					root: true
				});
				return todoRes.then(result => {
					if (result?.status !== "成功") {
						throw "登录失败，" + result?.msg;
					}
					let res = result.data;
					let [data] = res;
					context.commit("userDataRefresh", {
						data
					})
					return data
				})
			})
		},
		// 登录成功后通过tokenUser获取用户信息,仅本地使用，已弃用
		getUser: async (context, payload = {}) => {
			return reqCommon("getUser", context, payload, async () => {
				let {
					expires_in,
					tokenUser = {},
					model,
					field_string
				} = context?.state || {};
				let now_time = new Date().getTime();
				if (now_time >= expires_in) {
					throw "登录已过期，请重新登录";
				}
				if (!tokenUser?.id) {
					throw "用户未登录，请先登录";
				}
				let todoRes = request.query({
					model,
					where: {
						id: {
							_eq: tokenUser?.id
						}
					},
					field_string,
					limit: 1
				})
				return todoRes.then(res => {
					let [data] = res;
					context.commit("userDataRefresh", {
						data
					})
					return data
				})
			})
		},
		// 退出登录
		logout: async (context, payload = {}) => {
			return reqCommon("logout", context, payload, async () => {
				let {
					mode = "logout"
				} = payload
				context.commit("userTokenDataRefresh", {
					mode,
					expires_in: 0,
					token: "",
					tokenUser: {}
				})
				context.commit("userDataRefresh", {
					data: {}
				})
			})
		},

		// 注册或登录，分别调用对应的自定义行为成功后返回tokenData
		register_login: async (context, payload = {}) => {
			return reqCommon("register_login", context, payload, async () => {

				let {
					mode = "success_emit",
						method,
						login_to_page = true,
						redirect_page = "",
						data = {},
						url,
						authorization,
				} = payload

				let todoRes = context.dispatch("remote/callActionflow", {
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
					actionflow_name: method,
					payload: data
				}, {
					root: true
				})
				// 由vuex统一处理状态，无须将结果返回给页面
				return todoRes.then(res => {
					// 这里做一些mutation处理逻辑后再返回给界面上
					let {
						expires_in,
						token,
						tokenUser
					} = res?.data || {};
					if (!expires_in || !token || !tokenUser?.id) {
						throw "登录失败"
					}
					context.commit("userTokenDataRefresh", {
						mode,
						expires_in,
						token,
						tokenUser
					})
					if (login_to_page) {
						//跳转页面
						loginToPage({
							login_page: storeConfig?.login_page,
							index_page: storeConfig?.index_page,
							redirect_page
						})
					}
					return res
				})
			})
		}
	}
}