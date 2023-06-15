let {
	wx_mini_code,
	is_zion_auth = false,
} = payload;

if (!wx_mini_code) {
	return setReturn(wx_mini_code, "失败", "wx_mini_code不能为空");
}

let loginRes, account_account = null,
	account_token;

if (is_zion_auth) {
	// 通过wx_mini_code在调用zion进行登录
	let {
		account,
		jwt
	} = mutation({
		operation: "others_loginWithWechatMiniApp",
		params: {
			code: wx_mini_code,
			createIfNotExists: true
		},
		field_string: `
		account{
			id username email phoneNumber profileImageUrl 
			thirdPartyInfo{
				userInfo{openId unionId type name}
			}
		}
		jwt{
		  token
		}
		`
	});
	account_token = jwt?.token;
	account_account = account?.id;
	loginRes = {
		status: account_account ? "成功" : "失败",
		data: {
			openid: account?.thirdPartyInfo?.[0]?.userInfo?.openId,
			name: account?.thirdPartyInfo?.[0]?.userInfo?.name,
			type: account?.thirdPartyInfo?.[0]?.userInfo?.type,
			unionid: account?.thirdPartyInfo?.[0]?.userInfo?.unionId,
		}
	}
} else {
	let data = callThirdapi({
		thirdapi_name: "微信小程序_小程序登录",
		params: {
			js_code: wx_mini_code
		},
		isMerge: true,
		field_string: `field_200_json{openid session_key unionid errcode errmsg}`
	})?.field_200_json || {};

	loginRes = {
		status: data?.openid ? "成功" : "失败",
		data
	}
}

if (loginRes?.status != "成功") {
	return setReturn(loginRes, "失败", "登录失败");
}

let {
	openid: wx_mini_openid,
	unionid: wx_unionid
} = loginRes?.data || {}
if (!wx_mini_openid) {
	return setReturn(loginRes, "失败", "获取openid:wx_mini_openid失败");
}

let user_field_string = `
	id invite_code username mobile email wx_mini_openid wx_pub_openid wx_unionid account_account
	role{
		id name status 
		permission{id name status}
	}
	`;
// 通过openid查询用户
let user_lists = query({
	model: "user",
	where: {
		wx_mini_openid: {
			_eq: wx_mini_openid
		}
	},
	field_string: user_field_string
})
let user = user_lists?.[0];
// 查出了重复的用户，可以做后续逻辑
if (user_lists.length > 1) {
	return setReturn(user_lists, "失败", "用户数据异常，存在多个账号,请联系管理员处理");
} else if (user_lists.length == 1) {
	// 已经存在用户数据，判断是否有新数据，有则进行更新
	if ((account_account && user?.account != account_account) || (wx_unionid && user?.wx_unionid != wx_unionid)) {
		let [user_tmp] = mutation({
			operation: "update_user",
			where: {
				id: {
					_eq: user.id
				}
			},
			_set: {
				...wx_unionid ? {
					wx_unionid
				} : {},
				...account_account ? {
					account_account
				} : {}
			},
			field_string: user_field_string
		})?.returning
		if (!user_tmp) {
			return setReturn(user_tmp, "失败", "未知错误，update_user失败");
		}
		user = user_tmp;
		initUser(user, "login_update");
	} else {
		initUser(user, "login");
	}
} else {
	let user_id = decimalToBase62(new Date().getTime());
	// 需要新增用户
	let userData = {
		invite_code: user_id,
		username: `md_${user_id}`,
		wx_unionid,
		wx_mini_openid,
		account_account,
	};
	userData = {
		...userData,
		...(addAttachUserData(userData) || {})
	}
	let [user_tmp] = mutation({
		operation: "insert_user",
		objects: [userData],
		field_string: user_field_string
	})?.returning
	if (!user_tmp) {
		return setReturn({
			user_tmp,
			userData
		}, "失败", "未知错误，insert_user失败,检查userData是否有误");
	}
	user = user_tmp;
	initUser(user, "register_insert");
}

// 存在token
if (account_token) {
	user.account_token = account_token;
}
// 返回token
return {
	...dataToToken(user),
	tokenUser: user
}


// 在插入用户表时可以附加一些用户数据
function addAttachUserData(userData) {
	return {
		user_assets: {
			data: [{
					type: "cny",
					describe: "用户余额",
					balance: 0,
					status: "启用"
				}, {
					type: "score",
					describe: "用户积分",
					balance: 0,
					status: "启用",
				},
				{
					type: "growth",
					describe: "用户经验值成长值",
					balance: 0,
					status: "启用"
				},
				{
					type: "edit_num_user_birthday",
					describe: "生日可修改次数",
					balance: 1,
					status: "启用"
				}
			]
		}
	}
}

// 数据查询完成以后会执行钩子函数，user为新增的用户信息，type为user表操作方式:1.login 2.login_update 3.register_insert
function initUser(user, type) {
	// 相当于登录成功时

}