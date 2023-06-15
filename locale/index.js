// i18n框架语言
import u_en from './en.json'
import u_zhCn from './zh-cn.json'

// #ifdef H5
// elementPlus
import e_zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import e_en from 'element-plus/dist/locale/en.mjs';
// i18n自定义多语言
let messages_elementPlus = {
	en: e_en,
	'zh-cn': e_zhCn
}
// #endif


// 定义应用所有需要的的语言列表
const localeList = [{
	locale: "en",
	title: "Einglish",
}, {
	locale: "zh-cn",
	title: "中文简体",
}]

// 当前的设置语言
let locale = uni.getLocale();
locale = (locale == "zh-Hans" ? "zh-cn" : locale);
// i18n自定义多语言
let messages = {
	en: u_en,
	'zh-cn': u_zhCn
}


// 导出多语言
export {
	// i18n设置框架默认语言包
	messages,
	//固定返回当前语言
	locale,
	//固定返回当前语言列表
	localeList,

	// #ifdef H5
	// elementPlus语言
	messages_elementPlus
	// #endif
}