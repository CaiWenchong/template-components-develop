export default {

	/* 以下是request模块需要的基本配置 */

	/* uniapp最新模板-caicai   xx公司*/
	// zion项目的api地址
	gql_apiUrl: "https://zion-app.functorz.com/xA88j19zQ7m/zero/BqvlMwgwBKA/api/graphql-v2",
	gql_authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiIsImhhc3VyYV9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiYWRtaW4iLCJ4LWhhc3VyYS11c2VyLWlkIjoiMTAwOTk5OTk5OTk5OTk5OSJ9LCJ6ZXJvIjp7fSwicm9sZXMiOlsiYWRtaW4iLCJ1c2VyIl19.SeeXyG1XgT6K0vMG1Zw2qt8Gz2L-eU8Q87c2fphFqeM",

	/* uniapp-23/6/13最新模板   chenhanshu*/
	// zion项目的api地址
	// gql_apiUrl: "https://zion-app.functorz.com/ZJjjxmqO5b5/zero/BqvlMwgwBBo/api/graphql-v2",
	// gql_authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJhZG1pbiIsInVzZXIiXSwiemVybyI6e30sImhhc3VyYV9jbGFpbXMiOnsieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiYWRtaW4iLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS11c2VyLWlkIjoiMTAwOTk5OTk5OTk5OTk5OSJ9LCJkZWZhdWx0Um9sZSI6ImFkbWluIiwiWkVST19VU0VSX0lEIjoiMTAwOTk5OTk5OTk5OTk5OSJ9.j49ZkQI2vXMQF8jwLVE-6q9oM-Q9-Gdd1GKmBPlrrVo",


	// 系统表需要返回的字段
	system_field_string: `id system_id name logo{id url} province city area location address_detail mobile attach_config actionflow_config`,

	// 是否开启多系统
	is_multi_app: false,
	// 单系统默认id为null时表示随机获取,注：是系统表的system_id，并不是id
	default_system_id: null,
	// 多模型的列表
	system_model_list: [],
	actionflowmain_id: "5e5e155d-7b3c-4771-bf94-ceb597cbb666", //自定义行为id
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