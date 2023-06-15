// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const fs = require("fs")
const path = require("path")
module.exports = {
	_before: function() { // 通用预处理器

	},
	/**
	 * 格式化actionFlow代码并返回
	 * @returns {object} 返回值描述
	 */
	getActionflowCode(params = {}) {
		let {
			actionflowDir = "",
				actionflowName = ""
		} = params
		let jsCode = fs.readFileSync(path.resolve(__dirname,
			`./actionflow/${actionflowDir}${actionflowName}.js`), "utf8");
		// 将代码处理一下，替换一些不合适的文本

		jsCode = jsCode.replace(/\\/g, "\\\\").replace(/\r\n/g, "\\n").replace(/\"/g, "\\\"").replace(/\n/g,
			"\\n");

		// 返回结果
		return {
			jsCode //请根据实际需要返回值
		}
	},

	// 将业务代码与框架代码一起组合后格式化返回,主要用于调试
	getActionflowmainCode(params = {}) {
		let {
			actionflowDir = "",
				actionflowName = "",
				attach_data = {}
		} = params
		let jsCode = fs.readFileSync(path.resolve(__dirname,
			`./actionflowmain/${actionflowDir}${actionflowName}.js`), "utf8");

		jsCode = `
		let actionflow_name = "${actionflowName}";
		let attach_data = JSON.parse("${JSON.stringify(attach_data)}");
		function main(payload = {}) {
			if (!actionflow_name) {
				return setReturn(payload, "失败", \`actionflow_name:\${actionflow_name},不能为空\`);
			}
			let {
				system_id = null,
					system_field_string =
					\`id system_id name logo{id url} province city area location address_detail mobile attach_config wx_pub_config wx_mini_config wx_union_config actionflow_config\`
			} = payload
			
			if (system_id || system_id === null) {
				let [system_tmp] = query({
					model: "system",
					limit: 1,
					where: {
						...(system_id === null ? {
							system_id: {
								_eq: system_id
							}
						} : {})
					},
					field_string:system_field_string
				})
				if (system_tmp?.id) {
					default_system_system = system_tmp?.id
					system = system_tmp
				} else {
					return setReturn(system_tmp, "失败", \`system_id:\${system_id},错误或不存在\`);
				}
			}
			return (()=>{${jsCode}})();
		}
		`;

		let jscode_frame = fs.readFileSync(path.resolve(__dirname,
			`./actionflow_frame.js`), "utf8");

		let jscode_res = `
			${jsCode}
			${jscode_frame}
			`;
		// 将代码处理一下，替换一些不合适的文本
		jscode_res = jscode_res.replace(/\\/g, "\\\\").replace(/\r\n/g, "\\n").replace(/\"/g, "\\\"").replace(/\n/g,
			"\\n");

		// 返回结果
		return {
			jsCode: jscode_res //请根据实际需要返回值
		}
	},

	// 获取编写的代码，主要用于自动上传
	getActionflowmainRawcode(params = {}) {
		let {
			actionflowDir = "",
				actionflowName = "",

		} = params
		let jsCode = fs.readFileSync(path.resolve(__dirname,
			`./actionflowmain/${actionflowDir}${actionflowName}.js`), "utf8");

		// 返回结果
		return {
			jsCode //请根据实际需要返回值
		}
	}

}
