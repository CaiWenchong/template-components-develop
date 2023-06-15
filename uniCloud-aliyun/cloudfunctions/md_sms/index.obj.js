// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const config = require("./config/index.js")
const db = uniCloud.database();
const dbCmd = db.command
const $ = dbCmd.aggregate
const collection_projectSms = db.collection('project_sms');
const collection_projectSmsTemplate = db.collection('project_sms_template');
const collection_projectSmsRechargeLog = db.collection('project_sms_recharge_log');
const collection_projectSmsSendLog = db.collection('project_sms_send_log');
const collection_projectSmsCaptchaLog = db.collection('project_sms_captcha_log');

module.exports = {
	_before: function() { // 通用预处理器

	},
	// 发送短信，code会返回base64
	async sendSms(params = {}) {
		let {
			project_name = "",
				sms_type = "code", // code或notice或marketing
				template_id = "", // 12173
				mobile = [], //["17781373872"]
				debug = true, // 调试模式不会真正发送短信
				data = {}
		} = params || {}
		const client_info = this.getClientInfo()
		let phoneField = (typeof mobile) == "string" ? "phone" : (Array.isArray(mobile)) ? "phoneList" :
			"none";
		if (phoneField == "none") {
			return {
				errCode: "sms_send_sms_mobile",
				errMsg: "mobile格式有误"
			}
		}
		if (sms_type != "code" && sms_type != "notice" && sms_type != "marketing") {
			return {
				errCode: "sms_send_sms_sms_type",
				errMsg: "sms_type有误,仅支持code、notice、marketing"
			}
		}
		if (!template_id) {
			return {
				errCode: "sms_send_sms_template_id",
				errMsg: "template_id有误"
			}
		}
		let validate_val = false
		let errMobileList = []
		if (phoneField == "phone") {
			validate_val = (/^1[3456789]\d{9}$/.test(mobile)) || (/^((\d{3,4})|\d{3,4}-|s)?\d{7,14}$/
				.test(mobile));
			validate_val != true && errMobileList.push(mobile);
		}

		if (phoneField == "phoneList") {
			mobile = mobile.filter(item => {
				let ve = (/^1[3456789]\d{9}$/.test(item)) || (
					/^((\d{3,4})|\d{3,4}-|s)?\d{7,14}$/.test(item));
				ve != true && errMobileList.push(item);
				return ve;
			})
			validate_val = (mobile.length > 0)
		}
		if (!validate_val) {
			return {
				errCode: "sms_send_sms_validate_val",
				errMsg: "mobile格式有误"
			}
		}

		let send_num = (typeof mobile) == "string" ? 1 : mobile.length;
		let sms_field_type = "sms_" + sms_type + "_num";
		let {
			data: [projectSms_data]
		} = await collection_projectSms.aggregate()
			.match({
				project_name,
				[sms_field_type]: dbCmd.gte(send_num)
			})
			.lookup({
				from: 'project_sms_template',
				let: {
					project_name: "$project_name",
					template_id
				},
				pipeline: $.pipeline()
					.match(dbCmd.expr(
						$.and([
							$.eq(['$project_name', '$$project_name']),
							$.eq(['$template_id', '$$template_id'])
						])
					))
					.done(),
				as: 'sms_template',
			})
			.end()
		if (!projectSms_data || projectSms_data.sms_template.length <= 0) {
			return {
				errCode: "sms_send_sms_sms_projectSms_list",
				errMsg: "请确认模版是否有误或者短信余额是否充足"
			}
		}

		let {
			sms_template: [template]
		} = projectSms_data

		if (!template.template_id) {
			return {
				errCode: "sms_send_sms_template_id",
				errMsg: `项目中不存在该短信模版`
			}
		}


		let send_mobile, exp_time;
		if (sms_type == "code") {
			if (!data.code) {
				data.code = Math.random().toFixed(6).slice(-6)
			}
			if (typeof data.expMinute != "number") {
				data.expMinute = 5
			}

			send_mobile = (typeof mobile) == "string" ? mobile : mobile[0];
			exp_time = (new Date()).getTime() + data.expMinute * 60 * 1000;

			await collection_projectSmsCaptchaLog.add({
				project_name,
				exp_time,
				template_id: template.template_id,
				mobile: send_mobile,
				code: data.code
			})

		}
		// 发送短信开始
		let sendSmsRes = {
			errCode: 0
		}
		try {
			if (!debug) {
				let template_data = template.template_data || {}
				Object.keys(template_data).forEach((item, index) => {
					template_data[item] = data[item]
				})

				sendSmsRes = await uniCloud.sendSms({
					appid: client_info.appId,
					smsKey: config.smsKey,
					smsSecret: config.smsSecret,
					[phoneField]: mobile,
					templateId: template.template_id, // 请替换为自己申请的模板id
					data: template_data
				})
			}
		} catch (e) {
			if (!debug) {
				await collection_projectSmsSendLog.add({
					project_name,
					template_id,
					sms_type,
					template: template.template,
					template_data: data,
					mobile,
					status: false
				});
			}
			return {
				errCode: "sms_send_sms_sendSms",
				errMsg: e
			}
		}

		if (sendSmsRes.errCode !== 0) {
			return {
				errCode: "sms_send_sms_sendSms",
				errMsg: "短信发送失败：" + sendSmsRes.errMsg || ""
			}
		}

		await collection_projectSms.where({
			project_name
		}).update({
			[sms_field_type]: dbCmd.inc(0 - Math.abs(send_num))
		})

		if (!debug) {
			await collection_projectSmsSendLog.add({
				project_name,
				template_id,
				sms_type,
				template: template.template,
				template_data: data,
				mobile,
				status: true
			});
		}

		// 如果是验证码，则存库
		if (sms_type == "code") {
			//let ba_code = btoa(data.code)
			let ba_code = Buffer.from(data.code).toString('base64')
			return {
				...sendSmsRes,
				ba_code,
				expMinute: data.expMinute,
				mobile: send_mobile,
				exp_time,
				errMobileList
			}
		}
		// 返回结果
		return {
			...sendSmsRes,
			...data,
			errMobileList
		}
	},

	// 添加或修改短信模板
	async addSmsTemplate(params = {}) {
		let {
			project_name = "",
				sms_type,
				template_id,
				template = "",
				template_data = false,
				template_demo = "",
				admin_mobile = "",
				admin_name = ""
		} = params || {}

		if (!template_id || template_data === false || !sms_type) {
			return {
				errCode: "template_id-template_data-sms_type",
				errMsg: "内容有误"
			}
		}
		// 查询项目是否存在，如果不存在则添加
		let todo = await db.startTransaction()

		try {

			let {
				data: [projectSms_data]
			} = await collection_projectSms.where({
				project_name
			}).get()

			if (!projectSms_data._id) {
				await collection_projectSms.add({
					project_name,
					admin_mobile,
					admin_name,
					sms_code_num: 100,
					sms_notice_num: 100,
					sms_marketing_num: 100,
					status: true
				})
			}

			// 如果已经存在，则需要查询模板
			let {
				data: [projectSmsTemplate_data]
			} = await collection_projectSmsTemplate.where({
				project_name,
				template_id
			}).get()

			let doc_id = projectSmsTemplate_data._id || (new Date()).getTime()
			await todo.collection("project_sms_template").doc(doc_id)
				.set({
					template_id,
					sms_type,
					project_name,
					template,
					template_data,
					template_demo,
					status: true
				})

			await todo.commit()
			return {
				errCode: 0,
				errMsg: "设置成功"
			}

		} catch (e) {
			await todo.rollback()
			return {
				errMsg: e
			}
		}
	},

	// 给项目充值短信条数
	async incSmsTemplate(params = {}) {
		let {
			project_name,
			sms_add_num,
			sms_type
		} = params || {}
		if (!project_name || !sms_add_num || (sms_type != "code" && sms_type != "notice" && sms_type !=
				"marketing")) {
			return {
				errCode: "project_name-sms_add_num-sms_type",
				errMsg: "project_name或sms_add_num或sms_type有误"
			}
		}
		let sms_field_type = "sms_" + sms_type + "_num"
		await collection_projectSms.where({
			project_name
		}).update({
			[sms_field_type]: dbCmd.inc(sms_add_num)
		})

		await collection_projectSmsRechargeLog.add({
			project_name,
			sms_type,
			sms_add_num
		})

		// 返回结果
		return {
			errCode: 0,
		}
	},

	//  查询项目剩余条数
	async reqSmsProject(params = {}) {
		let {
			project_name
		} = params || {}
		let {
			data
		} = await collection_projectSms.where({
			project_name
		}).get()
		// 返回结果
		return {
			errCode: 0,
			data //请根据实际需要返回值
		}
	},

	// 获取模版列表
	async reqSmsTemplate(params = {}) {
		let {
			project_name,
			template_id
		} = params || {}

		let query_data = {
			project_name: params.project_name
		}
		template_id && (query_data.template_id = template_id)
		let {
			data
		} = await collection_projectSmsTemplate.where(query_data).get()
		// 返回结果
		return {
			errCode: 0,
			data //请根据实际需要返回值
		}
	}

}
