import {
	deepMerge
} from "@/store/store_utils/reqCommon.js"
import data_schema_list from "./data_schema/config.js"
import model_sourse_list from "./model_sourse/config.js"

const windows_state = {
	//当前指向的目录index,也可以设置默认目录
	current_index: "1",
	//目前列表
	catalog_list: [{
		//目录索引
		index: "1",
		permission: {
			"read": true,
			"create": false,
			"update": false,
			"delete": false,
		},
		meta: {
			title: "用户管理",
			icon: ""
		},
		// 目录列表
		catalog_list: [{
			//目录索引
			index: "1-1",
			permission: {
				"read": true,
				"create": false,
				"update": false,
				"delete": false,
			},
			meta: {
				title: "用户",
				icon: ""
			},
			// 跳转路径
			path: "/pages/content/table",
		}, {
			//目录索引
			index: "1-2",
			permission: {
				"read": true,
				"create": false,
				"update": false,
				"delete": false,
			},
			meta: {
				title: "zion调试",
				icon: ""
			},
			// 跳转路径
			path: "/pages_demo/zion_debug/zion_debug",
		}],
	}, {
		//目录索引
		index: "2",
		permission: {
			"read": true,
			"create": false,
			"update": false,
			"delete": false,
		},
		meta: {
			title: "系统管理",
			icon: ""
		},
		// 目录列表
		catalog_list: [{
			//目录索引
			index: "2-1",
			permission: {
				"read": true,
				"create": false,
				"update": false,
				"delete": false,
			},
			meta: {
				title: "系统平台",
				icon: ""
			},
			// 跳转路径
			path: "/pages/content/table",
		}],
	}]
}

// 获取windows配置
function getWindowsConfig(index = false) {
	if (!index) {
		return {}
	}
	let data = {}
	let data_schema = data_schema_list.find(item => item.index == index)?.data_schema;
	let model_sourse = model_sourse_list.find(item => item.index == index)?.model_sourse;
	if (data_schema?.properties) {
		data.data_schema = data_schema
	}
	if (model_sourse?.model) {
		data.model_sourse = model_sourse
	}
	return data
}
// 自动为每个节点追加属性
function mapCatalog(catalog_list) {
	if (!Array.isArray(catalog_list)) {
		return
	}
	catalog_list.forEach(catalog => {
		deepMerge(catalog, getWindowsConfig(catalog?.index), false)
		mapCatalog(catalog?.catalog_list)
	})
}
mapCatalog(windows_state?.catalog_list);
export default windows_state;