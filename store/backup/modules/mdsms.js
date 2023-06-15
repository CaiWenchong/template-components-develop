import {
	reqCommon
} from "@/store/store_utils/reqCommon.js"

const sms = uniCloud.importObject('md_sms', {
	customUI: true // 取消自动展示的交互提示界面
})
const sysInfo = uni.getSystemInfoSync()
export default {
	getters: {
		// 验证手机验证码是否正确
		verifyMobileCode: state => (mobile = "", code = "") => {
			let verifyData = {
				verify: false,
				msg: "验证失败"
			}
			let verifyMobileCode = uni.getStorageSync("store_app_verifyMobileCode") || []
			let now_time = new Date().getTime()
			for (let i = 0; i < verifyMobileCode.length; i++) {
				if (verifyMobileCode[i].mobile == mobile) {
					if (verifyMobileCode[i].ba_code == btoa(code) && now_time <= verifyMobileCode[i].exp_time) {
						verifyData.verify = true
						verifyData.msg = "验证通过"
					} else {
						verifyData.msg = "验证码不正确"
					}
					verifyMobileCode[i].verify_time = verifyMobileCode[i].verify_time + 1
				}
				if (verifyMobileCode[i]?.verify_time > 3 || now_time > verifyMobileCode[i]?.exp_time || !
					verifyMobileCode[i]?.mobile) {
					// 删除放在最后操作
					verifyMobileCode.splice(i, 1)
					i -= 1
				}
			}
			uni.setStorageSync("store_app_verifyMobileCode", verifyMobileCode)
			return verifyData
		}
	},
	mutations: {
		refresh_verifyMobileCode(state, payload = {}) {
			let {
				mobile = "",
					ba_code = "",
					exp_time = 0
			} = payload || {}
			let verifyMobileCode = uni.getStorageSync("store_app_verifyMobileCode") || []
			if (verifyMobileCode.length <= 0) {
				verifyMobileCode.push({
					mobile,
					ba_code,
					exp_time,
					verify_time: 0
				})
			}
			verifyMobileCode.forEach((item, index) => {
				if (item.mobile === mobile) {
					item.mobile = mobile
					item.ba_code = ba_code
					item.exp_time = exp_time
					item.verify_time = 0
					return
				}
				if (index == (verifyMobileCode.length - 1)) {
					verifyMobileCode.push({
						mobile,
						ba_code,
						exp_time,
						verify_time: 0
					})
					return
				}
			})
			uni.setStorageSync("store_app_verifyMobileCode", verifyMobileCode)
		}
	},
	actions: {
		// unicloud短信项目处理
		smsProjectDeal: async (context, payload = {}) => {
			return reqCommon("smsProjectDeal", context, payload, async () => {
				let {
					deal_type = "reqSmsTemplate", //reqSmsTemplate
						deal_data = {
							sms_type: "code", //短信类型 1.code(验证码) 2.notice(通知短信) 3.marketing(营销短信)
							template_id: "12173", // 模板id
							template: "", // 模板信息
							template_data: {}, //模板接收的数据
							template_demo: "", //demo
							admin_mobile: "", //管理员账号
							admin_name: "", //管理员姓名
						}
				} = payload

				let todoRes = sms[deal_type]({
					project_name: payload?.project_name || sysInfo.appId + "_" + sysInfo
						.appName,
					...deal_data
				})

				// 如果页面直接要求拿到原始结果，则直接返回即可
				if (!payload.isdeal) return todoRes

				// 由vuex统一处理状态
				return todoRes.then(res => {
					// 这里做一些mutation处理逻辑后再返回给界面上
					return res
				})

			})
		},
		// unicloud发送手机短信验证码
		sendMobileMsg: async (context, payload = {}) => {
			return reqCommon("sendMobileMsg", context, payload, async () => {
				let {
					template_id = "",
						mobile,
						project_name,
						data = {},
						sms_type = "code",
						debug
				} = payload
				let smsRes = await sms.sendSms({
					project_name: project_name || sysInfo.appId + "_" + sysInfo
						.appName,
					sms_type, // code或notice或marketing
					template_id,
					mobile,
					data,
					debug
				})
				if (smsRes.errCode === 0) {
					if (sms_type == "code") {
						context.commit("refresh_verifyMobileCode", {
							mobile: smsRes?.mobile,
							ba_code: smsRes?.ba_code,
							exp_time: smsRes?.exp_time
						})
					}
				} else {
					throw smsRes
				}
				return smsRes
			})
		}
	}
}