export default {

	/* 以下是request模块需要的基本配置 */

	// zion项目的api地址
	gql_apiUrl: "",
	// zion项目地址对应的authorization
	gql_authorization: "",


	// 系统表需要返回的字段
	system_field_string: `id system_id name logo{id url} province city area location address_detail mobile attach_config actionflow_config`,

	// 是否开启多系统
	is_multi_app: false,
	// 单系统默认id为null时表示随机获取,注：是系统表的system_id，并不是id
	default_system_id: null,
	// 多模型的列表
	system_model_list: [],
	actionflowmain_id: "",
	token: "", //模拟token

	/* 以下是针对当前项目需要的配置 */
	//登录页面的路径
	login_page: "/pages_demo/login/login",
	//配置的首页路径
	index_page: "/pages_demo/show/show",
	// 进入页面时是否需要强制登录
	isForceLogin: false,

	// 可以自定义getter取app模块数据
	getters: {}
}